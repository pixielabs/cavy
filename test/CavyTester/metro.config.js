var path = require('path');

const extraNodeModules = {
  react: path.resolve(__dirname, 'node_modules/react'),
};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules
  },
};
