'use strict';

const multer = require('multer');
const cloudinary = module.require('cloudinary');
const cloudinaryConfig = require('./cloudinary-config');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'xposure',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
