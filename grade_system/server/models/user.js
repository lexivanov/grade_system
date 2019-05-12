const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const schema = new Schema({
  email:          { type: String                                      },
  passwordHash:   { type: String                                      },
  salt:           { type: String                                      },
  userState:      { type: String,                 default: "active"   },
  fullname:       { type: String,                 required: true      },
  role:           { type: String,                 default: "student"  },
  courseId:       { type: Schema.Types.ObjectId,  ref: "Course"       },
  comment:        { type: String                                      },
  statusId:       { type: Schema.Types.ObjectId,  ref: "Status"       },
  project:        { type: String                                      },  
  created:        { type: Date,                   default: Date.now   }
});

schema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
  .set(function(password){
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });

schema.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
} 

schema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", schema);

