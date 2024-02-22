import { Text, View } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';
import { useColors } from '../../hooks/colors';

interface Props {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  isUser: boolean;
}
const AgentName = ({ firstName, lastName, isUser }: Props) => {
  const { colors } = useColors();

  const getAgentName = () => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return null;
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: isUser ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text
        style={[
          styles.nameText,
          {
            color: colors.incomingMessagePrimaryTextColor,
          },
        ]}
      >
        {getAgentName()}
      </Text>
    </View>
  );
};

export default memo(AgentName);
