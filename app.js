const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

dotenv.config('dotenv');
const app = express();

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger.js');

// general middleware
app.use(express.json()); // parse request body
app.use(morgan("dev")); // log info about request
app.use(cors());

// connect to database
const DB_LOCAL = process.env.DB_LOCAL;
const DB = process.env.DB;
mongoose
  // .connect(DB_LOCAL)
  .connect(DB)
  .then(() => {
    console.log("connected to db successful");
  })
  .catch((err) => {
    console.log("error while connected to db");
    console.log(err);
  });

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(specs));

// routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

// listen to the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to the server on port ${port}`);
});
