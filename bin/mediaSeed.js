'use strict';
// bin/seed.js

const mongoose = require('mongoose');
const MediaData = require('../models/media');
const dbName = require('./../config/db');

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
  },
  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/f711661097b92f465d3224cb2d08f9ca/5D601A1C/t51.2885-15/e35/s150x150/50638517_2489580381269122_4016921291859996824_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/56d86cf410e4d626da7dd764e5c62a0e/5D667599/t51.2885-15/sh0.08/e35/s640x640/50638517_2489580381269122_4016921291859996824_n.jpg?_nc_ht=scontent.cdninstagram.com'
    },
    meta: {
      media_type: 'image',
      timestamp: Date.now(),
      geolocation: [],
      camera: 'iPhone',
      description: 'Barcelona beach'
    },
    creatorId: '39997228',
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  },
  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/02ac571c1139b3632b420b7d36e38205/5D6DE456/t51.2885-15/e35/s150x150/52422533_388770655250063_8357980874788669555_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/e6a964c842f44481ee6aa8957f9233d3/5D60ABF1/t51.2885-15/sh0.08/e35/s640x640/52422533_388770655250063_8357980874788669555_n.jpg?_nc_ht=scontent.cdninstagram.com'
    },
    meta: {
      media_type: 'image',
      timestamp: Date.now(),
      geolocation: [],
      camera: 'iPhone',
      description: 'Semla'
    },
    creatorId: '39997228',
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  },

  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/6e8123666d79a9dddc25d65545c298b0/5D752833/t51.2885-15/e35/s150x150/54511447_520480495142956_7143869845156008806_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/55e9bdfb642c6119cbecc279ce8d1d51/5D54A794/t51.2885-15/sh0.08/e35/s640x640/54511447_520480495142956_7143869845156008806_n.jpg?_nc_ht=scontent.cdninstagram.com'
    },
    meta: {
      media_type: 'image',
      timestamp: Date.now(),
      geolocation: [],
      camera: 'iPhone',
      description: 'Spring in Barcelona'
    },
    creatorId: '39997228',
    visibility: true,
    likes: [],
    saves: [],
    filtertags: []
  },
  {
    url: {
      thumbnail: 'https://scontent.cdninstagram.com/vp/be63fcaa3630a14850f3b6d63b00516d/5D5274F1/t51.2885-15/e35/s150x150/52848275_2148181438607561_4051449015720485413_n.jpg?_nc_ht=scontent.cdninstagram.com',
      full_size: 'https://scontent.cdninstagram.com/vp/3c0a6998f0f6d11c5ef5b084f5861918/5D707474/t51.2885-15/sh0.08/e35/s640x640/52848275_2148181438607561_4051449015720485413_n.jpg?_nc_ht=scontent.cdninstagram.com'
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
