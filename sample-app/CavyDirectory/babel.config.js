module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
   [ '@wordpress/babel-plugin-import-jsx-pragma', {
     scopeVariable: 'cavyCreateElement',
     scopeVariableFrag: 'Fragment',
     source: 'cavy',
     isDefault: false,
   } ],
   [ '@babel/plugin-transform-react-jsx', {
     pragma: 'cavyCreateElement',
     pragmaFrag: 'Fragment',
   } ],
  ]
};
