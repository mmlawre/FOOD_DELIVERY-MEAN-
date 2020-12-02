const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventory");
const customerRoutes = require("./routes/customer");
const app = express();
const  Chat  = require("./models/ChatSchema");
const http = require('http').Server(app);
const io = require('socket.io')(http,  {
  cors: {
    origin: "*",
  }});

let messageList = [];
require("dotenv").config();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to food delivery application." });
});
app.use("/api/users", userRoutes);
app.use("/api", inventoryRoutes)
app.use("/api", customerRoutes)

/**
 * db connection part
 */
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    Chat.find({}).then(history_message => {
      messageList = history_message;
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/**
 * 
 */
const randomMessages = [
  'Nice to meet you',
  'We now support Angular 10!',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'Is there anything else I can help you with?',
  'That\'s awesome',
  'Can you explain in more detail?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure to chat with you',
  'We are happy to make you a custom offer!',
  'Bye',
  ':)',
]

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new-message', (data) => {   
    let s=0;
    let rand = max => Math.floor(Math.random() * max)
    for (let i=0; i < 1000000000; i++){
      s=s*1;
    }
    let date= new Date().getTime();
    var messageID = data.userID+date;
    let replyMessage = { message : randomMessages[rand(randomMessages.length)],  date: date, userID : data.userID, sender: 'support', messageID:messageID}
   
    let receivedMessage =  new Chat({ message: data.message, sender: data.sender, messageID: data.messageID, date: data.date});
    receivedMessage.save();
    let sendMessage  =  new Chat({ message: replyMessage.message, sender: replyMessage.sender, messageID: replyMessage.messageID, date: replyMessage.date});
    sendMessage.save().then(()=>{
      io.emit("reply-message", {receive_message: sendMessage });
    })
  })

  /**
   * 
   */
    socket.on('get_history', () => {
      //----------- after receive message save to DB------------//
      Chat.find({}).then(history_message => {
        messageList = history_message   
      });
      io.emit('history', {datas: messageList});
    });

    /**
     * delete
     */
    socket.on('delete',(id)=>{
      Chat.deleteOne({ messageID: id }).then(result => {
        console.log('deleted ')
        Chat.find({}).then(history_message => {
          messageList = history_message
          io.emit('delete_message_item', {messageID: id});
        });
      })
    });
    /**
   * 
   */
  socket.on('update-message', (update_data) => {
    Chat.updateOne({ messageID: update_data.messageID }, {$set:{message: update_data.message}}).then(result => {
      Chat.find({}).then(history_message => {
        messageList = history_message
        io.emit('update_message_item', update_data);
      });
    });
    //----------- after receive message save to DB------------//
    // Chat.find({}).then(history_message => {
    //   messageList = history_message   
    // });
    // console.log('history', messageList.length)
    // io.emit('history', {datas: messageList});
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

