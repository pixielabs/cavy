import React, { useState } from 'react'
import { Button, Text } from 'react-native'
import { useCavy, wrap } from 'cavy'

export const key = 'ButtonFunctionComponent';

const buttonId = `${key}.Button`;
const textId = `${key}.Text`;

const FunctionButton = ({ onPress, title }) => (
  <Button onPress={onPress} title={title} />
);

const WrappedFunctionButton = wrap(FunctionButton);

export const Screen = () => {
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const generateTestHook = useCavy();

  return (
    <>
      <WrappedFunctionButton
        ref={generateTestHook(buttonId)}
        title="Click to show message"
        onPress={() => setShowHiddenMessage(true)}
      />
      {showHiddenMessage && (
        <Text ref={generateTestHook(textId)}>
          I only show up when you press the button
        </Text>
      )}
    </>
  );
};

export const label = 'spec.press presses function component';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.notExists(textId);
      await spec.press(buttonId);
      await spec.exists(textId);
    })
  );
