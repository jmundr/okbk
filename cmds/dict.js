const urban = require("relevant-urban");
const Discord = require("discord.js");
const usedCommand = new Map();
const Duration = require("humanize-duration");

module.exports.run = async (bot, message, args) => {
  if(!args[1]) { return "You haven't specified a word to look up." }
  const cooldown = usedCommand.get(message.author.id);
  console.log(cooldown)
  if(cooldown) {
     const remaining = Duration(cooldown - Date.now(), {units: ['h', 'm', 's'], round: true});
     console.log("cooldown")
     return `You have already used this command recently. This command will be available in  ${remaining}`
    } else {
      usedCommand.set(message.author.id, Date.now() + 10000);
      var word = message.content.substr(message.content.indexOf(" ") + 1);
      let res = await urban(word).catch(e => {
        return "Unable to find the specified word." 
      });
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(res.word)
      .setURL(res.urbanURL)
      .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
      
      
      message.channel.send(embed).then(msg => {
        msg.delete(15000)
      });
      
      setTimeout(() => {
        usedCommand.delete(message.author.id)
      },  10000);
  }
}
  
module.exports.help = {
  name: "dict"
}