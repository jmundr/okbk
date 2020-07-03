const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => { 
  let xpStats = require("../xp.json");
  let highScores = []

  for(const [key, value] of Object.entries(xpStats)) {
    highScores.push({
      id: key,
      xp: xpStats[key]['xp'],
      level: xpStats[key]['level']
    })
  }
  const highscoresSorted = highScores.sort((a, b) =>  b['level'] - a['level'])
  const Embed = new Discord.RichEmbed()
  .setTitle("XP Leaderboard")
  .setColor("#c907e4")
  var leaderboardCap = 0;
  for (const highScore of highscoresSorted) {
    leaderboardCap++
    if(leaderboardCap === 11) {
      break
    }else{
    var User = await bot.fetchUser(highScore['id'])
    var XP = highScore['xp']
    var Level = highScore['level']
    Embed.addField(leaderboardCap + ".) " + User.username, "Level: " + Level + " || XP: " + XP) 
    }
  }

  message.channel.send(Embed)
}
module.exports.help = {
  name: "lb"
}   