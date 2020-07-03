const Discord = require("discord.js");
const usedCommand = new Map();
const Duration = require("humanize-duration");

module.exports.run = async (bot, message, args) => {
  const cooldown = usedCommand.get(message.author.id);
  console.log(cooldown)
  if(cooldown) {
     const remaining = Duration(cooldown - Date.now(), {units: ['h', 'm', 's'], round: true});
     console.log("cooldown")
     return `You have already used this command recently. This command will be available in  ${remaining}`
    } else {
      let rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
      if(!rUser) return "Couldn't find the specified user."
      let reason = args.join(" ").slice(29);
      if(!reason) return "No reason specified"


      usedCommand.set(message.author.id, Date.now() + 1000 * 60 * 60);

      setTimeout(() => {
        usedCommand.delete(message.author.id)
      },  1000*60);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#15f153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Reported in", message.channel)
      .addField("Reason", reason)
      .setFooter("Time: " + message.createdAt)

      let reportsChannel = bot.channels.get("725631863720378429")
      reportsChannel.send(reportEmbed)

      message.delete().catch(O_o=>{});

      let confirmationEmbed = new Discord.RichEmbed()
      .setDescription("Successfully Reported User")
      .setColor("#15f153")
      .addField("Time", message.createdAt)

      message.channel.send(confirmationEmbed)
    }
}
module.exports.help = {
  name: "report"
}