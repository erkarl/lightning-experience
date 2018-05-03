const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../../extension/dist'),
    filename: 'lightning-experience-background.bundle.js'
  },
};
