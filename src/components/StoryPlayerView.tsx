import React, { useState } from 'react';
import { UserProfile, ChoiceOption } from '../types';
import { MODULE_1 } from '../data/storyData';

interface StoryPlayerViewProps {
  user: UserProfile;
  currentEpisodeId: string;
  onSelectEpisode: (epId: string) => void;
  onRecordChoice: (beatId: string, choiceId: string, xpReward: number) => void;
  onLaunchMission: (missionId: string) => void;
}

export const StoryPlayerView: React.FC<StoryPlayerViewProps> = ({
  user,
  currentEpisodeId,
  onSelectEpisode,
  onRecordChoice,
  onLaunchMission
}) => {
  const [textScale, setTextScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{ [beatId: string]: ChoiceOption | null }>({});

  const episode = MODULE_1.episodes.find((e) => e.id === currentEpisodeId) || MODULE_1.episodes[0];
  const episodeIndex = MODULE_1.episodes.findIndex((e) => e.id === episode.id);

  const getTextClass = () => {
    if (textScale === 'sm') return 'text-xs sm:text-sm';
    if (textScale === 'lg') return 'text-base sm:text-lg';
    return 'text-sm sm:text-base';
  };

  const handleSelectChoice = (beatId: string, option: ChoiceOption) => {
    setActiveFeedback((prev) => ({ ...prev, [beatId]: option }));
    onRecordChoice(beatId, option.id, option.xpReward);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-24 flex flex-col gap-6 overflow-x-hidden">
      
      {/* Top Episode Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-surface-container-high/60 scrollbar-none w-full max-w-full">
        <div className="flex items-center gap-2 shrink-0">
          {MODULE_1.episodes.map((ep) => {
            const isSelected = ep.id === episode.id;
            const isDone = user.completedEpisodeIds.includes(ep.id);

            return (
              <button
                key={ep.id}
                onClick={() => onSelectEpisode(ep.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {isDone && <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>}
                <span>Episode {ep.number}: {ep.title}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-on-surface-variant font-medium shrink-0 hidden xs:block">
          Module 1 of 18
        </div>
      </div>

      {/* Chapter & Scene Progress Header */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex flex-wrap items-center justify-between gap-1 text-on-surface-variant text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-[75%] truncate">
            <span className="uppercase tracking-widest text-primary font-mono font-semibold shrink-0 text-[10px] sm:text-xs">
              Chapter 01 • Episode {episode.number} of {MODULE_1.episodes.length}
            </span>
            <span className="text-outline-variant shrink-0">•</span>
            <span className="text-on-surface-variant font-medium truncate text-[11px] sm:text-xs">{episode.subtitle}</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-mono shrink-0">
            <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
            <span>{episode.durationMinutes} min read</span>
          </div>
        </div>

        {/* Story Progress Bar */}
        <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden flex">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((episodeIndex + 1) / MODULE_1.episodes.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Cinematic Scene Frame */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-surface-container-lowest border border-outline-variant/30">
        <div className="relative w-full aspect-[16/9] max-h-72 sm:max-h-80 overflow-hidden">
          <img
            src={episode.heroImage}
            alt={episode.heroAlt}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>

          {/* Setting & Time Labels */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/30 text-xs font-mono text-on-surface shrink-0">
              <span>{episode.sceneTime}</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/30 text-xs text-on-surface truncate max-w-[65%]">
              <span className="material-symbols-outlined text-[14px] text-primary shrink-0">location_on</span>
              <span className="truncate">{episode.sceneLocation}</span>
            </div>
          </div>
        </div>

        {/* Reading Controls Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-surface-container-low border-t border-outline-variant/30">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] font-mono text-on-surface-variant">Text Size</span>
            <div className="flex items-center rounded bg-surface-container p-0.5 border border-outline-variant/30">
              <button
                onClick={() => setTextScale('sm')}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'sm' ? 'bg-surface-bright text-on-surface font-bold' : 'text-on-surface-variant'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setTextScale('md')}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'md' ? 'bg-surface-bright text-on-surface font-bold' : 'text-on-surface-variant'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setTextScale('lg')}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  textScale === 'lg' ? 'bg-surface-bright text-on-surface font-bold' : 'text-on-surface-variant'
                }`}
              >
                A+
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-on-surface-variant hover:text-on-surface text-xs font-sans transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Story Narrative & Dialogue Stream */}
      <div className="flex flex-col gap-5 sm:gap-6 w-full">
        {episode.beats.map((beat) => {
          if (beat.type === 'narration') {
            return (
              <div
                key={beat.id}
                className="px-5 py-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl w-full"
              >
                <div className="flex items-start gap-3">
                  <span className="text-primary font-serif text-3xl sm:text-4xl leading-none font-bold select-none shrink-0 mt-0.5">
                    “
                  </span>
                  <p className={`font-serif text-on-surface font-normal leading-relaxed italic break-words ${getTextClass()}`}>
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
                className="bg-surface-container border border-outline-variant/30 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-3 w-full"
              >
                {/* Character Speaker Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary font-serif font-bold text-xs sm:text-sm shrink-0">
                      {beat.speakerInitials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans font-semibold text-xs sm:text-sm text-on-surface truncate">
                        {beat.speakerName}
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        {beat.speakerRole}
                      </span>
                    </div>
                  </div>

                  {beat.timestamp && (
                    <span className="text-[10px] text-on-surface-variant font-mono shrink-0">
                      {beat.timestamp}
                    </span>
                  )}
                </div>

                {/* Dialogue Content */}
                <p className={`text-on-surface leading-relaxed break-words pl-1 ${getTextClass()}`}>
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
                className="bg-surface-container border border-outline-variant/40 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 w-full"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">rule</span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Fellow Decision Required
                  </span>
                </div>

                <p className="font-serif text-lg sm:text-xl text-on-surface font-normal break-words">
                  {beat.decision.prompt}
                </p>

                {/* Decision Option Cards */}
                <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
                  {beat.decision.options.map((opt) => {
                    const isSelected = recordedChoiceId === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectChoice(beat.id, opt)}
                        className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 w-full ${
                          isSelected
                            ? 'bg-surface-container-high border-primary text-on-surface shadow-sm'
                            : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-primary text-on-primary font-bold border-primary'
                            : 'bg-surface-container border-outline-variant text-on-surface-variant'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </div>

                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <span className={`font-sans text-xs sm:text-sm font-semibold leading-snug break-words ${
                            isSelected ? 'text-primary' : 'text-on-surface'
                          }`}>
                            {opt.text}
                          </span>
                          <span className="text-xs text-on-surface-variant break-words">
                            {opt.rationale}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Drawer */}
                {currentChoiceFeedback && (
                  <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-all w-full ${
                    currentChoiceFeedback.isOptimal
                      ? 'bg-surface-container-high border-secondary/50 text-on-surface'
                      : 'bg-surface-container-high border-error/50 text-on-surface'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[18px] shrink-0">
                          {currentChoiceFeedback.isOptimal ? 'check_circle' : 'info'}
                        </span>
                        <strong className="text-xs font-semibold uppercase tracking-wider truncate">
                          {currentChoiceFeedback.feedbackTitle}
                        </strong>
                      </div>
                      <span className="font-mono text-xs font-semibold text-primary shrink-0">
                        +{currentChoiceFeedback.xpReward} pts
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-on-surface-variant break-words">
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

      {/* Bottom Mission Section */}
      <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm w-full">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">assignment</span>
            <span className="font-mono text-xs uppercase tracking-wider text-secondary font-medium truncate">
              Practical Mission Task
            </span>
          </div>
          <h4 className="font-serif text-base sm:text-lg text-on-surface font-semibold truncate">
            {episode.mission.title}
          </h4>
          <p className="text-xs text-on-surface-variant line-clamp-2">
            {episode.mission.learningObjective}
          </p>
        </div>

        <button
          onClick={() => onLaunchMission(episode.mission.id)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <span>Open Mission</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
