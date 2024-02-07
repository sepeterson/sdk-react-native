import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useColors } from '../../hooks/colors';
import { type Message, PayloadTypes } from '../../types/queries';
import styles from './styles';

interface Props {
  item: Message;
  isUser: boolean;
  onPressTryAgain: (messageText: string, id: string) => void;
}

const ErrorMessageInfo = ({ item, isUser, onPressTryAgain }: Props) => {
  const { colors } = useColors();
  const onPress = () => {
    if (item.payload.__typename === PayloadTypes.Text) {
      onPressTryAgain(item.payload.value, item.id);
    }
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
        We couldn’t sent your message.{' '}
      </Text>
      <TouchableOpacity hitSlop={10} onPress={onPress}>
        <Text
          style={[
            styles.text,
            styles.underLine,
            {
              color: colors.messageErrorColor,
            },
          ]}
        >
          Try again
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ErrorMessageInfo;
