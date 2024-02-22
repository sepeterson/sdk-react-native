import React from 'react';
import { View, TouchableOpacity, Image, Linking } from 'react-native';
import styles from './styles';
import { useColors } from '../../hooks/colors';
const Logo = require('../../assets/Logo.png');

const ZowieLogo = () => {
  const { colors } = useColors();
  const onPress = async () => {
    try {
      await Linking.openURL('https://getzowie.com');
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.content,
          { backgroundColor: colors.zowieLogoButtonBackgroundColor },
        ]}
      >
        <Image source={Logo} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default ZowieLogo;
