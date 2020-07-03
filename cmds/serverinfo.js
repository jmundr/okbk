const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

const voiceChannelCount = message.guild.channels.filter(c => c.type === 'voice').size;
let botCount = message.guild.members.filter(member => member.user.bot).size;
let channelCat = message.guild.channels.filter((t) => t.type === "category").size;
let TextChannel = message.guild.channels.filter((t) => t.type === "text").size;



 const exampleEmbed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(message.guild.name)
  .addField('Server Owner', message.guild.owner.user.tag, true)
.addField('Region', message.guild.region, true)
.addField('Channel Categories', channelCat, true)  
.addField("Text Channels", TextChannel ,true)  
.addField("Voice Channels",voiceChannelCount, true)
.addField("Members", message.guild.memberCount, true)
.addField("Humans", message.guild.members.filter(member => !member.user.bot).size, true) 
.addField("Bots", botCount, true)
.addField("Roles", message.guild.roles.size, true)
.setFooter(`Server Created: ${message.guild.createdAt}`);
 
 
message.channel.send(exampleEmbed);
}


module.exports.help = {
  name: "serverinfo",
  description: "Gathers information about the server."
}