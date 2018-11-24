const mongoose = require("mongoose");
const taskCourseRelation = require("../models/taskcourserelation");

exports.addTaskToCourse = (req, res) => {
  console.log(req.body);
  const newTaskCourseRelation = req.body;
  console.log(newTaskCourseRelation);
  if (newTaskCourseRelation.courseId === undefined) {
    res.status(400).send("course id is required");
  } else if (newTaskCourseRelation.taskId === undefined) {
    res.status(400).send("task id is required");
  } else {
    taskCourseRelation
      .create(newTaskCourseRelation)
      .then(result => res.json(result))
      .catch(rej => res.status(404).json(rej.message));
  }
};

exports.getAll = async (req, res) => {
  console.log(req);
  const result = await taskCourseRelation.find({});
  res.json(result);
};

exports.getCourseTasks = (req, res) => {
  console.log(req);
  taskCourseRelation
    .find({ courseId: req.params.id })
    .then(result => res.json(result))
    .catch(rej => console.log(rej));
};

exports.remove = (req, res) => {
  console.log(req);
  const newTaskCourseRelation = req.body;
  console.log(newTaskCourseRelation);
  if (newTaskCourseRelation.courseId === undefined) {
    res.status(400).send("Course id is required");
  } else if (newTaskCourseRelation.taskId === undefined) {
    res.status(400).send("Task id is required");
  } else {
    taskCourseRelation
      .deleteOne(newTaskCourseRelation)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  }
};
