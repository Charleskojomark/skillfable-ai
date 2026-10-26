import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [cohort, setCohort] = useState(user.cohort);
  const [selectedAvatar, setSelectedAvatar] = useState(user.selectedAvatarUrl);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim() || 'Fellow',
      title,
      cohort,
      selectedAvatarUrl: selectedAvatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-surface-container border border-outline-variant/40 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <h3 className="font-serif text-lg text-on-surface font-semibold">
              Fellow Identity Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
          
          {/* Avatar selector */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Select Illustrated Fellow Avatar
            </label>
            <div className="flex items-center gap-3">
              {AVATAR_OPTIONS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all p-0.5 ${
                    selectedAvatar === url ? 'border-primary ring-2 ring-primary/40' : 'border-outline-variant opacity-70'
                  }`}
                >
                  <img src={url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Damilola, Kojo, Amina"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface focus:border-primary outline-none font-sans"
              required
            />
          </div>

          {/* Specialization / Title */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Fellow Role Focus
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface focus:border-primary outline-none font-sans"
            >
              <option value="AI Operations & Evaluation Fellow">AI Operations & Evaluation Fellow</option>
              <option value="Technical Builder & Solutions Fellow">Technical Builder & Solutions Fellow</option>
              <option value="Business & Freelance AI Strategist">Business & Freelance AI Strategist</option>
              <option value="Responsible AI & Governance Fellow">Responsible AI & Governance Fellow</option>
            </select>
          </div>

          {/* Cohort Location */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Relay Studio Regional Cohort
            </label>
            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface focus:border-primary outline-none font-sans"
            >
              <option value="Lagos Cohort 04">Lagos Cohort 04 (Nigeria)</option>
              <option value="Accra Cohort 02">Accra Cohort 02 (Ghana)</option>
              <option value="Nairobi Cohort 03">Nairobi Cohort 03 (Kenya)</option>
              <option value="Dakar Cohort 01">Dakar Cohort 01 (Senegal)</option>
              <option value="Remote Pan-African Fellow">Remote Pan-African Fellow</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-surface-container-highest mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all active:scale-95 glow-primary"
            >
              Save Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
