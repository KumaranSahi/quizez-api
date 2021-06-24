const express = require("express");
const router = express.Router();
const passport = require("passport");

//middlewares

const quizCheck = require("../middleware/quizCheck");
const questionCheck = require("../middleware/questionCheck");

//controller

const {
  userController,
  questionController,
  quizController,
  scoreboardController,
} = require("../controller");

//User routes

router.post("/users/signin", userController.signinUser);
router.post("/users/signup", userController.signupUser);
router.post("/users/password", userController.changePassword);

//quiz routes

router.post(
  "/quizes",
  passport.authenticate("jwt", { session: false }),
  quizController.createQuiz
);
router.get(
  "/quizes",
  passport.authenticate("jwt", { session: false }),
  quizController.getAllQuizes
);
router.get(
  "/quizes/:quizId",
  passport.authenticate("jwt", { session: false }),
  quizCheck,
  quizController.getQuiz
);
router.get(
  "/my-quizes",
  passport.authenticate("jwt", { session: false }),
  quizController.getUserQuizes
);

//question routes

router.post(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  questionController.createQuestion
);
router.post(
  "/questions/:questionId/edit",
  passport.authenticate("jwt", { session: false }),
  questionCheck,
  questionController.editQuestion
);
router.delete(
  "/questions/:questionId",
  passport.authenticate("jwt", { session: false }),
  questionCheck,
  questionController.deleteQuestion
);

//scorecard routes

router.get(
  "/scorecards",
  passport.authenticate("jwt", { session: false }),
  scoreboardController.getTopTen
);
router.post(
  "/scorecards",
  passport.authenticate("jwt", { session: false }),
  scoreboardController.QuizDone
);
router.get(
  "/scorecards",
  passport.authenticate("jwt", { session: false }),
  scoreboardController.getUserTopTen
);

module.exports = router;
