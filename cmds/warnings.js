const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

let roles = ['MODERATORS']

module.exports.run = async (bot, message, args, ops) => {
  
  
  let rolesBoolean = false;
  for(let i = 0; i < roles.length; i++) {
    if(message.member.roles.array().filter(role => role.name === roles[i])[0]) {
        rolesBoolean = true;
    }
}
  if(!rolesBoolean) { return "You do not have the required permissions to run this command."}
  
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) {
    return "Couldn't find the specified user" }
//  let warnlevel = warns[wUser.id].Case;

  fs.readFile("warnings.json", "utf8", function(err, contents) {
    console.log(contents);
  })
  
 // var warningsArray = warns[wUser.id].map()
  //console.log(warningsArray)
  
  try {
    let emojiType
    let warnEmbed = new Discord.RichEmbed()
    .setAuthor("Mod-Log data for for: " + wUser.user.tag + " (ID: " + wUser.user.id + ")")
    .setFooter(message.createdAt)
    .setImage((message.member.AvatarURL))
    var TotalReports = 0
    for (let singleCase of warns[wUser.id].Cases) {
      warnEmbed.addField("Case: `" + singleCase.CaseNo + "` || TYPE: " + singleCase.Type, "Reason: **" + singleCase.Reason + "** || Time: **" + singleCase.Timestamp + "**")
      TotalReports++
    };
    warnEmbed.setDescription("Total Cases: " + TotalReports)

    message.channel.send(warnEmbed);
  }
  catch(err){
    let warnEmbed = new Discord.RichEmbed()
    .setAuthor("Mod-Log data for for: " + wUser.user.tag + " (ID: " + wUser.user.id + ")")
    .setDescription("User has no data..", false)
    .setFooter(err)
    
    message.channel.send(warnEmbed);
  }
}



module.exports.help = {
    name: "warnings"
}