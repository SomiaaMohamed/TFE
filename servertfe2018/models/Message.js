const mongoose = require("mongoose")
const Schema = mongoose.Schema
const user = require("./User");
const conversation = require("./Conversation")
const ObjectId = Schema.Types.ObjectId;
const object = Schema.Types.Object;

const MessageSchema = new Schema({

    text: {
        type: String,
    },
    user: {
        type: object, ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    conversation: {
        type: ObjectId, ref: 'conversation'
    },
}
)
module.exports = Message = mongoose.model('message', MessageSchema)