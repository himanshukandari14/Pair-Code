import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";
import type { StreamUserData } from "../types/index.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("STREAM_API_KEY or SECRET is missing");
}

// Single Stream client for both video and chat (node-sdk)
export const streamClient = new StreamClient(apiKey!, apiSecret!);

export const upsertStreamUser = async (userData: StreamUserData): Promise<void> => {
  try {
    await streamClient.upsertUsers([
      {
        id: userData.id,
        name: userData.name,
        image: userData.image,
      },
    ]);
    console.log("stream user upserted successfully", userData);
  } catch (error) {
    console.log(error, "ERROR upserting stream user");
  }
};

export const deleteStreamUser = async (userId: string): Promise<void> => {
  try {
    await (streamClient as unknown as { deleteUser: (id: string) => Promise<unknown> }).deleteUser(userId);
    console.log("Stream user deleted successfully");
  } catch (error) {
    console.log(error, "ERROR deleting stream user");
  }
};
