const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const checkAuth = require('../middleware/check-auth')

const User = require("../models/User")
const Produit = require("../models/Produit")
const Conversation = require("../models/Conversation")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        admin: req.body.admin,
        password: req.body.password,
        created: today,
        name:req.body.first_name +' '+req.body.last_name,
        newMessage:false,
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ succes: true })
                        })
                        .catch(err => {
                            res.send('error : ' + err)
                        })
                })

            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error : ' + err)
        })
})


users.post('/login', (req, res) => {

    User.findOne({
        email: req.body.email,
    })



        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        admin: user.admin,
                        newMessage:user.newMessage,
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: '1000h'
                    })
                    let admin = user.admin
                    res.json({ succes: true, token, user, admin,user.password ,})
                    if(user.newMessage){
                        user.newMessage=false,
                        user.save()
                        console.log(user)
                    }
                   

                } else {

                    res.json({ succes: false, error: "user does not exist" })
                }
            } else {
                res.json({ succes: false, error: "user does not exist  2222" })
            }
        })
        .catch(err => {
            res.send('error  laaaa:' + err)
        })
})

users.get('/profile', (req, res) => {
    var decod = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    if (req.succes) {
        User.findOne({
            _id: decod._id
        })
            .then(user => {
                if (user) {
                    res.json(user)
                } else {
                    res.send("User does not exist")
                }

            })
            .catch(err => {
                res.send('error :' + err)
            })
    }
})


users.get('/getAll',(req, res,next) => {
    User.find().then(
        user => {
            if (user) {
                res.json(user)
            }
            else {
                res.send("error")
            }
        }
    )
        .catch(err => {
            res.send("error :" + err)
        })
})


users.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;

            user.save().then(user => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

users.get('/getOne/:email', (req, res) => {
    User.findOne({ email: req.params.email }).then(
        user => {
            if (user) {
                res.json(user)
            }
            else {
                res.send("user does not exist")
            }
        }
    )
        .catch(err => {
            res.send("error :" + err)
        })
})


users.delete('/:id', (req, res) => {
    User.findOneAndDelete({
        _id: req.params.id
    }).then(
        user => {
            if (user) {
                Produit.deleteMany({
                    user: req.params.id
                }).then(produit => {
                    Conversation.deleteMany({ $or: [ {"user1.email":user.email} , {"user2.email":user.email }] })
                    .then(r => {
                        
                    })

                })
                res.json(user)
            }
            else {
                res.send("user does not exists")
            }
        }
    ).catch(err => {
        res.send("error" + err)
    })
})

module.exports = users