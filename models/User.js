const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

let UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    dob : {
        type: Date,
        required: true,
    }
})

let User = mongoose.model('User', UserSchema)

module.exports = User