const Discord = require('discord.js');
const userModel = require("../../models/user.model");
const fs = require("fs");
const { request } = require('http');
const fetch = require('node-fetch');
const config = require("../../config.json")

module.exports = {
    name: "cape",
    description: "Nadaje graczu pelerynke w Minecraft",
    permisja: "Brak Permissji",
    usage: "!cape < id pelerynki >",
    run: async (client, message, args) => {
        if (message.channel.id === config.kanal_cape) {
            let check_userModel = await userModel.findOne({discordID: message.author.id});
            if(check_userModel) {
                let id_pele_do_nadania = args[0];
                if(!id_pele_do_nadania) {
                    const brak_podanego_id_pele_embed = new Discord.MessageEmbed()
                    .setColor('ad00ff')
                    .setTitle('KolegaBot - Nadawanie')
                    .setDescription(`<:flag_pl:804053248377880607> > **Musisz podać id pelerynki.** \n<:flag_gb:804053650561040394> > **You must provide a Cape ID**`)
                    .setTimestamp()  
                    .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
                    message.channel.send(brak_podanego_id_pele_embed)
                    .then(msg => {
                      message.delete({ timeout: 10000 })
                      msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                    return  
                }

                if(id_pele_do_nadania == "Fame" || id_pele_do_nadania == "DISCOREMO" || id_pele_do_nadania == "cape1" || id_pele_do_nadania == "cape2" || id_pele_do_nadania == "cape3" || id_pele_do_nadania == "cape4" || id_pele_do_nadania == "cape5" || id_pele_do_nadania == "cape6" || id_pele_do_nadania == "cape7" || id_pele_do_nadania == "cape8" || id_pele_do_nadania == "cape9" || id_pele_do_nadania == "cape10" || id_pele_do_nadania == "cape11" || id_pele_do_nadania == "cape12" || id_pele_do_nadania == "cape13" || id_pele_do_nadania == "cape14" || id_pele_do_nadania == "cape15" || id_pele_do_nadania == "cape16" || id_pele_do_nadania == "cape17" || id_pele_do_nadania == "cape18" || id_pele_do_nadania == "cape19" || id_pele_do_nadania == "cape20" || id_pele_do_nadania == "cape21" || id_pele_do_nadania == "cape22" || id_pele_do_nadania == "cape23" || id_pele_do_nadania == "cape24" || id_pele_do_nadania == "cape25" || id_pele_do_nadania == "cape26" || id_pele_do_nadania == "cape27" || id_pele_do_nadania == "cape28" || id_pele_do_nadania == "cape29" || id_pele_do_nadania == "cape30" || id_pele_do_nadania == "cape31" || id_pele_do_nadania == "cape32" || id_pele_do_nadania == "cape33" || id_pele_do_nadania == "cape34" || id_pele_do_nadania == "cape35" || id_pele_do_nadania == "cape36" || id_pele_do_nadania == "cape37" || id_pele_do_nadania == "cape38" || id_pele_do_nadania == "cape39" || id_pele_do_nadania == "cape40" || id_pele_do_nadania == "cape41" || id_pele_do_nadania == "cape42" || id_pele_do_nadania == "cape43" || id_pele_do_nadania == "cape44" || id_pele_do_nadania == "cape45" || id_pele_do_nadania == "cape46" || id_pele_do_nadania == "cape47" || id_pele_do_nadania == "cape48" || id_pele_do_nadania == "cape49" || id_pele_do_nadania == "cape50" || id_pele_do_nadania == "cape51" || id_pele_do_nadania == "cape52" || id_pele_do_nadania == "cape53" || id_pele_do_nadania == "cape54" || id_pele_do_nadania == "cape55" || id_pele_do_nadania == "cape56" || id_pele_do_nadania == "cape57" || id_pele_do_nadania == "cape58" || id_pele_do_nadania == "cape59" || id_pele_do_nadania == "cape60" || id_pele_do_nadania == "cape61" || id_pele_do_nadania == "cape62" || id_pele_do_nadania == "cape63" || id_pele_do_nadania == "cape64" || id_pele_do_nadania == "cape65" || id_pele_do_nadania == "cape66") {
                    let nick_minecraft_baza = check_userModel.get('minecraftNick');
                    let link_do_pelerynki = `http://51.83.180.220/123222/${id_pele_do_nadania}.png`

                    async function download_cape() {
                        const response = await fetch(link_do_pelerynki);
                        const buffer = await response.buffer();
                        fs.writeFile(`../../var/www/html/capes/${nick_minecraft_baza}.png`, buffer, () => 
                        console.log(`Nadano pelerynko o id: ${id_pele_do_nadania} na nick: ${nick_minecraft_baza}`));
                    }
                    download_cape()
					
					message.guild.channels.cache.get("812454951934230599").send(`Nadano pelerynko o id: ${id_pele_do_nadania} na nick: ${nick_minecraft_baza}`)
					
                    const nadano_pelerynke_embed = new Discord.MessageEmbed()
                    .setColor('00fc15')
                    .setTitle('KolegaBot - Nadawanie')
                    .setDescription(`**PL: Pomyślnie nadano pelerynkę.**\n**EN: The cape was successfully handed over.**`)
                    .addField("**PL: Pelerynka:**", `\`${id_pele_do_nadania}\``)
                    .addField("**EN: Cape:**", `\`${id_pele_do_nadania}\``)
                    .addField("**PL: Nick:**", `\`${nick_minecraft_baza}\``)
                    .addField("**EN: Nicknames:**", `\`${nick_minecraft_baza}\``)
                    .setTimestamp()  
                    .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
                    message.channel.send(nadano_pelerynke_embed)
                    .then(msg => {
                      message.delete({ timeout: 10000 })
                      msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                    return 
                } else if(id_pele_do_nadania == "bee" || id_pele_do_nadania == "np") {
                  let nick_minecraft_baza = check_userModel.get('minecraftNick');
                  let link_wyglond_items = `http://51.83.182.187/czolki/${id_pele_do_nadania}.png`
                  let link_wyglond_nickcfg = `http://51.83.182.187/czolki/nick_${id_pele_do_nadania}.cfg`

                  async function download_wyglond() {
                    const response = await fetch(link_wyglond_items);
                    const buffer = await response.buffer();
                    fs.writeFile(`../../var/www/html/items/hat_${id_pele_do_nadania}/users/${nick_minecraft_baza}.png`, buffer, () => 
                    console.log(`Nadano dodatek o id: ${id_pele_do_nadania} na nick: ${nick_minecraft_baza}`));
                  }
                  async function download_nickcfg() {
                    const response = await fetch(link_wyglond_nickcfg);
                    const buffer = await response.buffer();
                    fs.writeFile(`../../var/www/html/users/${nick_minecraft_baza}.cfg`, buffer, () => 
                    console.log(`Nadano dodatek o id: ${id_pele_do_nadania} na nick: ${nick_minecraft_baza}`));
                  }
                  download_wyglond()
                  download_nickcfg()

                  const nadano_pelerynke_embed = new Discord.MessageEmbed()
                    .setColor('00fc15')
                    .setTitle('KolegaBot - Nadawanie')
                    .setDescription(`**PL: Pomyślnie nadano dodatek.**\n**EN: The add-on has been successfully distributed.**`)
                    .addField("**PL: Dodatek:**", `\`${id_pele_do_nadania}\``)
                    .addField("**EN: add-on:**", `\`${id_pele_do_nadania}\``)
                    .addField("**PL: Nick:**", `\`${nick_minecraft_baza}\``)
                    .addField("**EN: Nicknames:**", `\`${nick_minecraft_baza}\``)
                    .setTimestamp()  
                    .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
                    message.channel.send(nadano_pelerynke_embed)
                    .then(msg => {
                      message.delete({ timeout: 10000 })
                      msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                    return
                } else {
                    const nie_znaleziono_pele_o_takim_id_embed = new Discord.MessageEmbed()
                    .setColor('ff0d00')
                    .setTitle('Juice Cape - Nadawanie')
                    .setDescription(`**PL: Nie znaleziono pelerynki / dodatku o takim id.**\n**EN: No cloak / accessory with this ID was found.**`)
                    .setTimestamp()  
                    .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
                    message.channel.send(nie_znaleziono_pele_o_takim_id_embed)
                    .then(msg => {
                      message.delete({ timeout: 10000 })
                      msg.delete({ timeout: 10000 })
                    })
                    .catch(console.error);
                    return 
                }
            } else {
                const brak_zajetego_nicku_embed = new Discord.MessageEmbed()
                .setColor('ff0d00')
                .setTitle('KolegaBot - Nadawanie')
                .setDescription(`**PL: Musisz zając nick aby nadać pelerynkę.**\n**EN: To make a cape you will need a nickname.**`)
                .setTimestamp()  
                .setFooter(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL());
                message.channel.send(brak_zajetego_nicku_embed)
                .then(msg => {
                  message.delete({ timeout: 10000 })
                  msg.delete({ timeout: 10000 })
                })
                .catch(console.error);
                return 
            }
        } else {
            const zly_kanal_komendy_embed = new Discord.MessageEmbed()
            .setColor('ff0d00')
            .setTitle('KolegaBot - Nadawanie')
            .setDescription(`**PL: Kanał do nadania pelerynki to:** <#812454951934230599>\n**EN: The cape donation channel is:** <#812454951934230599>`)
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
