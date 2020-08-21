import React, { useRef } from 'react';
import { Button, TextInput } from 'react-native';
import { useCavy, hook } from 'cavy';

export const key = 'CreateRef';
const inputId = `${key}.Input`;
const buttonId = `${key}.Button`;

class CreateRefTest extends React.Component {
  textInput = React.createRef();
  focusTextInput = () => {
    this.textInput.current.focus();
  };

  render() {
    const { generateTestHook } = this.props;
    return (
      <>
        <TextInput
          ref={generateTestHook(inputId, this.textInput)} />
        <Button
          ref={generateTestHook(buttonId)}
          onPress={this.focusTextInput}
          title='Focus the text input' />
      </>
    );
  }
}

export const Screen = hook(CreateRefTest);

export const label = 'spec.createRef retains functionality of createRef';
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
