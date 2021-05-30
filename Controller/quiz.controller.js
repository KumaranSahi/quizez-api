const { Quiz, Admin } = require("../Models");

module.exports.createQuiz = async (req, res) => {
  const { name, image, description } = req.body;
  const user = req.user;
  try {
    const admin = await admindb.findById(user.isAdmin);
    const newQuiz = await Quiz.create({
      name: name,
      image: image,
      createdBy: admin._id,
      questions: [],
      description: description,
    });
    admin.createdQuizes.push(newQuiz._id);
    await admin.save();
    const quiz = {
      name: newQuiz.name,
      description: newQuiz.description,
      image: newQuiz.image,
      id: newQuiz._id,
    };
    return res.status(201).json({
      ok: true,
      data: quiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error creating Quiz",
    });
  }
};

module.exports.getAllQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find();
    const newQuizes = quizes
      .filter(({ questions }) => questions.length > 0)
      .map(({ _id, name, image, description }) => ({
        id: _id,
        name: name,
        image: image,
        description: description,
      }));
    return res.status(200).json({
      ok: true,
      data: newQuizes,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error loading the quizes",
    });
  }
};

module.exports.getQuiz = async (req, res) => {
  const fetchedQuiz = req.quiz;
  try {
    const quiz = await fetchedQuiz.execPopulate("questions");
    const newQuiz = {
      name: quiz.name,
      id: quiz._id,
      description: quiz.description,
      questions: quiz.questions.map((item) => ({
        id: item._id,
        question: item.question,
        options: item.options.map(({ _id, content, isCorrect }) => ({
          id: _id,
          content: content,
          isCorrect: isCorrect,
        })),
        multipleCorrect: item.multipleCorrect,
        points: item.points,
        negativePoints: item.negativePoints,
        hint: item.hint,
      })),
      image: quiz.image,
    };
    return res.status(200).json({
      ok: true,
      message: "Have the quiz",
      data: newQuiz,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error loading the quiz",
    });
  }
};

module.exports.getUserQuizes = async (req, res) => {
  const user = req.user;
  try {
    const admin = await admindb.findById(user.isAdmin);
    const quizes = await admin.execPopulate("createdQuizes");
    const newQuizes = quizes.createdQuizes.map(
      ({ _id, name, image, description, questions }) => ({
        id: _id,
        name: name,
        image: image,
        description: description,
        questions: questions,
      })
    );
    return res.status(200).json({
      ok: true,
      data: newQuizes,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Error loading user quizes",
    });
  }
};
