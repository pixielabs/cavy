import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'FillIn';

const testId = `${key}.TextInput`;

export const Screen = () => {
  const [text, setText] = useState('');
  const generateTestHook = useCavy();

  return (
    <>
      <TextInput
        ref={generateTestHook(testId)}
        value={text}
        onChangeText={value => setText(value)}
      />
    </>
  );
};

export const label = 'spec.fillIn fills in a component that responds to onChangeText';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.fillIn(testId, 'text');
    })
  );
