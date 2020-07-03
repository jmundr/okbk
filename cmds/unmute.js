const Discord = require("discord.js");

let roles = ["Muted"]


module.exports.run = async (bot, message, args) => {
    let muterole = message.guild.roles.find('name', "Muted");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES"))  { return "You do not have the required permissions to run this command." }
    if(!tomute) {return "Couldn't find the specified user." }
    let reason = args.join(" ").slice(29);;
    let warnchannel = bot.channels.get("720200062084448346")
    if(!reason) {return "No reason specified." };
    let rolesBoolean = false;

    for(let i = 0; i < roles.length; i++) {
        if(tomute.roles.array().filter(role => role.name === roles[i])[0]) {
             rolesBoolean = true;
        }
    }
    if(rolesBoolean === false) {
    return "User isn't muted/has already been unmuted."
    }else {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
    
    let unmuteEmbedDM = new Discord.RichEmbed()
    .setAuthor("You've been Un-Muted")
    .addField("Reason ", reason)
    .setFooter(message.createdAt)
    .setColor("#fc6400");
    
    let muteEmbed = new Discord.RichEmbed()
    .setDescription("[UN-MUTE COMMAND]")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Un-Muted User ", tomute.user.tag)
    .addField("Un-Muted In ", message.channel)
    .addField("Reason ", reason)
    .setFooter(message.createdAt);

    warnchannel.send(unmuteEmbedDM)
    
    }
}
module.exports.help = {
    name: "unmute"
}