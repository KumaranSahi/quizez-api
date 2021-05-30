const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        content: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
        },
      },
    ],
    multipleCorrect: {
      type: Boolean,
    },
    points: {
      type: Number,
    },
    negativePoints: {
      type: Number,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    hint: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Question = model("Question", questionSchema);
module.exports = Question;
