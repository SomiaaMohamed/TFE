const express = require("express")
const messages = express.Router()
const cors = require("cors")
const Message = require("../models/Message")
messages.use(cors())
const User = require("../models/User")
const Conversations = require("../models/Conversation")
process.env.SECRET_KEY = 'secret'

messages.get('/getAll', (req, res) => {
    Message.find().then(
        con => {
            if (con) {

                res.json(con)
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

messages.post('/getByConversation/:id', (req, res) => {
    Message.find({ conversation:req.params.id}).then(
        messages => {
            if (messages) {

                Conversations.findByIdAndUpdate(req.params.id)
                .then(con=> {
                    // console.log(req.body.email)
                    // console.log(con.lastSender)
                    if(req.body.email!==con.lastSender && con.newMessage){
                         con.newMessage=false,
                         con.lastSender='',
                         con.save()
                    }

                //    con.newMessage=false,
                //    con.save()
                })

                res.json(messages)
                
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



messages.post('/create', (req, res) => {
    const today = new Date()
    
    User.find({ _id: req.body.user })
    .then(user=>{

        Conversations.findByIdAndUpdate({ _id:req.body.conversation })
        .then(conver => {
            conver.newMessage=true,
            conver.lastSender=user[0].email,
            conver.save()
            .then(


                
            )
            if(conver.user1.email == user[0].email){
                conver.user2.newMessage=true;
               User.findByIdAndUpdate( conver.user2._id,conver.user2)
               .then(receveir=> {
                   receveir.save()
                   .then()
               })

            }
            else if(conver.user2.email == user[0].email){
                conver.user1.newMessage=true;
                User.findByIdAndUpdate(conver.user1._id,conver.user1)
                .then(receveir=> {
                    receveir.save()
                    .then()
                })
            }
            //res.json(conver)
        })
        
        const conData = {
            user: user[0],
            text: req.body.text,
            conversation: req.body.conversation,
            createdAt: today,
        }




        Message.create(conData)
        .then(con => {
            res.json({ con })
        })
        .catch(err => {
            res.send('error :' + err)
        })


    })
    
   
   
})



module.exports = messages