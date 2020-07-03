const Discord = require("discord.js");
var moment = require('moment');





module.exports.run =async (bot, message, args) => {
    let inline = true
    let resence = true
  
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author
let arr = message.guild.members.filter(a => !a.user.bot).array().sort((b, a) => b.joinedTimestamp - a.joinedTimestamp) 
let map = arr.indexOf(member) + 1


let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
  let x12;
  let x13;
    
  if (member.hasPermission("ADMINISTRATOR")) x12 = "Server Admin | "
  if (!member.hasPermission("ADMINISTRATOR")) x12 = ""
  
  if (member.hasPermission("BAN_MEMBERS")) x13 = "Server Moderator"
  if (!member.hasPermission("BAN_MEMBERS")) x13 = ""
  
  
    if (member.hasPermission("ADMINISTRATOR")) x = "Administrator | "
  if (!member.hasPermission("ADMINISTRATOR")) x = ""
    
    if (member.hasPermission("VIEW_AUDIT_LOG")) x2 = "View Audit Log | "
  if (!member.hasPermission("VIEW_AUDIT_LOG")) x2 = ""
    
    if (member.hasPermission("MANAGE_GUILD")) x3 = "Manage Guild | "
  if (!member.hasPermission("MANAGE_GUILD")) x3 = ""
    
    if (member.hasPermission("MANAGE_ROLES")) x4 = "Manage Roles | "
if (!member.hasPermission("MANAGE_ROLES")) x4 = ""

    if (member.hasPermission("MANAGE_CHANNELS")) x5 = "Manage Channels | "
    if (!member.hasPermission("MANAGE_CHANNELS")) x5 = ""

    
    if (member.hasPermission("KICK_MEMBERS")) x6 = "Kick Members | "
    if (!member.hasPermission("KICK_MEMBERS")) x6 = ""
 
    
    if (member.hasPermission("BAN_MEMBERS")) x7 = "Ban Members | "
    if (!member.hasPermission("BAN_MEMBERS")) x7 = ""
    
    if (member.hasPermission("MANAGE_MESSAGES")) x8 = "Manage Messages | "
    if (!member.hasPermission("MANAGE_MESSAGES")) x8 = ""
   
    
    if (member.hasPermission("MANAGE_NICKNAMES")) x9 = "Manage Nicknames | "
    if (!member.hasPermission("MANAGE_NICKNAMES")) x9 = ""
 
    
    if (member.hasPermission("MANAGE_EMOJIS")) x10 = "Manage Emojis | "
    if (!member.hasPermission("MANAGE_EMOJIS")) x10 = ""
 
    
  
    if (member.hasPermission("MANAGE_WEBHOOKS")) x11 = "Manage Webhooks."
    if (!member.hasPermission("MANAGE_WEBHOOKS")) x11 = ""
    
    


            let embed = new Discord.RichEmbed()
               
                .setAuthor(member.user.tag, member.user.displayAvatarURL)
                .setThumbnail((target.displayAvatarURL))
                
                .setColor("RANDOM")
                
                .addField("Joined", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY ")}`, true)
              .addField("Join Position", `${map}`, true)   
                  .addField("Registered", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY ")}`, true)

    
              
            
             .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).join(" **|** ") || "No Roles"}`)
              .addField("Key Permissions", `${x}${x2}${x3}${x4}${x5}${x6}${x7}${x8}${x9}${x10}${x11}` || "No Permissions")
              .addField("Acknowledgements", `${x12}${x13}` || "Server Member")
              
                
                
            
            


                

                .setFooter(`ID ${member.user.id}`)
                .setTimestamp()
    
            message.channel.send(embed);

           
    }

module.exports.help = {
    name: "whois"
}