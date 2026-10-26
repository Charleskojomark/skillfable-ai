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
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Season Tag */}
          <div 
            onClick={() => onSelectTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container via-surface-container-high to-surface-container-lowest border border-primary/40 flex items-center justify-center shadow-lg group-hover:border-primary transition-all">
              <span className="material-symbols-outlined text-primary text-[22px] group-hover:scale-110 transition-transform">
                bolt
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors truncate">
                  SkillFable AI
                </span>
                <span className="px-1.5 py-0.5 rounded bg-tertiary-container/20 border border-tertiary/30 text-tertiary font-mono text-[10px] tracking-wider uppercase shrink-0 font-semibold">
                  S1
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant/80 truncate hidden sm:block">
                The Intelligence Project • Relay Studio
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
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
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Audio Sync Simulation Button */}
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

            {/* Streak & XP Pills */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[15px]">bolt</span>
              <span className="font-mono text-xs font-bold text-primary">{user.xp.toLocaleString()} XP</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-tertiary">
              <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              <span className="font-mono text-xs font-semibold">{user.streakDays}d</span>
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
                className="w-8 h-8 rounded-full object-cover bg-surface-container-highest"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface"></span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-surface-container-high/40 text-xs">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 ${
              currentTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => onSelectTab('story')}
            className={`flex flex-col items-center gap-0.5 ${
              currentTab === 'story' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            <span>Story</span>
          </button>
          <button
            onClick={() => onSelectTab('mission')}
            className={`flex flex-col items-center gap-0.5 ${
              currentTab === 'mission' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Mission</span>
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`flex flex-col items-center gap-0.5 ${
              currentTab === 'progress' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span>Portfolio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
