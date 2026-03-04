import { Request, Response } from "express";
import { streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!._id;
    const clerkId = req.user!.clerkId;

    const callId = `room_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await Session.create({ host: userId, callId });

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { sessionid: session._id.toString() },
      },
    });

    const channel = streamClient.chat.channel("messaging", callId);
    await channel.getOrCreate({
      data: {
        created_by_id: clerkId,
        members: [{ user_id: clerkId }],
        custom: { name: "Room" },
      },
    });

    res.status(201).json({ session });
  } catch (error) {
    console.error("Error in create session controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getActiveSessions(req: Request, res: Response): Promise<void> {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions controller:", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller:", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyRecentSessions(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!._id;

    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyRecentSessions controller:", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user!._id;
    const clerkId = req.user!.clerkId;

    const session = await Session.findById(id);

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    if (session.status !== "active") {
      res.status(400).json({ message: "Cannot join a completed session" });
      return;
    }

    if (session.host.toString() === userId.toString()) {
      res.status(400).json({ message: "Host cannot join their own session as participant" });
      return;
    }

    if (session.participant) {
      res.status(409).json({ message: "Session is full" });
      return;
    }

    session.participant = userId;
    await session.save();

    const channel = streamClient.chat.channel("messaging", session.callId);
    await channel.update({ add_members: [{ user_id: clerkId }] });

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joinSession controller:", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const session = await Session.findById(id);

    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }

    if (session.host.toString() !== userId.toString()) {
      res.status(403).json({ message: "Only the host can end the session" });
      return;
    }

    if (session.status === "completed") {
      res.status(400).json({ message: "Session is already completed" });
      return;
    }

    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    const channel = streamClient.chat.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
