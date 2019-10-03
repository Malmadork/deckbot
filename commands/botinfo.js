const botConfig = require("../botconfig.json");
const Discord = require('discord.js');
const colors = require('../colors.json');


module.exports.run = async (bot, message, args) => {
  let bEmbed = new Discord.RichEmbed()
    .setColor(colors.blueviolet)
    .setTitle("Bot Info:")
    //.setDescription("")
    .setThumbnail(bot.user.displayAvatarURL)
    .setAuthor(`${bot.user.username}'s Info`, bot.user.displayAvatarURL)
    .addField("**Bot Name:**", `${bot.user.username}`, true)
    .addField("**Version:**", `${botConfig.version}`, true)
    .addField("**Server Count:**", `${bot.guilds.size}`, true)
    .addField("**Command: **", `${botConfig.prefix}`, true)
    .setFooter(`deckbot | Info`, bot.user.displayAvatarURL);
    message.channel.send({embed: bEmbed});
};

module.exports.config = {
  name: "botinfo",
  aliases: ["bi", "botInfo", "html.bot", "botDesc"],
  usage: "<>botinfo",
  description: "Outputs bot information",
  //noalias: "No Aliases",
  accessibleby: "Members"
};