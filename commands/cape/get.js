const Discord = require('discord.js');
const userModel = require("../../models/user.model")
const config = require("../../config.json")

module.exports = {
    name: "get",
    description: "Zajmuje nick.",
    permisja: "Brak",
    usage: "!get (nick z Minecraft)",
    run: async (client, message, args) => {
      if (message.channel.id === config.kanal_get) {
        let check_userModel = await userModel.findOne({discordID: message.author.id});
        if(check_userModel) {
            let nickmc_embed = check_userModel.get('minecraftNick');
            const uzytkownik_ma_zajety_nick_embed = new Discord.MessageEmbed()
            .setColor('ff0d00')
            .setTitle('Juice Cape - Nadawanie')
            .setDescription(`**PL: Masz już zajęty nick** \`(${nickmc_embed})\`**, aby go zmienić zgłoś się do administracji.**\n**EN: You already have a nickname taken** \`(${nickmc_embed})\` **to change it, contact the administration.**`)
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            message.channel.send(uzytkownik_ma_zajety_nick_embed)
            .then(msg => {
              message.delete({ timeout: 10000 })
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }

        let nick_minecraft = args[0];
        if(!nick_minecraft) {
            const brak_nick_message_embed = new Discord.MessageEmbed()
            .setColor('ff0d00')
            .setTitle('Juice Cape - Nadawanie')
            .setDescription(`**PL: Musisz podać nick jaki chcesz zając.**\n**EN: You must provide the nickname you want to hare.**`)
            .addField("**PL: Użycie:**", `\`!get (Nick z gry Minecraft)\``)
            .addField("**EN: Usage:**", `\`!get (Minecraft nick)\``)
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            message.channel.send(brak_nick_message_embed)
            .then(msg => {
              message.delete({ timeout: 10000 })
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }

        let check_nick_userModel = await userModel.findOne({minecraftNick: nick_minecraft});
        if(check_nick_userModel) {
            const uzytkownik_ma_zajety_nick_embed = new Discord.MessageEmbed()
            .setColor('ff0d00')
            .setTitle('Juice Cape - Nadawanie')
            .setDescription("**PL: Podany nick jest już zajęty.**\n**EN: The given nickname is already in use.**")
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            message.channel.send(uzytkownik_ma_zajety_nick_embed)
            .then(msg => {
              message.delete({ timeout: 10000 })
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }

        const add_nick = new userModel({
            discordID: message.author.id,
            minecraftNick: nick_minecraft,
        });
        await add_nick.save();
        const uzytkownik_zaja_nick_embed = new Discord.MessageEmbed()
            .setColor('00fc15')
            .setTitle('Juice Cape - Nadawanie')
            .setDescription("**PL: Pomyślnie zajęto nick.**\n**EN: Nick was successfully taken**")
            .addField("**PL: Zajęty nick:**", `\`${nick_minecraft}\``)
            .addField("**EN: Occupied nickname:**", `\`${nick_minecraft}\``)
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            message.channel.send(uzytkownik_zaja_nick_embed)
            .then(msg => {
              message.delete({ timeout: 10000 })
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
      } else {
            const zly_kanal_komendy_embed = new Discord.MessageEmbed()
            .setColor('ff0d00')
            .setTitle('Juice Cape - Nadawanie')
            .setDescription(`**PL: Kanał do zajecia nicku to:** <#798910304142229505>\n**EN: The channel to get the nickname is:** <#798910304142229505>`)
            .setTimestamp()  
            .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
            message.channel.send(zly_kanal_komendy_embed)
            .then(msg => {
              message.delete({ timeout: 10000 })
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            return
        }
    }
}