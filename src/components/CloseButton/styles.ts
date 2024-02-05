import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  line: {
    position: 'absolute',
    height: 2,
    width: 20,
    backgroundColor: 'white',
  },
  line1: {
    transform: [{ rotate: '45deg' }],
  },
  line2: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default styles;
