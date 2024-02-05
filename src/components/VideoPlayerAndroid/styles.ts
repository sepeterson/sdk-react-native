import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#212121',
  },
  closeButton: {
    gap: 12,
    position: 'absolute',
    left: 35,
    top: 20,
    flexDirection: 'row',
    maxWidth: 100,
    height: 40,
    zIndex: 2,
    alignItems: 'center',
  },
  closeImage: {
    width: 12,
    height: 20,
  },
  closeText: {
    fontSize: 15,
    color: '#fff',
  },
  video: {
    flex: 1,
  },
});

export default styles;
