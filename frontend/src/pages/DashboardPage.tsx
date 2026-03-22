import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import type { Session } from "../types";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    createSessionMutation.mutate(undefined, {
      onSuccess: (data) => {
        setShowCreateModal(false);
        navigate(`/session/${data.session._id}`);
      },
    });
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session: Session) => {
    if (!user?.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <>
      <div className="min-h-screen bg-[#070707] text-zinc-100 font-sans selection:bg-yellow-400 selection:text-black relative overflow-hidden">
        {/* Subtle Matte Background Pattern */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-screen" 
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        
        <div className="relative z-10 w-full pb-32">
          <Navbar />
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

          <div className="max-w-[90rem] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
              <div className="lg:col-span-1">
                <StatsCards
                  activeSessionsCount={activeSessions.length}
                  recentSessionsCount={recentSessions.length}
                />
              </div>
              <div className="lg:col-span-3">
                <ActiveSessions
                  sessions={activeSessions}
                  isLoading={loadingActiveSessions}
                  isUserInSession={isUserInSession}
                />
              </div>
            </div>

            <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;