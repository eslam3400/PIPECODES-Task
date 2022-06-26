const express = require("express")
const dotenv = require("dotenv")
require('./src/db/connection')
const questionsRoutes = require("./src/routes/questions")
var cors = require('cors')

const app = express();
dotenv.config()
app.use(cors())
app.use(express.json())

app.use("/api/v1/questions", questionsRoutes)

app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))