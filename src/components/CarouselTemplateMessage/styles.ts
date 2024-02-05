import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 8,
    marginVertical: 4,
    paddingHorizontal: 20,
  },
  itemContainer: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
  },
  titlesContainer: {
    margin: 12,
    gap: 4,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
});
export default styles;
