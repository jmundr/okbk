const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {


   let boticon = bot.user.displayAvatarURL;


  let dmsEmbed = new Discord.RichEmbed()
  .setColor("#add8e6")
  .setTitle("BGS BOT Help Menu")
  .setFooter("BGS BOT || Requested By: " + message.author.username, boticon)
  .addField("Informational Commands", ".weather <Town/City/Country> | Gets the weather of the specifeid area\n.whois <@mention> | Gets discord info about the specified user\n.serverinfo | Gets the server info\n.ping | Gets the ping of the bot \n.avatar <@mention> | Gets the avatar of the specified user")
  .addField("Fun Commands", ".8ball <Question> | Gives a random answer based on the question \n.lenny | Sends a lenny \n.rps | Play Rock, Paper, Scissors! \n.pepe | Gets a random pepe \n.advice | Gets random advice \n.joke | Gets a random joke \n.rate <@mention> | Rates the speicifed user \n.rolldice <DiceSides> | Rolls a dice with the specified number of sides \n.meme | Gets a random meme \n.coinflip | Flips a coin \n.showerthoughts | Gets a shower thought \n.clap | Claps")
  .addField("Moderation Commands", ".warn <@mention> <reason> | Warns the specified user \n.warnings <@mention> | Get's existing warnings on a user \n.removecase <@mention> <CaseId> <Reason> | Removes a case specific to the target user")



message.channel.send(dmsEmbed)
}
  
  

  


module.exports.help = {
  name: "help"

}