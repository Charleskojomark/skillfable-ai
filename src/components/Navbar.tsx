import React from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'story' | 'mission' | 'progress';
  onSelectTab: (tab: 'dashboard' | 'story' | 'mission' | 'progress') => void;
  user: UserProfile;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onOpenProfile
}) => {
  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container-high/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Brand Mark */}
            <div 
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary transition-all shrink-0">
                <span className="material-symbols-outlined text-[19px] sm:text-[21px]">
                  auto_stories
                </span>
              </div>
              
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                    SkillFable <span className="text-primary font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider ml-0.5">AI</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-on-surface-variant font-mono text-[9px] uppercase shrink-0 font-medium">
                    Season 1
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant/80 truncate hidden sm:block font-sans">
                  The Intelligence Project • Relay Studio
                </span>
              </div>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-outline-variant/30">
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-surface-bright text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onSelectTab('story')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  currentTab === 'story'
                    ? 'bg-surface-bright text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Story Episodes
              </button>
              <button
                onClick={() => onSelectTab('mission')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  currentTab === 'mission'
                    ? 'bg-surface-bright text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Mission Workspace
              </button>
              <button
                onClick={() => onSelectTab('progress')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  currentTab === 'progress'
                    ? 'bg-surface-bright text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Portfolio & Modules
              </button>
            </nav>

            {/* Right Area: XP, Streak, Avatar */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Daily Streak */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface-variant text-xs">
                <span className="material-symbols-outlined text-[15px] text-tertiary">today</span>
                <span className="font-mono text-xs font-medium">{user.streakDays}d streak</span>
              </div>

              {/* XP Counter */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[15px]">military_tech</span>
                <span className="font-mono text-xs font-semibold text-on-surface">
                  {user.xp.toLocaleString()} <span className="text-on-surface-variant text-[11px] font-normal hidden sm:inline">pts</span>
                </span>
              </div>

              {/* User Profile Avatar */}
              <button
                onClick={onOpenProfile}
                className="relative flex items-center justify-center p-0.5 rounded-full border border-outline-variant/50 hover:border-primary transition-all active:scale-95"
                title="Fellow Profile"
              >
                <img
                  src={user.selectedAvatarUrl}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover bg-surface-container-highest"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Ergonomic Thumb Reach) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-high pb-safe">
        <div className="grid grid-cols-4 h-16 items-center px-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'dashboard'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="text-[10px] font-sans">Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('story')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'story'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            <span className="text-[10px] font-sans">Story</span>
          </button>

          <button
            onClick={() => onSelectTab('mission')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'mission'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">assignment</span>
            <span className="text-[10px] font-sans">Mission</span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'progress'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">folder_special</span>
            <span className="text-[10px] font-sans">Portfolio</span>
          </button>
        </div>
      </nav>
    </>
  );
};
