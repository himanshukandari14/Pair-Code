import type { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  profileImage?: string;
  clerkId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISession {
  _id: Types.ObjectId;
  host: Types.ObjectId;
  participant?: Types.ObjectId | null;
  status: "active" | "completed";
  callId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StreamUserData {
  id: string;
  name: string;
  image?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
