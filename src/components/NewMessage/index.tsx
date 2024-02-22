import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { useColors } from '../../hooks/colors';
import styles from './styles';
import { useMutation } from '@apollo/client';
import { UPDATE_MESSAGE_PREVIEW } from '../../utils/mutations';
import { useUserInfo } from '../../hooks/userInfo';
import { debounce } from '../../utils/functions';

interface Props {
  value: string | undefined;
  onChangeText: (text: string) => void | undefined;
  onSend: () => void;
  scrollToEnd: () => void;
  onSendFileAttachment: () => void;
  onSendImageAttachment: () => void;
}

const NewMessage = ({
  onChangeText,
  value,
  onSend,
  scrollToEnd,
  onSendFileAttachment,
  onSendImageAttachment,
}: Props) => {
  const { colors } = useColors();
  const { userInfo } = useUserInfo();
  const [updateMessagePreview] = useMutation(UPDATE_MESSAGE_PREVIEW);
  const showSendButton = !!(value && value.length > 0);
  const inputRef = useRef<TextInput>(null);

  const sendMessagePreview = async (text: string) => {
    try {
      await updateMessagePreview({
        variables: {
          conversationId: userInfo.conversationId,
          previewText: text,
        },
        context: {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      });
    } catch (e) {}
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSendPreview = useCallback(debounce(sendMessagePreview, 200), [
    userInfo.token,
  ]);

  const onChangeNewMessage = (text: string) => {
    onChangeText(text);
    debouncedSendPreview(text);
  };

  const onSendNewMessage = async () => {
    onSend();
    await sendMessagePreview('');
  };

  return (
    <View
      key={'newMessage'}
      style={[
        styles.container,
        {
          borderColor: colors.separatorColor,
        },
      ]}
    >
      <View key={'input'} style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          onSubmitEditing={value ? onSendNewMessage : undefined}
          onChangeText={onChangeNewMessage}
          value={value}
          placeholder={'Your message...'}
          placeholderTextColor={colors.placeholderTextColor}
          style={{ color: colors.newMessageTextColor }}
          onFocus={() => {
            setTimeout(() => {
              scrollToEnd();
            }, 200);
          }}
        />
      </View>
      {showSendButton ? (
        <View style={styles.sendContainer}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={onSendNewMessage}
            disabled={!showSendButton}
          >
            <Image
              source={require('../../assets/send.png')}
              style={styles.sendImg}
              tintColor={colors.sendTextButtonColor}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={'sendAndAttachment'} style={styles.attachmentsContainer}>
          <TouchableOpacity
            style={styles.attachmentButton}
            onPress={onSendFileAttachment}
          >
            <Image
              source={require('../../assets/attachment.png')}
              style={styles.attachmentImg}
              tintColor={colors.sendTextButtonDisabledColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.attachmentButton}
            onPress={onSendImageAttachment}
          >
            <Image
              source={require('../../assets/photo.png')}
              style={styles.attachmentImg}
              tintColor={colors.sendTextButtonDisabledColor}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NewMessage;
