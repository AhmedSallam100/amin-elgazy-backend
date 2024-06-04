const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const examRoutes = require("./routes/examRoutes");
const sheetRoutes = require("./routes/sheetRoutes");
const boardRoutes = require("./routes/boardRoutes");
const videoRoutes = require("./routes/videoRoutes");
const audioRoutes = require("./routes/audioRoutes");
const bookRoutes = require("./routes/bookRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const { notFound, errorHandler } = require("./middlewares/error");
const { error } = require("console");
const port = process.env.PORT || 3001;

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

require("events").EventEmitter.defaultMaxListeners = 15;

app.get("/", (req, res) => {
  res.send("nodejs");
});

app.use("/api/exams", examRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/audios", audioRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port => ${port}`);
});
