const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.CONNECTION_MONGO, { useNewUrlParser: true, useUnifiedTopology: true  });
} catch (error) {
    console.log(error);    
}
