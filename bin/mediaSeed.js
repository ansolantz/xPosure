// bin/seed.js

const mongoose = require('mongoose');
const MediaData = require('../models/media');

const dbName = 'xPosure';
mongoose.connect(`mongodb://localhost/${dbName}`);

const mediaData = [
  {
    url: {
      thumbnail: "https://drive.google.com/drive/folders/11I0vClIgvHBgG9khrfoThEreJLZObhIj",
      full_size: "https://drive.google.com/drive/folders/11I0vClIgvHBgG9khrfoThEreJLZObhIj",
    },
    meta: {
      media_type: String,
      timestamp: true,
      geolocation: [41 3977 2 1906],
      camera: "iPhone 6s",
      description: String
    },
    creatorId: "",
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  }

]




MediaData.create(user, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${mediaData.length} media data`)
  mongoose.connection.close();
});