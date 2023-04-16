// import axios from 'axios';
const axios = require('axios');
const User = require('../models/user.model')

const TEMPERATURE = require("../helperFunctions/commonConstants.js")

 const composeDataController = async (req, res) => {

  try{
    // let user = req.user
  //  let temperature = TEMPERATURE[req.body.temp];
    // const foundUser = await User.findOne({ id:user }).exec()
    // console.log("email===>req.body",foundUser , req.body)
     
  //  let userIncrement = await User.findOneAndUpdate({id:103255388566489326133}, { apiCount: { $inc: -1 } })
//     await User.findOneAndUpdate({id:user}, { apiCount: req.body.apiCount - 1 },{
//     new: true
// })
// console.log("userIncrement==>",userIncrement)

if(true){

// let temperature = req.body.temp ? TEMPERATURE[req.body.temp] : TEMPERATURE["High"];
// console.log("userIncrement===>123",userIncrement,req.body.prompt,req.body.outputs,temperature)
 
  //  let chatgptdata = await axios({
  //    method: 'post',
  //    headers: {
  //      'Content-Type': 'application/json',
  //      Authorization: `Bearer ${process.env.CHATGPT_BEARER_TOKEN}`,
  //    },
  //    url: 'https://api.openai.com/v1/completions',
  //    data: JSON.stringify({
  //      model: 'text-davinci-003',
  //      prompt: req.body.prompt,
  //      max_tokens: 90,
  //      temperature: temperature,
  //      n: req.body.outputs == 0? 1 : req.body.outputs,
  //    }),
  //  });
  //  res.json({status:200,data:chatgptdata.data.choices,token:userIncrement.apiCount});
  res.json({status:200,message:"Token limit"});

}else{
  res.json({status:500,message:"Token limit exceeded"});

}
   
  }catch(e){
    console.log("e==>",e)
  }
   
};
// app.get('/setcookie', (req, res) => {
//   res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//   res.send('Cookie have been saved successfully');
// });

module.exports = composeDataController;