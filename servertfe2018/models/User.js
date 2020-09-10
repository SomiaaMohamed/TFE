const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({


first_name:{
    type: String
},
last_name:{
    type: String
},
name:{
    type: String,
    required: true,
},
email:{
    type: String,
    required: true
},
password:{
    type : String,
    required : true
},
admin:{
    type : Boolean
},
newMessage:{
    type : Boolean
},
date:{
    type: Date,
    default : Date.now
},
donne:{
    type: Array,
},
recu:{
    type: Array,
},


})

module.exports = User = mongoose.model('users',UserSchema)