const mongoService = require("./services/Mongo");
const passportService = require("./services/Passport");
const passportGoogle = require("./services/PassportGoogle");
const passportFacebook = require("./services/PassportFacebook");


const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cors = require("cors");
const bodyParser = require('body-parser');

const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require("express-session");

const setSettings = (app) => {

    const RedisStore = connectRedis(session)

    const redisClient = redis.createClient({
        host: 'localhost',
        port: 6379
    })

    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });

    redisClient.on('connect', function (err) {
        console.log('Redis : connected successfully');
    });

    app.use(
        session({
            store: new RedisStore({ client: redisClient, ttl: 60 * 60 }),
            secret: "secret",
            name: "blog-react",
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60  // 1 hour
            }
        })
    )

    // application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // application/json
    app.use(bodyParser.json())

    // Cross-origin resource sharing settings 
    app.use(cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    }))

    // initalize passport
    app.use(passport.initialize());
    // deserialize cookie from the browser
    app.use(passport.session());

    // routes
    app.use("/auth", authRoutes);
    app.use("/blog", blogRoutes);
}

module.exports = setSettings;
