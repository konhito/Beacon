import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../utils/inputValidation";

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  const { name, email, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).json({ msg: "Email already exist" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    message: "User registered",
    user: { id: newUser._id, name, email },
  });
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  const checkpass = await bcrypt.compare(password, user.password);
  if (!checkpass) return res.status(401).json({ msg: "Invalid credentials" });

  const token = generateToken(user._id);

  console.log("User successfully loggedIn", token);
  res.json({ message: "Login successful", token });
};

export const me = async (req: Request, res: Response) => {
  // Auth middleware should attach userId to req.userId
  const user = await User.findById(req.userId).select("-password");
  res.json({ user });
};

export const logout = (_req: Request, res: Response) => {
  // JWT: frontend simply deletes token
  res.json({ message: "Logout successful" });
};
