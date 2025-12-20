import { Schema, model, Document, Types } from "mongoose";

export interface ISession extends Document {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  attendees: Types.ObjectId[];
}

const sessionSchema = new Schema<ISession>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default model<ISession>("Session", sessionSchema);
