import React, { useRef } from 'react';
import { Button, TextInput } from 'react-native';
import { useCavy, hook } from 'cavy';

export const key = 'CallbackRef';
const inputId = `${key}.Input`;
const buttonId = `${key}.Button`;

class CreateRefTest extends React.Component {
  setTextInputRef = (element) => {
    this.textInput = element;
  }
  focusTextInput = () => {
    this.textInput.focus();
  }

  render() {
    const { generateTestHook } = this.props;
    return (
      <>
        <TextInput
          ref={generateTestHook(inputId, this.setTextInputRef)} />
        <Button
          ref={generateTestHook(buttonId)}
          onPress={this.focusTextInput}
          title='Focus the text input' />
      </>
    );
  }
}

export const Screen = hook(CreateRefTest);

export const label = 'spec.callbackRef retains functionality of a callback ref';
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
