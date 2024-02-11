const newWhatsappModel = require('./dbmessages');
const express=require('express')
const app=express();
const dotenv=require('dotenv');
const path=require('path');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});
const Pusher = require('pusher');
const cors = require('cors');

const pusher = new Pusher({
    appId: "1684156",
    key: "b23d9a8e17fbcbb1d555",
    secret: "f9a34fffc6fec483db3f",
    cluster: "eu",
    useTLS: true
  });
  
app.use(express.json());//middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.get('/',(req,res)=>{
res.status(200).send("hello dude");
})
app.get('/messages/sync', async (req, res) => {
    try {
      if (isBlocked) {
        return res.status(403).send("Messaging is blocked in this chat room");
      }
      // Rest of the code for syncing messages
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post('/messages/new',async(req,res)=>{

    const dbMessage=req.body;
    dbMessage.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    try {
        const createdMessage = await newWhatsappModel.create(dbMessage);
        await newWhatsappModel.updateOne(
            { roomTitle: dbMessage.roomTitle },
            { lastSeen: dbMessage.timestamp }
        );
        res.status(201).send("success");
    } catch (err) {
        res.status(500).send(err);
    }
    })
// app.post('/messages/new', async (req, res) => {
//     try {
//       const { roomTitle, message } = req.body;
//       const chatRoom = await newWhatsappModel.findOne({ roomTitle: roomTitle });
  
//       if (!chatRoom) {
//         return res.status(404).send("Chat room not found.");
//       }
  
//       if (chatRoom.isBlocked) {
//         return res.status(403).send("Messaging is blocked in this chat room");
//       }
  
//       const dbMessage = {
//         ...req.body,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
  
//       const createdMessage = await newWhatsappModel.create(dbMessage);
//       await newWhatsappModel.updateOne(
//         { roomTitle: dbMessage.roomTitle },
//         { lastSeen: dbMessage.timestamp }
//       );
  
//       return res.status(201).send("success");
//     } catch (error) {
//       console.error('Error sending message:', error);
//       return res.status(500).send("Internal server error");
//     }
//   });
  

    
    mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");

        // Define 'db' within the scope of the promise callback
        const db = mongoose.connection;

        const msgCollection = db.collection("whatsappcollections");
        const changeStream = msgCollection.watch();
 
        changeStream.on("change", (change) => {
            console.log("A Change Occurred", change);
            if (change.operationType === "insert") {
                const messageDetails = change.fullDocument;
                pusher.trigger('messages', 'inserted', { // Add the missing curly braces for the third argument
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    roomTitle:messageDetails.roomTitle,
                    received:messageDetails.received,
                  
                });
            } else {
                console.log('Error triggering Pusher');
            }
            
        });

        changeStream.on("error", (error) => {
            console.error("Change Stream Error:", error);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
    // app.delete('/messages/delete', async (req, res) => {
    //     try {
    //         // Use the remove() method to delete all documents in the collection
    //         const deleteResult = await newWhatsappModel.deleteMany({});
            
    //         // Check if any documents were deleted
    //         if (deleteResult.deletedCount > 0) {
    //             res.status(200).json({ message: 'All data deleted successfully.' });
    //         } else {
    //             res.status(404).json({ message: 'No data found to delete.' });
    //         }
    //         dbMessage.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // });
    app.delete('/messages/delete/:roomTitle', async (req, res) => {
        try {
            const { roomTitle } = req.params;
            // Use the deleteMany() method to delete all documents matching the roomTitle
            const deleteResult = await newWhatsappModel.deleteMany({ roomTitle: roomTitle });
    
            // Check if any documents were deleted
            if (deleteResult.deletedCount > 0) {
                res.status(200).json({ message: `All chat data for room ${roomTitle} deleted successfully.` });
            } else {
                res.status(404).json({ message: `No chat data found for room ${roomTitle}.` });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    //block and unblock
    app.put('/messages/block/:roomTitle', async (req, res) => {
        try {
            const { roomTitle } = req.params;
            isBlocked = true; // update the blocking state
            res.status(200).json({ message: `Chat room ${roomTitle} has been blocked.` });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
      });
      
      
    app.put('/messages/unblock/:roomTitle', async (req, res) => {
        try {
            const { roomTitle } = req.params;
            isBlocked = false; // update the blocking state
            res.status(200).json({ message: `Chat room ${roomTitle} has been unblocked.` });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    
//end of block and unblock
app.listen(3000,()=>{
    console.log("connecting dude");
})