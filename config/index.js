'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const config = {};
const basePath = path.join(__dirname, 'components');

// Require all the files from the components folder and add the imported to a unique configuration object
fs.readdirSync(basePath).forEach(file => {
  const componentConfig = require(path.join(basePath, file));
  Object.assign(config, componentConfig);
});

module.exports = config;
