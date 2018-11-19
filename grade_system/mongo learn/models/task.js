const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskFilePath: { type: String }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Task", schema);
