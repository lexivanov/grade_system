const User = require("../models/user");

exports.registration = async (req, res) => {
    console.log('ya tut');
    const email = req.body.email && req.body.email.toLowerCase();
    const password = req.body.password;
    const name = req.body.name;
   

    const createUser = () => {
        const user = new User({email, password,name});
        user.save(err => res.code(500).json(err));
        res.send("Sucses!");
    }

    try {
        const user = await User.findOne({ email });
        user
            ? res.code(403).send("This email already used")
            : createUser();
        
    } catch (err) {
        res.code(500).json(err);
    }
};



