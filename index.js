const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT,{polling:true}); 
// polling true means continually checking for response
bot.on('message'  ,(option)=>{
    if(option.text!=='/joke'){
        console.log("Message is received");
        console.log(option);
        bot.sendMessage(option.chat.id,"Hello how can i help you?")// give reponse as chat
    }   
})
// this event will triger whenever a message is received 
// this option so many thing observe carefully

// Now we want to respond back with a joke when someone request a /joke

bot.onText(/\/joke/,async (option)=>{
    const response = await axios.get('http://www.official-joke-api.appspot.com/random_joke');
    // response has data property to access requested data
    console.log(response.data);
    const setup = response.data.setup;
    const punchLine = response.data.punchline;
    bot.sendMessage(option.chat.id, setup+" , "+punchLine);
})
