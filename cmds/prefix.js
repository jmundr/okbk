const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if(!args[1]) return message.channel.send("Current prefix of BGSBot is `.`")

}

exports.help = {
  name: 'prefix'
};