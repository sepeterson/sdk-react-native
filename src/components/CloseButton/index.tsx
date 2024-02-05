import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';

interface Props {
  onPress: () => void;
}

const CloseButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.line, styles.line1]} />
      <View style={[styles.line, styles.line2]} />
    </TouchableOpacity>
  );
};

export default memo(CloseButton);
