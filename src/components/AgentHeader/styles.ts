import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 16,
  },
  status: {
    borderRadius: 99,
    width: 14,
    height: 14,
    position: 'relative',
    left: 32,
    bottom: 10,
    borderWidth: 2,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 99,
  },
  nameText: {
    lineHeight: 16,
    fontWeight: '600',
  },
  roleText: {
    lineHeight: 16,
    fontWeight: '400',
  },
  info: {
    gap: 4,
  },
  activeStatusColor: {
    backgroundColor: '#21B260',
  },
});
export default styles;
