import React from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'story' | 'mission' | 'progress';
  onSelectTab: (tab: 'dashboard' | 'story' | 'mission' | 'progress') => void;
  user: UserProfile;
  onOpenProfile: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onOpenProfile,
  isAudioPlaying,
  onToggleAudio
}) => {
  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_2px_16px_rgba(0,0,0,0.3)] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Brand & Season Tag */}
            <div 
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary-container via-surface-container-high to-surface-container-lowest border border-primary/40 flex items-center justify-center shadow-md group-hover:border-primary transition-all shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] group-hover:scale-110 transition-transform">
                  bolt
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-bold text-base sm:text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                    SkillFable <span className="text-primary font-extrabold">AI</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-tertiary-container/20 border border-tertiary/30 text-tertiary font-mono text-[9px] sm:text-[10px] tracking-wider uppercase shrink-0 font-semibold">
                    S1
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant/80 truncate hidden sm:block">
                  The Intelligence Project • Relay Studio
                </span>
              </div>
            </div>

            {/* Navigation Links (Desktop Only) */}
            <nav className="hidden md:flex items-center gap-1 bg-surface-container-lowest/80 p-1 rounded-xl border border-outline-variant/30">
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onSelectTab('story')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all ${
                  currentTab === 'story'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Story Player
              </button>
              <button
                onClick={() => onSelectTab('mission')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all ${
                  currentTab === 'mission'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                Practical Mission
              </button>
              <button
                onClick={() => onSelectTab('progress')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentTab === 'progress'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Portfolio & Map
              </button>
            </nav>

            {/* Right Area: XP, Audio Sync, Avatar */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Audio Sync Simulation Button (Desktop) */}
              <button
                onClick={onToggleAudio}
                title="Toggle Audio Narrative Stream"
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                  isAudioPlaying
                    ? 'bg-secondary-container/20 border-secondary text-secondary font-medium'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-0.5 h-2.5">
                  <span className={`w-0.5 bg-secondary rounded-full ${isAudioPlaying ? 'h-2.5 animate-pulse' : 'h-1.5'}`}></span>
                  <span className={`w-0.5 bg-secondary rounded-full ${isAudioPlaying ? 'h-3 animate-ping' : 'h-2'}`}></span>
                  <span className={`w-0.5 bg-secondary rounded-full ${isAudioPlaying ? 'h-1.5 animate-pulse' : 'h-1'}`}></span>
                </div>
                <span className="material-symbols-outlined text-[15px]">
                  {isAudioPlaying ? 'volume_up' : 'volume_mute'}
                </span>
                <span className="font-mono text-[11px] hidden lg:inline">
                  {isAudioPlaying ? 'Audio Sync Active' : 'Audio Sync'}
                </span>
              </button>

              {/* Streak Pill (sm+) */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-tertiary">
                <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                <span className="font-mono text-xs font-semibold">{user.streakDays}d</span>
              </div>

              {/* XP Pill (compact on mobile) */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[14px] sm:text-[15px]">bolt</span>
                <span className="font-mono text-xs font-bold text-primary">
                  {user.xp.toLocaleString()}<span className="hidden sm:inline"> XP</span>
                </span>
              </div>

              {/* User Profile Avatar */}
              <button
                onClick={onOpenProfile}
                className="relative flex items-center justify-center p-0.5 rounded-full ring-2 ring-primary/40 hover:ring-primary transition-all active:scale-95"
                title="Open Fellow Dossier Profile"
              >
                <img
                  src={user.selectedAvatarUrl}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover bg-surface-container-highest"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Ergonomic Thumb Reach) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-surface-container-high/70 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] pb-safe">
        <div className="grid grid-cols-4 h-16 items-center px-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'dashboard'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'dashboard' ? 'bg-primary/10' : ''}`}>
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
            </div>
            <span className="text-[10px] font-sans font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('story')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'story'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className={`p-1 rounded-lg relative ${currentTab === 'story' ? 'bg-primary/10' : ''}`}>
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <span className="text-[10px] font-sans font-medium">Story</span>
          </button>

          <button
            onClick={() => onSelectTab('mission')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'mission'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'mission' ? 'bg-primary/10' : ''}`}>
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <span className="text-[10px] font-sans font-medium">Mission</span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
              currentTab === 'progress'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className={`p-1 rounded-lg ${currentTab === 'progress' ? 'bg-primary/10' : ''}`}>
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            </div>
            <span className="text-[10px] font-sans font-medium">Portfolio</span>
          </button>
        </div>
      </nav>
    </>
  );
};
