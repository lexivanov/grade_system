const User = require("../models/user");
const UserHashes = require("../models/userHashes");
const mailer = require('../services/mailer');
const mongoose = require("mongoose");


exports.registration = async (req, res) => {
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;
    const fullname = req.body.fullname;

    const createUser = async () => {
        await User.create({ email, password, fullname });
        const response = mailer.sendMail(email, password, fullname);
        res.status(200).send(response);
    }

    try {
        const user = await User.findOne({ email });
        user
            ? res.status(403).send("This email already used")
            : await createUser();

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;

    const getSuccess = (user) => {
        req.session.user = user._id;
        res.status(200).json(user);
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.userState === 'active') {
                user.checkPassword(password, user.salt)
                    ? getSuccess(user)
                    : res.status(403).send("Incorrect password");
            } else {
                res.status(403).send("User didn't activated");
            }
        } else {
            res.status(403).send("User not found");
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        res.status(403).send(err || "error while logout");
    });
};

exports.verifyUser = async (req, res) => {
    const userHash = await UserHashes.findOne({ hash: req.params.hash });
    if (userHash) {
        const updatedUser = await User.updateOne({ _id: userHash.userId }, { userState: "active" });
        if (updatedUser.nModified === 1) {
            await UserHashes.deleteOne({ hash: req.params.hash });
            res.status(200).send('User activated!');
        } else {
            res.status(400).send("User didn't antivated!");
        }
    } else {
        res.status(400).send('Hash is not found or user already activated!');
    }
};