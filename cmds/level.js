const Discord = require("discord.js");

let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
  let user = await message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!user) {return "Couldn't find the specified user" }
  if(!xp[user.id]){
    xp[user.id] = {
      xp: 0,
      level: 1
    };
  }
  let curxp = xp[user.id].xp;
  let curlvl = xp[user.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;
  
  var User = await bot.fetchUser(user.id)
  let lvlEmbed = new Discord.RichEmbed()
  .setTitle(User.username)
  .setColor("#c907e4")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP until level up`, message.author.displayAvatarURL)
  
  message.channel.send(lvlEmbed)
}
module.exports.help = {
  name: "level"
}