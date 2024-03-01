import { Text, View, Image } from 'react-native';
import React, { memo } from 'react';
import type { AnnouncementPayload } from '../../types/queries';
import styles from './styles';
import { useColors } from '../../hooks/colors';

interface Props {
  payload: AnnouncementPayload;
  isNewest: boolean;
}

const AnnouncementMessage = ({ payload, isNewest }: Props) => {
  const { colors } = useColors();
  return isNewest || payload.visibility === 'Persistent' ? (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.announcementBorderColor,
          backgroundColor: colors.announcementBackgroundColor,
        },
      ]}
    >
      <Image
        tintColor={colors.announcementTextColor}
        source={require('../../assets/time.png')}
        style={styles.image}
      />
      <Text
        style={[
          styles.infoText,
          {
            color: colors.announcementTextColor,
          },
        ]}
      >
        {payload.text}
      </Text>
    </View>
  ) : null;
};

export default memo(AnnouncementMessage);
