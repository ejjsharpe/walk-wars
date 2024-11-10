import * as Colors from '@/constants/Colors';
import * as Fonts from '@/constants/Fonts';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
export const Input = (props: TextInputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={Colors.paynesGrey}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: Colors.pictonBlue,
    borderWidth: 2,
    borderRadius: 12,
    height: 54,
    padding: 12,
    fontFamily: Fonts.PatrickHandSC,
    fontSize: 20,
    width: '100%',
  },
});
