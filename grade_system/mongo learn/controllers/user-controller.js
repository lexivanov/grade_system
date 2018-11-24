const mongoose = require("mongoose");
const User = require("../models/user");
const Grade = require("../models/garde");

exports.getAll = async (req, res) => {
  const result = await User.find({});
  res.json(result);
};

exports.getById = async (req, res) => {
  const result = await User.find({ _id: req.params.id });
  res.json(result);
};

exports.addOrEdit = (req, res) => {
  const newUser = req.body;
  const id = newUser.id;
  if (newUser.id === undefined) {
    User.create(newUser)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    newUser.id = undefined;
    User.updateOne({ _id: id }, newUser)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  }
};

exports.remove = async (req, res) => {
  const deleted = await Grade.deleteMany({
    userId: req.params.id
  });
  if (deleted.ok) {
    User.deleteOne({ _id: req.params.id })
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    res.status(400).send("Grades didn't deleted!");
  }
};

exports.getUserGrades = async (req, res) => {
  const result = await Grade.find({ userId: req.params.id });
  res.json(result);
};

exports.setGrade = (req, res) => {
  const newGrade = req.body;
  const id = newGrade.id;
  if (newGrade.id === undefined) {
    Grade.create(newGrade)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    newGrade.id = undefined;
    Grade.updateOne({ _id: id }, newGrade)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  }
};
