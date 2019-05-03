// bin/seed.js

const mongoose = require('mongoose');
const Book = require('../models/user');

const dbName = 'xPosure';
mongoose.connect(`mongodb://localhost/${dbName}`);

const user = [
  {
    firstName: "Test",
    lastName: "Test",
    email: "String",
    username: "String",
    passwordHash: "String",
    profile: {
      bio: "String",
      image: "String",
      location: "String"
    },
    media: [],
    followers: [],
    following: [],
    likes: [],
    saved: [],
    timestamp: {
      joined: Date,
      activityLog: []
    }
  }

]




User.create(user, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${user.length} users`)
  mongoose.connection.close();
});