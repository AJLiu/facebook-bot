"use strict";

var keyword = "@hey!"; //command to activate plugin from chat

module.exports.keyword = keyword;
module.exports.name = "helloworld"; //name of plugin
module.exports.description =  `type ${keyword} to say hello world`; //explanation of plugin

module.exports.run = (api, message) => {
  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.charAt(keyword.length) === ' ') {
      helloworld(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};


//========================================================
// Helper functions
//========================================================

function helloworld(api, message) {
  api.sendMessage("hello world", message.threadID);
}
