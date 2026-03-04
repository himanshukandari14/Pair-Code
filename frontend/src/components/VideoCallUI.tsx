import {
    CallControls,
    CallingState,
    SpeakerLayout,
    useCall,
    useCallStateHooks,
  } from "@stream-io/video-react-sdk";
  import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
  import { useState, useEffect, useRef } from "react";
  import { useNavigate } from "react-router";
  import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
  import type { Channel as ChannelType } from "stream-chat";
  import { StreamChat } from "stream-chat";

  import "@stream-io/video-react-sdk/dist/css/styles.css";
  import "stream-chat-react/dist/css/v2/index.css";
  
  const JOIN_SOUND = "/join-sound.mp3";
  const LEAVE_SOUND = "/leave-sound.mp3";
  
  function playSound(src: string) {
    try {
      const audio = new Audio(src);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch {
      // ignorecd
    }
  }
  
  interface VideoCallUIProps {
    chatClient: InstanceType<typeof StreamChat> | null;
    channel: ChannelType | null;
  }
  
  function VideoCallUI({ chatClient, channel }: VideoCallUIProps) {
    const navigate = useNavigate();
    const call = useCall();
    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const isInitialMount = useRef(true);
  
    // Play join/leave sounds when participants join or leave
    useEffect(() => {
      if (!call) return;
  
      const unsubJoined = call.on("call.session_participant_joined", () => {
        // Don't play join sound for the current user's own join (first participant count increase)
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }
        playSound(JOIN_SOUND);
      });
  
      const unsubLeft = call.on("call.session_participant_left", () => {
        playSound(LEAVE_SOUND);
      });
  
      return () => {
        unsubJoined?.();
        unsubLeft?.();
      };
    }, [call]);
  
    if (callingState === CallingState.JOINING) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
            <p className="text-lg">Joining call...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="h-full flex gap-3 relative str-video">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Participants + Chat header - glassmorphism */}
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <UsersIcon className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium">
                {participantCount} {participantCount === 1 ? "participant" : "participants"}
              </span>
            </div>
            {chatClient && channel && (
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isChatOpen
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                title={isChatOpen ? "Hide chat" : "Show chat"}
              >
                <MessageSquareIcon className="size-4" />
                Chat
              </button>
            )}
          </div>

          {/* Video area */}
          <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-zinc-900/50 border border-white/5">
            <SpeakerLayout />
          </div>

          <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
            <CallControls onLeave={() => navigate("/dashboard")} />
          </div>
        </div>
  
        {/* CHAT SECTION */}
  
        {chatClient && channel && (
          <div
            className={`flex flex-col rounded-xl overflow-hidden border border-white/10 bg-zinc-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
              isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {isChatOpen && (
              <>
                <div className="px-4 py-3 border-b border-zinc-700/50 flex items-center justify-between bg-zinc-800/50">
                  <h3 className="font-semibold text-zinc-100 text-sm">Session Chat</h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close chat"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden stream-chat-dark min-h-0">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                      <Window>
                        <MessageList />
                        <MessageInput />
                      </Window>
                      <Thread />
                    </Channel>
                  </Chat>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
  export default VideoCallUI;