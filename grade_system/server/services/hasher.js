const crypto = require('crypto');
const User = require("../models/user");
const UserHashes = require("../models/userHashes");

const secret = 'abcdefg';

exports.createUserHash = function (fullname){
    const hash = crypto.createHmac('sha256', secret)
                   .update(fullname)
                   .digest('hex');
    
    console.log(hash);
    return hash;
};

exports.saveUserHash = async (req, res) => {
    const user = await User.findOne({ eMail: req.eMail });
    if (!user) {
        res.status(402).send("Hasn't with this eMail!");
    } else {
        console.log(user._id);
        UserHashes.create({ hash: req.userHash, userId: user._id });
        res.status(200).send("Success!");
    }
};