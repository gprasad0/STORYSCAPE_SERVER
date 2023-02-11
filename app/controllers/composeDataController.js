import axios from 'axios';
import { TEMPERATURE } from '../helperFunctions/commonConstants.js';
export const composeDataController = async (req, res) => {
  let temperature = TEMPERATURE[req.body.temp];
  console.log("dyay==>/////",req.body.temp,TEMPERATURE,temperature)

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
