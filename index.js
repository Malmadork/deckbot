const Discord = require('discord.js');
const botConfig = require("./botconfig.json");
const colors = require('./colors.json');

//require("dotenv/config");
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const token = botConfig.token;
const bot = new Discord.Client({disableEveryone: true});
console.log(`\n<!-- Starting bot... --> \n`);
require("./util/eventHandler")(bot);
//bot.on("ready", () => {
//  console.log(`${bot.user.username} is online`);
//  console.log("Connected as " + bot.user.tag);
//  bot.user.setActivity("with Javascript");
//  console.log(`\n<!-- End of startup --> \n`);
//});


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases  = new Discord.Collection();

fs.readdir(`./commands/`, (err, files) => {
  
  if(err) console.log(err);
  
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("[LOGS] Couldn't find Commands!");
  }
  
  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    //console.log(`Pulled file: ${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name);
    });
  });
});

bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  
  let prefix = botConfig.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let arguments = messageArray.slice(1);
  
  
  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
  if(commandfile) commandfile.run(bot, message, arguments);

  
});

bot.login(process.env.TOKEN);