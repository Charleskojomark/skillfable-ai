import React, { useState } from 'react';
import { UserProfile, ChoiceOption } from '../types';
import { MODULE_1 } from '../data/storyData';

interface StoryPlayerViewProps {
  user: UserProfile;
  currentEpisodeId: string;
  onSelectEpisode: (epId: string) => void;
  onRecordChoice: (beatId: string, choiceId: string, xpReward: number) => void;
  onLaunchMission: (missionId: string) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const StoryPlayerView: React.FC<StoryPlayerViewProps> = ({
  user,
  currentEpisodeId,
  onSelectEpisode,
  onRecordChoice,
  onLaunchMission,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [textScale, setTextScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{ [beatId: string]: ChoiceOption | null }>({});

  const episode = MODULE_1.episodes.find((e) => e.id === currentEpisodeId) || MODULE_1.episodes[0];
  const episodeIndex = MODULE_1.episodes.findIndex((e) => e.id === episode.id);

  const getTextClass = () => {
    if (textScale === 'sm') return 'text-xs md:text-sm';
    if (textScale === 'lg') return 'text-base md:text-lg';
    return 'text-sm md:text-base';
  };

  const handleSelectChoice = (beatId: string, option: ChoiceOption) => {
    setActiveFeedback((prev) => ({ ...prev, [beatId]: option }));
    onRecordChoice(beatId, option.id, option.xpReward);
  };

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-18 sm:pt-20 md:pt-24 pb-28 md:pb-24 flex flex-col gap-6">
      
      {/* Top Episode Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-surface-container-high/60">
        <div className="flex items-center gap-2">
          {MODULE_1.episodes.map((ep) => {
            const isSelected = ep.id === episode.id;
            const isDone = user.completedEpisodeIds.includes(ep.id);

            return (
              <button
                key={ep.id}
                onClick={() => onSelectEpisode(ep.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {isDone && <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>}
                <span>Ep. {ep.number}: {ep.title}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-tertiary font-bold shrink-0">
          SEASON 1 // MODULE 1
        </div>
      </div>

      {/* Chapter & Scene Progress Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-on-surface-variant text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[14px]">adjust</span>
            <span className="uppercase tracking-widest text-tertiary font-mono font-bold">
              CH 01 • EPISODE {episode.number} / {MODULE_1.episodes.length}
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant font-medium truncate">{episode.subtitle}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-mono">
            <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
            <span>{episode.durationMinutes} min read</span>
          </div>
        </div>

        {/* Dynamic Progress Track */}
        <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${((episodeIndex + 1) / MODULE_1.episodes.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Cinematic Visual Framing with Vignette */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest border border-outline-variant/30 group">
        <div className="relative w-full aspect-[16/9] max-h-80 overflow-hidden">
          <img
            src={episode.heroImage}
            alt={episode.heroAlt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/50"></div>

          {/* Top Metadata Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-lg border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-mono font-semibold text-[11px] tracking-wider text-secondary">
                {episode.sceneTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-lg border border-outline-variant/30">
              <span className="material-symbols-outlined text-[14px] text-tertiary">location_on</span>
              <span className="text-[11px] text-on-surface tracking-wider uppercase font-medium">
                {episode.sceneLocation}
              </span>
            </div>
          </div>

          {/* Bottom Audio Stream Badge */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-surface-container-high/90 text-primary font-mono text-[10px] tracking-wider uppercase backdrop-blur-md border border-primary/20">
              {episode.logId}
            </span>

            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-md border ${
                isAudioPlaying
                  ? 'bg-secondary-container/90 border-secondary text-on-secondary'
                  : 'bg-surface-container-high/90 border-outline-variant/30 text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <div className="flex items-center gap-0.5 h-3 px-0.5">
                <span className={`w-1 bg-current rounded-full ${isAudioPlaying ? 'h-2 animate-pulse' : 'h-1'}`}></span>
                <span className={`w-1 bg-current rounded-full ${isAudioPlaying ? 'h-3 animate-ping' : 'h-2'}`}></span>
                <span className={`w-1 bg-current rounded-full ${isAudioPlaying ? 'h-1.5 animate-pulse' : 'h-1'}`}></span>
              </div>
              <span className="material-symbols-outlined text-[15px]">
                {isAudioPlaying ? 'volume_up' : 'volume_mute'}
              </span>
              <span className="text-[11px] font-medium font-mono">
                {isAudioPlaying ? 'Narrator Active' : 'Narrator Stream'}
              </span>
            </button>
          </div>
        </div>

        {/* Text Scale & Controls Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container-low border-t border-outline-variant/30">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-on-surface-variant font-medium">TEXT SCALE</span>
            <div className="flex items-center rounded-lg bg-surface-container p-0.5 border border-outline-variant/30">
              <button
                onClick={() => setTextScale('sm')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'sm' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setTextScale('md')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'md' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setTextScale('lg')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'lg' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                A+
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container text-on-surface-variant hover:text-primary transition-colors text-xs font-mono"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isBookmarked ? 'Saved' : 'Save Beat'}</span>
          </button>
        </div>
      </div>

      {/* Narrative Dialogue Flow with Illuminated Drop Caps */}
      <div className="flex flex-col gap-6">
        {episode.beats.map((beat) => {
          if (beat.type === 'narration') {
            return (
              <div
                key={beat.id}
                className="relative px-5 py-4 bg-surface-container-lowest/70 border border-outline-variant/20 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-primary font-serif text-4xl leading-none font-bold select-none shrink-0 mt-0.5">
                    “
                  </span>
                  <p className={`font-serif text-on-surface font-normal leading-relaxed italic ${getTextClass()}`}>
                    {beat.content}
                  </p>
                </div>
              </div>
            );
          }

          if (beat.type === 'dialogue') {
            return (
              <div
                key={beat.id}
                className="relative bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden p-5 shadow-lg flex flex-col gap-3"
              >
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-secondary"></div>
                
                {/* Character Speaker Header */}
                <div className="flex items-center justify-between pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-secondary/40 flex items-center justify-center text-secondary font-bold font-mono text-sm shadow-md">
                      {beat.speakerInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-sm text-secondary tracking-wide">
                        {beat.speakerName}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-mono">
                        {beat.speakerRole}
                      </span>
                    </div>
                  </div>

                  {beat.timestamp && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      <span>{beat.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* Dialogue Content */}
                <p className={`pl-2 text-on-surface leading-relaxed ${getTextClass()}`}>
                  {beat.content}
                </p>
              </div>
            );
          }

          if (beat.type === 'decision' && beat.decision) {
            const recordedChoiceId = user.choiceHistory[beat.id];
            const currentChoiceFeedback = activeFeedback[beat.id];

            return (
              <div
                key={beat.id}
                className="relative bg-gradient-to-br from-surface-container via-surface-container to-surface-container-high border-2 border-primary/50 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 glow-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    Fellow Decision Required • Live Consequence
                  </span>
                </div>

                <p className="font-serif text-lg md:text-xl text-on-surface font-normal">
                  {beat.decision.prompt}
                </p>

                {/* Decision Option Cards */}
                <div className="flex flex-col gap-3">
                  {beat.decision.options.map((opt) => {
                    const isSelected = recordedChoiceId === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectChoice(beat.id, opt)}
                        className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group ${
                          isSelected
                            ? 'bg-primary/10 border-primary ring-2 ring-primary/40 shadow-md'
                            : 'bg-surface-container-low border-outline-variant/40 hover:border-primary/60 hover:bg-surface-container-high'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-primary text-on-primary font-bold border-primary'
                            : 'bg-surface-container border-outline-variant text-on-surface-variant group-hover:border-primary'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className={`font-sans text-sm font-semibold leading-snug ${
                            isSelected ? 'text-primary' : 'text-on-surface group-hover:text-primary'
                          }`}>
                            {opt.text}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            {opt.rationale}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Drawer (Shown when chosen) */}
                {currentChoiceFeedback && (
                  <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                    currentChoiceFeedback.isOptimal
                      ? 'bg-secondary-container/20 border-secondary text-on-surface'
                      : 'bg-error-container/20 border-error text-on-surface'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">
                          {currentChoiceFeedback.isOptimal ? 'check_circle' : 'warning'}
                        </span>
                        <strong className="text-xs font-mono uppercase tracking-wider font-bold">
                          {currentChoiceFeedback.feedbackTitle}
                        </strong>
                      </div>
                      <span className="font-mono text-xs font-bold text-primary">
                        +{currentChoiceFeedback.xpReward} XP
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-on-surface-variant">
                      {currentChoiceFeedback.feedbackText}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Bottom Mission Launch Gate */}
      <div className="mt-8 p-6 rounded-2xl bg-surface-container border border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">assignment_turned_in</span>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
              Episode Active Mission
            </span>
          </div>
          <h4 className="font-serif text-lg text-on-surface font-semibold">
            {episode.mission.title}
          </h4>
          <p className="text-xs text-on-surface-variant">
            {episode.mission.learningObjective}
          </p>
        </div>

        <button
          onClick={() => onLaunchMission(episode.mission.id)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-secondary-container transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 glow-secondary"
        >
          <span>Open Mission Terminal</span>
          <span className="material-symbols-outlined text-[18px]">terminal</span>
        </button>
      </div>
    </div>
  );
};
