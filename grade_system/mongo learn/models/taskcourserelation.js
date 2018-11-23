const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  courseId: { type: String, required: true },
  taskId: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("taskCourseRelation", schema);
