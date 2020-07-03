module.exports.run = async (bot, message, args) => {
message.channel.send('Ping = `' + Math.floor(Math.round(bot.ping)) + '`ms')
console.log(message.guild.memberCount)
let memberCountChannel = message.guild.channels.get('727173441035436145');
memberCountChannel.setName("Discord Members - " + message.guild.memberCount)
  

}
  module.exports.help = {
    name: "ping"
  }