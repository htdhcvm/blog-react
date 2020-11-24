const passport = require("passport");
const userModel = require("../model/User");

passport.serializeUser((user, done) => {
    done(null, user.id_Service);
});

passport.deserializeUser(async (id, done) => {

    const findUser = await userModel.findUser(id);
    if (findUser === null) return done(null, findUser);
    return done(null, {
        name: findUser.name,
        photo: findUser.photo,
        id_Service: findUser.id_Service,
        email : findUser.email
    });
});