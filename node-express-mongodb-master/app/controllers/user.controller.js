const db = require("../models");
const mailer = require("../mailer");
const User = db.user;
const jwt = require("jsonwebtoken");

exports.setPassword = async (req, res) => {
    try {
        if (req.body.password) {
            let u = await User.findOne({
                email: req.userData.u.email.toLowerCase()
            });
            if (u == null) {
                throw new Error("Email doesnot exist! Please enter a valid email id");
            } else {
                u.password = await u.hashPassword(req.body.password);
                let updatedUser = await User.updateOne(u);
                res.status(200).json({
                    msg: "Password updated!",
                });
            }
        } else {
            throw new Error("Please enter password!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        if (req.body.email) {
            let u = await User.findOne({
                email: req.body.email.toLowerCase()
            });
            if (u == null) {
                throw new Error("Email doesnot exist! Please enter a valid email id");
            } else {
                let token = await u.generateJwtToken({
                    u
                }, "secret", {
                    expiresIn: 7200
                })
                if (token) {
                    mailer(u.email, token);
                    res.status(200).json({
                        success: true
                    })
                } else {
                    throw new Error("Error occured!");
                }
            }
        } else {
            throw new Error("Please enter a valid email id");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
};

exports.registerNewUser = async (req, res) => {
    try {
        let u = new User({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email.toLowerCase()
        });

        u.password = await u.hashPassword(req.body.password);
        let createdUser = await u.save();
        res.status(200).json({
            msg: "New user created",
            // data: createdUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.loginUser = async (req, res) => {
    const login = {
        email: req.body.email.toLowerCase(),
        password: req.body.password
    }

    try {
        let u = await User.findOne({
            email: login.email
        });
        //check if user exit
        if (!u) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            });
            return;
        }
        let match = await u.compareUserPassword(login.password, u.password);
        if (match) {
            let token = await u.generateJwtToken({
                u
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: u
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
};