const mongoose = require("mongoose");

const repScema = mongoose.Schema({
  userID: String,
  serverID: String, 
  rep: Number
})

module.exports = mongoose.model("rep", repScema)