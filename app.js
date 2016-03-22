"use strict";

var facebook = require('facebook-chat-api');
var fs = require('fs');

var config = require('./config.json');

//Plugins
var pluginlist = {
  giphy: require('./plugins/giphy/giphy.js'),
  color: require('./plugins/color/color.js'),
  emoji: require('./plugins/emoji/emoji.js'),
  say: require("./plugins/say/say.js"),
  chatbot: require("./plugins/chatbot/chatbot.js"),
  remind: require("./plugins/remind/remind.js"),
  snap: require("./plugins/snap/snap.js"),
  delete: require("./plugins/delete/delete.js"),
  help: require('./plugins/help/help.js')
};

if (!fs.existsSync('gifs')) {
  fs.mkdirSync('gifs');
}

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
  api.listen(
    (err, message) => {
      pluginlist.giphy.run(api, message);
      pluginlist.color.run(api, message);
      pluginlist.emoji.run(api, message);
      pluginlist.say.run(api,message);
      pluginlist.help.run(api, message, pluginlist);
    }
  );
});
