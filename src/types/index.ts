export interface Character {
  id: string;
  name: string;
  role: string;
  city: string;
  avatarColor: string;
  initials: string;
  avatarUrl?: string;
  bio: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  rationale: string;
  isOptimal: boolean;
  feedbackTitle: string;
  feedbackText: string;
  xpReward: number;
}

export interface StoryBeat {
  id: string;
  type: 'narration' | 'dialogue' | 'decision' | 'discovery';
  characterId?: string;
  speakerName?: string;
  speakerRole?: string;
  speakerInitials?: string;
  content: string;
  timestamp?: string;
  audioLabel?: string;
  imageClueUrl?: string;
  decision?: {
    prompt: string;
    options: ChoiceOption[];
  };
}

export interface VirtualFile {
  id: string;
  name: string;
  size: string;
  extension: string;
  modified: string;
  checksum: string;
  threatLevel: 'safe' | 'suspicious' | 'malicious';
  isVerifiedHandover: boolean;
  notes: string;
  permission: 'Restricted View' | 'Public' | 'Full Edit' | 'Quarantined';
}

export interface MissionStep {
  id: string;
  title: string;
  description: string;
  targetFileId?: string;
  expectedAction: 'quarantine' | 'select_handover' | 'set_permission';
}

export interface PracticalMission {
  id: string;
  title: string;
  moduleCode: string;
  estimatedMinutes: number;
  learningObjective: string;
  context: string;
  instructions: string[];
  files: VirtualFile[];
  hints: string[];
  steps: MissionStep[];
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  hook: string;
  heroImage: string;
  heroAlt: string;
  sceneLocation: string;
  sceneTime: string;
  logId: string;
  durationMinutes: number;
  beats: StoryBeat[];
  mission: PracticalMission;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  overview: string;
  learningOutcomes: string[];
  episodes: Episode[];
}

export interface UserProfile {
  name: string;
  title: string;
  cohort: string;
  level: number;
  xp: number;
  streakDays: number;
  completedEpisodeIds: string[];
  completedMissionIds: string[];
  selectedAvatarUrl: string;
  choiceHistory: Record<string, string>; // beatId -> choiceId
  earnedBadges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  }[];
  portfolioArtifacts: {
    id: string;
    title: string;
    type: string;
    summary: string;
    verifiedDate: string;
    badgeCode: string;
  }[];
}
