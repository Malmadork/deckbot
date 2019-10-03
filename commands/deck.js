const botConfig = require("../botconfig.json");
const Discord = require('discord.js');
const colors = require('../colors.json');


module.exports.run = async (bot, message, args) => {
  //message.delete();
  let site = 'Deck';
  let url;
  if(args[0].includes('https://www.mtggoldfish.com')) {
    site = 'MTG Goldfish';
    url = args[0];
  }
  let bEmbed = new Discord.RichEmbed()
    .setColor(colors.blueviolet)
    .setTitle("Deck:")
    //.setDescription("")
    .setThumbnail(bot.user.displayAvatarURL)
    .setAuthor(`Decklist:`, bot.user.displayAvatarURL)
    //.addField("**This command is coming soon**")
    .addField("**Link:**", '[' + site + '](' + url + ')', true)
    //.addField("**Server Count:**", `${bot.guilds.size}`, true)
    //.addField("**Command: **", `${botConfig.prefix}`, true)
    .setFooter(`deckbot | Info`, bot.user.displayAvatarURL);
    message.channel.send({embed: bEmbed});
};

module.exports.config = {
  name: "deck",
  aliases: ["d", "mtggoldfish", "tappedout", "dick"],
  usage: ">deck",
  description: "Outputs deck information",
  //noalias: "No Aliases",
  accessibleby: "Members"
};