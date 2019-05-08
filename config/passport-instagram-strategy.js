'use strict';

const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;

passport.use(new InstagramStrategy({
  clientID: 'feef7763763f446e98b94c6caf272f42',
  clientSecret: 'e94d86e57aa04ab5a8faaf29d28e2ba0',
  // callbackURL: 'http://localhost:3000/auth/instagram/callback'
  callbackURL: 'https://xposure-ironhack.herokuapp.com'
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
