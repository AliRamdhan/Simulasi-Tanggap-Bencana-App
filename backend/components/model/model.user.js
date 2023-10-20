const mongoose = require("mongoose");

const userSchema = mongoose.model("user", {
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

module.exports = userSchema;
