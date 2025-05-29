const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();
// general middleware
app.use(express.json()); // parse request body
app.use(morgan("dev")); // log info about request

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(8000, () => {
  console.log(`listening to the server on port ${8000}`);
});
