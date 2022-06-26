const express = require("express")
const { getQuestions, createQuestion } = require("../controllers/questions")

const router = express.Router()

router.route("/")
  .get(getQuestions)
  .post(createQuestion)

module.exports = router