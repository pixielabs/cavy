import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { useCavy } from 'cavy';

export const key = 'ButtonClassComponent';

const buttonId = `${key}.Button`;
const textId = `${key}.Text`;

class ClassButton extends React.Component {
  render() {
    const { title, onPress } = this.props;
    return <Button onPress={onPress} title={title} />;
  }
}

export const Screen = () => {
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const generateTestHook = useCavy();

  return (
    <>
      <ClassButton
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

export const label = 'spec.press presses class component';
export const spec = spec =>
  spec.describe(key, () =>
    spec.it(label, async () => {
      await spec.notExists(textId);
      await spec.press(buttonId);
      await spec.exists(textId);
    })
  );
