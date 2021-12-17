const { model, Schema } = require('mongoose');

const emailChecker =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
      trim: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => emailChecker.test(email),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
