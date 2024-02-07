import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectionImg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  closeImg: {
    width: 20,
    height: 20,
  },
});
export default styles;
