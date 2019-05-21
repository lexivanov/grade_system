const crypto = require('crypto');
const User = require("../models/user");
const UserHashes = require("../models/userHashes");

const secret = 'abcdefg';

exports.createUserHash = (fullname) => {
    const hash = crypto.createHmac('sha256', secret)
        .update(fullname)
        .digest('hex');

    return hash;
};

exports.saveUserHash = async (hash, email) => {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    } else {
        UserHashes.create({ hash: hash.toString(), userId: user._id });
        return true;
    }
};