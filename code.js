const Discord = require('discord.js');
const botConfig = require("../botconfig.json");
const colors = require('../colors.json');
const prefix = botConfig.prefix;

var evaluation;

module.exports.run = async (bot, message, args) => {
  if(!args[0]) {
  message.channel.send("Try using an argument with <>code");
  }
  else if(args[0]) {
    
    let arg = message.content.replace(/```/g, "");
    //console.log(arg);
    arg = arg.replace("<>codes ", "");
    arg = arg.replace("<>code ", "");
    arg = arg.replace("<>c ", "");
    arg = arg.replace("<>output ", "");
    
    //arg = arg.replace(/\n/g, "; ");
    
    arg = arg.replace("console.log", "evaluation = ");
    
    
    try {
      
      // console.log(arg);
      eval(arg);
      //let evaluated = eval(arg);
      //if(evaluated.includes('console.log'));
      
    }
    catch(err) {
      console.log("[Error]");
    }
    finally {
      let Embed = new Discord.RichEmbed()
      .setColor(colors.cyan)
      .setTitle("Output:")
      //.setDescription("")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.author.username}'s Code Output:`, message.author.displayAvatarURL)
      .addField("**Input:**", `${args[0]}`, true)
      .addField("**Output:**", `${evaluation}`, true)
      .setFooter(`html.bot | Output`, bot.user.displayAvatarURL);
      
    message.channel.send({embed: Embed});
    }
  }
}

module.exports.config = {
  name: "code",
  aliases: ["c", "codes", "output"],
  usage: "<>code ```[language]```",
  description: "Outputs a code: Unfinished Command",
  //noalias: "No Aliases",
  accessibleby: "Members"
}