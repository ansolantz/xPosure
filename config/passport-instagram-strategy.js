'use strict';

const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;

passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  callbackURL: process.env.INSTAGRAM_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  let user = {};
  user.id = profile.id;
  user.username = profile.username;
  user.displayName = profile._json.data.full_name;
  user.homePage = profile._json.data.website;
  user.image = profile._json.data.profile_picture;
  user.bio = profile._json.data.bio;
  user.media = `https://api.instagram.com/v1/users/${profile.id}/media/recent/?access_token=${accessToken}`;

  done(null, user);
}
));

module.exports = InstagramStrategy;
