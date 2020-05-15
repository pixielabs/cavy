import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'FillIn';

const textInputId = `${key}.TextInput`;
const textId = `${key}.Text`;
const textText = 'text';

export const Screen = () => {
  const [text, setText] = useState('');
  const generateTestHook = useCavy();

  return (
    <>
      <TextInput
        ref={generateTestHook(textInputId)}
        value={text}
        onChangeText={value => setText(value)}
      />
      {text === textText && (
        <Text ref={generateTestHook(textId)}>
          I only show up if fillIn succeeded
        </Text>
      )}
    </>
  );
};

export const label = 'spec.fillIn fills in a component that responds to onChangeText';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.notExists(textId);
      await spec.fillIn(textInputId, textText);
      await spec.exists(textId);
    })
  );
