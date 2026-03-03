import { Request, Response, NextFunction } from "express";
import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = (req as Request & { auth: () => { userId?: string } }).auth?.()?.userId;

      if (!clerkId) {
        res.status(401).json({ message: "Unauthorized - invalid token" });
        return;
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
