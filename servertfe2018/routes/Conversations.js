const express = require("express")
const conversations = express.Router()
const cors = require("cors")

const Conversation = require("../models/Conversation")
conversations.use(cors())

process.env.SECRET_KEY = 'secret'
const User = require("../models/User")


conversations.get('/getConUser/:email', (req, res) => {
    Conversation.find({ $or: [ {"user1.email":req.params.email} , {"user2.email":req.params.email }] }).then(
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




conversations.get('/getAll', (req, res) => {
    Conversation.find().then(
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

conversations.post('/create', (req, res) => {

// Conversation.find({ $or: [ {"user1._id":req.body.user1} , {"user2._id":req.body.user1 }] })
// .then(
//     con => {
//         res.json({con})
//        //console.log(user1._id)
//     }

// )
// .catch(error => {
//     console.log("eror")
// })


// $or: [ {"user1.email":conData.user1.email} , {"user2.email":conData.user1.email }]   

// $or: [ {"user1.email":conData.user2.email} , {"user2.email":conData.user2.email }]  

// $and: [ { $or: [ {"user1.email":conData.user2.email} , {"user2.email":conData.user2.email }]   } , {$or: [ {"user1.email":conData.user1.email} , {"user2.email":conData.user1.email }]  }]  





   User.findById(req.body.user1)
   .then(use1=>{
      User.findById(req.body.user2)
      .then(use2=> {
          conData = {
              user1:use1,
              user2:use2,
          }
          Conversation.find({ $and: [ { $or: [ {"user1.email":conData.user2.email} , {"user2.email":conData.user2.email }]   } , {$or: [ {"user1.email":conData.user1.email} , {"user2.email":conData.user1.email }]  }]  })
          .then(c=> {
            if(c.length>0){
                let con=c[0]
                res.json( { con } )
            }
            else{
                Conversation.create(conData)
        .then(con => {
            res.json({ con })
        })
            }


          //res.json({con})
          })
        // Conversation.create(conData)
        // .then(con => {
        //     res.json({ con })
        // })
        // .catch(err => {
        //     res.send('error :' + err)
        // })
      })
   })
   
})



module.exports = conversations