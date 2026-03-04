import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY as string | undefined;

let client: StreamVideoClient | null = null;

export interface StreamUser {
  id: string;
  name: string;
  image?: string;
}

export const initializeStreamClient = async (
  user: StreamUser,
  token: string
): Promise<StreamVideoClient> => {
  if (client && (client as { user?: { id: string } })?.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) throw new Error("Stream API key is not provided.");

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async (): Promise<void> => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};
