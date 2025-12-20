import { Router } from "express";
import { register, login, logout, me } from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const app = Router();

app.post("/login", login);
app.post("/register", register);
app.post("/logout", authMiddleware, logout);
app.post("/me", authMiddleware, me);

export default app;
