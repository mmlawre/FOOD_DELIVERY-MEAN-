const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    },
    date:{
      type: Date
    },
    userID: {
      type: String
    },
    messageID: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;