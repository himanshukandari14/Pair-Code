import mongoose from "mongoose";
import type { ISession } from "../types/index.js";

const sessionSchema = new mongoose.Schema<ISession>(
  {
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    callId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
