import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useColors } from '../../hooks/colors';
import { type Message } from '../../types/queries';
import styles from './styles';
import { useTranslations } from '../../hooks/translations';

interface Props {
  item: Message;
  isUser: boolean;
  onPressTryAgain: (errorMessage: Message) => void;
}

const ErrorMessageInfo = ({ item, isUser, onPressTryAgain }: Props) => {
  const { colors } = useColors();
  const { translations } = useTranslations();
  const onPress = () => {
    onPressTryAgain(item);
  };
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: !isUser ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <Image
        source={require('../../assets/error.png')}
        style={styles.image}
        tintColor={colors.messageErrorColor}
      />
      <Text
        style={[
          styles.text,
          {
            color: colors.messageErrorColor,
          },
        ]}
      >
        {translations.problemWithSendMessage}
      </Text>
      <TouchableOpacity style={styles.touchContainer} onPress={onPress}>
        <Text
          style={[
            styles.text,
            styles.underLine,
            {
              color: colors.messageErrorColor,
            },
          ]}
        >
          {translations.tryAgainSendMessage}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ErrorMessageInfo;
