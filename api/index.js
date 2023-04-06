import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";

const hostname = "127.0.0.1";
const port = 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/api/upload", function (req, res) {
  res.status(200).json("post has been created");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
