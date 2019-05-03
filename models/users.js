'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  passwordHash: String,
  profile : {
    bio: String,
    image: String,
    location: String
  },
  media: [],
  followers: [],
  following: [],
  likes: [],
  saved: [],
  activityLog: [],
  timestamp: {
    created_at: "created_at",
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 