const Discord = require("discord.js");
const botConfig = require('../botconfig.json');



module.exports = bot => {
  
  let string = `\n - Welcome to deck.bot - \n - The current command for deck.bot is: '${botConfig.prefix}'.\n - deck.bot version: ${botConfig.version} -\n - Server Count: ${bot.guilds.size}`;
  
  console.log(`${bot.user.username} is online`);
  console.log(`Connected as: ${bot.user.tag}`);
  console.log(string);
  //bot.user.setActivity("with Javascript");
  console.log(`\n<!-- End of startup --> \n`);
  
  let statuses = [
      `with Throne of Eldraine`,
      `Magic the Gathering`,
      `Standard`,
      `Modern`,
      `Legacy`
    ];
    //console.log(bot);
  
  
  setInterval(function() {
    
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    
    bot.user.setActivity(status);
    
  }, Math.floor((Math.random() * 100000) + 70000));
};