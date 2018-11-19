const express = require("express");
const bodyParser = require("body-parser");

const Task = require("./models/task");
const Course = require("./models/course");
const Status = require("./models/status");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      res.render("tasks", { tasks: tasks });
    })
    .catch(err => {
      res.status(200).json({ err: err });
    });
});

app.get("/add-task", (req, res) => res.render("add-task"));
app.post("/add-task", (req, res) => {
  const { task_name, task_descriprion } = req.body;
  Task.create({
    taskName: task_name,
    taskDescription: task_descriprion
  }).then(task => console.log(task.id));
  res.redirect("/tasks");
});

app.get("/courses", (req, res) => {
  Course.find({})
    .then(courses => {
      res.render("courses", { courses: courses });
    })
    .catch(err => {
      res.status(200).json({ err: err });
    });
});

app.get("/add-course", (req, res) => res.render("add-course"));
app.post("/add-course", (req, res) => {
  const { course_name, course_descriprion } = req.body;
  Course.create({
    courseName: course_name,
    courseDescription: course_descriprion
  }).then(course => console.log(course.id));
  res.redirect("/courses");
});

app.get("/statuses", (req, res) => {
  Status.find({})
    .then(statuses => {
      res.render("statuses", { statuses: statuses });
    })
    .catch(err => {
      res.status(200).json({ err: err });
    });
});

app.get("/status", (req, res) => {});
app.post("/status", (req, res) => {
  const { status_name } = req.body;
  Status.create({
    statusName: status_name
  }).then(course => console.log(course.id));
});
app.delete("/status", (req, res) => {
  console.log(req.query);
  const { status_name } = req.query;
  Status.deleteOne({ statusName: status_name })
    .then(res => console.log(res))
    .catch(rej => console.log(rej));
});

module.exports = app;
