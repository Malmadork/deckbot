const botConfig = require("../botconfig.json");
const Discord = require('discord.js');
const colors = require('../colors.json');


module.exports.run = async (bot, message, args) => {
  if(!args[0]){
    let uEmbed = new Discord.RichEmbed()
      .setColor(colors.cyan)
      .setTitle("User Info:")
      //.setDescription("")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.author.username}'s Info:`, message.author.displayAvatarURL)
      .addField("**Username:**", `${message.author.username}`, true)
      .addField("**Discriminator:**", `${message.author.discriminator}`, true)
      .addField("**ID:**", `${message.author.id}`, true)
      .addField("**Status:**", `${message.author.presence.status}`, true)
      .addField("**Created At:**", `${message.author.createdAt}`, true)
      .setFooter(`html.bot | Info`, bot.user.displayAvatarURL);
      
    message.channel.send({embed: uEmbed});
  
  }
  if(args[0]) {
    
    let argUser = args[0];
    let user = 0;
    
    message.guild.members.forEach(member => {
      
      if(argUser == member.user.username) {
        user = member; //console.log(user.user.username);
      }
      
      //console.log(member.user.username);
      //console.log(' - ' + member.user.discriminator);
      
    });
    if(user === 0) {
      message.channel.send(`User '${argUser}' could not be found. Ensure proper spelling and capitalization.`);
      return;
    }
    let cuEmbed = new Discord.RichEmbed()
      .setColor(colors.cyan)
      .setTitle("User Info:")
      //.setDescription("")
      .setThumbnail(user.user.displayAvatarURL)
      .setAuthor(`${user.user.username}'s Info:`, user.user.displayAvatarURL)
      .addField("**Username:**", `${user.user.username}`, true)
      .addField("**Discriminator:**", `${user.user.discriminator}`, true)
      .addField("**ID:**", `${user.user.id}`, true)
      .addField("**Status:**", `${user.user.presence.status}`, true)
      .addField("**Created At:**", `${user.user.createdAt}`, true)
      .setFooter(`html.bot | Output`, bot.user.displayAvatarURL);
    
    message.channel.send({embed: cuEmbed});
  
    
  }
  
  
};

module.exports.config = {
  name: "userinfo",
  aliases: ["ui", "userInfo", "userdesc"],
  usage: "<>userinfo [optional: username]",
  description: "Outputs a user's information. Use their username as an argument. ",
  //noalias: "No Aliases",
  accessibleby: "Members"
};