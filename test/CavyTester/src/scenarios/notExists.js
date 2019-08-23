import React from 'react';
import { Button, Text, View } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'NotExists';

const testId = `${key}.element`;

export const Screen = () => {
  const generateTestHook = useCavy();

  return (
    <>
      <Text>I am text that is present</Text>
      {false && (
        <Text ref={generateTestHook(testId)}>
          I am text that is *not* present
        </Text>
      )}
    </>
  );
};

export const label = "spec.notExists checks for an element's absence";
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.notExists(testId);
    })
  );
