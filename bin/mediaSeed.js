'use strict';
// bin/seed.js

const mongoose = require('mongoose');
const MediaData = require('../models/media');

const dbName = 'xposure';

mongoose.connect(`mongodb://localhost/${dbName}`);

const mediaData = [
  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/a00be57e204a763066e7459571e1a59f/5D5ECF42/t51.2885-15/e35/s150x150/49599996_287850275230445_8315107734324162031_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/87ec6420b5d389ec2aa5fa7aa33ffeb2/5D77FAE5/t51.2885-15/sh0.08/e35/s640x640/49599996_287850275230445_8315107734324162031_n.jpg?_nc_ht=scontent.cdninstagram.com'
    },
    meta: {
      media_type: 'image',
      timestamp: Date.now(),
      geolocation: [],
      camera: 'iPhone',
      description: 'Miami beach...'
    },
    creatorId: '39997228',
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  },
  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/6bdd69a39380f9cd7efc3bc65d7f7b94/5D551DED/t51.2885-15/e35/s150x150/49643354_567030180439776_478599841186570646_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/a67e17e478cb33773b71b511347e6ce9/5D5CC00C/t51.2885-15/sh0.08/e35/s640x640/49643354_567030180439776_478599841186570646_n.jpg?_nc_ht=scontent.cdninstagram.com'
    },
    meta: {
      media_type: 'image',
      timestamp: Date.now(),
      geolocation: [],
      camera: 'iPhone',
      description: 'Ocean drive'
    },
    creatorId: '39997228',
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  }
];

MediaData.create(mediaData, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${mediaData.length} media data`);
  mongoose.connection.close();
});
