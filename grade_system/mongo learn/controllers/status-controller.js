const mongoose = require('mongoose');
const Status = require("../models/status");

exports.getAll = (req, res) => {
    console.log(req);
    Status.find({})
    .then(result => res.json(result))
    .catch(rej => console.log(rej))
};

exports.getById = (req, res) => {
    console.log(req);
    Status.find({_id: req.params.id})
    .then(result => res.status(200).json(result))
    .catch(rej => console.log(rej))
};

exports.addOrEdit = (req, result) => {
    console.log(req.body);
    const newStatus = req.body;
    if (newStatus._id === undefined) {
        Status.create(newStatus)
        .then(res => result.json(res))
        .catch(rej => result.status(404).send('idi nahuy'));
    } else {
        Status.replaceOne({ _id: newStatus._id }, newStatus)
        .then(res => result.json(res))
        .catch(rej => result.status(404).send('idi nahuy'));
    }
};

exports.remove = (req, res) => {
    console.log(req);
    Status.deleteOne({ _id: req.params.id })
    .then(good => res.status(200).json({id: req.params.id}))
    .catch(rej => res.status(400).send('idi nahuy'));
}