// This configuration is to support a test build of the CavyDirectory app,
// where you want to test a local version of cavy (in the parent directory)
// instead of the published one.
//

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const path = require('path');

 const extraNodeModules = {
   'react': path.resolve(__dirname, "node_modules/react")
 };

 const watchFolders = [
   path.resolve(__dirname, "../../")
 ];

module.exports = {
  watchFolders,
  resolver: {
    extraNodeModules
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
