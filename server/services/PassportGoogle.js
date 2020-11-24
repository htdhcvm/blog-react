const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userModel = require("../model/User");

passport.use("google-auth", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        const { sub, name, picture, email } = profile._json;

        let findUser = await userModel.findUser(sub);

        if (findUser === null) {
            let userCreatedNew = await new userModel({
                name: name,
                photo: picture,
                dateCreate: new Date(),
                id_Service: sub,
                email: email
            }).save();
            done(null, userCreatedNew);
        }

        done(null, findUser);
    }
));
