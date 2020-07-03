const overwatch = require("overwatch-stats-api");
const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
  if(!args[1]) { return("Please enter a valid user, FORMAT: 'Username-Discriminator (Case Sensitive)' [PLEASE KEEP THE HYPHON]")}
  var user = args[1]
  let eta = Math.floor((Math.random() * 15) + 7);
  message.channel.send("**Please wait... Fetching data... (ETA: " + eta + " seconds)**")
  try{
    const stats = await overwatch.getAllStats(user, 'pc')
    console.log(stats)
    let prestigeVal = stats.prestige
    if(stats.prestige === ""){
      prestigeVal = "NULL"
    }
    const Embed = new Discord.RichEmbed()
    .setAuthor(stats.battletag)
    .setThumbnail(stats.iconURL)
    .setColor("RANDOM")
    .addField("Level", stats.level)
    .addField("Prestige", prestigeVal)
    .addField("Competitive", "**Total Damage:** " + stats.heroStats.competitive.overall.combat.all_damage_done + "\n**Deaths:** " + stats.heroStats.competitive.overall.combat.deaths + "\n**Eliminations:** " + stats.heroStats.competitive.overall.combat.eliminations + "\n**Solo Kills:** " + stats.heroStats.competitive.overall.combat.solo_kills + "\n**Multi Kills:** " + stats.heroStats.competitive.overall.combat.multikills + "\n**Objective Kills:** " + stats.heroStats.competitive.overall.combat.objective_kills + "\n**Final Blows:** " + stats.heroStats.competitive.overall.combat.final_blows + "\n**Objective Time:** " + stats.heroStats.competitive.overall.combat.objective_time)
    .addField("Quick Play", "**Total Damage:** " + stats.heroStats.quickplay.overall.combat.all_damage_done + "\n**Deaths:** " + stats.heroStats.quickplay.overall.combat.deaths + "\n**Eliminations:** " + stats.heroStats.quickplay.overall.combat.eliminations + "\n**Solo Kills:** " + stats.heroStats.quickplay.overall.combat.solo_kills + "\n**Multi Kills:** " + stats.heroStats.quickplay.overall.combat.multikills + "\n**Objective Kills:** " + stats.heroStats.quickplay.overall.combat.objective_kills + "\n**Final Blows:** " + stats.heroStats.quickplay.overall.combat.final_blows + "\n**Objective Time:** " + stats.heroStats.quickplay.overall.combat.objective_time)
    .addField("Endorsement Level: " + stats.endorsementLevel + " | Endorsements: ", "**Shot Caller:** " + stats.endorsements.shotcaller + "\n**Teammate:** " + stats.endorsements.teammate + "\n**Sportsmanship:** " + stats.endorsements.sportsmanship)
  
    message.channel.send(Embed)
  }
  catch(err){
    if (String(err) === "RangeError: RichEmbed field values may not be empty.") {
    const stats = await overwatch.getAllStats(user, 'pc')
    const newEmbed = new Discord.RichEmbed()
    .setAuthor(stats.battletag)
    .setThumbnail(stats.iconURL)
    .setColor("RANDOM")
    .addField("Level", stats.level)
    .addField("Quick Play", "**Total Damage:** " + stats.heroStats.quickplay.overall.combat.all_damage_done + "\n**Deaths:** " + stats.heroStats.quickplay.overall.combat.deaths + "\n**Eliminations:** " + stats.heroStats.quickplay.overall.combat.eliminations + "\n**Solo Kills:** " + stats.heroStats.quickplay.overall.combat.solo_kills + "\n**Multi Kills:** " + stats.heroStats.quickplay.overall.combat.multikills + "\n**Objective Kills:** " + stats.heroStats.quickplay.overall.combat.objective_kills + "\n**Final Blows:** " + stats.heroStats.quickplay.overall.combat.final_blows + "\n**Objective Time:** " + stats.heroStats.quickplay.overall.combat.objective_time)
    .addField("Endorsement Level: " + stats.endorsementLevel + " | Endorsements: ", "**Shot Caller:** " + stats.endorsements.shotcaller + "\n**Teammate:** " + stats.endorsements.teammate + "\n**Sportsmanship:** " + stats.endorsements.sportsmanship)
    message.channel.send(newEmbed)
    }else{
      return(err)
    }

  }
  
}
module.exports.help = {
  name: "overwatch"
}