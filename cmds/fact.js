const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
    try {
          const { body } = await snekfetch.get('https://uselessfacts.jsph.pl/random.json?language=en');
          console.log(body)
        	message.channel.send(body.text);
      } catch (err) {
        return (err)
        }
    }



module.exports.help = {
   name: "fact"
}