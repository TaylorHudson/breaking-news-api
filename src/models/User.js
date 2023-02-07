import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
});

// Serves to encrypt the password before saving the user
userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export { User };

