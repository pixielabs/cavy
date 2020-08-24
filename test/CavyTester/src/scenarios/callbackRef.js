import React, { Component } from 'react';
import { Button, TextInput } from 'react-native';
import { hook } from 'cavy';

export const key = 'CallbackRef';
const inputId = `${key}.Input`;
const buttonId = `${key}.Button`;

class CallbackRefTest extends Component {
  constructor(props) {
    super(props);
    this.setTextInputRef = this.setTextInputRef.bind(this)
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  setTextInputRef(element) {
    this.textInput = element;
  }

  focusTextInput() {
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

export const Screen = hook(CallbackRefTest);

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
