// bin/seed.js

const mongoose = require('mongoose');
const Book = require('../models/user');

const dbName = 'xPosure';
mongoose.connect(`mongodb://localhost/${dbName}`);

const user = [
  {
    firstName: "Sara",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Suzanne Collins",
    rating: 10
  },
  {
    title: "Harry Potter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "J.K. Rowling ",
    rating: 9
  },
]



const userSchema = new Schema({
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
  timestamp: {
    joined: Date,
    activityLog: []
  }
});

User.create(user, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${user.length} users`)
  mongoose.connection.close();
});