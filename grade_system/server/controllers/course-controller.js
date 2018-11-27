const Course = require("../models/course");
const User = require("../models/user");
const Grade = require("../models/grade");
const taskCourseRelation = require("../models/taskcourserelation");

exports.getAll = (req, res) => {
  Course.find({})
    .then(result => res.status(200).json(result))
    .catch(rej => res.status(400).json(rej));
};

exports.getById = (req, res) => {
  Course.find({
      _id: req.params.id
    })
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
      res.status(400).send("Name is required");
    } else {
      Course.replaceOne({
          _id: newCourse.id
        }, newCourse)
        .then(result => res.status(200).json(result))
        .catch(rej => res.status(400).json(rej.message));
    }
  }
};

exports.remove = async (req, res) => {
  let everythingOk = true;
  const relatedUsers = await User.find({
    _id: req.params.id
  });
  const relatedUsersIds = relatedUsers.map(x => x.id);
  relatedUsersIds.forEach(async (id) => {
    const response = await Grade.deleteMany({
      _id: id
    });
    if (!response.ok) {
      everythingOk = false;
      return;
    }
  });
  if (!everythingOk) {
    res.status(400).send("Grades weren't deleted!");
    return;
  }
  relatedUsers.forEach(user => {
    User.updateOne({_id: user.id}, {...user, courseId: undefined});
  });
  const deleted = await taskCourseRelation.deleteMany({
    courseId: req.params.id
  });
  if (deleted.ok) {
    Course.deleteOne({
        _id: req.params.id
      })
      .then(result => res.status(200).json({
        id: req.params.id
      }))
      .catch(rej => res.status(400).json(rej.message));
  } else {
    res.status(400).send("Course-task relations didn't deleted!");
  }
};