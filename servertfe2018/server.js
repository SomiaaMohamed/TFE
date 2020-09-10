///git push origin HEAD:master
var express = require("express")
var cors= require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 6000
const User = require("./models/User")
const bcrypt = require("bcrypt")

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
const adminData = {
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@gmail.com',
    admin:true,
    password: 'admin',
    name:'A D',
    created: new Date()
}

const mongoURI='mongodb://127.0.0.1/msn';

mongoose
    .connect(mongoURI,{useNewUrlParser:true})
    .then(() => {
    
    console.log("MongoDB conntected")
    User.countDocuments({ email: 'admin@gmail.com' }).then(count => {
        if (count === 0) {
            console.log("creation admin account")
            bcrypt.hash(adminData.password, 10, (err, hash) => {
                adminData.password = hash
                User.create(adminData)
                console.log("admin created")
            })
        }




    });

}
    
    
    )
    .catch(err => console.log(err))

    var Users=require('./routes/Users')
    var Produits=require('./routes/Produits')
    var Categories=require('./routes/Categories')
    var Conversations=require('./routes/Conversations')
    var Messages=require('./routes/Messages')
    var Reservations=require('./routes/Reservations')


    app.use('/users',Users)
    app.use('/uploads',express.static('uploads'))
    app.use('/produits',Produits)
    app.use('/categories',Categories)
    app.use('/reservations',Reservations)
    app.use('/conversations',Conversations)
    app.use('/messages',Messages)

    app.listen(port,() => {
        console.log("server is running on port "+ port)
    })

