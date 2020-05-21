import React from 'react';
import { Text } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'ContainsTextUnwrapped';

const testId = `${key}.Element`;
const text = 'I am text';

export const Screen = () => {
  const generateTestHook = useCavy();
  return <Text ref={generateTestHook(testId)}>{text}</Text>
};

export const label = 'spec.containsText raises a nice error if used on unwrapped <Text>';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      try {
        await spec.containsText(testId, text);  
      } catch (error) {
        if (error.name === 'UnwrappedComponentError') return;
        throw error;
      }
    })
  );
