import React from 'react';
import { UserProfile } from '../types';
import { MODULE_1, ALL_18_MODULES_OVERVIEW } from '../data/storyData';

interface DashboardViewProps {
  user: UserProfile;
  onStartEpisode: (episodeId: string) => void;
  onOpenMission: (missionId: string) => void;
  onNavigateToTab: (tab: 'dashboard' | 'story' | 'mission' | 'progress') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onStartEpisode,
  onOpenMission,
  onNavigateToTab
}) => {
  const currentEp = MODULE_1.episodes[0];
  const isEp1Completed = user.completedEpisodeIds.includes('ep-01');

  return (
    <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-16 flex flex-col gap-6 sm:gap-8 overflow-x-hidden">
      
      {/* Dossier Identity Header */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/30 p-4 sm:p-6 md:p-8 shadow-xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-mono tracking-wider uppercase font-semibold w-fit max-w-full truncate">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse shrink-0"></span>
              <span className="truncate">Terminal Connected • Secure Relay Node</span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface tracking-tight font-normal break-words">
              Welcome back, <span className="text-primary italic font-semibold">{user.name}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium break-words">
              {user.title} • {user.cohort} • Relay Studio Fellow
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-tertiary">
              <span className="material-symbols-outlined text-[18px] shrink-0">local_fire_department</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-on-surface truncate">{user.streakDays}-Day Momentum</span>
                <span className="text-[10px] text-on-surface-variant truncate">Daily active briefing</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-secondary">
              <span className="material-symbols-outlined text-[18px] shrink-0">verified_user</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-on-surface truncate">{user.portfolioArtifacts.length} Verified Artifacts</span>
                <span className="text-[10px] text-on-surface-variant truncate">Client-ready deliverables</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level & XP Progress Bar */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-surface-container-highest/60 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <div className="flex items-center gap-1.5 text-on-surface font-semibold truncate">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0">military_tech</span>
              <span className="truncate">Level {user.level} Digital Intelligence Analyst</span>
            </div>
            <span className="font-mono text-primary font-semibold shrink-0">{user.xp.toLocaleString()} / 2,000 XP</span>
          </div>

          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (user.xp / 2000) * 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-on-surface-variant">
            <span className="truncate">Next Clearance: <strong className="text-tertiary font-medium">AI Verification Lead</strong></span>
            <span className="font-mono text-secondary shrink-0">{Math.round((user.xp / 2000) * 100)}% Complete</span>
          </div>
        </div>
      </div>

      {/* Primary Mission Dossier Hero Card */}
      <div className="relative rounded-2xl bg-surface-container border border-outline-variant/40 overflow-hidden shadow-2xl flex flex-col lg:flex-row group w-full">
        
        {/* Left: Cinematic Preview with overlay */}
        <div className="relative w-full lg:w-7/12 aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[280px] overflow-hidden bg-surface-container-lowest">
          <img
            src="/assets/story/season-01-cover.png"
            alt="Relay Studio Lagos Headquarters"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-container via-surface-container/60 to-transparent"></div>
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/30 text-[10px] sm:text-xs text-secondary font-mono max-w-[90%] truncate">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse shrink-0"></span>
            <span className="truncate">WAT 08:43 • LAGOS RELAY NODE</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-xs text-on-surface-variant font-mono bg-surface-container-lowest/90 backdrop-blur-md p-2 rounded-lg border border-outline-variant/20">
            <span className="truncate">ACTIVE BRIEFING // AFARA HEALTH</span>
            <span className="text-primary font-bold shrink-0">EST. 37 MIN TO MEETING</span>
          </div>
        </div>

        {/* Right: Narrative Pitch & Action */}
        <div className="w-full lg:w-5/12 p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-5 sm:gap-6">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-primary-container/20 border border-primary/30 text-primary text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                ACTIVE STORYLINE
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-on-surface-variant">
                Episode 1 of 3
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-on-surface font-normal leading-snug break-words">
              Chapter 1: The 08:43 Folder
            </h2>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Your first morning at Relay Studio. Amara rushes in with a dilemma: Afara Health Innovations is reviewing the AI pilot model in minutes. But the supporting data folder contains duplicate conflicting files, broken formulas, and an unverified executable.
            </p>

            <blockquote className="border-l-2 border-primary/60 pl-3 py-1 my-0.5 text-xs italic text-on-surface/90 font-serif">
              “Don’t show us another tool that works only in a demonstration. Show us what happens when it fails.”
            </blockquote>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => onStartEpisode(currentEp.id)}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-lg hover:bg-primary-container transition-all active:scale-95 glow-primary"
            >
              <span>{isEp1Completed ? 'Resume Episode 1' : 'Enter The 08:43 Folder'}</span>
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => onOpenMission('m1-audit')}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/40 hover:border-secondary text-secondary font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Mission Terminal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 18-Module Learning Roadmap Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface font-medium">
              The Intelligence Project: 18-Module Map
            </h3>
            <p className="text-xs text-on-surface-variant">
              Every module unlocks a distinct mystery, practical skill mission, and portfolio deliverable.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('progress')}
            className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 self-start sm:self-center"
          >
            <span>Full Journey Tree</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Grid of Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full">
          {ALL_18_MODULES_OVERVIEW.map((mod) => {
            const isActive = mod.status === 'active';
            const isAvailable = mod.status === 'available';

            return (
              <div
                key={mod.number}
                onClick={() => {
                  if (isActive) onStartEpisode('ep-01');
                }}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all w-full min-w-0 ${
                  isActive
                    ? 'bg-surface-container border-primary/50 ring-1 ring-primary/30 shadow-lg cursor-pointer hover:border-primary'
                    : isAvailable
                    ? 'bg-surface-container/60 border-secondary/40 hover:border-secondary cursor-pointer'
                    : 'bg-surface-container-lowest/50 border-outline-variant/20 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="font-mono text-[11px] text-tertiary font-bold tracking-wider shrink-0">
                    MODULE {mod.number < 10 ? `0${mod.number}` : mod.number}
                  </span>
                  
                  {isActive && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold uppercase shrink-0">
                      In Progress
                    </span>
                  )}
                  {isAvailable && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-mono uppercase shrink-0">
                      Unlocked
                    </span>
                  )}
                  {!isActive && !isAvailable && (
                    <span className="material-symbols-outlined text-[14px] text-outline shrink-0">lock</span>
                  )}
                </div>

                <h4 className="font-sans font-bold text-sm text-on-surface truncate mb-1">
                  {mod.title}
                </h4>

                <p className="text-xs text-on-surface-variant italic font-serif truncate mb-3">
                  "{mod.chapter}"
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-surface-container-highest/50 font-mono text-on-surface-variant">
                  <span>+{mod.xp} XP</span>
                  <span className="text-secondary font-semibold">
                    {isActive ? 'Continue Beat →' : isAvailable ? 'Preview →' : 'Locked'}
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
