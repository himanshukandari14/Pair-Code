import { Request, Response } from "express";
import { streamClient } from "../lib/stream.js";

export async function getStreamToken(req: Request, res: Response): Promise<void> {
  try {
    const token = streamClient.generateUserToken({ user_id: req.user!.clerkId });

    res.status(200).json({
      token,
      userId: req.user!.clerkId,
      userName: req.user!.name,
      userImage: req.user!.profileImage,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller", (error as Error).message);
    res.status(500).json({ message: "Internal server error" });
  }
}
