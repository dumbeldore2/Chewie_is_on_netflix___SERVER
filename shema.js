const mongoose = require('mongoose')
const schema = mongoose.Schema({
    _id: Number,
    naam: String,
    plaats: Number,
    date: String
})

module.exports = mongoose.model('shema',schema)