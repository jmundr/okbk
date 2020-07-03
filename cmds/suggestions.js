const Discord = require('discord.js');

const usedCommand = new Map();
const Duration = require("humanize-duration");

exports.run = async (client, message, args, ops) => {

if(!args[1]) return "Please enter a valid suggestion."
let text = args.slice(1).join(' ')
 const cooldown = usedCommand.get(message.author.id);
  console.log(cooldown)
  if(cooldown) {
     const remaining = Duration(cooldown - Date.now(), {units: ['h', 'm', 's'], round: true});
     console.log("cooldown")
     return `You have already used this command recently. This command will be available in  ${remaining}`
    } else {
    usedCommand.set(message.author.id, Date.now() + 3600000);
     const embed = new Discord.RichEmbed()
      .setColor("RANDOM")  
      .setDescription(text)
       .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL)





      let reportsChannel = message.guild.channels.find(`name`, "suggestions") 
      if(!reportsChannel) return message.channel.send("Couldn't find suggestions channel.");


     message.channel.send("Your suggestion has been submitted.")

     let msg = await reportsChannel.send(embed);

    await msg.react('✅');
    await msg.react('⛔');
   setTimeout(() => {
     usedCommand.delete(message.author.id)
   },  3600000);
    
    }

}
module.exports.help = {
  name: "suggest",
  description: "Poll System."
}

