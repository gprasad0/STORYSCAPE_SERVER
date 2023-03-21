const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/user.model');
const { addGoogleUser } = require('../controllers/userController');

const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");


//signup
router.post('/signup', async (req, res) => {
    try {
      console.log('req--->', req.body);
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      console.log('user===<', user);
  
      if (user && user.source !== 'google') {
        return res.json({ status: false, message: 'Email already Exists' });
      } else {
        let id = '';
        let name = `${req.body.firstName} ${req.body.lastName}`;
        const currentUser = await addGoogleUser(
          id,
          req.body.email,
          req.body.firstName,
          req.body.lastName,
          name,
          req.body.password,
          'normalLogin'
        );
  
        return res.json({ status: true, message: 'Account Created' });
      }
    } catch (e) {
        console.log("errrrr=>",e)
      res.json('errro');
    }
  });

  
//jwt token
router.route('/login').post(loginLimiter,authController.login)
router.route('/refresh').get(authController.refresh)
router.route('/logout').post(authController.logout)
router.route('/googleOauthSuccess').get(authController.googleAuthSuccess)
//google oauth
router.route('/google').get(
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  router.get(
    '/google/callback',
   
    passport.authenticate('google', {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: '/auth/login/failed',
    })
  );

module.exports = router