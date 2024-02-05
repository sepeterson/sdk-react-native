import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { useColors } from '../../hooks/colors';
import styles from './styles';
interface Props {
  value: string | undefined;
  onChangeText: (text: string) => void | undefined;
  onSend: () => void;
  scrollToEnd: () => void;
}

const NewMessage = ({ onChangeText, value, onSend, scrollToEnd }: Props) => {
  const { colors } = useColors();
  const showSendButton = !!(value && value.length > 0);
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      key={'newMessage'}
      style={[
        styles.container,
        {
          borderColor: colors.separatorColor,
        },
      ]}
    >
      <View key={'input'} style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          onSubmitEditing={value ? onSend : undefined}
          onChangeText={onChangeText}
          value={value}
          placeholder={'Your message...'}
          placeholderTextColor={colors.placeholderTextColor}
          style={{ color: colors.newMessageTextColor }}
          onFocus={() => {
            setTimeout(() => {
              scrollToEnd();
            }, 200);
          }}
        />
      </View>

      <View style={styles.sendContainer}>
        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={onSend}
          disabled={!showSendButton}
          hitSlop={10}
        >
          <Image
            source={require('../../assets/send.png')}
            style={styles.sendImg}
            tintColor={
              showSendButton
                ? colors.sendTextButtonColor
                : colors.sendTextButtonDisabledColor
            }
          />
        </TouchableOpacity>
      </View>
      {/*<View key={'sendAndAttachment'} style={styles.attachmentsContainer}>*/}
      {/*  <TouchableOpacity style={styles.attachmentButton}>*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/attachment.png')}*/}
      {/*      style={styles.attachmentImg}*/}
      {/*      tintColor={colors.greyDark}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.attachmentButton}>*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/photo.png')}*/}
      {/*      style={styles.attachmentImg}*/}
      {/*      tintColor={colors.greyDark}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
};

export default NewMessage;
