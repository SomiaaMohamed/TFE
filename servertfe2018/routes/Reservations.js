const express = require("express")
const reservations = express.Router()
const cors = require("cors")
const Produit = require("../models/Produit")
const User = require("../models/User")
const Reservation = require("../models/Reservation")
reservations.use(cors())

process.env.SECRET_KEY = 'secret'

reservations.get('/getAll', (req, res) => {
    Reservation.find().then(
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

reservations.get('/getByUser/:id', (req, res) => {
    Reservation.find({ user: req.params.id }).then(
        reser => {
            if (reser) {
                let test
                for(let r of reser){
                    Produit.find({_id:r.produit}).then(
                        re=>{
                            r.produit=re
                            console.log(r)
                        }
                    )

                }
                console.log(test)
                res.json(reser)
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




reservations.post('/create', (req, res) => {
    Produit.find({_id:req.body.produit}).then(
        re=>{
            const reserData = {
                user: req.body.user,
                idp:req.body.produit,
                produit:re[0],
            }
            // console.log(req.body.user)
            // console.log(req.body.produit)
            Reservation.create(reserData)
            .then(reser => {
               res.json(reser)
            })
            .catch(err => {
                res.send('error :' + err)
            })
        }
    )
})


reservations.post('/confirmation/:id', (req, res,next) => {
    Reservation.findOne({
        "idp":req.params.id
    }).then(
        re=>{
            User.findOne({_id:re.user})
            .exec()
            .then(u => {
                const today = new Date()
                const reserv = {
                    name: re.produit.name,
                    produitImage:re.produit.produitImage,
                    created: today,
                }
                u.recu.push(reserv)
                u.save().then(ress => {
                    User.findOne({_id: re.produit.user}).then(u2 => {
                        
                        u2.donne.push(reserv)
                       u2.save().then(r => {
                           //res.json({reserv})
                           Produit.deleteOne({_id:re.idp})
                           .then(p => {
                               Reservation.deleteOne({_id:re._id})
                               .then(t=> {
                                   res.status(200).json({
                                       message:"conformer"
                                   })
                               })
                           })
                       })
                    }).catch(err => {
                        res.send("error" + err)
                    })




                }).catch(err => {
                    res.send("error" + err)
                })
                
            }).catch(err => {
                res.send("error" + err)
            })
        }
    ).catch(err => {
        res.send("error" + err)
    })
})


reservations.delete('/:id', (req, res) => {

    //Reservation.find
    Reservation.findOneAndDelete({
        idp: req.params.id
    }).then(
        reser => {
            res.json(reser)
        }
    ).catch(err => {
        res.send("error" + err)
    })
})



module.exports = reservations