const express = require("express")
const produits = express.Router()
const cors = require("cors")
const bcrypt = require("bcrypt")
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }

}


const upload = multer({
    storage: storage
});


const Produit = require("../models/Produit")
const User = require("../models/User")
produits.use(cors())

process.env.SECRET_KEY = 'secret'




produits.get('/getAll', (req, res) => {
    Produit.find({ reservation: false }).then(
        produit => {
            if (produit) {

                res.json(produit)
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

produits.get('/getAllT/:id', (req, res) => {
    Produit.find({ $and: [{ reservation: false }, { user: { $ne: req.params.id } }] }).then(
        produit => {
            if (produit) {

                res.json(produit)
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

produits.get('/getByUser/:id', (req, res) => {
    Produit.find({ user: req.params.id }).then(
        produit => {
            if (produit) {
                res.json(produit)
            }
            else {
                res.send("produit does not exist")
            }
        }
    )
        .catch(err => {
            res.send("error :" + err)
        })
})


produits.delete('/:id', (req, res) => {

    //Reservation.find
    Produit.findOneAndDelete({
        _id: req.params.id
    }).then(
        pro => {
            res.json(pro)
        }
    ).catch(err => {
        res.send("error" + err)
    })
})


produits.get('/getUser/:id', (req, res) => {
    User.findById(req.params.id).then(
        user => {
            if (user) {
                res.json(user)
            }
            else {
                res.send("produit does not exist")
            }
        }
    )
        .catch(err => {
            res.send("error :" + err)
        })
})



produits.get('/getOne/:id', (req, res) => {
    Produit.findOne({ _id: req.params.id }).then(
        produit => {
            if (produit) {
                res.json(produit)
            }
            else {
                res.send("produit does not exist")
            }
        }
    )
        .catch(err => {
            res.send("error :" + err)
        })
})


produits.route('/reserver/:id').post(function (req, res) {
    Produit.findById(req.params.id, function (err, produit) {
        if (!produit)
            res.status(404).send("data is not found");
        else {
            produit.reservation = true;

            produit.save().then(produit => {
                res.json({ produit });
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

produits.route('/annulationRes/:id').post(function (req, res) {
    Produit.findById(req.params.id, function (err, produit) {
        if (!produit)
            res.status(404).send("data is not found");
        else {
            produit.reservation = false;

            produit.save().then(produit => {
                res.json('reservation  annuler');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

produits.post('/create', upload.single('produitImage'), (req, res) => {
    console.log(req.file);
    const produitData = {
        name: req.body.name,
        produitImage: req.file.path,
        user: req.body.user,
        reservation: false,
        categorie: req.body.categorie,
        lieu: req.body.lieu,
    }
    Produit.create(produitData)
        .then(produit => {
            res.json({ succes: true })
        })
        .catch(err => {
            res.send('error :' + err)
        })
})



module.exports = produits