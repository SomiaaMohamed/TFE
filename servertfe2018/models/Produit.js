const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = require("../models/User")
const categorie = require("../models/Categorie")
const ObjectId = Schema.Types.ObjectId;
const ProduitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    produitImage: {
        type: String
    },
    reservation: {
        type: Boolean
    },
    user: {
        type: ObjectId, ref: 'user'
    },
    categorie: {
        type: ObjectId, ref: 'categorie'
    },
    lieu:{
        type: String,
        required : true,
    }

}

)
module.exports = Produit = mongoose.model('produits', ProduitSchema)