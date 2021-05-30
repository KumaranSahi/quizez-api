const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./Config/Mongoose");

const router = require("./Routes");

const PORT = 8000;

app.use(cors());
app.use(express.json());

const passportJWT = require("./Config/Passport");

app.use("/api", router);

app.use("/", (req, res) => {
  return res.status(404).json({
    data: "Requested data doesn't exist",
  });
});

app.listen(process.env.PORT || PORT, () =>
  console.log("Server running on port " + PORT)
);
