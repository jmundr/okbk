const Discord = require("discord.js")
 
module.exports.run = async (bot, message, args) => {

let megustafac = new Discord.RichEmbed()
.setColor("#00ff00")
.setImage(message.guild.iconURL);

message.channel.send(megustafac)



}
module.exports.help = {
  name: "icon"
}