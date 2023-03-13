// import axios from 'axios';
const axios = require('axios');
const User = require('../models/user.model')

const TEMPERATURE = require("../helperFunctions/commonConstants.js")

 const composeDataController = async (req, res) => {

  try{
    let email = req.email
   let temperature = TEMPERATURE[req.body.temp];
    const foundUser = await User.findOne({ email }).exec()
     
   let userIncrement = await User.findOneAndUpdate({email:email},  { $inc: { apiCount: -1,  }  },{
    new: true
})
console.log("userIncrement===>",userIncrement)

if(userIncrement.apiCount > 0){
let temperature = TEMPERATURE[req.body.temp];
 
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
   res.json({status:200,data:chatgptdata.data.choices,token:userIncrement.apiCount});
  // res.json({status:200,message:"Token limit"});

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