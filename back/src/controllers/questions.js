const Question = require('../db/models/questions')
const validator = require('validator')

const isDate = (_date) => {
  const date = new Date(_date)
  date.setHours(0, 0, 0, 0)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return date > tomorrow
}

exports.createQuestion = async (req, res) => {
  try {
    const { name, email, date } = req.body
    // check if data provided
    if (!name) return res.status(400).json({ msg: "name must be provided!" })
    if (!email) return res.status(400).json({ msg: "email must be provided!" })
    if (!date) return res.status(400).json({ msg: "date must be provided!" })
    // validate data
    if (!validator.isEmail(email)) return res.status(400).json({ msg: "please provide a right email format!" })
    if (!isDate(date)) return res.status(400).json({ msg: "please provide a date after tomorrow!" })
    req.body.name = name.trim()
    // save to database
    const question = await Question.create(req.body)
    res.json({ msg: "question created successfully :D", question })
  } catch (e) {
    res.status(400).json({ msg: "something wrong happened please call support" })
  }
}

exports.getQuestions = async (req, res) => {
  try {
    const { id, page } = req.query
    const dataPerPage = 20
    const dataCount = await Question.count()
    const pages = Math.ceil(dataCount / dataPerPage);
    if (id) return res.status(200).json(await Question.findById(id).exec())
    if (page) return res.status(200).json({ pages, page, questions: await Question.find().limit(dataPerPage).skip((page - 1) * dataPerPage).exec() })
    res.status(200).json({ pages, questions: await Question.find().limit(dataPerPage).sort({ createdAt: -1 }).exec() })
  } catch (e) {
    res.status(400).json({ msg: "something wrong happened please call support" })
  }
}