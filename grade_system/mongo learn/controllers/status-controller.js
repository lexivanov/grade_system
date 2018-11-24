const mongoose = require('mongoose');
const Status = require("../models/status");

exports.getAll = (req, res) => {
    console.log(req);
    Status.find({})
    .then(result => res.status(200).json(result))
    .catch(rej => res.status(400).json(rej));
};

exports.getById = (req, res) => {
    console.log(req);
    Status.find({_id: req.params.id})
    .then(result => res.status(200).json(result))
    .catch(rej => res.status(400).json(rej));
};

exports.addOrEdit = (req, res) => {
    console.log(req.body);
    const newStatus = req.body;
    if (newStatus._id === undefined) {
        Status.create(newStatus)
        .then(result => res.status(200).json(result))
        .catch(rej => res.status(400).json(rej.message));;
    } else {
        Status.replaceOne({ _id: newStatus._id }, newStatus)
        .then(result => res.status(200).json(result))
        .catch(rej => res.status(400).json(rej.message));
    }
};

exports.remove = (req, res) => {
    console.log(req);
    Status.deleteOne({ _id: req.params.id })
    .then(result => res.status(200).json({id: req.params.id}))
    .catch(rej => res.status(400).json(rej.message));
}