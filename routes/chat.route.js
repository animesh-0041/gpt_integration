// const express=require("express")
// const chatRoute=express.Router()
// require('dotenv').config()
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });



// const { Configuration, OpenAIApi } =require("openai");
// const configuration = new Configuration({
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);





// chatRoute.post('/question',(req,res)=>{
//     const question=req.body.question
//     try {
//          openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: question,
//             max_tokens: 4000,
//             temperature: 0,
//           }).then((re)=>{
//           res.send(re.data.choices[0].text);
//           })
//     } catch (error) {
//         res.send(error)
//     }
// })

// module.exports={
//     chatRoute
// }

const express = require("express");
const chatRoute = express.Router();
require('dotenv').config();
const readline = require('readline');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion() {
  const question = await promptUser('Enter your question: ');

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    });

    console.log('Response:', response.data.choices[0].text);

    // Ask if the user wants to continue
    const shouldContinue = await promptUser('Do you want to continue? (yes/no): ');

    if (shouldContinue.toLowerCase() === 'yes') {
      askQuestion();
    } else {
      console.log('Conversation ended. Goodbye!');
      rl.close();
    }
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    rl.close();
  }
}

function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

//chatRoute.post('/question', (req, res) => {
  console.log('Please provide input through the CLI.');
  askQuestion();
//});

module.exports = {
  chatRoute
};
