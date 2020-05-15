export async function hasButtonText(button, expected) {
  const actual = button.props.text;
  if (actual != expected) {
    throw new Error(`Button text is ${actual}, not ${expected}`);
  }
}
