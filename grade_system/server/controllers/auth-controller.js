const User = require("../models/user");

exports.registration = async (req, res) => {
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;
    const fullname = req.body.fullname;

    const createUser = () => {
        User.create({ email, password, fullname });
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