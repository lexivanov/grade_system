const mongoose = require("mongoose");
const Course = require("../models/course");

exports.getAll = (req, res) => {
  console.log(req);
  Course.find({})
    .then(result => res.json(result))
    .catch(rej => console.log(rej));
};

exports.getById = (req, res) => {
  console.log(req);
  Course.find({ _id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(rej => console.log(rej));
};

exports.addOrEdit = (req, result) => {
  console.log(req.body);
  const newCourse = req.body;
  if (newCourse.id === undefined) {
    Course.create(newCourse)
      .then(res => result.json(res))
      .catch(rej => result.status(404).send("idi nahuy"));
  } else {
    if (newCourse.name === undefined) {
      result.status(400).send("name is required");     
    } else {
      Course.replaceOne({ _id: newCourse.id }, newCourse)
        .then(res => result.json(res))
        .catch(rej => result.status(404).send("idi nahuy"));
    }
  }
};

exports.remove = (req, res) => {
  console.log(req);
  Course.deleteOne({ _id: req.params.id })
    .then(good => res.status(200).json({ id: req.params.id }))
    .catch(rej => res.status(400).send("idi nahuy"));
};
