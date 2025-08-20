// import TelegramBot from 'node-telegram-bot-api';
// import { playOptions, againPlayOptions } from './options.js'
// import "dotenv/config"
// const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
// bot.setMyCommands([
//     { command: '/start', description: 'Boshlash' },
//     { command: '/about', description: 'Biz haqimizda' },
//     { command: '/play', description: "O'yin o'ynash" }
// ])

// function botPlay() {

//     bot.on('message', async message => {
//         const chatId = message.chat.id
//         const text = message.text
//         if (text === '/start') {
//             await bot.sendSticker(chatId, "https://cdn2.combot.org/zane_fozol_0_9/webp/26xf09fa4a0.webp")
//             return bot.sendMessage(chatId, `Salom  ${message.chat.first_name}`)
//         }
//         if (text === '/about') {
//             return bot.sendMessage(chatId, `My telegram channel t.me/nodir_dev1`)
//         }
//         if (text === '/play') {
//             await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
//             return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
//         }
//         if (text === '/again') {
//             await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
//             return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
//         }
//         return bot.sendMessage(chatId, "Xato o'yladingiz ! 😩")
//     })
//     bot.on('callback_query', async message => {
//         let randomNumber = Math.floor(Math.random() * 10)
//         const userNumber = message.data
//         const chatId = message.message.chat.id
//         console.log(randomNumber)
//         if (userNumber == "/again") {
//             await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
//             return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
//         }
//         if (userNumber == randomNumber) {
//             await bot.sendMessage(chatId, `Tabriklaymiz! Sizning raqamingiz ${userNumber} va tasodifiy son ( ${randomNumber} )`, againPlayOptions)
//             await bot.sendSticker(chatId,"https://cdn2.combot.org/stoyakronaldaxd/webp/5xf09f918e.webp")
//         } else {
//             return bot.sendMessage(chatId, `Yo'q, yo'q! Sizning raqamingiz ${userNumber} va tasodifiy son ( ${randomNumber} ) edi`, againPlayOptions)
//         }

//     })



// }
// botPlay()





import express from "express";
import TelegramBot from "node-telegram-bot-api";
import { playOptions, againPlayOptions } from "./options.js";
import "dotenv/config"; 

const app = express();
const PORT = process.env.PORT || 3000;

// Botni webhook rejimida ishlatamiz
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN,{polling:false});
bot.setWebHook(`${process.env.WEBHOOK_URL}/bot${process.env.TELEGRAM_TOKEN}`);

app.use(express.json());

// Telegram’dan keladigan update’larni qabul qilish
app.post(`/bot${process.env.TELEGRAM_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 🔹 Bot komandalarini sozlash 
bot.setMyCommands([
  { command: "/start", description: "Boshlash" },
  { command: "/about", description: "Biz haqimizda" },
  { command: "/play", description: "O'yin o'ynash" },
  { command: "/again", description: "Qaytadan o'ynash" },
]);

const opts = {
  reply_to_message_id: msg.message_id,
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    keyboard: [['Namoz vaqtlari']]
  }
};




// 🔹 Bot logikasi
function botPlay() {
  bot.on("message", async (message) => {
    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://cdn2.combot.org/zane_fozol_0_9/webp/26xf09fa4a0.webp"
      );
      return bot.sendMessage(chatId, `Salom ${message.chat.first_name} 🎱 O'yin o'ynash uchun bosing 👇🏻`,opts);
    }



    if (text === "/about") {
      return bot.sendMessage(chatId, `Mening profilim 👉 t.me/nodir_dev1`);
    }

    if (text === "/play" || text === "/again") {
      await bot.sendMessage(chatId, "Tasodifiy raqamni toping");
      return bot.sendMessage(chatId, "Raqamini kiriting 0-9", playOptions);
    }

    return bot.sendMessage(chatId, "Tugmadan foydalaning ! 😩");
  });

  bot.on("callback_query", async (message) => {
    const randomNumber = Math.floor(Math.random() * 10);
    const userNumber = message.data; 
    const chatId = message.message.chat.id;

    console.log(`Random: ${randomNumber}, User: ${userNumber}`);

    if (userNumber === "/again") {
      await bot.sendMessage(chatId, "Tasodifiy raqamni toping");
      return bot.sendMessage(chatId, "Raqamini kiriting 0-9", playOptions);
    }

    if (userNumber == randomNumber) {
      await bot.sendMessage(
        chatId,
        `🎉 Tabriklaymiz! Sizning raqamingiz ${userNumber} ✅, tasodifiy son esa (${randomNumber})`,
        againPlayOptions
      );
      await bot.sendSticker(
        chatId,
        "https://cdn2.combot.org/stoyakronaldaxd/webp/5xf09f918e.webp"
      );
    } else {
      return bot.sendMessage(
        chatId,
        `❌ Yo‘q! Siz ${userNumber} ni tanladingiz, tasodifiy son esa (${randomNumber}) edi`,
        againPlayOptions
      );
    }
  });
}

botPlay();

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});







