const Discord = require("discord.js");
const botConfig = require("../botconfig.json");
const colors = require("../colors.json");


module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You do not have permission to use this command.");
  
  if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I do not have permissions to add roles!")
  
  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mutee) return message.channel.send("Please supply a user to be muted!");
  
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason given";
  
  let muterole = message.guild.roles.find(r => r.name === "Muted");
  if(!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#514f48",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    }
    catch(e) {
      console.log(e.stack);
    }
  }
  
  mutee.addRole(muterole.id).then(() => {
    message.delete();
    mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}. `);
    message.channel.send(`${mutee.user.username} was successfully muted.`)
    
  })
  
  let embed = new Discord.RichEmbed()
  .setColor(colors.red)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "Mute")
  .addField(`Mutee:`, mutee.user.username)
  .addField(`Moderator:`, message.author.username)
  .addField("Date", message.createdAt)
  .setFooter(`html.bot | Mute`, bot.user.displayAvatarURL);
  
  message.channel.send({embed: embed});
  
  
}

module.exports.config = {
  
  name: "mute",
  description: "Mutes a user in the discord",
  usage: "!Mute <@user> <reason>",
  accessibleby: "Members",
  aliases: ["m", "nospeak"]
  
}