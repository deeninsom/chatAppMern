const { Users } = require("../../models");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

class Auth {
    //login
    async loginUser(req, res, next) {
        const { username, password } = req.body
        try {
            const user = await Users.findOne({
                where: {
                    username: username
                }
            })
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Bandingkan password yang diinputkan dengan password user yang tersimpan
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // Jika password salah, kirim respon error
                if (!result) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                // Jika password benar, buat token JWT
                const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1h' });

                // Kirim token sebagai respon
                res.status(200).json({ token });
            });
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: "Something error",
            });
        }
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