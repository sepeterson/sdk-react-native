import React from 'react';
import type { FilePayload } from '../../types/queries';
import { useColors } from '../../hooks/colors';
import { Image, Linking, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface Props {
  payload: FilePayload;
  isUser: boolean;
}

const FileMessage = ({ payload, isUser }: Props) => {
  const { colors } = useColors();
  const onPress = async () => {
    try {
      await Linking.openURL(payload.url);
    } catch (e) {}
  };
  return (
    <TouchableOpacity
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
        Download {payload.type} attachment
      </Text>
      <Image
        tintColor={
          isUser
            ? colors.userMessagePrimaryTextColor
            : colors.incomingMessagePrimaryTextColor
        }
        source={require('../../assets/attachemntDownload.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default FileMessage;
