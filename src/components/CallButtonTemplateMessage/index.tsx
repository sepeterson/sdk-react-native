import type { CallButtonTemplatePayload } from '../../types/queries';
import React, { useState } from 'react';
import { Linking, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../../hooks/colors';
import styles from './styles';
import { timestampToDate } from '../../utils/functions';

interface Props {
  payload: CallButtonTemplatePayload;
  time?: number;
}

const CallButtonTemplateMessage = ({ payload, time }: Props) => {
  const { colors } = useColors();
  const [showStatus, setShowStatus] = useState(false);

  const onPress = async () => {
    try {
      await Linking.openURL(`tel:${payload.phoneNumber}`);
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
            styles.message,
            { color: colors.incomingMessagePrimaryTextColor },
          ]}
        >
          {payload.message}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            { backgroundColor: colors.urlTemplateButtonBackgroundColor },
          ]}
        >
          <Text
            style={[
              styles.textButton,
              { color: colors.urlTemplateButtonTextColor },
            ]}
          >
            {payload.caption}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default CallButtonTemplateMessage;
