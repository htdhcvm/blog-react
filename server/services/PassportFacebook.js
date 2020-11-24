const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const userModel = require("../model/User");

passport.use("facebook-auth", new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        const {id, displayName} = profile;
        
        let findUser = await userModel.findUser(id);

        if (findUser === null) {
            let userCreatedNew = await new userModel({
                name: displayName,
                photo: undefined,
                dateCreate: new Date(),
                id_Service: id,
                email : undefined
            }).save();
            done(null, userCreatedNew);
        }

        done(null, findUser);
    }
));
