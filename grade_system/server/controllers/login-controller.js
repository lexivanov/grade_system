const User = require("../models/user");

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
            ? user.checkPassword(password)
                ? getSuccess(user)
                : res.code(403).send("Incorrect password")
            : res.code(403).send("User not found");
        
    } catch (err) {
        res.code(500).json(err);
    }
};



