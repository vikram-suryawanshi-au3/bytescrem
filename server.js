const express = require ('express')
const app = express()
const PORT = process.env.PORT || 5000
const  connectDB  = require('./config/db')
//const userRoute = require('./routes/user')
//var cookieParser = require('cookie-parser');
//const auth = require('./config/auth')
const User = require('./models/User')
var cors = require('cors')

 
app.use(cors())

connectDB()

// app.use(cookieParser('my secret'));
//app.use(cookieParser());

app.use(express.json({extended : false}))

//app.use('/user', userRoute)

app.get('/', (req,res) => {
    res.send("home page")
})

app.post('/add', async (req,res) => {
    let {name, dob} = req.body
    try {
        // let user = await User.findOne({email})
        // if(user){
        //     res.status(400).json({error:[{msg : 'you have already registered'}]})
        // }
        
        let  user = new User({name, dob})

        
        await user.save()
        res.send('user registered successfully')
        
    } catch (error) {
        console.error(error)
        res.status(500).send('server error')
    }
})

app.post('/find', async (req,res) => {
    let {dob, name}  = req.body
    let date = new Date(dob)
    try {
        console.log(date)
        //let  user = await User.find({$or:[{dob: date},{ name: { "$regex": name, "$options": "i" } }]},)
        let  user = await User.find({$or:[{dob: dob},{name:name}]})
        res.json(user)
        
    } catch (error) {
        console.error(error)
        res.status(500).send('server error')
    }
})

app.get('/all', async(req,res) => {
    let users = await User.find({})
    res.json(users)
})

// app.get('/cookie', (req,res) => {
//     console.log('cookieeeeeeeeeeeeeeeee')
//     console.log(req.cookies)
//     res.json(req.cookies)
// })

// app.get('/hello', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id)
//         let name = user.name
//         res.json(name)
//         // console.log('in route /a')
//     } catch (error) {
//         res.status(500).send('server error')
//     }
// })


app.listen(PORT, () => {console.log(`server running on ${PORT}`)})