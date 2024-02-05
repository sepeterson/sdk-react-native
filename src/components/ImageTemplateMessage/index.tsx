import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import type { ImageTemplatePayload } from '../../types/queries';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useColors } from '../../hooks/colors';
import ActionButtonList from '../AcitonButtonList';
import styles from './styles';

interface Props {
  payload: ImageTemplatePayload;
  isUser: boolean;
  style?: ViewStyle;
}
const screenWidth = Dimensions.get('screen').width;

const ImageTemplateMessage = ({ payload, isUser, style }: Props) => {
  const { colors } = useColors();
  const [isReady, setIsReady] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [shouldCenter, setShouldCenter] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const showButtons = payload.buttons.length > 0;

  const getWindowWidth = useMemo(() => {
    let windowWidth = 0;
    if (style?.width) {
      if (typeof style.width === 'string') {
        windowWidth = (parseFloat(style.width) / 100) * screenWidth;
      } else {
        windowWidth = screenWidth;
      }
    } else {
      windowWidth = Dimensions.get('window').width;
    }
    return windowWidth;
  }, [style]);

  useEffect(() => {
    const width = getWindowWidth - Math.round(getWindowWidth * 0.23 + 20);
    setImgWidth(width);
    if (payload.dimensions?.height && payload.dimensions?.width) {
      const imgRatio = payload.dimensions.height / payload.dimensions.width;
      const height = width * imgRatio;
      setImgHeight(height);
      setIsReady(true);
    } else {
      Image.getSize(
        payload.url,
        (w, h) => {
          const imgRatio = h / w;
          const height = width * imgRatio;
          setImgHeight(height);
          setIsReady(true);
        },
        () => {
          setImgHeight(300);
          setIsReady(true);
          setShouldCenter(true);
        }
      );
    }
  }, [getWindowWidth, payload]);

  return isReady ? (
    <View
      style={[
        isUser ? styles.userMessageContainer : styles.incomingMessageContainer,
        {
          backgroundColor: isUser
            ? colors.userMessageBackgroundColor
            : colors.incomingMessageBackgroundColor,
          width: imgWidth,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setFullScreen(true);
        }}
      >
        <Image
          source={{ uri: payload.url, cache: 'force-cache' }}
          resizeMode={shouldCenter ? 'center' : 'cover'}
          style={[
            showButtons ? styles.imageWithButtons : styles.image,
            {
              width: imgWidth,
              height: imgHeight,
            },
          ]}
        />
        {showButtons && <ActionButtonList buttons={payload.buttons} />}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={fullScreen}
        onRequestClose={() => setFullScreen(false)}
      >
        <SafeAreaView style={styles.fullscreenContainer}>
          <TouchableWithoutFeedback onPress={() => setFullScreen(false)}>
            <Image
              source={{ uri: payload.url, cache: 'force-cache' }}
              resizeMode={'contain'}
              style={styles.fullscreenImage}
            />
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    </View>
  ) : null;
};

export default memo(ImageTemplateMessage);
