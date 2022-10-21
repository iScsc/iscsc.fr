const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { createServer } = require("http");
const userRoutes = require("./routes/users");
const articleRoutes = require("./routes/articles");
const httpServer = createServer(app);
require("dotenv").config({ path: `./config/.env.${process.env.NODE_ENV}` });

const { DB_USER, DB_PASSWORD, DB_NAME, PORT, CLIENT_ORIGIN } = process.env;

app.use(cors({ origin: CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "1MB" }));
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("iscsc.fr is running");
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@iscsc.a11re32.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    httpServer.listen(PORT || 5000, () => {
      console.log(`Server listening: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
