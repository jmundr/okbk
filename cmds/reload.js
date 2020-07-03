const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(message.author.id != "520675651611656192") { return "You do not have the required permissions to run this command. (Discord Bot Owner Only)"}
  
  if(!args[1]) {return "No comamnd specified to reload."}
  
  let commandName = args[1].toLowerCase()
  
  try {
    delete require.cache[require.resolve(`./${commandName}.js`)]
    bot.commands.delete(commandName)
    const pull = require(`./${commandName}.js`)
    bot.commands.set(commandName, pull)
  } catch(e) {
    return (`Could not reload: \`$(args[1].toUpperCase())\``)
    console.log(e)
  }
  
  const Embed = new Discord.RichEmbed()
  .setAuthor("Successfully Reloaded Command")
  .setDescription(`Succesfully reloaded command: \${args[1].toUpperCase()}`)
  .addField("Time Taken", Math.floor(Math.round(bot.ping)) + "ms")
  .setFooter(message.createdAt)
  
  message.channel.send(Embed)
  
}
module.exports.help = {
 name: "reload"
}