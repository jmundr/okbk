const Discord = require("discord.js");
let roles = ['MODERATORS', 'Trial Mod']

module.exports.run = async (bot, message, args) => {
  
  let rolesBoolean = false;
  for(let i = 0; i < roles.length; i++) {
    if(message.member.roles.array().filter(role => role.name === roles[i])[0]) {
        rolesBoolean = true;
    }
}
  if(!rolesBoolean) { return "You do not have the required permissions to run this command." }
  if(!args[1]) {
    return "Please enter a valid status"
  }
  var statusChange = message.content.substr(message.content.indexOf(" ") + 1);
  bot.user.setActivity(String(statusChange), { type: 'PLAYING' }).catch(err => {
    return String(err)
  })
  const confirmationEmbed = new Discord.RichEmbed()
  .setAuthor(message.member.user.username)
  .setDescription("Changed status to: " + String(statusChange))
  .setFooter(message.createdAt)
  .setColor("RANDOM")
  
  message.channel.send(confirmationEmbed)
}
module.exports.help = {
  name: "status"
}