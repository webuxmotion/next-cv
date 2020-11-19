const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    
    return config;
  },
  env: {
    BASE_URL: isDev ? 'http://localhost:3000/graphql' : 'https://pereverziev.herokuapp.com/graphql'
  }
}
