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

    async getUserById(req, res, next) {
        let id = req.params.id
        try {
            const getUser = await Users.findOne({
                where: {
                    userId: req.params.id
                }
            })
            if (!getUser) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: getUser
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    async updateUser(req, res, next) {
        let id = req.params.id
        try {
            if (!req.body.title) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title is required",
                })
            }
             await Users.update(req.body, {
                where: {
                    userId: req.params.id
                }
            })
            const getUser = await Users.findOne({
                where: {
                    userId: req.params.id
                }
            })
            if (!activity) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: getUser
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    async deletedUser(req, res, next) {
        let id = req.params.id
        try {
            let data = await Users.destroy({
                where: {
                    userId: req.params.id
                }
            })
            if (!data) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            let dataBody = req.body
            res.status(200).json({
                status: "Success",
                message: "Success",
                data : dataBody
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = new User()