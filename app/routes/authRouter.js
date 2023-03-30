const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');
const { addGoogleUser } = require('../controllers/userController');
const router = express.Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfuly Logged In',
      use: req.user,
      // cookies : req.cookies,
      // jwt
    });
  } else {
    res.status(403).json({
      error: true,
      message: 'Not Authorized',
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message:
      'Something went wrong with the authentication. Please revisit the login page',
  });
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  // (req,res)=>{
  //     res.json("data ==>")
  // }
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/login/failed',
  })
);
// router.get('/logout', (req, res) => {
//   req.logOut();
//   res.redirect(process.env.CLIENT_URL);
// });

router.post('/register', async (req, res) => {
  try {
    const user = await UserModel.create({
      name: 'Guru@gnail.com',
      email: 'gur',
      password: 'ded',
    });
    res.json('login');
  } catch (e) {
    res.json('errro');
  }
});

router.post('/login', async (req, res) => {
    console.log("req.body==>",req.body)
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if(user){
    }
    // console.log('user===<', user);
    // if (user) {
    //   const token = jwt.sign(
    //     { name: 'Guru@gnail.com', email: 'gur' },
    //     process.env.JWT_SECRET_KEY
    //   );
    //   return res.json({ status: 'ok', user: token });
    // } else {
    //   return res.json({ status: 'error', user: false });
    // }
  } catch (e) {
    res.json('errro');
  }
});

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

module.exports = router;
