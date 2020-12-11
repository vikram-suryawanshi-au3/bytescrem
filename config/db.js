const mongoose = require('mongoose')
require('dotenv').config()
//const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-aa0fc.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xm3cn.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Database connected successfuly...!")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB