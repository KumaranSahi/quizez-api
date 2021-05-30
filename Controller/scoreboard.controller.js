const { Scoreboard } = require("../Models");

module.exports.QuizDone = async (req, res) => {
  const { score, quizId } = req.body;
  const user = req.user;
  try {
    const scorecard = await Scoreboard.create({
      user: user._id,
      quiz: quizId,
      score: score,
    });
    user.scores.push(scorecard._id);
    await user.save();
    return res.status(200).json({
      ok: true,
      message: "score added",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error saving user score",
    });
  }
};

module.exports.getTopTen = async (req, res) => {
  try {
    const scores = await Scoreboard.find().sort({ score: -1 }).limit(10);
    const populatedScores = await Scoreboard.populate(scores, [
      { path: "user" },
      { path: "quiz" },
    ]);
    const data = populatedScores.map(
      ({ _id, score, user: { name }, quiz: { name: quizName } }) => ({
        id: _id,
        score: score,
        userName: name,
        quizName: quizName,
      })
    );
    return res.status(200).json({
      ok: true,
      message: "Here's the top 10",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Unable to get top ten",
    });
  }
};

module.exports.getUserTopTen = async (req, res) => {
  const user = req.user;
  try {
    const scores = await Scoreboard
      .find({ user: user._id })
      .sort({ score: -1 })
      .limit(10);
    const populatedScores = await Scoreboard.populate(scores, {
      path: "quiz",
    });
    const data = populatedScores.map(
      ({ _id, score, quiz: { name: quizName, _id: quizId } }) => ({
        id: _id,
        quizId: quizId,
        score: score,
        quizName: quizName,
      })
    );
    return res.status(200).json({
      ok: true,
      message: "Here's the user's top 10",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Unable to get top ten",
    });
  }
};
