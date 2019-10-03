const Discord = require('discord.js');
const botConfig = require("../botconfig.json");
const colors = require('../colors.json');
const prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {
  
  if(args[0] == "help") {
    message.channel.send(`Just do ${prefix}help instead.`);
  }
  
  if(args[0]) {
    let command = args[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      var SHembed = new Discord.RichEmbed()
      .setColor(colors.red)
      .setAuthor(`deckbot | HELP`, message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .setDescription(`The bot prefix is: ${prefix}\n\n**Command: **${command.config.name}\n**Description: **${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessible by:** ${command.config.accesibleby || "Members"}\n**Aliases: ** ${command.config.noalias || command.config.aliases}` );
      message.channel.send(SHembed);
    }
  }
  
  if(!args[0]) {
    message.delete();
    let embed = new Discord.RichEmbed()
    .setAuthor('Help Command', message.guild.iconURL)
    .setColor(colors.red)
    .setDescription(`${message.author.username} Check your direct messages!`);
    
    let Sembed = new Discord.RichEmbed()
    .setColor(colors.red)
    .setAuthor('deckbot Help', message.guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTimestamp()
    .setDescription(`These are the available commands for deckbot:\nThe bot prefix is: ${prefix}`)
    .addField(`Commands: `, '```help```', true )
    .setFooter("deckbot | help", bot.user.displayAvatarURL);
    message.channel.send(embed).then(m => m.delete(10000));
    message.author.send(Sembed);
  }
}

module.exports.config = {
  name: "help",
  aliases: ["h", "commands", "cmds"],
  usage: "<>help",
  description: "",
  //noalias: "No Aliases",
  accessibleby: "Members"
}