import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 4,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  incomingMessage: {
    marginLeft: 20,
    marginRight: '23%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    marginLeft: '23%',
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  textMessage: {
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  image: {
    width: 16,
    height: 15,
  },
});
export default styles;
