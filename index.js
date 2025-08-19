import TelegramBot from 'node-telegram-bot-api';
import { playOptions, againPlayOptions } from './options.js'
import "dotenv/config"
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
bot.setMyCommands([
    { command: '/start', description: 'Boshlash' },
    { command: '/about', description: 'Biz haqimizda' },
    { command: '/play', description: "O'yin o'ynash" }
])

function botPlay() {

    bot.on('message', async message => {
        const chatId = message.chat.id
        const text = message.text
        if (text === '/start') {
            await bot.sendSticker(chatId, "https://cdn2.combot.org/zane_fozol_0_9/webp/26xf09fa4a0.webp")
            return bot.sendMessage(chatId, `Salom  ${message.chat.first_name}`)
        }
        if (text === '/about') {
            return bot.sendMessage(chatId, `My telegram channel t.me/nodir_dev1`)
        }
        if (text === '/play') {
            await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
            return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
        }
        if (text === '/again') {
            await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
            return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
        }
        return bot.sendMessage(chatId, "Xato o'yladingiz ! 😩")
    })
    bot.on('callback_query', async message => {
        let randomNumber = Math.floor(Math.random() * 10)
        const userNumber = message.data
        const chatId = message.message.chat.id
        console.log(randomNumber)
        if (userNumber == "/again") {
            await bot.sendMessage(chatId, 'Tasodifiy raqamni toping')
            return bot.sendMessage(chatId, 'Raqamini kiriting 0-9', playOptions)
        }
        if (userNumber == randomNumber) {
            await bot.sendMessage(chatId, `Tabriklaymiz! Sizning raqamingiz ${userNumber} va tasodifiy son ( ${randomNumber} )`, againPlayOptions)
            await bot.sendSticker(chatId,"https://cdn2.combot.org/stoyakronaldaxd/webp/5xf09f918e.webp")
        } else {
            return bot.sendMessage(chatId, `Yo'q, yo'q! Sizning raqamingiz ${userNumber} va tasodifiy son ( ${randomNumber} ) edi`, againPlayOptions)
        }

    })



}
botPlay()

