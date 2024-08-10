import * as Colors from '@/constants/Colors';
import * as Fonts from '@/constants/Fonts';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
export const Input = ({
  value,
  onChangeText,
  placeholder = 'username',
}: TextInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.placeholderText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    height: 54,
    padding: 12,
    fontFamily: Fonts.PatrickHandSC,
    fontSize: 20,
    width: '100%',
  },
});
