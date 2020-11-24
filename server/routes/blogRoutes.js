const router = require("express").Router();
const postModel = require("../model/Posts");

router.post("/post/create", async (req, res) => {
    const { title, text } = req.body;

    let resultAddUser = await new postModel({
        title: title,
        mainContent: text,
        description: text.substr(0, 20),
        date: new Date(),
        author: (req.user.email) ? req.user.email : req.user.name
    }).save();

    res.status(200).send({
        status: "ok", post: {
            id: resultAddUser._id,
            title: resultAddUser.title,
            mainContent: resultAddUser.mainContent,
            date: resultAddUser.date,
            author: resultAddUser.author
        }
    })
})

router.get("/post/getPosts", async (req, res) => {
    const posts = await postModel.getAll();
    res.status(200).send({ status: "ok", listPosts: posts })
})

router.get("/post/countPages", async (req, res) => {
    const posts = await postModel.countPages();
    res.status(200).send({ status: "ok", count: Math.ceil(posts / 10) })
})

router.route("/post/:id")
    .get(async (req, res) => {
        const { id } = req.params;
        const postOnId = await postModel.getOnIdOncePost(id);
        res.status(200).send({ status: "ok", post: postOnId })
    })
    .patch((req, res) => {
        console.log("Update")
    })
    .delete((req, res) => {
        console.log("Delete")
    })

module.exports = router;