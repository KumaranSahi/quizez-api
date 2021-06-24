const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
    image: {
      type: String,
    },
    isAdmin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scoreboard",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
