const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectionofDb = require("./config/connect.js");
const path = require("path");

const app = express();

const __dir = path.resolve();

//////dotenv config/////////////////////
dotenv.config();

//////connection to DB/////////////////
connectionofDb();

///////////////port number///////////////////
const PORT = process.env.PORT;

/////////////////middlewares////////////////
app.use(express.json());
app.use(cors());

/////////////////routes/////////////////////
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(express.static(path.join(__dir, "/frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dir, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
