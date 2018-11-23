const express = require("express");
const bodyParser = require("body-parser");
const statusController = require("./controllers/status-controller");
const courseController = require("./controllers/course-controller");
const taskController = require("./controllers/task-controller");
const courseTaskRelations = require("./controllers/taskcourserelation-controller")

const app = express();

const router = express.Router();
app.use(function(req, res, next) {
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

router
  .route("/course")
  .get(courseController.getAll)
  .post(courseController.addOrEdit);

router
  .route("/course/:id")
  .get(courseController.getById)
  .delete(courseController.remove);

router
  .route("/coursetaskrelations")
  .get(courseTaskRelations.addTaskToCourse)
  .delete(courseTaskRelations.remove);

router
    .route("/coursetaskrelations/:id")
    .get(courseTaskRelations.getCourseTasks);
    
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
