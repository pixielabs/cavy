import React, { useState } from 'react'
import { Text, TextInput } from 'react-native'
import { useCavy } from 'cavy'

export const key = 'Focus';

const textInputId = `${key}.TextInput`;
const textId = `${key}.Text`;

export const Screen = () => {
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const generateTestHook = useCavy();

  return (
    <>
      <TextInput
        ref={generateTestHook(textInputId)}
        onFocus={() => setShowHiddenMessage(true)}
      />
      {showHiddenMessage && (
        <Text ref={generateTestHook(textId)}>
          I only show up if focus succeeded
        </Text>
      )}
    </>
  );
};

export const label = 'spec.focus focuses component that responds to onFocus';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.notExists(textId);
      await spec.focus(textInputId);
      await spec.exists(textId);
    })
  );
