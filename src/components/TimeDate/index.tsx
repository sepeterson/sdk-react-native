import { Text } from 'react-native';
import { timestampToDate } from '../../utils/functions';
import React, { memo } from 'react';
import { useColors } from '../../hooks/colors';
import styles from './styles';

interface Props {
  timestamp: number | undefined;
}

const TimeDate = ({ timestamp }: Props) => {
  const { colors } = useColors();
  if (timestamp === undefined) {
    return null;
  }
  return (
    <Text
      style={[
        styles.text,
        {
          color: colors.incomingMessageSecondaryTextColor,
        },
      ]}
    >
      {timestampToDate(timestamp)}
    </Text>
  );
};

export default memo(TimeDate);
