const router = require("express").Router();
const UserController = require("../controllers/User");
const passport = require("passport");


router.post("/signIn", UserController.signIn)

router.post("/registration", UserController.registration);

router.get("/logoutService", UserController.logoutService);

router.get("/checkoutIsAuth", UserController.checkoutIsAuth);



router.get('/google',
    passport.authenticate('google-auth', {
        scope:
            ['email', 'profile']
    }
    ));

router.get('/google/callback',
    passport.authenticate('google-auth', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: 'http://localhost:3000'
    }));



router.get('/facebook', passport.authenticate('facebook-auth'));
router.get('/facebook/callback', passport.authenticate('facebook-auth', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000'
}));


module.exports = router;