const api = require("../api.js");
const logger = require("../utils/logger.js");
const schema = require('../validation_scheme.json');
const constants = require('../utils/constants.js');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }).addFormat("email", constants.validationRegexes.email);
const validate = ajv.compile(schema);

exports.getAll = function (req, res) {
    res.json(api.getAllProducts());
};

exports.getBy = function (req, res) {
    const data = parseInt(req.params.id);
    if (data === NaN || data.toString().length != req.params.id.length) {
        const result = api.searchByName(req.params.id);
        if (result.lengths) {
            logger.log("Status 404: Product not found");
            res.status(404).send('products not found');
        }
        else {
            res.json(result);
        }
    }
    else {
        const result = api.getProduct(data);
        if (result === null) {
            logger.log("Status 404: Product not found");
            res.status(404).send('product not found');
        } else {
            res.json(result);
        }
    }
};

exports.add = function (req, res) {
    const { ...newProd } = req.body;
    if (!validate(newProd)) {
        let message = '';
        for (let error of validate.errors) {
            message += error.dataPath + " " + error.message + "\n";
        }
        logger.log("Status 400: " + message);
        res.status(400).json(validate.errors);
    } else {
        res.json(api.addProduct(newProd));
    }
};

exports.edit = function (req, res) {
    if (!validate(req.body)) {
        let message = '';
        for (let error of validate.errors) {
            message += error.dataPath + " " + error.message + "\n";
        }
        logger.log("Status 400: " + message);
        res.status(400).json(validate.errors);
    }
    else {
        const { ...prod } = req.body;
        const result = api.editProduct(prod);
        if (result === null) {
            logger.log("Status 404: Product not found");
            res.status(404).send('product not found');
        }
        else {
            res.json(result);
        }
    }
};

exports.remove = function (req, res) {
    const result = api.deleteProduct(+req.params.id);
    if (result) {
        res.json(result);
    } else {
        logger.log("Status 404: Product not found");
        res.status(404).send('product not found');
    }
};