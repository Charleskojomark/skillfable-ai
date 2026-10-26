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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 md:pt-24 pb-24 flex flex-col gap-8">
      
      {/* Portfolio Header Dossier */}
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/30 text-secondary text-xs font-mono font-bold tracking-widest uppercase w-fit">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Verified Professional Portfolio Dossier
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold">
            {user.name}’s Learning Journey
          </h1>

          <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl">
            Tangible, verified project evidence produced during live Relay Studio operational challenges. Every badge corresponds to audited technical and critical decision-making performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center">
            <span className="font-mono text-xl font-bold text-primary">{user.xp.toLocaleString()}</span>
            <span className="text-[10px] uppercase font-mono text-on-surface-variant">Total XP</span>
          </div>

          <div className="px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center">
            <span className="font-mono text-xl font-bold text-secondary">{user.portfolioArtifacts.length}</span>
            <span className="text-[10px] uppercase font-mono text-on-surface-variant">Artifacts</span>
          </div>

          <div className="px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/30 flex flex-col items-center">
            <span className="font-mono text-xl font-bold text-tertiary">{user.earnedBadges.length}</span>
            <span className="text-[10px] uppercase font-mono text-on-surface-variant">Badges</span>
          </div>
        </div>
      </div>

      {/* Verified Deliverables & Portfolio Artifacts */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Verified Client Deliverables (Proof of Capability)
            </h2>
            <p className="text-xs text-on-surface-variant">
              These artifacts are generated upon completing real story missions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.portfolioArtifacts.map((art) => (
            <div
              key={art.id}
              className="p-5 rounded-2xl bg-surface-container border border-outline-variant/40 shadow-lg flex flex-col justify-between gap-4 group hover:border-secondary transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-mono text-[10px] font-bold uppercase tracking-wider">
                    {art.type}
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    Verified {art.verifiedDate}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base text-on-surface group-hover:text-secondary transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-container-highest/60 text-xs">
                <span className="font-mono text-[11px] text-tertiary font-semibold">
                  Badge Code: {art.badgeCode}
                </span>

                <button
                  onClick={() => alert(`Artifact details:\n\nTitle: ${art.title}\n\n${art.summary}\n\nVerified by Relay Studio AI Review.`)}
                  className="text-secondary hover:text-primary transition-colors font-semibold flex items-center gap-1"
                >
                  <span>Inspect Dossier</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
          Earned Competency Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex items-start gap-3.5 shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container via-surface-container-high to-surface-container-lowest border border-primary/40 flex items-center justify-center text-primary text-[20px] shrink-0">
                <span className="material-symbols-outlined">{badge.icon}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-sans font-bold text-sm text-on-surface">
                  {badge.title}
                </span>
                <span className="text-xs text-on-surface-variant leading-snug">
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              The Intelligence Project: Complete 18-Module Curriculum
            </h2>
            <p className="text-xs text-on-surface-variant">
              From foundational digital hygiene to AI governance, multimodal creation, and your capstone.
            </p>
          </div>
        </div>

        <div className="space-y-3">
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
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-surface-container border-primary/50 shadow-md cursor-pointer hover:border-primary'
                    : 'bg-surface-container-lowest border-outline-variant/20 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-secondary text-on-secondary'
                      : isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {mod.number}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-sm text-on-surface truncate">
                        {mod.title}
                      </span>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono text-[10px] font-bold uppercase shrink-0">
                          Active Storyline
                        </span>
                      )}
                    </div>
                    <span className="font-serif italic text-xs text-on-surface-variant truncate">
                      Story Arc: "{mod.chapter}"
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="font-mono text-xs text-tertiary">+{mod.xp} XP</span>
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
