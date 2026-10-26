import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { StoryPlayerView } from './components/StoryPlayerView';
import { MissionView } from './components/MissionView';
import { ProgressPortfolioView } from './components/ProgressPortfolioView';
import { ProfileModal } from './components/ProfileModal';

const DEFAULT_USER: UserProfile = {
  name: 'Damilola Adeyemi',
  title: 'AI Engineering Fellow',
  cohort: 'Lagos Cohort 04',
  level: 3,
  xp: 1420,
  streakDays: 3,
  completedEpisodeIds: [],
  completedMissionIds: [],
  selectedAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  choiceHistory: {},
  earnedBadges: [
    {
      id: 'b-welcome',
      title: 'Relay Studio Fellowship Induction',
      description: 'Accepted into Season 1: The Intelligence Project learning cohort.',
      icon: 'school',
      earnedDate: 'Oct 24, 2026'
    }
  ],
  portfolioArtifacts: [
    {
      id: 'art-welcome',
      title: 'Relay Studio Innovation Charter',
      type: 'Fellowship Agreement',
      summary: 'Commitment to African-centered, trustworthy, and contextually grounded AI solution design.',
      verifiedDate: 'Oct 24, 2026',
      badgeCode: 'RELAY-FELLOW-01'
    }
  ]
};

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'story' | 'mission' | 'progress'>('dashboard');
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string>('ep-01');
  const [activeMissionId, setActiveMissionId] = useState<string>('m1-audit');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load user from localStorage
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('skillfable_user_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  // Save user changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skillfable_user_v1', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  const handleRecordChoice = (beatId: string, choiceId: string, xpReward: number) => {
    setUser((prev) => {
      const alreadyChosen = !!prev.choiceHistory[beatId];
      const newXp = alreadyChosen ? prev.xp : prev.xp + xpReward;

      return {
        ...prev,
        xp: newXp,
        choiceHistory: {
          ...prev.choiceHistory,
          [beatId]: choiceId
        }
      };
    });
  };

  const handleCompleteMission = (missionId: string, xpReward: number) => {
    setUser((prev) => {
      const alreadyCompleted = prev.completedMissionIds.includes(missionId);
      if (alreadyCompleted) return prev;

      const newCompletedMissions = [...prev.completedMissionIds, missionId];
      const newCompletedEpisodes = [...prev.completedEpisodeIds, currentEpisodeId];

      const newBadge = {
        id: `badge-${missionId}`,
        title: 'Verified Handover Specialist',
        description: 'Audited file integrity and quarantined malicious binaries in live client review.',
        icon: 'verified',
        earnedDate: 'Today'
      };

      const newArtifact = {
        id: `art-${missionId}`,
        title: 'Afara Health Verified Handover Pack',
        type: 'Audit Dossier',
        summary: 'Certified baseline intake dataset, restricted cloud permissions, and threat quarantine record.',
        verifiedDate: 'Today',
        badgeCode: 'AUDIT-0843'
      };

      return {
        ...prev,
        xp: prev.xp + xpReward,
        completedMissionIds: newCompletedMissions,
        completedEpisodeIds: Array.from(new Set(newCompletedEpisodes)),
        earnedBadges: [newBadge, ...prev.earnedBadges],
        portfolioArtifacts: [newArtifact, ...prev.portfolioArtifacts]
      };
    });
  };

  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Universal Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Viewport Router */}
      <main className="flex-1">
        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            onStartEpisode={(epId) => {
              setCurrentEpisodeId(epId);
              setCurrentTab('story');
            }}
            onOpenMission={(mId) => {
              setActiveMissionId(mId);
              setCurrentTab('mission');
            }}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'story' && (
          <StoryPlayerView
            user={user}
            currentEpisodeId={currentEpisodeId}
            onSelectEpisode={setCurrentEpisodeId}
            onRecordChoice={handleRecordChoice}
            onLaunchMission={(mId) => {
              setActiveMissionId(mId);
              setCurrentTab('mission');
            }}
          />
        )}

        {currentTab === 'mission' && (
          <MissionView
            user={user}
            activeMissionId={activeMissionId}
            onCompleteMission={handleCompleteMission}
            onReturnToStory={() => setCurrentTab('story')}
            onNavigateToTab={setCurrentTab}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressPortfolioView
            user={user}
            onSelectModule={() => setCurrentTab('story')}
            onNavigateToTab={setCurrentTab}
          />
        )}
      </main>

      {/* Profile / Fellow Dossier Modal */}
      <ProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      {/* Global App Footer */}
      <footer className="border-t border-surface-container-high/60 bg-surface-container-lowest/80 py-6 px-4 text-center text-xs text-on-surface-variant font-sans mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-on-surface">SkillFable AI</span>
            <span>— The Intelligence Project</span>
          </div>

          <div>
            Learn skills by living the story. Designed for learners, builders, and entrepreneurs across Africa.
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
