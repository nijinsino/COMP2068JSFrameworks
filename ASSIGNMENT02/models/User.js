const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String },  
  githubId: { type: String }  
}, { timestamps: true });

//hash the password before saving the user
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;

  this.password = await bcrypt.hash(this.password, 10);
});
//method to compare password during login

userSchema.methods.comparePassword = async function (enteredPassword) {
  //
  if (!this.password || !enteredPassword) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
