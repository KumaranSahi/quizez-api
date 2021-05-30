const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    createdQuizes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    createdQuestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    adminUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);
module.exports = Admin;
