import React from 'react';
import { Text } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'Exists';

const testId = `${key}.Element`;

export const Screen = () => {
  const generateTestHook = useCavy();
  return <Text ref={generateTestHook(testId)}>I am text that is present</Text>;
};

export const label = 'spec.exists checks for element';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.press(key);
      await spec.exists(testId);
    })
  );
