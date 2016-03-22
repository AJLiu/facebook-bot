"use strict";

var request = require('request');
var fs = require('fs');
var config = require('../../config.json');

var keyword = "@giphy";

module.exports.keyword = keyword;
module.exports.name = "giphy";
module.exports.description = `type ${keyword} [keywords] to get a random gif matching the keywords`;

module.exports.run = (api, message) => {

  if (message.body.slice(0, keyword.length) === keyword) {
    if (message.body.length > keyword.length + 1) {
      sendgiphy(api, message);
    } else {
      api.sendMessage(module.exports.description, message.threadID);
    }
  }
};

function sendgiphy(api, message) {
  getgiphy(message, function callback(err, message) {
    if (err) {
      api.sendMessage(err, message.threadID);
      return console.error(err);
    }

    request.get(message.url).pipe(fs.createWriteStream('gifs/' + message.timestamp + '.gif').on('close', function callback(err) {
      if (err) {
        throw err;
      }
      api.sendMessage({
        attachment: fs.createReadStream('gifs/' + message.timestamp + '.gif')
      }, message.threadID);
    }));

  });
}

function getgiphy(message, callback) {
  request.get({
    url: 'http://api.giphy.com/v1/gifs/translate',
    qs: {
      s: message.body.slice(keyword.length+1).replace(" ", "+"),
      api_key: config.giphy
    }
  }, function(error, response, body) {
    try {
      message.url = JSON.parse(body).data.images.original.url;
      console.log(message.body.slice(7).replace(" ", "+") + " : " + message.url);
      callback(error, message);
    } catch (err) {
      callback("Giphy could not match", message);
    }
  });
}
