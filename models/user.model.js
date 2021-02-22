const mongoose = require('mongoose')

const user = mongoose.Schema({
    discordID: String,
    minecraftNick: String,
})

module.exports = mongoose.model('user', user)