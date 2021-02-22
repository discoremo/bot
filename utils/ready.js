const Discord = require("discord.js")

module.exports = client => { 
    console.log(`${client.user.username} jest online.`)
	client.user.setPresence({
        status: "idle",
        activity: {
            name: "Discord Kolegow",
            type: 'WATCHING'
        }
    })
	setInterval(async () => {
        client.user.setPresence({
            status: "idle",
            activity: {
                name: `Discord Kolegow`,
                type: 'WATCHING',
            }
        })
    }, 10000)
}