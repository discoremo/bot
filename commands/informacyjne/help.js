const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Pokazuję komendy bota.",
    permisja: "Brak",
    usage: "help",
    run: async (client, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);


    if(!helpArgs[0]) {
        const embedgf = new Discord.MessageEmbed()
        .setColor("#00fc15")
        .setTitle("Lista komend bota (3).")
        .setDescription(`**Użyj** \`!help <nazwa komendy>\` **żeby zobaczyć o niej więcej informacji.** \n **Prefix bota to:** \`!\` .`)
        .addField(" Cape (2)", "`get`, `cape`")
        .addField(" Inne (1)", "`help`")
        .setTimestamp()
        .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}));
        message.channel.send(embedgf)
    }

    if(helpArgs[0]) {
        let command = helpArgs[0];

        if(client.commands.has(command)) {
            command = client.commands.get(command);
            const embed = new Discord.MessageEmbed()
            .setColor('#00fc15')
            .setTitle(`Pomoc dla komendy: ${command.name}` || "Nie podano!" )
            .addField("Opis:", `**${command.description}**` || "Nie podano!")
            .addField("Stosowanie:", `\`\`\`!${command.usage}\`\`\`` || "Nie podano!" )     
            .addField("Permisja do użycia:", `\`\`\`${command.permisja}\`\`\`` || "Nie podano!" )     
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());    
            message.channel.send(embed);
        }
        else {
            const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setAuthor(`Błąd!`)
            .setDescription(`**Podana komenda nie istnieję!**`)
            .addField(`Stosowanie:`, `\`\`\`!help <nazwa komendy [Opclonajnie]>\`\`\``)
            .setTimestamp()
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            return message.channel.send(embed) 
        }
    }
}
}