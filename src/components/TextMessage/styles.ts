import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 4,
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
  text: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
  },
  statusIcon: {
    width: 12,
    height: 12,
  },
});
export default styles;
