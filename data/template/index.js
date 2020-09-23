let config = require('./config');
const secret = require('./secret');

config = Object.assign(config, secret);

module.exports = {
  config,
};
