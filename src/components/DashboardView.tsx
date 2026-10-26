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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-16 flex flex-col gap-6 sm:gap-8 overflow-x-hidden">
      
      {/* Dossier Header Card */}
      <div className="rounded-2xl bg-surface-container border border-outline-variant/30 p-5 sm:p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/30 text-primary text-xs font-mono tracking-wider uppercase font-medium w-fit">
              Case File #0843 • Active Assignment
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-on-surface tracking-tight font-normal break-words">
              Welcome back, <span className="text-primary italic font-semibold">{user.name}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium break-words">
              {user.title} • {user.cohort} • Relay Studio Fellow
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0">event_note</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-on-surface truncate">{user.streakDays} Consecutive Days</span>
                <span className="text-[10px] text-on-surface-variant truncate">Relay Studio Engagement</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">assignment_turned_in</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-on-surface truncate">{user.portfolioArtifacts.length} Verified Deliverable{user.portfolioArtifacts.length === 1 ? '' : 's'}</span>
                <span className="text-[10px] text-on-surface-variant truncate">Client-ready work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level & XP Progress Track */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-surface-container-highest/60 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <div className="flex items-center gap-1.5 text-on-surface font-medium truncate">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0">school</span>
              <span className="truncate">Level {user.level} Associate Analyst</span>
            </div>
            <span className="font-mono text-on-surface-variant text-xs shrink-0">{user.xp.toLocaleString()} / 2,000 XP</span>
          </div>

          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (user.xp / 2000) * 100)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
            <span className="truncate">Next Milestone: <strong className="text-on-surface font-medium">Evaluation & Verification Specialist</strong></span>
            <span className="font-mono text-secondary shrink-0">{Math.round((user.xp / 2000) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Main Chapter Dossier Card */}
      <div className="rounded-2xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col lg:flex-row w-full">
        
        {/* Left: Real-world illustrated scene */}
        <div className="relative w-full lg:w-7/12 aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[280px] overflow-hidden bg-surface-container-lowest">
          <img
            src="/assets/story/season-01-cover.png"
            alt="Relay Studio Lagos Headquarters"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-container via-surface-container/50 to-transparent"></div>
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/30 text-xs text-on-surface font-sans">
            <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
            <span>Relay Studio • Ikoyi, Lagos</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-on-surface-variant bg-surface-container-lowest/90 backdrop-blur-sm p-2.5 rounded-lg border border-outline-variant/30">
            <span className="font-medium text-on-surface">Client: Afara Health Innovations</span>
            <span className="text-primary font-mono text-[11px]">Meeting in 37 minutes</span>
          </div>
        </div>

        {/* Right: Narrative Pitch & Action */}
        <div className="w-full lg:w-5/12 p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-5 sm:gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-primary text-[10px] sm:text-[11px] font-mono uppercase font-semibold">
                Current Module
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Episode 1 of 3
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-on-surface font-normal leading-snug break-words">
              Chapter 1: The 08:43 Folder
            </h2>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Your first morning at Relay Studio. Amara rushes in with an urgent problem: Afara Health Innovations is reviewing the AI pilot model in minutes. But the supporting folder contains conflicting file versions, arithmetic discrepancies, and an unverified executable.
            </p>

            <blockquote className="border-l-2 border-primary pl-3 py-1 my-0.5 text-xs italic text-on-surface/90 font-serif">
              “Don’t show us another tool that works only in a demonstration. Show us what happens when it fails.”
            </blockquote>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => onStartEpisode(currentEp.id)}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:bg-primary-container transition-all active:scale-95"
            >
              <span>{isEp1Completed ? 'Resume Episode 1' : 'Begin Episode 1'}</span>
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => onOpenMission('m1-audit')}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-surface-container-high border border-outline-variant/40 hover:border-secondary text-on-surface font-medium text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">assignment</span>
              <span>Mission Briefing</span>
            </button>
          </div>
        </div>
      </div>

      {/* 18-Module Learning Roadmap Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-on-surface font-medium">
              Curriculum Roadmap: 18 Modules
            </h3>
            <p className="text-xs text-on-surface-variant">
              Every module centers around a genuine workplace problem, critical thinking decisions, and verified project output.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('progress')}
            className="text-xs font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1 self-start sm:self-center"
          >
            <span>View Full Curriculum</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Grid of Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full">
          {ALL_18_MODULES_OVERVIEW.map((mod) => {
            const isActive = mod.number === 1;
            const isAvailable = mod.status === 'available';

            return (
              <div
                key={mod.number}
                onClick={() => {
                  if (isActive) onStartEpisode('ep-01');
                }}
                className={`p-4 rounded-xl border transition-all w-full min-w-0 ${
                  isActive
                    ? 'bg-surface-container border-primary/50 shadow-sm cursor-pointer hover:border-primary'
                    : isAvailable
                    ? 'bg-surface-container/60 border-outline-variant/40 hover:border-outline cursor-pointer'
                    : 'bg-surface-container-lowest/50 border-outline-variant/20 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <span className="font-mono text-[11px] text-tertiary font-bold tracking-wider shrink-0">
                    MODULE {mod.number < 10 ? `0${mod.number}` : mod.number}
                  </span>
                  
                  {isActive && (
                    <span className="px-2 py-0.5 rounded bg-primary/15 text-primary text-[10px] font-mono font-medium uppercase shrink-0">
                      In Progress
                    </span>
                  )}
                  {isAvailable && (
                    <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-mono uppercase shrink-0">
                      Unlocked
                    </span>
                  )}
                  {!isActive && !isAvailable && (
                    <span className="material-symbols-outlined text-[14px] text-outline shrink-0">lock</span>
                  )}
                </div>

                <h4 className="font-sans font-semibold text-sm text-on-surface truncate mb-1">
                  {mod.title}
                </h4>

                <p className="text-xs text-on-surface-variant italic font-serif truncate mb-3">
                  "{mod.chapter}"
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-surface-container-highest/50 font-mono text-on-surface-variant">
                  <span>+{mod.xp} pts</span>
                  <span className="text-secondary font-medium">
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
