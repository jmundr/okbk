const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
 /*
  let pages = ["First Page", "Second Page", "Third Page"];
  let currentPage = 1;

  const pageEmbed = new Discord.RichEmbed()
  .setColor("#118cdd")
  .setFooter(`Page ${currentPage} of ${pages.length}`)
  .setDescription(pages[currentPage-1])

  message.channel.send(pageEmbed).then(msg =>{
    msg.react("⏪").then(r => {
      msg.react("⏩")

      const backwardsFilter = (reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 6000});
      const forwards = msg.createReactionCollector(forwardsFilter, {time: 6000});

      backwards.on('collect', r => {
        if(currentPage === 1) return;
        currentPage--;
        pageEmbed.setDescription(pages[currentPage-1]);
        pageEmbed.setFooter(`Page ${currentPage} of ${pages.length}`)
        msg.edit(pageEmbed)
      })
      forwards.on('collect', r => {
        if (currentPage === pages.length) return;
        currentPage++;
        pageEmbed.setDescription(pages[currentPage-1]);
        pageEmbed.setFooter(`Page ${currentPage} of ${pages.length}`)
        msg.edit(pageEmbed)
      })
    })
  })
*/
}

exports.help = {
  name: 'scrollcmd'
};