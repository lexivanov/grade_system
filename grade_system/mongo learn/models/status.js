const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  statusName: { type: String, required: true }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Status", schema);
