var express = require('express');
var rootRouter = express.Router();

var userLogin = require('./authRoutes');
var chatgptData = require('./chatGptRouter');

rootRouter.use('/auth', userLogin);
rootRouter.use('/api', chatgptData);
// rootRouter.use('/comment', comment);

module.exports = rootRouter;

//for every api call we need to make an authorization call