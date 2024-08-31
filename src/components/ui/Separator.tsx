import { StyleSheet, View } from 'react-native';

export const Separator = () => {
  return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#fff',
    opacity: 0.4,
  },
});
