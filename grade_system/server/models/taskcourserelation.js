const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("taskCourseRelation", schema);
