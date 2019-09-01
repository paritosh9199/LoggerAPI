var env = process.env.NODE_ENV || 'development';
// env = 'production';

if (env === 'development' || env === 'test'|| env === 'production') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  if(env === 'production'){
    process.env.JWT_SECRET = makeid(32);
    process.env.SECRET1 = makeid(32);
    process.env.SECRET2 = makeid(32);
  }
}
function makeid(len = 6) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len / 2; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = {env,makeid};