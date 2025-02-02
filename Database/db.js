const mongoose = require("mongoose");
require("dotenv").config;

const dbs = mongoose
  .connect("mongodb+srv://abhiral:abhiralchhetri7@cluster0.l6cxj.mongodb.net/")
  .then(() => {
    console.log("Connected to mongoose succesfully");
  })
  .catch((e) => {
    console.log(e, "Mongoose connection failed");
    process.exit(1)
  });

module.exports = dbs;
