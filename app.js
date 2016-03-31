"use strict";

var facebook = require('facebook-chat-api');
var fs = require('fs');

var config = require('./config.json');

//Plugins
var help = require('./plugins/help/help.js');
var pluginlist = {
  giphy: require('./plugins/giphy/giphy.js'),
  color: require('./plugins/color/color.js'),
  emoji: require('./plugins/emoji/emoji.js'),
  say: require("./plugins/say/say.js"),
  // remind: require("./plugins/remind/remind.js"),
  chatbot: require("./plugins/chatbot/chatbot.js")
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
      for(let key in pluginlist) {
        pluginlist[key].run(api, message);
      }
      help.run(api, message, pluginlist);
    }
  );
});
