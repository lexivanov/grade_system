const User = require("../models/user");
const Grade = require("../models/grade");
const taskCourseRelation = require("../models/taskcourserelation");
const Task = require("../models/task");

var result = {
    users: [],
    tasks: [],
    grades: []
  };

exports.GetAllbyId = async (req, res) => {
  
  const relatedUsers = await User.find({ courseId: req.params.id });
  result.users = relatedUsers;

  const relatedCTR = await taskCourseRelation.find({ courseId: req.params.id });
  const relatedCTRIds = relatedCTR.map(x => x.taskId);
  relatedCTRIds.forEach(async taskId => {
    const relatedTasks = await Task.find({ _id: taskId });
    console.log(relatedTasks);
    result.tasks.push(relatedTasks);
  });

  const relatedUsersIds = relatedUsers.map(x => x.id);
  relatedUsersIds.forEach(async id => {
    const relatedGrades = await Grade.find({ userId: id });
    console.log(relatedGrades);
    result.grades.push(relatedGrades);        
  });

  res.status(200).json(result);
};
