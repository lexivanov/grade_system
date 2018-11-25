const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  fullname: { type: String, required: true },
  role: { type: String, default: "student" },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  comment: { type: String },
  statusId: { type: Schema.Types.ObjectId, ref: "Status" },
  project: { type: String }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", schema);
