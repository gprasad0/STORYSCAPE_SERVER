var express = require('express');
var rootRouter = express.Router();

var userLogin = require('./auth');
var chatgptData = require('./chatGptRoutes');

rootRouter.use('/auth', userLogin);
rootRouter.use('/api', chatgptData);
// rootRouter.use('/comment', comment);

module.exports = rootRouter;