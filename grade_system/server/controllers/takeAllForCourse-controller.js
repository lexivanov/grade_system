const User = require("../models/user");
const Grade = require("../models/grade");
const taskCourseRelation = require("../models/taskcourserelation");
const Task = require("../models/task");
const Status = require("../models/status");



exports.GetAllbyId = async (req, res) => {
  const result = {
    users: [],
    tasks: [],
    grades: [],
    statuses: [],
  }; 
  
  const relatedUsers = await User.find({ courseId: req.params.id });
  result.users = relatedUsers;
  const relatedCTR = await taskCourseRelation.find({ courseId: req.params.id });
  
  const relatedCTRIds = relatedCTR.map(x => x.taskId);
  const relatedTasks = await Task.find({ _id: relatedCTRIds });
  result.tasks = relatedTasks;

  const relatedUsersIds = relatedUsers.map(x => x.id);
  const relatedGrades = await Grade.find({ userId: relatedUsersIds });
  result.grades = relatedGrades;     
  
  const statuses = await Status.find({});
  result.statuses = statuses;    

  res.status(200).json(result);
};
