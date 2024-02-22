import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { internetConnectionRestoredBannerShowMs } from '../../utils/config';
import styles from './styles';
const disconnectedImg = require('../../assets/Disconnected.png');
const connectedImg = require('../../assets/Connected.png');
const closeImg = require('../../assets/Close.png');

interface Props {
  isConnection: boolean;
}

const InternetConnectionBanner = ({ isConnection }: Props) => {
  const [showBanner, setShowBanner] = useState(false);
  const [prevConnectionState, setPrevConnectionState] = useState(isConnection);

  useEffect(() => {
    if (isConnection && !prevConnectionState) {
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, internetConnectionRestoredBannerShowMs);
    }
    if (!isConnection) {
      setShowBanner(true);
    }

    setPrevConnectionState(isConnection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnection]);

  if (!showBanner) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isConnection ? '#21B260' : '#EB5249',
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={isConnection ? connectedImg : disconnectedImg}
          style={styles.connectionImg}
        />
        <Text style={styles.text}>
          {isConnection
            ? 'Connection restored'
            : 'We couldn’t connect to our servers'}
        </Text>
      </View>
      <TouchableOpacity
        hitSlop={16}
        onPress={() => {
          setShowBanner(false);
        }}
      >
        <Image source={closeImg} style={styles.closeImg} tintColor={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default InternetConnectionBanner;
