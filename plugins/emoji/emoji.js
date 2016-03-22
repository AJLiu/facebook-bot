"use strict";

var keyword = "@setemoji";

module.exports.keyword = keyword;
module.exports.name = "set-emoji";
module.exports.description = `type ${keyword} {emoji} to set the chat emoji`;

module.exports.run = (api, message) => {

  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.length > keyword.length + 1) {
      setemoji(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};

function setemoji(api, message) {
  var emoji = message.body.slice(keyword.length + 1);

  api.changeThreadEmoji(emoji, message.threadID, (err) => {
    api.sendMessage(err, message.threadID);
  });

}
