const discord = require('discord.js');
const config = require(`${process.cwd()}/config.json`);
const messageEvent = require(`${process.cwd()}/events/messageEvent.js`);
const CommandHandler = require(`${process.cwd()}/commandHandler.js`);
const handler = new CommandHandler();
const guildJoinEvent = require(`${process.cwd()}/events/userGuildJoin.js`);

const bot = new discord.Client();
bot.login(config.token).catch((err)=>{console.log(err)});
bot.on("ready", ()=>{
    console.log("Logged in successfully as "+bot.user.username);
    bot.user.setActivity(`Chrome Point Bot | ${config.prefix}help`)
});

messageEvent.register(bot);
handler.registerCommandsIn(`${config.commandsFolder}`);
messageEvent.handler(handler);
guildJoinEvent.register(bot);

module.exports = {bot, handler};