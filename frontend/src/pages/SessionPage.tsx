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
    <div className="h-screen bg-black flex flex-col text-zinc-100">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal">
          {/* LEFT: Code editor + Output */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col border-r border-zinc-800">
              {/* Room header - refined */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/50 border-b border-zinc-800/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h1 className="text-sm font-medium text-zinc-300">Room</h1>
                  </div>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-500">
                    Host: {session?.host?.name ?? "…"} · {session?.participant ? "2/2" : "1/2"} participants
                  </span>
                  {isHost && session?.status === "active" && (
                    <button
                      type="button"
                      onClick={handleCopyInviteLink}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
                      title="Copy invite link"
                    >
                      <LinkIcon className="size-3.5" />
                      Copy link
                    </button>
                  )}
                </div>
                {isHost && session?.status === "active" && (
                  <button
                    onClick={handleEndSession}
                    disabled={endSessionMutation.isPending}
                    className="inline-flex items-center gap-2 rounded-lg text-xs font-medium px-3 py-2 bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/25 transition-colors"
                  >
                    {endSessionMutation.isPending ? (
                      <Loader2Icon className="size-3.5 animate-spin" />
                    ) : (
                      <LogOutIcon className="size-3.5" />
                    )}
                    End room
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
