const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = require("../models/User")
const produit = require("../models/Produit")
const ObjectId = Schema.Types.ObjectId;
const ReservationSchema = new Schema({
    user: {
        type: ObjectId, ref: 'user'
    },
    produit: {
        type: Object, ref: 'user'
    },
    idp:{
        type: ObjectId, ref: 'user'
    },
    

}
)
module.exports = Reservation = mongoose.model('reservation',ReservationSchema)