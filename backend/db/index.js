const mongoose = require("mongoose");
require("dotenv-flow").config();
console.log(process.env.MONGO_URI);
mongoose
  .connect("mongodb://localhost:27017/Movie")
  .then(() => {
    console.log("DB Connected 🚀");
  })
  .catch((err) => {
    console.log(process.env.MONGO_URI);
    console.log(`db not Connected : ${err.message}`);
  });
