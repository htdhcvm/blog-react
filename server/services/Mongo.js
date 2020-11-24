const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.CONNECTION_MONGO, { useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
        if(err) console.log(err);
    });
} catch (error) {
    console.log(error);    
}
