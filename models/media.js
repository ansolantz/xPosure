'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaSchema = require('./metaSchema');

const mediaSchema = new Schema({
  standard_resolution: String,
  /* url: {
    thumbnail: String,
    full_size: String
  }, */
  meta: {
    type: metaSchema
  },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  visibility: { type: Boolean, default: true },
  likes: [],
  saves: [],
  tags: [],
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
