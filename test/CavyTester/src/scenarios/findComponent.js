import React from 'react'
import { Button } from 'react-native'
import { useCavy } from 'cavy'

export const key = 'FindComponent';

const testId = `${key}.Element`;
const buttonText = "I'm a button";

export const Screen = () => {
  const generateTestHook = useCavy();

  return (
    <Button
      ref={generateTestHook(testId)}
      onPress={() => {}}
      title={buttonText}
    />
  );
};

export const label = 'spec.findComponent finds the component';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      const button = await spec.findComponent(testId);      
      if (button.props.title !== buttonText) {
        throw new Error('Button text prop is not as expected');
      }
    })
  );