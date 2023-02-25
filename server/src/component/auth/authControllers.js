const { Users} = require("../../models");
const bcrypt = require("bcrypt")

class Auth {
    //login
    async loginUser(req, res, next) {

    }

    //register
    async regisUser(req, res, next) {
        try {
            const { username, password: textPassword, no_telp } = req.body
            if (!req.body.username) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "username cannot be null",
                })
            }
            const password = await bcrypt.hash(textPassword, 10)
            const postUsers = await Users.create({
                username: username,
                password: password,
                no_telp: no_telp 
            })
            res.status(201).json({
                status: "Success",
                message: "Success",
                data: postUsers
            })
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: "Something error",
            });
        }
    }
}

module.exports = new Auth()