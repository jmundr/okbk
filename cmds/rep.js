/*
const Discord = require('discord.js')
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const RepObject = require("../models/rep.js")

module.exports.run = async (bot, message, args) => {
  await message.delete();
  
  RepObject.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, rep) => {
    if(err) console.log(err);
    
    let embed = new Discord.RichEmbed()
    .setTitle("Rep")
    .setColor("#4000FF")
    .setThumbnail(message.author.displayAvatarURL)
    
    if(!rep) {
      embed.addField("Rep", "0", true);
      return message.channel.send(embed)
    }else {
      embed.addField("Rep", RepObject.rep, true);
      return message.channel.send(embed)
    }
  })
    
}
*/

module.exports.help = {
  name: "rep"
}
