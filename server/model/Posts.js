const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const postSchema = new Schema({
    title: String,
    date: Date,
    author: String,
    description: String,
    mainContent: String,
    idUser: Schema.Types.ObjectId,
    comments: [
        {
            text: String,
            date: Date,
            author: {
                name: String,
                photo: String
            }
        }
    ]
});

postSchema.statics.getAll = async function () {
    return await this.find({}).select(["title", "date", "author", "description"]).exec();
}

postSchema.statics.countPages = async function () {
    return await this.countDocuments({})
}

postSchema.statics.getOnIdOncePost = async function (id) {
    return await this.findOne({ _id: id })
        .select({
            "_id": 0,
            "title": 1,
            "mainContent": 1,
            "date": 1,
            "author": 1,
            "comments": 1

        })
        .exec();
}

postSchema.statics.getAllPostOnIdUser = async function (id) {
    return await this.find({ idUser: id })
        .select({
            "idUser": 0,
            "comments": 0
        })
        .exec();
}

postSchema.statics.deleteOnId = async function (id) {
    return await this.deleteOne({ _id: id }).exec();
}


postSchema.statics.updateOnId = async function(id, title, text) {
    return await this.updateOne({ _id : id}, {
        $set : {
            title : title,
            mainContent : text,
            description: text.substr(0, 20),
        }
    }).exec();
}

module.exports = mongoose.model('Posts', postSchema);
