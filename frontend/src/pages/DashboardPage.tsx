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
      <div className="min-h-screen bg-[#020202] text-zinc-100 font-inter selection:bg-yellow-400 selection:text-black relative overflow-hidden">
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
        <div className="fixed inset-0 pointer-events-none z-0 bg-dots" 
             style={{ maskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at 50% 10%, black, transparent 80%)' }} />

        {/* Ambient Flare */}
        <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-400/5 blur-[150px] pointer-events-none z-0 mix-blend-screen" />
        
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