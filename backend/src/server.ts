import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import config from "./config";

connectDB();

const app = express();
const port = config.PORT;

if (!config.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined");
}

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Kochi Guru Pizza Backend is running");
});
