const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) =>{
  let answers = [
    'Heads',
    'Tails'
  ];
  let answer = answers[Math.floor(Math.random()*answers.length)];
  let msg = new Discord.RichEmbed()
  .setTitle('Coin Flip')
  .setColor('#0d0d0d')
  .addField('Side:', answer);
  message.channel.send(msg);
}
module.exports.help = {
    name: "coinflip"
}

