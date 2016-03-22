"use strict";

var keyword = "@setcolor";

module.exports.keyword = keyword;
module.exports.name = "set-color";
module.exports.description = `type ${keyword} #{hex} to set the chat color`;

module.exports.run = (api, message) => {

  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.length > keyword.length + 1) {
      setcolor(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};

function setcolor(api, message) {
  var color = message.body.slice(keyword.length + 1);
  if (color.charAt(0) != '#')
    color = '#' + color;
  if (color.split('#')[1].length === 3) {
    var split = color.split('');
    color = split[0] + split[1] + split[1] + split[2] + split[2] + split[3] + split[3];
  }
  api.changeThreadColor(color, message.threadID, (err) => {
    api.sendMessage(err, message.threadID);
  });
}
