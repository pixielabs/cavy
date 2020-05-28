import React from 'react';

export const key = 'TaggingSingleTest';

export const Screen = () => {
  return <></>;
};

export const label = 'adding a tag to an `it` block filters the test';
export const spec = spec =>
  spec.describe(key, () => {
    spec.it(label, async () => {
      throw new Error('This test should not run!');
    })
  }, 'dontRun');