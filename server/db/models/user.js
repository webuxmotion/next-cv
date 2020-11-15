const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'Email is required!',
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  name: {
    type: String,
    minlength: [6, 'Minimum length is 6 characters!']
  },
  username: {
    type: String,
    required: true,
    minlength: [2, 'Minimum length is 6 characters!']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum length is 6 characters!'],
    maxlength: [32, 'Maximum length is 32 characters!'],
    required: true
  },
  role: {
    type: String,
    enum: ['guest', 'admin', 'instructor'],
    required: true,
    default: "guest"
  },
  info: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { next(err) }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { next(err) }

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
