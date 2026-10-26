import React from 'react';
import { UserProfile } from '../types';
import { ALL_18_MODULES_OVERVIEW } from '../data/storyData';

interface ProgressPortfolioViewProps {
  user: UserProfile;
  onSelectModule: (modNumber: number) => void;
  onNavigateToTab: (tab: 'dashboard' | 'story' | 'mission' | 'progress') => void;
}

export const ProgressPortfolioView: React.FC<ProgressPortfolioViewProps> = ({
  user,
  onSelectModule,
  onNavigateToTab
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3.5 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-24 flex flex-col gap-6 sm:gap-8 overflow-x-hidden">
      
      {/* Portfolio Header Dossier */}
      <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 w-full">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/30 text-secondary text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase w-fit max-w-full truncate">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] shrink-0">verified</span>
            <span className="truncate">Verified Portfolio Dossier</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface font-semibold break-words">
            {user.name}’s Learning Journey
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl break-words">
            Tangible, verified project evidence produced during live Relay Studio operational challenges. Every badge corresponds to audited technical and critical decision-making performance.
          </p>
        </div>

        {/* Responsive Stats Box (grid of 3 on mobile, flex on desktop) */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto shrink-0">
          <div className="px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-base sm:text-xl font-bold text-primary">{user.xp.toLocaleString()}</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono text-on-surface-variant">XP</span>
          </div>

          <div className="px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-base sm:text-xl font-bold text-secondary">{user.portfolioArtifacts.length}</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono text-on-surface-variant">Artifacts</span>
          </div>

          <div className="px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-base sm:text-xl font-bold text-tertiary">{user.earnedBadges.length}</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono text-on-surface-variant">Badges</span>
          </div>
        </div>
      </div>

      {/* Verified Deliverables & Portfolio Artifacts */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface font-semibold">
            Verified Client Deliverables (Proof of Capability)
          </h2>
          <p className="text-xs text-on-surface-variant">
            These artifacts are generated upon completing real story missions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full">
          {user.portfolioArtifacts.map((art) => (
            <div
              key={art.id}
              className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/40 shadow-lg flex flex-col justify-between gap-3.5 sm:gap-4 group hover:border-secondary transition-all w-full min-w-0"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate">
                    {art.type}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-on-surface-variant shrink-0">
                    {art.verifiedDate}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-sm sm:text-base text-on-surface group-hover:text-secondary transition-colors break-words">
                  {art.title}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed break-words">
                  {art.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-container-highest/60 text-xs gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] text-tertiary font-semibold truncate">
                  Badge: {art.badgeCode}
                </span>

                <button
                  onClick={() => alert(`Artifact details:\n\nTitle: ${art.title}\n\n${art.summary}\n\nVerified by Relay Studio AI Review.`)}
                  className="text-secondary hover:text-primary transition-colors font-semibold flex items-center gap-1 text-xs shrink-0"
                >
                  <span>Inspect</span>
                  <span className="material-symbols-outlined text-[13px] sm:text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface font-semibold">
          Earned Competency Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          {user.earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 sm:p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex items-start gap-3 shadow-md w-full min-w-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-container via-surface-container-high to-surface-container-lowest border border-primary/40 flex items-center justify-center text-primary text-[18px] sm:text-[20px] shrink-0">
                <span className="material-symbols-outlined">{badge.icon}</span>
              </div>

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span className="font-sans font-bold text-xs sm:text-sm text-on-surface truncate">
                  {badge.title}
                </span>
                <span className="text-xs text-on-surface-variant leading-snug break-words">
                  {badge.description}
                </span>
                <span className="font-mono text-[10px] text-tertiary mt-1">
                  Earned {badge.earnedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 18-Module Interactive Roadmap */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface font-semibold">
            The Intelligence Project: 18-Module Curriculum
          </h2>
          <p className="text-xs text-on-surface-variant">
            From foundational digital hygiene to AI governance, multimodal creation, and your capstone.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3 w-full">
          {ALL_18_MODULES_OVERVIEW.map((mod) => {
            const isCompleted = mod.number === 1 && user.completedEpisodeIds.length >= 1;
            const isActive = mod.number === 1;

            return (
              <div
                key={mod.number}
                onClick={() => {
                  onSelectModule(mod.number);
                  if (isActive) onNavigateToTab('story');
                }}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 w-full min-w-0 ${
                  isActive
                    ? 'bg-surface-container border-primary/50 shadow-md cursor-pointer hover:border-primary'
                    : 'bg-surface-container-lowest border-outline-variant/20 opacity-75'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-secondary text-on-secondary'
                      : isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {mod.number}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-sans font-bold text-xs sm:text-sm text-on-surface truncate">
                        {mod.title}
                      </span>
                      {isActive && (
                        <span className="px-1.5 py-0.2 rounded bg-primary/20 text-primary font-mono text-[9px] sm:text-[10px] font-bold uppercase shrink-0">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="font-serif italic text-xs text-on-surface-variant truncate">
                      Story Arc: "{mod.chapter}"
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="font-mono text-[11px] sm:text-xs text-tertiary">+{mod.xp} XP</span>
                  <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {isActive ? 'Continue Beat →' : 'Upcoming'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
