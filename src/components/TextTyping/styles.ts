import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 41,
    marginVertical: 2,
    marginHorizontal: 20,
  },
  content: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  dots: {
    flex: 1,
    marginVertical: 13,
  },
  dotPosition: {
    position: 'absolute',
  },
});
export default styles;
