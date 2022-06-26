const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("connected to database!"))
  .catch((e) => console.log(e))