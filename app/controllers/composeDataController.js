// import axios from 'axios';
const axios = require('axios');
const TEMPERATURE = require("../helperFunctions/commonConstants.js")
// import { TEMPERATURE } from '../helperFunctions/commonConstants.js';
 const composeDataController = async (req, res) => {
  // res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//   res.cookie('eedeeddssss', "edeed", 
//   {
//     httpOnly: false, //accessible only by web server 
//     secure: false, //https
//     // sameSite: 'None', //cross-site cookie 
//     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT 7days
// }
// )
  // res.send('Cookie have been saved successfully');
  // const token = req.headers['x-access-token']
  // try{
  //   const decoded = jwt.verify(token,'secretKey')
  //   const email = decoded.email
  // }catch(e){

  // }
  // let temperature = TEMPERATURE[req.body.temp];
  // console.log("dyay==>/////",req.body)

  let temperature = TEMPERATURE[req.body.temp];
  console.log("dyay==>/////",req.body)

  let data = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CHATGPT_BEARER_TOKEN}`,
    },
    url: 'https://api.openai.com/v1/completions',
    data: JSON.stringify({
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      max_tokens: 90,
      temperature: temperature,
      n: req.body.outputs,
    }),
  });
  res.json(data.data.choices);
};
// app.get('/setcookie', (req, res) => {
//   res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//   res.send('Cookie have been saved successfully');
// });

module.exports = composeDataController;