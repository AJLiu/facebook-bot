# Facebook Bot
My bot for facebook messenger. Add [my bot](https://www.facebook.com/thonybot.giphy) and message him with ```@help``` to get started.

# Running locally
```
$ git clone https://github.com/AJLiu/facebook-bot
$ cd facebook-bot
$ npm install
```
Create a copy of ```config_example.json``` into ```config.json``` and enter in the username and password of a bot facebook account.
```
$ npm start
```

# Making plugins
There is a hello world sample plugin in plugins/_sample. To activate a plugin, ```require``` it in app.js and call the plugin's run function in the api.listen loop.
