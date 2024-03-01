import React from 'react';
import type { FilePayload } from '../../types/queries';
import { useColors } from '../../hooks/colors';
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ImageTemplateMessage from '../ImageTemplateMessage';
import VideoTemplateMessage from '../VideoTemplateMessage';
import { useTranslations } from '../../hooks/translations';

interface Props {
  payload: FilePayload;
  isUser: boolean;
  draft?: boolean;
  error?: boolean;
}

const FileMessage = ({ payload, isUser, draft }: Props) => {
  const { colors } = useColors();
  const { translations } = useTranslations();
  const onPress = async () => {
    try {
      await Linking.openURL(payload.url);
    } catch (e) {}
  };

  if (['JPEG', 'PNG', 'GIF'].includes(payload.type)) {
    const imageTemplatePayload = {
      url: payload.url,
      buttons: [],
      dimensions: payload?.dimensions,
    };

    return (
      <ImageTemplateMessage payload={imageTemplatePayload} isUser={isUser} />
    );
  }

  if (['MP4'].includes(payload.type)) {
    const videoTemplatePayload = {
      url: payload.url,
      buttons: [],
    };

    return (
      <VideoTemplateMessage payload={videoTemplatePayload} isUser={isUser} />
    );
  }

  return (
    <TouchableOpacity
      disabled={draft}
      onPress={onPress}
      style={[
        styles.container,
        isUser ? styles.userMessage : styles.incomingMessage,
        {
          backgroundColor: isUser
            ? colors.userMessageBackgroundColor
            : colors.incomingMessageBackgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.textMessage,
          {
            color: isUser
              ? colors.userMessagePrimaryTextColor
              : colors.incomingMessagePrimaryTextColor,
          },
        ]}
      >
        {draft ? translations.attachment : translations.downloadAttachment}
      </Text>
      {draft ? (
        <ActivityIndicator
          color={
            isUser
              ? colors.userMessagePrimaryTextColor
              : colors.incomingMessagePrimaryTextColor
          }
          size={16}
        />
      ) : (
        <Image
          tintColor={
            isUser
              ? colors.userMessagePrimaryTextColor
              : colors.incomingMessagePrimaryTextColor
          }
          source={require('../../assets/attachemntDownload.png')}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

export default FileMessage;
