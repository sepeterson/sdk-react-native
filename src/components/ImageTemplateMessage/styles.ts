import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginLeft: '23%',
    marginRight: 20,
    borderRadius: 12,
    marginVertical: 4,
  },
  incomingMessageContainer: {
    marginLeft: 20,
    marginRight: '23%',
    borderRadius: 12,
    marginVertical: 4,
  },
  imageWithButtons: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    borderRadius: 12,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#263238',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
