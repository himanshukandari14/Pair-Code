import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { DEFAULT_STARTER_CODE } from "../data/languages";
import { executeCode } from "../lib/judge0";
import Navbar from "../components/Navbar";
import { Panel, Group, Separator } from "react-resizable-panels";
import { Loader2Icon, LinkIcon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import type { ExecuteResult, LanguageKey } from "../types";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import VideoCallUI from "../components/VideoCallUI";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState<ExecuteResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("javascript");
  // Keep a ref to the latest code from the Yjs document for running
  const codeRef = useRef(DEFAULT_STARTER_CODE.javascript);

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!id || !session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: () => void refetch() });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // redirect when session ends
  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as LanguageKey;
    setSelectedLanguage(newLang);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, codeRef.current);
    setOutput(result);
    setIsRunning(false);
  };

  const handleCodeChange = (code: string) => {
    codeRef.current = code;
  };

  const handleEndSession = () => {
    if (!id) return;
    if (confirm("Are you sure you want to end this room? All participants will be notified.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleCopyInviteLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Invite link copied! Share it so someone can join.");
    } catch {
      toast.error("Could not copy link");
    }
  };

  // Use session ID as the Liveblocks room ID so both users join the same room
  const roomId = id ? `talent-hunt-session-${id}` : null;

  return (
    <div className="h-screen bg-[#020202] text-zinc-100 font-inter flex flex-col relative overflow-hidden">
      <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@1,6..122,400;1,6..122,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-bodoni { font-family: 'Bodoni Moda', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .bg-dots {
          background-size: 32px 32px;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}
      </style>

      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-dots" 
           style={{ maskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)' }} />

      {/* Ambient Flare */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-400/5 blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <div className="relative z-10 w-full shrink-0">
        <Navbar />
      </div>

      <div className="flex-1 overflow-hidden relative z-10">
        <Group orientation="horizontal">
          {/* LEFT: Code editor + Output */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col border-r border-zinc-800">
              {/* Room header - refined */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#020202] border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-none bg-yellow-400 animate-pulse" />
                    <h1 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300">SESSION_ACTIVE</h1>
                  </div>
                  <span className="text-zinc-700">|</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    HOST: {session?.host?.name ?? "…"} · {session?.participant ? "2/2" : "1/2"} ACTORS
                  </span>
                  {isHost && session?.status === "active" && (
                    <button
                      type="button"
                      onClick={handleCopyInviteLink}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-yellow-400 transition-colors px-2 py-1 rounded-none hover:bg-yellow-400/10"
                      title="Copy invite link"
                    >
                      <LinkIcon className="size-3" />
                      COPY_LINK
                    </button>
                  )}
                </div>
                {isHost && session?.status === "active" && (
                  <button
                    onClick={handleEndSession}
                    disabled={endSessionMutation.isPending}
                    className="inline-flex items-center gap-2 rounded-none font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    {endSessionMutation.isPending ? (
                      <Loader2Icon className="size-3 animate-spin" />
                    ) : (
                      <LogOutIcon className="size-3" />
                    )}
                    TERMINATE
                  </button>
                )}
              </div>

              <Group orientation="vertical">
                <Panel defaultSize={70} minSize={30}>
                  <div className="h-full bg-black">
                    {roomId ? (
                      <LiveblocksProvider publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY as string}>
                        <RoomProvider
                          id={roomId}
                          initialPresence={{}}
                        >
                          <CodeEditorPanel
                            selectedLanguage={selectedLanguage}
                            isRunning={isRunning}
                            onLanguageChange={handleLanguageChange}
                            onCodeChange={handleCodeChange}
                            onRunCode={handleRunCode}
                            userName={user?.fullName || user?.username || "Anonymous"}
                          />
                        </RoomProvider>
                      </LiveblocksProvider>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Loader2Icon className="w-6 h-6 animate-spin text-zinc-500" />
                      </div>
                    )}
                  </div>
                </Panel>
                <Separator className="h-1 bg-zinc-800 hover:bg-zinc-600 transition-colors cursor-row-resize" />
                <Panel defaultSize={30} minSize={15}>
                  <div className="h-full bg-[#0A0A0A]">
                    <OutputPanel output={output} />
                  </div>
                </Panel>
              </Group>
            </div>
          </Panel>

          <Separator className="w-1 bg-zinc-800 hover:bg-zinc-600 transition-colors cursor-col-resize" />

          {/* RIGHT: Video + Chat */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-zinc-950 p-4 overflow-auto border-l border-zinc-800/80">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-8 h-8 mx-auto animate-spin text-zinc-500 mb-4" />
                    <p className="text-sm text-zinc-400">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="bg-black border border-zinc-800 rounded-lg p-8 max-w-sm w-full text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                      <PhoneOffIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-lg font-medium text-zinc-100 mb-1">Connection Failed</h2>
                    <p className="text-sm text-zinc-500">Unable to connect to the video call.</p>
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-900/30">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </Group>
      </div>
    </div>
  );
}

export default SessionPage;
