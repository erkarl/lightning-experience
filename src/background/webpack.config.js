const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../../extension/dist'),
    filename: 'lightning-experience-background.bundle.js'
  },
};
