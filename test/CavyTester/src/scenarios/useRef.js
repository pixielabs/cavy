import React, { useRef } from 'react'
import { Button, TextInput } from 'react-native'
import { useCavy } from 'cavy'

export const key = 'UseRef';
const inputId = `${key}.Input`;
const buttonId = `${key}.Button`;

export const Screen = () => {
  const generateTestHook = useCavy();
  const textInput = useRef();
  focusTextInput = () => textInput.current.focus();

  return (
    <>
      <TextInput
        ref={generateTestHook(inputId, textInput)} />
      <Button
        ref={generateTestHook(buttonId)}
        onPress={focusTextInput}
        title='Focus the text input' />
    </>
  );
}

export const label = 'spec.useRef retains functionality of useRef';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      const input = await spec.findComponent(inputId);
      if (input.isFocused()) {
        throw new Error(`Expected input not to be focused, but it is`);
      }
      await spec.press(buttonId);
      if (!input.isFocused()) {
        throw new Error(`Expected input to be focused, but it is not`);
      }
    })
  );
