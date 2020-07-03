const ownerID = '336911762890817537';

const https = require("https");

const fs = require("fs");

/*
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tapioca-bot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const RepObject = require("./models/rep.js")
*/
const active = new Map();
let ops = {
  ownerID: ownerID,
  active: active
  

}


const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get("/", (request, response) => {
  console.log(Date.now() + " ping Received");
  response.json("Ok");
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


let xp = require("./xp.json");


const Discord = require('discord.js');
const rbx = require("noblox.js");
const bot = new Discord.Client();

bot.on('rateLimit', (info) => {
  console.log(`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout: 'Unknown timeout '}`)
})

bot.on("guildMemberAdd", function(message) {
    let guild = message.guild;
    let member = message;
  const embed = new Discord.RichEmbed()
  .setColor("#1fdec8")
  .setTitle("Welcome")
 .setDescription(`Welcome to the BGS Gaming Server, ${member.user}! \n  \n Total Members: ${guild.memberCount}`)
 .setThumbnail(member.user.avatarURL)
  .setTimestamp()

  
  guild.channels.find(`name`, "joins").send({ embed: embed});
  
    let memberCountChannel = guild.channels.get('727173441035436145');
  memberCountChannel.setName("Discord Members - " + guild.memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error))
    


});

bot.on("guildMemberRemove", function(message) {
    let guild = message.guild;
    let member = message;
  const embed = new Discord.RichEmbed()
  .setColor("#1fdec8")
  .setTitle("Goodbye")
 .setDescription(`See you, ${member.user}! \n  \n Total Members: ${guild.memberCount}`)
 .setThumbnail(member.user.avatarURL)
  .setTimestamp()

  
  guild.channels.find(`name`, "joins").send({ embed: embed});
  
    let memberCountChannel = guild.channels.get('727173441035436145');
  memberCountChannel.setName("Discord Members - " + guild.memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error))
    


});

/*
bot.on("messageUpdate", async(oldMessage, newMessage) => {
   if(oldMessage.content === newMessage.content){
  return;
}
   var logchannel = bot.channels.get("620243568606314498");
  
  let logembed = new Discord.RichEmbed()
 .setColor("#29b0d9")
  .setTitle("**Message Edited**")
  .addField("Author", oldMessage.author)
  .addField("Channel", newMessage.channel)   
 .addField("Before", oldMessage.content)
  .addField("After", newMessage.content)
    
  .setTimestamp()
  
  logchannel.send(logembed)
  

})

bot.on("messageDelete", async message => {
  
   var logchannel = bot.channels.get("620243568606314498");
 
  let logembed = new Discord.RichEmbed()
  .setColor("#d92b37")
  .setTitle("**Message Deleted**")
  .addField("Author", message.author)
   .addField("Channel", message.channel)
   .addField("Message", message.content)
  .setTimestamp()
  logchannel.send(logembed)

})

*/

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


const config = require('./config.json');


bot.prefix = config.prefix;

bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split('.').pop() === 'js');

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.log(`Loaded ${jsFiles.length} commands`);
});

bot.errMsg = (message) => {
  message.channel.send('Error (Random Number): Please enter command properly. There was a **Syntax Error in the command**.');
}
bot.permMsg = (message) => {
  message.channel.send('I don\'t have permission to do this. :(');
}

String.prototype.capitalize = function(allWords) {
  if (allWords) return this.split(/ +/g).map(str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1)).join(' ');
  else return this.toLowerCase().charAt() + this.toLowerCase(0).substring(1);
}

bot.on('ready', () => {
  console.log(`Bot ${bot.user.username} is on`);
  bot.user.setActivity('CHANGE WITH .status', { type: 'PLAYING' });
  bot.user.setStatus('available', null)
});


const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;

