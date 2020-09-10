const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CategorieSchema = new Schema({
name:{
    type: String,
    required: true
},
confirmer: {
    type: Boolean
},
user:{
    type:String,
}

}
)
module.exports = Categorie = mongoose.model('categorie',CategorieSchema)