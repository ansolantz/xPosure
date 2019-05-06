'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // USING INSTAGRAM SCHEMA
  displayName: String,
  homePage: String,
  image: String,
  bio: String,
  // END OF USING INSTAGRAM SCHEMA
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  passwordHash: String,
  profile: {
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
    createdAt: { type: Date, default: Date.now }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
