const defaults = require('./config');

const secret = [{
  gitalk: {
    clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
  },
}];

const config = Object.assign(defaults, secret);

module.exports = {
  config,
};

// debug
console.log(process.env);
