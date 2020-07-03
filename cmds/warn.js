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
  if(!rolesBoolean) { return "You do not have the required permissions to run this command." }
  
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  
  
  console.log("done")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Unfortunately, you do not have access to this command.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) {return "Couldn't find the specified user" }
  
  let reason = args.join(" ").slice(22);
  
  let editedReason = reason.substring(5);
  
  if(!editedReason.replace(/\s/g, '').length) return message.reply("No reason specified!")

  
  if(message.member.highestRole.comparePositionTo.position < message.mentions.members.first().highestRole.position) {
    console.log("yas queen")
    return "You can't warn users of a higher rank"
  }
  
  let warnchannel = bot.channels.get("720200062084448346")
  
  if( !warns[wUser.id]) {
    warns[wUser.id] = {
      User: (`${wUser}`),
      Cases: [],
    };
  }
  warns[wUser.id].Cases.push({
    Reason: editedReason,
    Timestamp: message.createdAt, 
    Moderator: message.member.user.username,
    Type: ":warning: Warning",
    CaseNo: Math.floor(100000 + Math.random() * 900000)
  })
  
  
  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });
  
  let warnEmbed = new Discord.RichEmbed()
  .setDescription("[WARN COMMAND]")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User ", wUser.user.tag)
  .addField("Warned In ", message.channel)
  .addField("Reason ", editedReason)
  .setFooter(message.createdAt);
  
  if(!warnchannel) return message.reply("Couldn't find channel 'mod-logs'.");
  
  warnchannel.send(warnEmbed);
  
  let confirmationEmbed = new Discord.RichEmbed()
  .setAuthor("Warned User!")
  .setDescription("Successfull warned user: " + wUser.id)
  .setFooter(message.createdAt);
  
  message.channel.send(confirmationEmbed)
  
  let warnEmbedDM = new Discord.RichEmbed()
  .setAuthor("You've been Warned")
  .setFooter(message.createdAt)
  .addField("Reason ", editedReason)
  .setColor("#fc6400");
  
  wUser.send(warnEmbedDM);
/*
  if(warns[wUser.id].warns == 2) {
    let muterole = message.guild.roles.find('name',"Muted");
    if(!muterole) return message.reply("Couldn't find the role, 'Muted'");
    
    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.user.tag} has been temporarily muted`)
    console.log(wUser)
    setTimeout(function(){
      wUser.removeRoles(muterole.id)
      message.channel.send(`${wUser.user.tag} has been un-muted`)
    })
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).kick(reason);
    message.channel.send(`${wUser.user.tag} has been kicked`)
  }
  
  warnchannel.send(warnEmbed);
*/
}

module.exports.help = {
    name: "warn"
}