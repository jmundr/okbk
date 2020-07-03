const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) =>{
  if (!args[1]) {
    bot.errMsg(message); 
    return;
  }
  let answers = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Ss point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
        "Maybe",
        "That is sure as hell.",
        "Fire.",
        "Indeed.",
        "Try to be usefull.",
        "Watch the birds.",
        "Gold.",
        "Answer is uncertain.",
        "You are the master of your life",
        "Maybe no.",
        "We can not be never sure.",
        "As you wish.",
        "Eat less, move more.",
        "Better ask yourself.",
        "Just do it.",
        "Sorry, but this is really stupid question.",
        "Try to be usefull.",
        "Water.",
        "We can not be never sure.",
        "You already know the Answer.",
        "Very bad idea.",
        "Never.",
        "Maybe yes.",
        "Mabye no.",
        "NO",
        "YES"
  ];
  let answer = answers[Math.floor(Math.random()*answers.length)];
  let msg = new Discord.RichEmbed()
  .setTitle(':8ball:') .setColor('#0d0d0d')
  .addField('Question:', args.slice(1).join(' '))
  .addField('Answer:', answer);
  message.channel.send(msg);
}
module.exports.help = {
  name: "8ball"
}