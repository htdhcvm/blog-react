const mongoService = require("./services/Mongo");
const passport = require("./services/Passport");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const setSettings = (app) => {
    // Cross-origin resource sharing settings 
    app.use(cors({
        origin: "http://localhost:3000/",
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
