const mongoose = require("mongoose");
const Task = require("../models/task");

exports.getAll = (req, res) => {
  console.log(req);
  Task.find({})
    .then(result => res.json(result))
    .catch(rej => console.log(rej));
};

exports.getById = (req, res) => {
  console.log(req);
  Task.find({ _id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(rej => console.log(rej));
};

exports.addOrEdit = (req, result) => {
  console.log(req.body);
  const newTask = req.body;
  if (newTask.id === undefined) {
    Task.create(newTask)
      .then(res => result.json(res))
      .catch(rej => result.status(404).send("idi nahuy"));
  } else {
    if (newTask.name === undefined) {
      result.status(400).send("name is required");
    } else if (newTask.description === undefined) {
      result.status(400).send("description is required");
    } else {
      Task.replaceOne({ _id: newTask.id }, newTask)
        .then(res => result.json(res))
        .catch(rej => result.status(404).send("idi nahuy"));
    }
  }
};

exports.remove = (req, res) => {
  console.log(req);
  Task.deleteOne({ _id: req.params.id })
    .then(good => res.status(200).json({ id: req.params.id }))
    .catch(rej => res.status(400).send("idi nahuy"));
};
