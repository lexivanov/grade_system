const crypto = require('crypto');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, default: "student" },
  userState: { type: String, default: "active" },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  comment: { type: String },
  statusId: { type: Schema.Types.ObjectId, ref: "Status" },
  project: { type: String },
  created: { type: Date, default: Date.now }
});

schema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
  .set(function(password){
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });

schema.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
} 

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", schema);
