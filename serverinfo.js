const botConfig = require("../botconfig.json");
const Discord = require('discord.js');
const colors = require('../colors.json');


module.exports.run = async (bot, message, args) => {
  let sEmbed = new Discord.RichEmbed()
    .setColor(colors.cyan)
    .setTitle("Server Info:")
    //.setDescription("")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Guild Name:**", `${message.guild.name}`, true)
    .addField("**Guild Owner:**", `${message.guild.owner}`, true)
    .addField("**Member Count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.size}`, true)
    .setFooter(`html.bot | Info`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
};

module.exports.config = {
  name: "serverinfo",
  aliases: ["si", "serverInfo", "serverdesc"],
  usage: "<>serverinfo",
  description: "Outputs server information",
  //noalias: "No Aliases",
  accessibleby: "Members"
};