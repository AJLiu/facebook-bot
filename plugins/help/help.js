"use strict";

var keyword = "@help";

module.exports.keyword = keyword;
module.exports.name = "help";
module.exports.description = `type ${keyword} {plugin} learn more about that plugin`;

module.exports.run = (api, message, pluginlist) => {

  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.length > keyword.length + 1) {
      findplugin(api, message, pluginlist);
    } else {
      listplugins(api, message, pluginlist);
    }
  }
};

function findplugin(api, message, pluginlist) {
  let query = message.body.slice(keyword.length+1);
  let response = "I couldn't find that plugin";

  for(let plugin in pluginlist){
    if(pluginlist[plugin].name === query)
      response = pluginlist[plugin].description;
  }

  api.sendMessage(response, message.threadID);
}

function listplugins(api, message, pluginlist) {
  let response = "Hi! I am a bot. Here is a list of plugins activated\n";

  for(let plugin in pluginlist){
    response += "  " + pluginlist[plugin].name + "\n";
  }

  response += module.exports.description;

  api.sendMessage(response, message.threadID);
}
