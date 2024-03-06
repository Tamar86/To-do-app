//require the mongoose model to define schema and model
const mongoose = require("mongoose");
//create a schema for the user which consists of username and email
//username and email both required and unique
const userSchema = {
  password: {
    type: String,
    required: true,
    
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
};
//exporting User model so that it can be used in other parts of the application
module.exports = mongoose.model("User", userSchema);
