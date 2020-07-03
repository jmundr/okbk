const Discord = require('discord.js');

let roles = ['Perms']

exports.run = async (client, message, args, ops) => {

let rolesBoolean = false;
for(let i = 0; i < roles.length; i++) {
    if(message.member.roles.array().filter(role => role.name === roles[i])[0]) {
        rolesBoolean = true;
    }
}

if(!rolesBoolean) { return "You do not have the required permissions to run this command." }
if(!args[1]) return "Please enter a valid poll."
let text = args.slice(1).join(' ')
  
const embed = new Discord.RichEmbed()
.setColor("RANDOM")  
.setDescription(text)
.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL)
  
    
    
   

let reportsChannel = message.guild.channels.find(`name`, "poll-announcements") 
if(!reportsChannel) return message.channel.send("Couldn't find suggestions channel.");


message.channel.send("Poll has been created.")

let msg = await reportsChannel.send(embed);
  
let ping = await reportsChannel.send("@everyone")

await msg.react('✅');
await msg.react('❌');

}
module.exports.help = {
  name: "poll",
  description: "Poll System."
}

