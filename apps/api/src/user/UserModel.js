const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    Password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 6 characters long'],
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
