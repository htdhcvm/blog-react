const router = require("express").Router();
const postModel = require("../model/Posts");

router.post("/post/create", async (req, res) => {
    const { title, text } = req.body;

    let resultAddUser = await new postModel({
        title: title,
        mainContent: text,
        description: text.substr(0, 20),
        date: new Date(),
        author: (req.user.email) ? req.user.email : req.user.name,
        idUser: req.user.id
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

router.get("/post/getAllPosts", async (req, res) => {
    const { id } = req.user;
    const posts = await postModel.getAllPostOnIdUser(id);
    res.send({ status: "ok", posts: posts })
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
    .patch(async (req, res) => {
        const { title, text } = req.body;
        const { id } = req.params;
        
        await postModel.updateOnId(id, title, text);
        res.status(200).send({
            status: "ok", post: {
                title, text
            }
        })

    })
    .delete(async (req, res) => {
        const { id } = req.params;
        await postModel.deleteOnId(id);
        const idUser = req.user.id;
        const posts = await postModel.getAllPostOnIdUser(idUser);
        res.status(200).send({ status: "ok", posts: posts });
    })

module.exports = router;