import express from "express";
import db from "./config/database"

const now = new Date();
//routes import baby
import auth from "./routes/auth"


const app = express();
app.use(express.json());

//routes
app.use("/auth",auth)

app.get("/health", (req, res) => {
  res.json({ status: "ok",timeStamp: now.toLocaleString() });
});

app.listen(3000, async () => {
  await db();
  console.log("Beacon listening on port 3000");
});
