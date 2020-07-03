const Discord = require('discord.js')


exports.run = (client, message, args, tools) => {

let roles = ['MODERATORS']
let rolesBoolean = false;
for(let i = 0; i < roles.length; i++) {
    if(message.member.roles.array().filter(role => role.name === roles[i])[0]) {
        rolesBoolean = true;
    }
}
  if(!rolesBoolean) return message.channel.send("Unfortunately, you do not have access to this command.")


if(!args[1]) return message.channel.send("Please specify a number of messages to delete with the command.");
  
 let delmsg = args[1]
 if (delmsg > 100) {
  return message.channel.send("To purge messages, amount must be over 2 and under 100.")
  }

  message.delete().then( //message.channel.bulkDelete()
  message.channel.bulkDelete(delmsg)).catch(() => message.channel.send("Error when deleting messages.")).then(() => {
  message.channel.send("").then(msg => msg.delete(10000));
  
  let warnchannel = client.channels.get("720200062084448346")
    
  const Embed = new Discord.RichEmbed()
  .setAuthor("Purged Messages")
  .setDescription("Successfully purged `" + delmsg + "` messages.")
  .setFooter(message.createdAt)
  
  message.channel.send(Embed)
    
  let warnEmbed = new Discord.RichEmbed()
  .setDescription("[PURGE COMMAND]")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Purged Messages", delmsg + " messages")
  .addField("Purged In ", message.channel)
  .setFooter(message.createdAt);
  
  warnchannel.send(warnEmbed);
});
}



module.exports.help = {
    name: "purge"
}
