import hook from './src/hook';
import Tester from './src/Tester';
import TestHookStore from './src/TestHookStore';
import useCavy from './src/useCavy';
import wrap from './src/wrap';
import cavyCreateElement, { setJSXConfig, Fragment } from './src/cavyCreateElement';

const Cavy = {
  hook,
  Tester,
  TestHookStore,
  useCavy,
  wrap,
  cavyCreateElement,
  setJSXConfig,
  Fragment
};

module.exports = Cavy;
