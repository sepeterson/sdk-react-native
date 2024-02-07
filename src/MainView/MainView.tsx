import {
  FlatList,
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  View,
  type ViewStyle,
  type ViewToken,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './style';
import { useColors } from '../hooks/colors';
import TextTyping from '../components/TextTyping';
import NewMessage from '../components/NewMessage';
import {
  deliveredMessage,
  getMessages,
  initializeChat,
  type MetaData,
  readMessage,
} from '../api/apiMutations';
import {
  type Message,
  type NewStatusSubscriptionData,
  PayloadTypes,
} from '../types/queries';
import { useMutation, useSubscription } from '@apollo/client';
import { NEW_MESSAGE, NEW_STATUS_SUBSCRIPTION } from '../utils/subscriptions';
import {
  debounce,
  mergeMessageArrays,
  prepareErrorMessage,
} from '../utils/functions';
import { SEND_TEXT_MUTATION } from '../utils/mutations';
import ZowieLogo from '../components/ZowieLogo';
import { type UserInfo, useUserInfo } from '../hooks/userInfo';
import MessageView from '../components/MessageView';
import VideoPlayerAndroid from '../components/VideoPlayerAndroid';
import { useVideo } from '../hooks/video';
import { TextMessage } from '../components/TextMessage';
import type { ZowieConfig } from 'react-native-zowiesdk';
import TimeDate from '../components/TimeDate';
import {
  additionalMinuteInMs,
  debounceTimeForSetNewestMessageAsReadMs,
  newestMessageOffsetParams,
  notAllowedTypesToMessageList,
} from '../utils/config';
import useIsInternetConnection from '../hooks/internetConnection';
import InternetConnectionBanner from '../components/InternetConnectionBanner';

interface Props {
  style?: ViewStyle;
  iosKeyboardOffset: number;
  androidKeyboardOffset: number;
  metaData?: MetaData;
  config: ZowieConfig;
  host: string;
}

interface DraftMessage {
  text: string;
  timestamp: number;
  error?: boolean;
}

const MainView = ({
  config,
  style,
  iosKeyboardOffset,
  androidKeyboardOffset,
  metaData,
  host,
}: Props) => {
  const { colors } = useColors();
  const { userInfo, setUserInfo } = useUserInfo();
  const { show, videoUrl, setShow } = useVideo();
  const isConnected = useIsInternetConnection();

  const [text, onChangeText] = React.useState('');
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [draft, setDraft] = useState<DraftMessage | null>(null);
  const [isNewestReaded, setIsNewestReaded] = useState(false);

  const [sendText] = useMutation(SEND_TEXT_MUTATION);
  const listRef = useRef<FlatList>(null);

  const scrollToLatest = () => {
    InteractionManager.runAfterInteractions(() => {
      if (listRef.current) {
        listRef.current.scrollToOffset(newestMessageOffsetParams);
      }
    });
  };

  const addNewMessage = (message: Message | undefined) => {
    if (message === undefined) {
      return;
    }
    setMessages((prevState) => [message, ...prevState]);
  };

  const onSend = async () => {
    onChangeText('');
    setDraft({ text, timestamp: Date.now() });
    try {
      const newUserMessage = await sendText({
        variables: {
          conversationId: userInfo.conversationId,
          text,
        },
        context: {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      });
      setMessages((prevState) =>
        mergeMessageArrays(prevState, [newUserMessage.data.sendText])
      );
      setDraft(null);
      scrollToLatest();
    } catch (e) {
      setMessages((prevState) =>
        mergeMessageArrays(prevState, [
          prepareErrorMessage(text, userInfo.userId),
        ])
      );
      setDraft(null);
      scrollToLatest();
    }
  };

  const onResend = async (messageText: string, id: string) => {
    setMessages((prevState) => prevState.filter((mess) => mess.id !== id));
    setDraft({ text: messageText, timestamp: Date.now() });
    try {
      const newUserMessage = await sendText({
        variables: {
          conversationId: userInfo.conversationId,
          text: messageText,
        },
        context: {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      });
      setMessages((prevState) =>
        mergeMessageArrays(prevState, [newUserMessage.data.sendText])
      );
      setDraft(null);
      scrollToLatest();
    } catch (e) {
      setMessages((prevState) =>
        mergeMessageArrays(prevState, [
          prepareErrorMessage(messageText, userInfo.userId),
        ])
      );
      setDraft(null);
      scrollToLatest();
    }
  };

  const updateMessages = () => {
    const timestamp = Date.now() + additionalMinuteInMs;
    getMessages(userInfo.conversationId, timestamp, userInfo.token).then(
      ({ data }) => {
        if (data?.messages.edges) {
          setMessages((prevState) => {
            const newTab = mergeMessageArrays(
              prevState,
              data?.messages.edges.map((edge) => edge.node)
            );
            return newTab;
          });
        }
      }
    );
  };

  const loadMoreMessages = () => {
    const lastMessageTime = messages[messages.length - 1]?.time;
    if (lastMessageTime) {
      getMessages(
        userInfo.conversationId,
        lastMessageTime || Date.now(),
        userInfo.token
      ).then(({ data }) => {
        const newMessages = data?.messages.edges;
        if (newMessages) {
          const allMessages = mergeMessageArrays(
            messages,
            newMessages.map((edge) => edge.node)
          );
          setMessages(allMessages);
        }
      });
    }
  };

  useSubscription<{ newMessage: Message }>(NEW_MESSAGE, {
    variables: {
      conversationId: userInfo.conversationId,
    },
    onData: ({ data }) => {
      const messageType = data.data?.newMessage.payload.__typename;

      if (messageType === PayloadTypes.TypingOn) {
        setShowTyping(true);
      }

      if (messageType === PayloadTypes.TypingOff) {
        setShowTyping(false);
      }

      if (messageType && !notAllowedTypesToMessageList.includes(messageType)) {
        addNewMessage(data.data?.newMessage);
        InteractionManager.runAfterInteractions(async () => {
          setShowTyping(false);
          scrollToLatest();
        });
      }
    },
  });

  useSubscription<NewStatusSubscriptionData>(NEW_STATUS_SUBSCRIPTION, {
    variables: { conversationId: userInfo.conversationId },
    onData: () => {
      console.log('new_status');
      updateMessages();
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markNewMessageAsRead = useCallback(
    debounce(
      async (callback: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
      }) => {
        const newestMess = callback.viewableItems.find(
          (item) => item.index === 0
        );

        if (!isNewestReaded && !!newestMess) {
          await deliveredMessage(
            userInfo.conversationId,
            userInfo.token,
            Date.now() + additionalMinuteInMs
          );
          await readMessage(
            userInfo.conversationId,
            userInfo.token,
            Date.now() + additionalMinuteInMs
          );
          setIsNewestReaded(true);
        }
      },
      debounceTimeForSetNewestMessageAsReadMs
    ),
    [isNewestReaded, userInfo, messages]
  );

  const initChat = useCallback(async () => {
    const newUserInfo = await initializeChat(config, host, metaData);
    if (newUserInfo) {
      setUserInfo(newUserInfo as UserInfo);
    }
  }, [host, config, metaData, setUserInfo]);

  useEffect(() => {
    initChat();
  }, [initChat]);

  useEffect(() => {
    updateMessages();
    scrollToLatest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.token]);

  /* Checking that user read message */
  useEffect(() => {
    if (isNewestReaded && messages[0]?.author.userId !== userInfo.userId) {
      setIsNewestReaded(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, userInfo.userId]);

  useEffect(() => {
    if (isConnected) {
      updateMessages();
    } else {
      setShowTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  /* Show user message draft only if last user message is not text or
      value is not same as draft or time of darft is newer that last mess
   */
  const showDraft = useMemo(() => {
    const newestUserMessage = messages?.find(
      (mess) =>
        mess.author.userId === userInfo.userId &&
        mess.payload.__typename === PayloadTypes.Text &&
        mess.payload.value === draft?.text
    );
    return (
      draft?.text &&
      !(newestUserMessage && newestUserMessage.time > draft.timestamp)
    );
  }, [draft?.text, draft?.timestamp, messages, userInfo.userId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={
        style || [
          styles.defaultStyle,
          { backgroundColor: colors.backgroundColor },
        ]
      }
      contentContainerStyle={styles.flex1}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? iosKeyboardOffset : androidKeyboardOffset + 20
      }
    >
      {show ? (
        <VideoPlayerAndroid
          videoUrl={videoUrl}
          onPressBack={() => setShow(false)}
        />
      ) : null}
      <View style={styles.flex1}>
        <InternetConnectionBanner isConnection={!!isConnected} />
        <FlatList
          style={styles.flex1}
          onViewableItemsChanged={markNewMessageAsRead}
          inverted={messages.length > 0}
          onEndReachedThreshold={2}
          ref={listRef}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContent}
          onEndReached={loadMoreMessages}
          data={messages}
          renderItem={({ item, index }) => (
            <MessageView
              item={item}
              style={style}
              scrollToLatest={scrollToLatest}
              isNewest={index === 0}
              prevItemTime={messages[index + 1]?.time}
              onPressTryAgain={onResend}
            />
          )}
          ListHeaderComponent={
            <>
              {showDraft && (
                <TextMessage text={draft?.text || ''} isUser={true} />
              )}
              <TextTyping show={showTyping} setShow={setShowTyping} />
            </>
          }
          ListFooterComponent={
            <TimeDate timestamp={messages[messages.length - 1]?.time} />
          }
        />
        <ZowieLogo />
        <NewMessage
          value={text}
          onChangeText={onChangeText}
          onSend={onSend}
          scrollToEnd={scrollToLatest}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(MainView);
