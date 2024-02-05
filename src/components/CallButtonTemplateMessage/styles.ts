import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
    marginLeft: 20,
    marginRight: '23%',
    gap: 8,
  },
  message: {
    fontSize: 15,
    lineHeight: 20,
  },
  dataContainer: {
    marginTop: 4,
    marginLeft: 20,
    marginRight: '23%',
    alignSelf: 'flex-start',
  },
  data: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  textButton: {
    textAlign: 'center',
  },
});
export default styles;
