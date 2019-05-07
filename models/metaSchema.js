'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema constructor

// CREATE A SCHEMA
const metaSchema = new Schema({
  media_type: String,
  geolocation: [Number],
  camera: String,
  description: String
});

// EXPORT SCHEMA (for use in another file)
module.exports = metaSchema;
