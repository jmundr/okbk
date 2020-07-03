const Discord = require('discord.js');
const fs = require("fs");

const chooseArr = ["🗻", "📄", "✂️"]

exports.run = async (client, message, args) => {
  const Embed = new Discord.RichEmbed()
    .setColor("#e6cc11")
    .setFooter(message.member.user.username, message.member.user.displayAvatarURL)
    .setDescription("React to one of the emojis below to select a item!")
    .setTitle("Rock, Paper, Scissors")
    .setTimestamp();

    const m = await message.channel.send(Embed);
    const reacted = await async function promptMessage(message, author, time, validReactions) {
        time *= 1000;

        for (const reaction of validReactions) await message.react(reaction);

        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
      }(m, message.author, 30, chooseArr);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await m.clearReactions();

    Embed
      .setDescription("")
      .addField("Result", `${reacted} VS ${botChoice}`);

    m.edit(Embed);

    function getResult(me, clientChosen) {
      if ((me === "🗻" && clientChosen === "✂️") ||
        (me === "📄" && clientChosen === "🗻") ||
        (me === "✂️" && clientChosen === "📄")) {
          const wonEmbed = new Discord.RichEmbed()
          .setTitle("Rock, Paper, Scissors")
          .setDescription("You've Won!")
          .setFooter(message.member.user.username, message.member.user.displayAvatarURL)
          .setColor("#39e40e")

          message.channel.send(wonEmbed)

        } else if (me === clientChosen) {
          const tieEmbed = new Discord.RichEmbed()
          .setTitle("Rock, Paper, Scissors")
          .setDescription("It's a Tie!")
          .setFooter(message.member.user.username, message.member.user.displayAvatarURL)
          .setColor("#39e40e")

          message.channel.send(tieEmbed)
        } else {
          const tieEmbed = new Discord.RichEmbed()
          .setTitle("Rock, Paper, Scissors")
          .setDescription("You've Lost!")
          .setFooter(message.member.user.username, message.member.user.displayAvatarURL)
          .setColor("#e61111")

          message.channel.send(tieEmbed)
        }
    }

}

exports.help = {
  name: 'rps'
};