require("dotenv").config();
require("express-async-errors");
const employeeRoute = require("./routes/employee_route");
const userRoute = require("./routes/user_route");
const authRoute = require("./routes/auth_route");
const logRoute = require("./routes/log_route");
const cors = require("cors");
const connectDB = require("./db/connect");
const notFoundMinddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// express
const express = require("express");
const app = express();

// cors
app.use(cors());

app.use(express.json());

// routes
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/login", authRoute);
app.use("/api/v1/attendance", logRoute);

// middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMinddleware);

const port = process.env.PORT || 4000;
const start = () => {
  connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`server is listening on port ${port}`));
};

start();
