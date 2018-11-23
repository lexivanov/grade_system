const mongoose = require("mongoose");
const taskCourseRelation = require("../models/taskcourserelation");

exports.addTaskToCourse = (req, result) => {
  console.log(req.body);
  const newTaskCourseRelation = req.body;
  console.log(newTaskCourseRelation);
  if (newTaskCourseRelation.courseId === undefined) {
    result.status(400).send("course id is required");
  } else if (newTaskCourseRelation.taskId === undefined) {
    result.status(400).send("task id is required");
  } else {
    taskCourseRelation
      .create(newTaskCourseRelation)
      .then(res => result.json(res))
      .catch(rej => result.status(404).send("idi nahuy"));
  }
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
    res.status(400).send("course id is required");
  } else if (newTaskCourseRelation.taskId === undefined) {
    res.status(400).send("task id is required");
  } else {
    taskCourseRelation
      .deleteOne(newTaskCourseRelation)
      .then(good => res.status(200).json({newTaskCourseRelation}))
      .catch(rej => res.status(400).send("idi nahuy"));
  }
};
