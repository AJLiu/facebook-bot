"use strict";

var keyword = "@thonybot say";

module.exports.keyword = keyword;
module.exports.name = "say";
module.exports.description = `type ${keyword} {message} to make me say something`;

module.exports.run = (api, message) => {

  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.charAt(keyword.length) === ' ') {
      say(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};

function say(api, message) {
  var say = message.body.slice(keyword.length + 1);
  api.sendMessage(say, message.threadID);
}
