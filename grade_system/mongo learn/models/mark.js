const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  markValue: { type: Number, required: true }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Mark", schema);
