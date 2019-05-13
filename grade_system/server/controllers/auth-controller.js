const User = require("../models/user");
const mailer = require('../services/mailer');

exports.registration = async (req, res) => {
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;
    const fullname = req.body.fullname;

    const createUser = () => {
        User.create({ email, password, fullname });
        mailer.sendMail(email,password,fullname);
        res.send("Success!");
    }

    try {
        const user = await User.findOne({ email });
        user
            ? res.status(403).send("This email already used")
            : createUser();

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;

    const getSuccess = (user) => {
        req.session.user = user._id;
        res.send("Sucses!");
    }

    try {
    const user = await User.findOne({ email });
    user
        ? user.checkPassword(password, user.salt)
            ? getSuccess(user)
            : res.status(403).send("Incorrect password")
     : res.status(403).send("User not found");

    } catch (err) {
        res.status(500).json(err);
    }
};