import React from 'react'
import { Text } from 'react-native'
import { useCavy, wrap } from 'cavy'

export const key = 'ContainsText';

const testId = `${key}.Element`;
const text = 'I am text';

export const Screen = () => {
  const generateTestHook = useCavy();
  const WrappedText = wrap(Text);
  return <WrappedText ref={generateTestHook(testId)}>{text}</WrappedText>
};

export const label = 'spec.containsText checks text inside an element';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.containsText(testId, text);
    })
  );
