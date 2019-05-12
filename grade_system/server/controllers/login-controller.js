const User = require("../models/user");

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email}) 
    .then(user => {
            User.checkPassword(password)? res.status(200).json(user) : res.send("Incorrect password!");
        })
    .catch(rej => res.status(400).send("User with this email not found!"));
};