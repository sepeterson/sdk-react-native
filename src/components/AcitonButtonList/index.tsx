import { Linking, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import type { ActionButton } from '../../types/queries';
import { useColors } from '../../hooks/colors';
import styles from './styles';
import { SEND_BUTTON_MUTATION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useUserInfo } from '../../hooks/userInfo';
interface Props {
  buttons: ActionButton[];
}

const ActionButtonList = ({ buttons }: Props) => {
  const { colors } = useColors();
  const { userInfo } = useUserInfo();
  const [sendButton] = useMutation(SEND_BUTTON_MUTATION);

  const sendButtonMutation = async (buttonId: string) => {
    try {
      await sendButton({
        variables: {
          conversationId: userInfo.conversationId,
          buttonId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      });
    } catch (err) {}
  };

  const onPress = async (button: ActionButton) => {
    try {
      switch (button.__typename) {
        case 'ActionButtonDefault':
          return await sendButtonMutation(button.buttonId);
        case 'ActionButtonUrl':
          return await Linking.openURL(button.url);
        case 'ActionButtonCall': {
          return await Linking.openURL('tel:' + button.phoneNumber);
        }
        default:
          return () => {};
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.caption}
          style={[
            styles.button,
            { backgroundColor: colors.actionButtonBackgroundColor },
          ]}
          onPress={() => onPress(button)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors.actionButtonTextColor,
              },
            ]}
          >
            {button.caption}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(ActionButtonList);
