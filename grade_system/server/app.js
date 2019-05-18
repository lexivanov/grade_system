const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");

const authController = require("./controllers/auth-controller");
const statusController = require("./controllers/status-controller");
const courseController = require("./controllers/course-controller");
const taskController = require("./controllers/task-controller");
const CTRController = require("./controllers/taskcourserelation-controller");
const userController = require("./controllers/user-controller");
const courseInfoController = require("./controllers/takeAllForCourse-controller");


const app = express();

const router = express.Router();
const store = new MongoDBStore(
  {uri: 'mongodb://localhost/grade_sys' , collection: "sessions" }
);

store.on('error', function(error) {
  console.log(error);
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use(bodyParser.json());

app.use(session({
  secret: "sisikret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  },
  store
}));

router
  .route("/auth")
  .post(authController.registration);

router
  .route("/login")
  .post(authController.login);

router
  .route("/logout")
  .post(authController.logout)

router
  .route("/user")
  .get(userController.getAll)
  .post(userController.addOrEdit);

router
  .route("/user/:id")
  .get(userController.getById)
  .delete(userController.remove);

router
  .route("/user-grade")
  .post(userController.setGrade);

router
  .route("/user-grade/:id")
  .get(userController.getUserGrades);

router
  .route("/course")
  .get(courseController.getAll)
  .post(courseController.addOrEdit);

router
  .route("/course/:id")
  .get(courseController.getById)
  .delete(courseController.remove);

router
  .route("/course/:id/info")
  .get(courseInfoController.GetAllbyId);

router
  .route("/course-task")
  .get(CTRController.getAll)
  .post(CTRController.addTaskToCourse)
  .delete(CTRController.remove);

router.route("/course/:id/tasks").get(CTRController.getCourseTasks);

router.route("/task/:id/courses").get(CTRController.getTaskCourses);

router
  .route("/status")
  .get(statusController.getAll)
  .post(statusController.addOrEdit);

router
  .route("/status/:id")
  .get(statusController.getById)
  .delete(statusController.remove);

router
  .route("/task")
  .get(taskController.getAll)
  .post(taskController.addOrEdit);

router
  .route("/task/:id")
  .get(taskController.getById)
  .delete(taskController.remove);

app.use("/api", router);

module.exports = app;
