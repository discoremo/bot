const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const config = require("./config.json");

mongoose.connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(console.log("KolegaBot został zalogowany do bazy!"))

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["loadCommands"].forEach(utils => {
    require(`./utils/${utils}`)(client);
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

        const prefix = config.prefix;
        
        if (!message.content.startsWith(prefix)) return;
        let commandfile = client.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(client, message, args);
    })

client.login(config.token);