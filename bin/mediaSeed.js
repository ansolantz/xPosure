// bin/seed.js

const mongoose = require('mongoose');
const MediaData = require('../models/media');

const dbName = 'xPosure';
mongoose.connect(`mongodb://localhost/${dbName}`);

const mediaData = [
  {
    url: {
      thumbnail: "http://",
      full_size: "http://",
    },
    meta: {
      media_type: String,
      timestamp: true,
      geolocation: [Number],
      camera: String,
      description: String
    },
    creatorId: String,
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  },
  {
    title: "Harry Potter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "J.K. Rowling ",
    rating: 9
  },
]


const mediaSchema = new Schema({
  url: {
    thumbnail: String,
    full_size: String
  },
  meta: {
    media_type: String,
    timestamp: true,
    geolocation: [Number],
    camera: String,
    description: String
  },
  creatorId: String,
  visibility: true,
  likes: [],
  saves: [],
  filtertags: []
});




MediaData.create(user, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${mediaData.length} media data`)
  mongoose.connection.close();
});