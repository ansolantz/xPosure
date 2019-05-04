'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  url: {
    thumbnail: String,
    full_size: String
  },
  meta: {
    media_type: String,
    timestamp: Number,
    geolocation: [Number],
    camera: String,
    description: String
  },
  creatorId: String,
  visibility: Boolean,
  likes: [],
  saves: [],
  filtertags: []
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
