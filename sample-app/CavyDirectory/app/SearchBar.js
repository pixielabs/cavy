import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useCavy, wrap } from 'cavy';

export default function SearchBar({ onChange }) {
  const [value, setValue] = useState('');
  const generateTestHook = useCavy();
  const TestableTextInput = wrap(TextInput);

  const onChangeText = (value) => {
    setValue(value);
    onChange(value);
  }

  return (
    <View style={styles.container}>
      <TestableTextInput
        ref={generateTestHook('SearchBar.TextInput')}
        style={styles.input}
        placeholder='Search'
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C9C9CE',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
});
