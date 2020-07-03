exports.run = (client, message) => {
  var owner = "336911762890817537"
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to punch them.')
        if(user.id === owner){
          return message.reply("You can't hurt him you pleb.");
  }else{
          message.channel.send(`${user} You just got punched by ${message.author.username}!`)
  }
};



exports.help = {
  name: 'punch',
  description: 'Punches a user.',
  usage: 'punch <user>'
};