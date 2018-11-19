const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  courseName: { type: String, required: true },
  courseDescription: { type: String }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Course", schema);
