import React, { memo, useState } from 'react';
import { Linking, Pressable, Text, TouchableOpacity, View } from 'react-native';
import type { UrlButtonTemplatePayload } from '../../types/queries';
import styles from './styles';
import { useColors } from '../../hooks/colors';
import { timestampToDate } from '../../utils/functions';

interface Props {
  payload: UrlButtonTemplatePayload;
  time: number;
}

const UrlButtonTemplateMessage = ({ payload, time }: Props) => {
  const { colors } = useColors();
  const [showStatus, setShowStatus] = useState(false);

  const onOpenSite = async () => {
    try {
      await Linking.openURL(payload.url);
    } catch (e) {}
  };

  return (
    <Pressable onPress={() => setShowStatus((prevState) => !prevState)}>
      {showStatus && time && (
        <View style={styles.dataContainer}>
          <Text
            style={[
              styles.data,
              {
                color: colors.placeholderTextColor,
              },
            ]}
          >
            {timestampToDate(time)}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.incomingMessageBackgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              color: colors.incomingMessagePrimaryTextColor,
            },
          ]}
        >
          {payload.message}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.urlTemplateButtonBackgroundColor,
            },
          ]}
          onPress={onOpenSite}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: colors.urlTemplateButtonTextColor,
              },
            ]}
          >
            {payload.caption}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default memo(UrlButtonTemplateMessage);
