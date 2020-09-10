const express = require("express")
const categories = express.Router()
const cors = require("cors")
var nodemailer = require('nodemailer');
const checkAuth = require('../middleware/check-auth')


const Categorie = require("../models/Categorie")
categories.use(cors())

process.env.SECRET_KEY = 'secret'


categories.get('/getNonConfirmerByUser/:user',checkAuth, (req, res) => {
    Categorie.find({ $and: [ {user:req.params.user} , {confirmer:false }] }).then(
        cat => {
            if (cat) {

                res.json(cat)
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


categories.get('/getNonConfirmer',checkAuth, (req, res) => {
    Categorie.find({confirmer:false}).then(
        cat => {
            if (cat) {

                res.json(cat)
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


categories.get('/getAll',checkAuth, (req, res) => {
    Categorie.find({confirmer:true}).then(
        cat => {
            if (cat) {

                res.json(cat)
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

categories.route('/update/:id').post(function (req, res) {
    Categorie.findById(req.params.id, function (err, cat) {
        if (!cat)
            res.status(404).send("data is not found");
        else {

            res.json("categorie confirme")
           // console.log("update")
            cat.confirmer = true;

            cat.save().then(cat => {
                res.json('categorie Confiramé');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

categories.post('/create', (req, res) => {
    const catData = {
        name: req.body.name,
        user:req.body.user,
        confirmer:false,
    }
    Categorie.create(catData)
        .then(cat => {
            res.json({ cat })
            var transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                  user: 'donate2019@hotmail.com',
                  pass: '23425172V'
                }
              });
            
              var mailOptions = {
                from: 'donate2019@hotmail.com',
                to: 'medaminesomiia.1991@hotmail.com',
                subject: 'Sending Email using Node.js',
                text: 'new Catégorie was added with name ' + cat.name
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });



        })
        .catch(err => {
            res.send('error :' + err)
        })
})


categories.post('/createByAdmin', (req, res) => {
    const catData = {
        name: req.body.name,
        confirmer:true,
    }
    Categorie.create(catData)
        .then(cat => {
            res.json({ cat })
 
        })
        .catch(err => {
            res.send('error :' + err)
        })
})



module.exports = categories