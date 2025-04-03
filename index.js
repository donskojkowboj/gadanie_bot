const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options');
const token = '7990583927:AAF3XFXD9e4VogeL_Ps91KJoW-IvuEiqA0w';

const bot = new TelegramApi(token, {polling: true});
const chats = {};


bot.setMyCommands([{command: '/start', description: 'первоочередная хуйня'},
    {command: '/info', description: 'для инфы'}, {command: '/game', description: 'brainrot game'}])


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'ща будет игра, число от 0 до 9, угадай')
    const randomNum = Math.floor(Math.random() * 10)
    chats[chatId] = randomNum;
    await bot.sendMessage(chatId, 'Отгадай ебать', gameOptions);
}


const start = async () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/509/656/509656c3-0b65-49bf-a4b1-bb017d285daf/1.webp')
            return bot.sendMessage(chatId, `здесь гадание`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `все еще ${msg.from.first_name}`)
        }

        if (text === '/game') {
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'хуйня, давай другое')
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }

        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `ебать молодчик, верное число — ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `твой ответ — хуита, правильный был ${chats[chatId]}`, againOptions)
        }

    })
}


start();

