const mongoose = require("mongoose");
const Course = require("../models/course");
const taskCourseRelation = require("../models/taskcourserelation");

exports.getAll = (req, res) => {
  console.log(req);
  Course.find({})
    .then(result => res.status(200).json(result))
    .catch(rej => res.status(400).json(rej));
};

exports.getById = (req, res) => {
  console.log(req);
  Course.find({ _id: req.params.id })
    .then(result => res.status(200).json(result))
    .catch(rej => res.status(400).json(rej));
};

exports.addOrEdit = (req, res) => {
  console.log(req.body);
  const newCourse = req.body;
  if (newCourse.id === undefined) {
    Course.create(newCourse)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    if (newCourse.name === undefined) {
      result.status(400).send("Name is required");
    } else {
      Course.replaceOne({ _id: newCourse.id }, newCourse)
        .then(result => res.status(200).json(result))
        .catch(rej => res.status(400).json(rej.message));
    }
  }
};

exports.remove = async (req, res) => {
  const deleted = await taskCourseRelation.deleteMany({
    courseId: req.params.id
  });
  if (deleted.ok) {
    Course.deleteOne({ _id: req.params.id })
      .then(result => res.status(200).json({ id: req.params.id }))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    res.status(400).send("Course-task relations didn't deleted!");
  }
};
