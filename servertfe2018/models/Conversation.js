const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = require("./User")
const ObjectId = Schema.Types.ObjectId;
const ConversationSchema = new Schema({

  user1: {
        type: Object, ref: 'user'
    },
    user2: {
        type: Object, ref: 'user'
    },
    newMessage:{
        type : Boolean
    },
    lastSender:{
        type : String
    },


}
)
module.exports = Conversation = mongoose.model('conversation',ConversationSchema)