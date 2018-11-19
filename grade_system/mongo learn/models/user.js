const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  userFullName: { type: String, required: true },
  userRole: { type: String, default: "student" },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  userComment: { type: String },
  statusId: { type: Schema.Types.ObjectId, ref: "Status" },
  userProject: { type: String }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", schema);
