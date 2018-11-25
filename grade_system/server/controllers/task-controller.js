const Task = require("../models/task");
const taskCourseRelation = require("../models/taskcourserelation");
const Grade = require("../models/grade");

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

exports.addOrEdit = (req, res) => {
  console.log(req.body);
  const newTask = req.body;
  if (newTask.id === undefined) {
    Task.create(newTask)
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(404).json(rej.message));
  } else {
    if (newTask.name === undefined) {
      res.status(400).send("Tame is required");
    } else if (newTask.description === undefined) {
      res.status(400).send("Description is required");
    } else {
      Task.replaceOne({ _id: newTask.id }, newTask)
        .then(result => res.status(200).json(result))
        .catch(rej => res.status(404).json(rej.message));
    }
  }
};

exports.remove = async (req, res) => {
  const deletedGrade = await Grade.deleteMany({
    taskId: req.params.id
  });
  const deletedCTR = await taskCourseRelation.deleteMany({
    taskId: req.params.id
  });
  if (deletedCTR.ok && deletedGrade.ok) {
    Task.deleteOne({ _id: req.params.id })
      .then(result => res.status(200).json(result))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    res.status(400).send("Course-task relations or grades didn't deleted!");
  }
};
