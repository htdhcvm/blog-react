const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    photo: String,
    dateCreate: Date,
    password: String,
    id_Service: String,
    email : String
})

userSchema.statics.getCurrentLogin = async function (login) {
    return await this.find({ name: login }).exec();
}


userSchema.statics.findUser = async function (id) {
    return await this.findOne({ id_Service: id }).exec();
}


module.exports = mongoose.model('User', userSchema);
