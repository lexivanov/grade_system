const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("userHashes", schema);
