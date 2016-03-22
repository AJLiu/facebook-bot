var facebook = require('facebook-chat-api');

var config = require('./config.json');

//Plugins

var pluginlist = {
  giphy: require('./plugins/giphy/plugin.js')
};

facebook({
  email: config.email,
  password: config.password
}, (err, api) => {
  if (err) {
    console.error("Login fail");
    console.error(err);
    return;
  }
  //Plugins
  pluginlist.giphy.run(api);
});
