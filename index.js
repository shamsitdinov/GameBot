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
            return bot.sendMessage(chatId, `Good morning ${message.chat.first_name}`)
        }
        if (text === '/about') {
            return bot.sendMessage(chatId, `My telegram channel t.me/nodir_dev1`)
        }
        if (text === '/play') {
            await bot.sendMessage(chatId, 'Find a random number')
            return bot.sendMessage(chatId, 'Enter a number 0-9', playOptions)
        }
        if (text === '/again') {
            await bot.sendMessage(chatId, 'Find a random number')
            return bot.sendMessage(chatId, 'Enter a number 0-9', playOptions)
        }
        return bot.sendMessage(chatId, 'Error order')
    })
    bot.on('callback_query', async message => {
        let randomNumber = Math.floor(Math.random() * 10)
        const userNumber = message.data
        const chatId = message.message.chat.id
        console.log(randomNumber)
        if (userNumber == "/again") {
            await bot.sendMessage(chatId, 'Find a random number')
            return bot.sendMessage(chatId, 'Enter a number 0-9', playOptions)
        }
        if (userNumber == randomNumber) {
            return bot.sendMessage(chatId, `Congratulations! Your number is ${userNumber} and random number is ${randomNumber}`, againPlayOptions)
        } else {
            return bot.sendMessage(chatId, `No no! Your number is ${userNumber} and random number is ${randomNumber}`, againPlayOptions)
        }

    })



}
botPlay()

