const Discord = require("discord.js")
var owner = "520675651611656192"
module.exports.run = async (bot, message, args) => {

let ratus = message.mentions.members.first();
if(!ratus) {
    return "Couldn't find the specified user." }
let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let result = Math.floor((Math.random() * rates.length));

if(ratus.user.id === owner) {
  message.channel.send(`I'd give **__${ratus.user.username}__** 10/10 :flushed:`);
} else if(ratus.user.id === message.author.id) {
  message.channel.send(`**${message.author.username}**, I'd give you ${result}/10 :flushed:`);
} else message.channel.send(`I'd give **__${ratus.user.username}__** ${result}/10 :flushed:`);
 

}
         


module.exports.help = {
  name: "rate"
}
