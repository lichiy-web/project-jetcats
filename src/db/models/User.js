import { model, Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    methods: {
      toJSON: function () {
        const user = this.toObject();
        delete user.password;
        return user;
      },
    },
  },
);

export const UserCollection = model('user', userSchema);
