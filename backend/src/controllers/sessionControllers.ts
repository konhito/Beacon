import { Request, Response } from "express";
import Session from "../models/session.model";

export const createSession = async (req: Request, res: Response) => {
  const { title, date, startTime, endTime } = req.body;
  const session = await Session.create({ title, date, startTime, endTime, attendees: [] });
  res.status(201).json({ message: "Session created", session });
};

export const getAllSessions = async (_req: Request, res: Response) => {
  const sessions = await Session.find().populate("attendees", "name email");
  res.json(sessions);
};

export const getSessionById = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id).populate("attendees", "name email");
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
};

export const markAttendance = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const { userId } = req.body;
  if (!session.attendees.includes(userId)) session.attendees.push(userId);
  await session.save();

  res.json({ message: "Attendance marked", attendees: session.attendees });
};

export const getAttendance = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id).populate("attendees", "name email");
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json({ attendees: session.attendees });
};

export const removeAttendance = async (req: Request, res: Response) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  session.attendees = session.attendees.filter(u => u.toString() !== req.params.userId);
  await session.save();

  res.json({ message: "Attendance removed", attendees: session.attendees });
};
