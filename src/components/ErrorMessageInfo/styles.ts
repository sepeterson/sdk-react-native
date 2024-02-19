import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  touchContainer: {
    paddingVertical: 4,
    paddingRight: 20,
    paddingLeft: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
});
export default styles;
