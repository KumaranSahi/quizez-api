const { Question, Quiz, Admin } = require("../Models");

const createQuestion = async (req, res) => {
  const {
    question,
    options,
    multipleCorrect,
    points,
    negativePoints,
    quiz: quizId,
    hint,
  } = req.body;
  const user = req.user;
  try {
    const admin = await Admin.findById(user.isAdmin);
    const quiz = await Quiz.findById(quizId);
    const newQuestion = await Question.create({
      question: question,
      options: options,
      multipleCorrect: multipleCorrect,
      points: points,
      negativePoints: negativePoints,
      quiz: quizId,
      hint: hint,
      createdBy: admin._id,
    });
    quiz.questions.push(newQuestion._id);
    await quiz.save();
    admin.createdQuestions.push(newQuestion._id);
    await admin.save();
    const createQuestion = {
      id: newQuestion._id,
      question: newQuestion.question,
      options: newQuestion.options,
      multipleCorrect: newQuestion.multipleCorrect,
      points: newQuestion.points,
      negativePoints: newQuestion.negativePoints,
      hint: newQuestion.hint,
    };

    return res.status(201).json({
      ok: "true",
      data: createQuestion,
      message: "Question created",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error creating Question",
    });
  }
};

const editQuestion = async (req, res) => {
  const {
    question: content,
    options,
    multipleCorrect,
    points,
    negativePoints,
    hint,
  } = req.body;
  const { questionId } = req.params;
  const question = req.question;
  try {
    await question.update({
      question: content,
      options: options,
      multipleCorrect: multipleCorrect,
      points: points,
      negativePoints: negativePoints,
      hint: hint,
    });
    const newQuestion = await Question.findById(questionId);
    const editQuestion = {
      id: newQuestion._id,
      question: newQuestion.question,
      options: newQuestion.options,
      multipleCorrect: newQuestion.multipleCorrect,
      points: newQuestion.points,
      negativePoints: newQuestion.negativePoints,
      hint: newQuestion.hint,
    };
    return res.status(201).json({
      ok: "true",
      data: editQuestion,
      message: "Question Edited",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error Editing Question",
    });
  }
};

const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const question = req.question;
  try {
    await Admin.findByIdAndUpdate(question.createdBy, {
      $pull: { createdQuestions: questionId },
    });
    await Quiz.findByIdAndUpdate(question.quiz, {
      $pull: { questions: questionId },
    });
    await question.remove();
    return res.status(201).json({
      ok: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error Deleting Question",
    });
  }
};


module.exports = { createQuestion, editQuestion, deleteQuestion };