bot.on('message', (message) => {
  if(message.author.bot) return;
  
  if(usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimeStamp - lastMessage.CreatedTimeStamp;
      let msgCount = userData.msgCount;
      if(difference > DIFF ) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData)
      }
    else { 
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        let muterole = message.guild.roles.find('name', "MUTED");
        message.member.addRole(muterole.id);
        message.channel.send(`<@${message.member.id}> has been muted for 30 seconds for spamming.`);
        
        
        
      let wUser = message.member

      let warnchannel = bot.channels.get("720200062084448346")

      if( !warns[wUser.id]) {
        warns[wUser.id] = {
          User: (`${wUser}`),
          Cases: [],
        };
      }
      warns[wUser.id].Cases.push({
        Reason: "Auto-Mute (Spamming)",
        Timestamp: message.createdAt, 
        Moderator: "BOT",
        Type: ":clock1::mute: Auto-Mute",
        CaseNo: Math.floor(100000 + Math.random() * 900000)
      })


      fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err);
      });

      let warnEmbed = new Discord.RichEmbed()
      .setDescription("[ANTI SPAM]")
      .setAuthor(message.author.username)
      .setColor("#fc6400")
      .addField("Auto-Muted User ", wUser.user.tag)
      .addField("Muted In ", message.channel)
      .addField("Reason ", "Auto-Mute (Spamming)")
      .setFooter(message.createdAt);

      if(!warnchannel) return message.reply("Couldn't find channel 'mod-logs'.");

      warnchannel.send(warnEmbed);


      let warnEmbedDM = new Discord.RichEmbed()
      .setAuthor("You've been Muted")
      .setFooter(message.createdAt)
      .addField("Time:", `30 Seconds`)
      .addField("Reason ", "Auto-Mute (Spamming)")
      .setColor("#fc6400");

      wUser.send(warnEmbedDM);
        
      setTimeout(() => {
          message.channel.send(`<@${message.member.id}> has been unmuted!`);
          message.member.removeRole(muterole.id)
        
          let muteEmbedDM = new Discord.RichEmbed()
          .setAuthor("You've been Un-Muted")
          .addField("Reason ", "[TIME EXPIRED]")
          .setFooter(message.createdAt)
          .setColor("#fc6400");
           
          message.member.send(muteEmbedDM)

        }, 30000)
    } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
  }
  }
else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, 5000);
       usersMap.set(message.author.id, {
        msgCount: 1, 
        lastMessage: message,
        timer: fn
      });
    }
  
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  
  if(!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0, 
      level: 1
    }
  }
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;
  
  if(nxtLvl <= curxp)
  {
    xp[message.author.id].level = curlvl + 1
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#c907e4")
    .addField("New Level", curlvl + 1)
    
    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
  
  if (message.channel.id === '720200062084448346' || message.channel.id == '712294912908853308' || message.channel.id == "718171743927402537" || message.channel.id == "723123856914776105" || message.member.roles.find(r => r.name === "MODERATORS")) {
  if (message.content.startsWith(bot.prefix)) {
    let args = message.content.substring(bot.prefix.length).trim().split(/ +/g);
    let cmd = bot.commands.get(args[0].toLowerCase());
    try{
     if (cmd) 
     var returnValue = cmd.run(bot, message, args, ops);
      returnValue.then(function(result) {
          var updatedResult = String(result)
          console.log(typeof updatedResult)
          console.log(updatedResult)
          var bool = updatedResult.includes("Error:");
          console.log("Bool Value " + bool)
          if (String(result) == "undefined") {
          }
          else if(bool){
            let failedCommand = new Discord.RichEmbed()
            .setAuthor("ERROR: Failed to execute the specified comand")
            .setDescription("\:warning: " +  result)
            .setColor(0xff0000)
            .setFooter(message.createdAt)
            message.channel.send(failedCommand)      
          }
          else{
          let failedPreconditions = new Discord.RichEmbed()
          .setAuthor("ERROR: Failed to meet the preconditions required to run this command")
          .setDescription("\:warning: " +  result)
          .setColor(0xff0000)
          .setFooter(message.createdAt)
          message.channel.send(failedPreconditions)
        }
      });
    

    }
    catch(err){
      console.log("Error: " + err)
      if (String(err) === "TypeError: Cannot read property 'then' of undefined"){
        let re = /^\..+$/;
        var testResult = re.test(message)
        if (testResult) {
          let Embed = new Discord.RichEmbed()
          .setAuthor("Command not Recognised")
          .setDescription("Please use .cmds/.help for a list of commands.")
          .setFooter(err)
          message.channel.send(Embed).then(msg => {
            msg.delete(15000)
          });
        }
      }
      else {
      let Embed = new Discord.RichEmbed()
      .setAuthor("ERROR://")
      .setDescription(err)
      .setFooter(message.createdAt)
    
      message.channel.send(Embed)
      }
    }
    }

  } 
/*
  else {
    let reptoadd = 1
    RepObject.findOne({
      userID: message.author.id, 
      serverID: message.guild.id
    }, (err, rep) => {
      if(err) console.log(err);
      if(!rep) {
        const newRep = new RepObject({
          userID: message.author.id, 
          serverID: message.guild.id, 
          rep: reptoadd
        })
        newRep.save().catch(err => console.log(err));
        } else{
          RepObject.rep = RepObject.rep + reptoadd;
          RepObject.save().catch(err => console.log(err));
      }
    })
  }
*/
});


bot.login(process.env.TOKEN)
