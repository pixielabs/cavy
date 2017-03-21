import { hook, wrap } from 'cavy';

import GLOBAL from './globals.js';

export function testWrapHook(component) {
  if (GLOBAL.TEST_ENABLED) {
    return hook(wrap(component));
  } else {
    return component;
  }
}

export function testHook(component) {
  if (GLOBAL.TEST_ENABLED) {
    return hook(component);
  } else {
    return component;
  }
}