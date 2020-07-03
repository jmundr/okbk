const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");


let roles = ["MUTED"]

module.exports.run = async (bot, message, args, ops) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) {return "Couldn't find the specified user." }
  if(!message.member.hasPermission("MANAGE_MESSAGES"))  { return "You do not have the required permissions to run this command." }
  
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  
  let warnchannel = bot.channels.get("720200062084448346")
  
  let muterole = message.guild.roles.find('name', "MUTED");
  let mutetime = args[2];
  if(!mutetime) {return "No MuteTime specified." };
  let reason = args.join(" ").slice(31);;
  if(!reason) {return "No reason specified." };
  
  
  await(tomute.addRole(muterole.id));
  
  
  let confirmationEmbed = new Discord.RichEmbed()
  .setAuthor("Muted User!")
  .setDescription("Successfull muted user: " + tomute.id)
  .addField("Reason", reason)
  .addField("Time Length", `${ms(mutetime)}ms`)
  .setFooter(message.createdAt);
  
  message.channel.send(confirmationEmbed)
  
  
  let muteEmbedDM = new Discord.RichEmbed()
  .setAuthor("You've been Muted")
  .setFooter(message.createdAt)
  .addField("Reason ", reason)
  .addField("Time Length", `${ms(mutetime)}ms`)
  .setColor("#fc6400");
  
  tomute.send(muteEmbedDM);
  
  let muteEmbed = new Discord.RichEmbed()
  .setDescription("[MUTE COMMAND]")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Muted User ", tomute.user.tag)
  .addField("Muted In ", message.channel)
  .addField("Reason ", reason)
  .addField("Time Length ", `${ms(mutetime)}ms`)
  .setFooter(message.createdAt);
  
  if( !warns[tomute.id]) {
    warns[tomute.id] = {
      User: (`${tomute}`),
      Cases: [],
    };
  }
  warns[tomute.id].Cases.push({
    Reason: reason,
    Timestamp: message.createdAt, 
    Moderator: message.member.user.username,
    Type: ":mute: Mute",
    CaseNo: Math.floor(100000 + Math.random() * 900000)
  })
  
  
  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
  });
  
  
  
  if(!warnchannel) return message.reply("Couldn't find channel 'mod-logs'.");
  
  warnchannel.send(muteEmbed);
  
  setTimeout(function(){
    let rolesBoolean = false;
    for(let i = 0; i < roles.length; i++) {
        if(tomute.roles.array().filter(role => role.name === roles[i])[0]) {
             rolesBoolean = true;
        }
    }
  if (rolesBoolean === true)
  {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
    
    let unmuteEmbedDM = new Discord.RichEmbed()
    .setAuthor("You've been Un-Muted")
    .addField("Reason ", "[TIME EXPIRED]")
    .setFooter(message.createdAt)
    .setColor("#fc6400");
    
    tomute.send(unmuteEmbedDM);
  }
  }, ms(mutetime));
}

module.exports.help = {
    name: "mute"
}