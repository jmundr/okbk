const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if(!args[1]) return message.reply("")
  let text = args.slice(1).join(' ')

  message.delete;
  message.channel.send(text)
}

exports.help = {
  name: 'say666'
};
