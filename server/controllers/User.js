const userModel = require("../model/User");
const bcrypt = require("bcrypt");



const getHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, +process.env.SOLT, (err, result) => {
            resolve(result);
        });
    })
}


const getUserOnPassword = async (listUsers, password) => {
    let tmpUser = {};
    let listPromises = [];
    let tmpCount = 0;

    listUsers.forEach(item => {
        listPromises.push(
            new Promise((resolve, reject) => {
                bcrypt.compare(password, item.password, (err, result) => {
                    return resolve({ status: result, id: item._id, name: item.name, photo: item.photo })
                })
            })
        )
    })

    await Promise.all(listPromises)
        .then(result => {
            result.forEach(user => {
                if (user.status === true) {
                    tmpUser = user;
                    tmpCount++;
                }
            })
        })

    if (tmpCount === 0) return {};

    if (tmpCount > 1) return { status: "Error" };

    return tmpUser;
}

module.exports = class User {
    static async signIn(req, res) {
        let { login, password } = req.body;

        const hash = await getHash(password);

        let listUsers = await userModel.getCurrentLogin(login);

        let user = await getUserOnPassword(listUsers, password);


        console.log(user);
        console.log(Object.keys(user).length);

        if (Object.keys(user).length === 0) {
            // добавляем в сессию redis и отвечаем
            // let resAddUser = await new userModel({name : login, password : hash}).save();
            console.log(resAddUser);
        }


        // такого пользователя нету 
    }

    // add session serialize ?? 
    static async registration(req, res) {

    }

    static async logoutService(req, res) {
        req.logout();
        res.status(200).send({ status: "ok" });
    }

    static async checkoutIsAuth(req, res) {
        if (req.user !== undefined && Object.keys(req.user).length > 0) return res.status(200).send({ status: "ok", userData: req.user })
        return res.status(200).send({ status: "falid" })
    }
}