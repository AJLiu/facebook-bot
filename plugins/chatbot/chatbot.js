"use strict";

var request = require('request');
var xml2js = require('xml2js');
var config = require('../../config.json');

var keyword = "@thonybot";

module.exports.keyword = keyword;
module.exports.name = "chatbot";
module.exports.description = `type ${keyword} {message} to say something to me`;

module.exports.run = (api, message) => {
  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.charAt(keyword.length) === ' ') {
      bot(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};

function bot(api, message) {
  var chat = message.body.slice(keyword.length + 1);
  console.log('Bot recieved: ' + chat);

  request.get('http://www.pandorabots.com/pandora/talk-xml?botid=' + config.botid + '&input=' + encodeURIComponent(chat) + '&custid=' + message.threadID,
    (err, res) => {
      if(err){
        console.log(err);
        return;
      }
      xml2js.parseString(res.body, function(err, res) {
        if(err){
          console.log(err);
          return;
        }
        var reply = res.result.that[0];

        console.log('Replying: ' + reply);
        api.sendMessage({
          body: reply
        }, message.threadID);
      });
    });
}
