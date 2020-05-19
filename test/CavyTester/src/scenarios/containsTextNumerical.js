import React from 'react';
import { Text } from 'react-native';
import { useCavy, wrap } from 'cavy';

export const key = 'ContainsTextNumerical';

const testId = `${key}.Element`;

export const Screen = () => {
  const generateTestHook = useCavy();
  const WrappedText = wrap(Text);
  return <WrappedText ref={generateTestHook(testId)}>1</WrappedText>
};

export const label = 'spec.containsText checks a number inside an element';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.containsText(testId, '1');
      // Also works passing in a integer:
      await spec.containsText(testId, 1);
    })
  );
