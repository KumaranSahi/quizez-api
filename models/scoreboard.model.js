const { Schema, model } = require("mongoose");

const scoreboardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    score: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Scoreboard = model("Scoreboard", scoreboardSchema);
module.exports = Scoreboard;
