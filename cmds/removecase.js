var Discord = require("discord.js")
var fs = require("fs");


let roles = ['MODERATORS']

module.exports.run = async (bot, message, args) => {

    let rolesBoolean = false;
    for(let i = 0; i < roles.length; i++) {
    if(message.member.roles.array().filter(role => role.name === roles[i])[0]) {
        rolesBoolean = true;
    }
}
  if(!rolesBoolean) { return "You do not have the required permissions to run this command."}
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1])
  if(!wUser) {
    return "Couldn't find the specified user." }

  var caseId = args[2]
  var numberCaseId = Number(caseId)
  if(!caseId) {
    return "No CaseID provided." }
  
  var reason = message.content.substr(message.content.indexOf(" ") + 31);
  if(!reason) {
    return "No reason provided." }
  
  let data = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  
  var casesData = data[wUser.id].Cases
  
  var cachedData = data[wUser.id].Cases
   
  casesData.forEach((user, index) => {
    if (user.CaseNo === numberCaseId) {
      casesData.splice(index, 1);
    }  
  });
  
  data[wUser.id].Cases = casesData

  fs.writeFileSync('./warnings.json', JSON.stringify(data, null, 2));
  
  
  const confirmationEmbed = new Discord.RichEmbed()
  .setAuthor("Case Removed")
  .setDescription("Case: " + caseId + " has successfully been removed.")
  .setFooter(message.createdAt)
  
  message.channel.send(confirmationEmbed)
  
  let warnchannel = bot.channels.get("720200062084448346")
  
  let warnEmbed = new Discord.RichEmbed()
  .setDescription("[REMOVED CASE]")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Removed User ", wUser.user.tag)
  .addField("Removed In ", message.channel)
  .addField("Reason ", reason)
  .setFooter(message.createdAt);
  
  if(!warnchannel) return message.reply("Couldn't find channel 'mod-logs'.");
  
  warnchannel.send(warnEmbed);
}
module.exports.help = {
  name: "removecase"
}