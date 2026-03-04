import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import type { Channel } from "stream-chat";
import type { Call } from "@stream-io/video-client";
import type { StreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";
import type { Session } from "../types";

function useStreamClient(
  session: Session | undefined,
  loadingSession: boolean,
  isHost: boolean | undefined,
  isParticipant: boolean | undefined
) {
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<InstanceType<typeof StreamChat> | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  // Track whether we've already successfully initialized to avoid re-connecting
  // on every 5-second session refetch or when isParticipant re-evaluates.
  const isInitialized = useRef(false);
  // Refs to keep cleanup stable across re-renders
  const videoCallRef = useRef<Call | null>(null);
  const chatClientRef = useRef<InstanceType<typeof StreamChat> | null>(null);

  useEffect(() => {
    const initCall = async () => {
      // Wait for session to load
      if (loadingSession || !session) return;

      // Session ended or no callId
      if (!session.callId || session.status === "completed") {
        setIsInitializingCall(false);
        return;
      }

      // Not yet assigned as host or participant — auto-join mutation is still in flight.
      // Stay in "Connecting..." state; this effect will re-run when isParticipant flips true.
      if (!isHost && !isParticipant) return;

      // Already connected — skip
      if (isInitialized.current) {
        setIsInitializingCall(false);
        return;
      }

      // Mark as initialized immediately to prevent duplicate init calls from
      // rapid dependency changes (e.g., refetch cycle)
      isInitialized.current = true;

      try {
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        if (!apiKey) {
          toast.error("Stream API key is missing. Add VITE_STREAM_API_KEY to .env");
          isInitialized.current = false;
          return;
        }

        const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName ?? "",
            image: userImage,
          },
          token
        );

        setStreamClient(client);

        const videoCall = client.call("default", session.callId);
        // create: true — host creates the call room; participant joins existing one
        await videoCall.join({ create: true });
        videoCallRef.current = videoCall;
        setCall(videoCall);

        const chatClientInstance = StreamChat.getInstance(apiKey);
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName ?? "",
            image: userImage,
          },
          token
        );
        chatClientRef.current = chatClientInstance;
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", session.callId);
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error initializing stream call", error);
        toast.error(
          message.includes("token") || message.includes("Token")
            ? "Invalid or expired Stream token. Try signing out and back in."
            : "Failed to join video call"
        );
        // Allow retry on failure
        isInitialized.current = false;
      } finally {
        setIsInitializingCall(false);
      }
    };

    initCall();
  }, [session?.callId, session?.status, loadingSession, isHost, isParticipant]);

  // Separate cleanup effect that only runs on unmount
  useEffect(() => {
    return () => {
      (async () => {
        try {
          if (videoCallRef.current) await videoCallRef.current.leave();
          if (chatClientRef.current) await chatClientRef.current.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, []); // empty deps = only on unmount

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;