const { Users} = require("../../models");


class User {
    async getUser(req, res, next) {
        try {
            const getUser = await Users.findAll()
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: getUser
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = new User()