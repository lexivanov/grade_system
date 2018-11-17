const api = require("../api.js");

exports.getAll = function (req, res) {
    res.json(api.getAllCountries());
};
