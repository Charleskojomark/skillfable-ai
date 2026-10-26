import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, VirtualFile } from '../types';
import { MODULE_1 } from '../data/storyData';

interface MissionViewProps {
  user: UserProfile;
  activeMissionId: string;
  onCompleteMission: (missionId: string, xpReward: number) => void;
  onReturnToStory: () => void;
  onNavigateToTab: (tab: 'dashboard' | 'story' | 'mission' | 'progress') => void;
}

export const MissionView: React.FC<MissionViewProps> = ({
  user,
  activeMissionId,
  onCompleteMission,
  onReturnToStory,
  onNavigateToTab
}) => {
  const mission = MODULE_1.episodes.flatMap((e) => e.mission).find((m) => m.id === activeMissionId) || MODULE_1.episodes[0].mission;
  
  const [filesState, setFilesState] = useState<VirtualFile[]>(mission.files);
  const [selectedFileId, setSelectedFileId] = useState<string>(mission.files[0].id);
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [auditResult, setAuditResult] = useState<{
    status: 'idle' | 'running' | 'success' | 'failed';
    message: string;
    details: string[];
  }>({
    status: 'idle',
    message: '',
    details: []
  });

  const selectedFile = filesState.find((f) => f.id === selectedFileId) || filesState[0];

  const handleToggleQuarantine = (fileId: string) => {
    setFilesState((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const nextPerm = f.permission === 'Quarantined' ? 'Restricted View' : 'Quarantined';
          return { ...f, permission: nextPerm };
        }
        return f;
      })
    );
  };

  const handleToggleHandover = (fileId: string) => {
    setFilesState((prev) =>
      prev.map((f) => ({
        ...f,
        isVerifiedHandover: f.id === fileId ? !f.isVerifiedHandover : false
      }))
    );
  };

  const handleChangePermission = (fileId: string, perm: VirtualFile['permission']) => {
    setFilesState((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, permission: perm } : f))
    );
  };

  const handleRunAudit = () => {
    setAuditResult({ status: 'running', message: 'Verifying files and permissions...', details: [] });

    setTimeout(() => {
      const threatFile = filesState.find((f) => f.threatLevel === 'malicious');
      const isThreatQuarantined = threatFile?.permission === 'Quarantined';

      const handoverCandidate = filesState.find((f) => f.isVerifiedHandover);
      const isCorrectHandover = handoverCandidate?.extension === 'CSV' && handoverCandidate.permission === 'Restricted View';

      if (isThreatQuarantined && isCorrectHandover) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });

        setAuditResult({
          status: 'success',
          message: 'Verification Passed: Handover Pack Prepared Successfully',
          details: [
            '✓ Untrusted binary (emergency_patch.exe) quarantined.',
            '✓ Verified baseline dataset designated for client handover.',
            '✓ Access controls confirmed as "Restricted View" for Afara Health partners.',
            '✓ +350 pts awarded to your Fellow record.'
          ]
        });

        onCompleteMission(mission.id, 350);
      } else {
        const failurePoints: string[] = [];
        if (!isThreatQuarantined) {
          failurePoints.push('Security Issue: emergency_patch.exe is not in Quarantine.');
        }
        if (!handoverCandidate) {
          failurePoints.push('Data Missing: No verified handover file was selected for the client meeting.');
        } else if (handoverCandidate.extension !== 'CSV') {
          failurePoints.push(`File Choice: ${handoverCandidate.name} has calculation errors or outdated versions. Choose the verified CSV.`);
        } else if (handoverCandidate.permission !== 'Restricted View') {
          failurePoints.push('Permissions: Set the handover file to "Restricted View" to protect client data.');
        }

        setAuditResult({
          status: 'failed',
          message: 'Verification Review Incomplete',
          details: failurePoints
        });
      }
    }, 600);
  };

  const isMissionCompleted = user.completedMissionIds.includes(mission.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-24 flex flex-col gap-6 overflow-x-hidden">
      
      {/* Mission Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-secondary text-xs font-mono font-medium uppercase">
              {mission.moduleCode} Assignment
            </span>
            {isMissionCompleted && (
              <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-xs font-medium uppercase">
                Completed
              </span>
            )}
            <span className="text-xs text-on-surface-variant font-mono">
              Est. {mission.estimatedMinutes} Mins
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-on-surface font-semibold break-words">
            {mission.title}
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl break-words">
            {mission.context}
          </p>
        </div>

        <button
          onClick={onReturnToStory}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-medium hover:border-outline transition-all shrink-0 self-start md:self-center"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Return to Story</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full">
        
        {/* Left Column: Virtual File Browser */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full min-w-0">
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 shadow-sm flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-on-surface font-semibold flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">folder</span>
                <span className="truncate">Afara Handover Folder</span>
              </span>
              <span className="text-xs font-mono text-on-surface-variant shrink-0">
                {filesState.length} files
              </span>
            </div>

            {/* File List */}
            <div className="flex flex-col gap-2 w-full">
              {filesState.map((file) => {
                const isSelected = file.id === selectedFileId;
                const isQuarantined = file.permission === 'Quarantined';

                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 w-full min-w-0 ${
                      isSelected
                        ? 'bg-surface-container-high border-primary/70 shadow-sm'
                        : isQuarantined
                        ? 'bg-error-container/10 border-error/30'
                        : 'bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        file.extension === 'EXE'
                          ? 'bg-error-container/40 text-error'
                          : file.extension === 'CSV'
                          ? 'bg-secondary-container/40 text-secondary'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}>
                        {file.extension}
                      </span>

                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={`text-xs font-medium truncate block ${
                          isSelected ? 'text-primary' : isQuarantined ? 'text-error line-through' : 'text-on-surface'
                        }`}>
                          {file.name}
                        </span>
                        <span className="text-[10px] font-mono text-on-surface-variant truncate block">
                          {file.size} • {file.modified}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isQuarantined && (
                        <span className="px-1.5 py-0.5 rounded bg-error/15 text-error font-mono text-[9px] uppercase font-semibold">
                          Quarantined
                        </span>
                      )}
                      {file.isVerifiedHandover && (
                        <span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-mono text-[9px] uppercase font-semibold">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Hints */}
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans text-on-surface font-semibold flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">tips_and_updates</span>
                <span className="truncate">Guidelines & Hints</span>
              </span>
              <button
                onClick={() => setHintIndex((prev) => (prev < mission.hints.length - 1 ? prev + 1 : 0))}
                className="text-xs text-secondary hover:text-primary transition-colors shrink-0"
              >
                {hintIndex === -1 ? 'Show Hint' : `Hint (${hintIndex + 1}/${mission.hints.length})`}
              </button>
            </div>

            {hintIndex >= 0 && (
              <div className="p-3 rounded-lg bg-surface-container-high border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed break-words">
                <strong className="text-on-surface font-medium">Note #{hintIndex + 1}:</strong> {mission.hints[hintIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: File Details & Handover Verification */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full min-w-0">
          
          {/* File Details Panel */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-sm flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">info</span>
                <span className="text-xs font-semibold text-on-surface truncate">
                  File Details: {selectedFile.name}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-medium uppercase shrink-0 ${
                selectedFile.threatLevel === 'malicious'
                  ? 'bg-error/15 text-error'
                  : 'bg-secondary/15 text-secondary'
              }`}>
                {selectedFile.threatLevel === 'malicious' ? 'Security Risk' : 'Standard File'}
              </span>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs w-full">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1 min-w-0">
                <span className="text-[10px] text-on-surface-variant font-sans">Checksum / Hash</span>
                <span className="text-on-surface truncate block font-mono text-[11px]">{selectedFile.checksum}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1 min-w-0">
                <span className="text-[10px] text-on-surface-variant font-sans">Last Modified</span>
                <span className="text-on-surface truncate block font-mono text-[11px]">{selectedFile.modified}</span>
              </div>
            </div>

            {/* Review Notes */}
            <div className="p-3 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed break-words">
              <strong className="text-on-surface font-medium">Review Notes: </strong>
              {selectedFile.notes}
            </div>

            {/* Actions for this file */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-surface-container-highest">
              
              {/* Permission Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto min-w-0">
                <label className="text-xs text-on-surface-variant whitespace-nowrap font-medium">
                  File Access:
                </label>
                <select
                  value={selectedFile.permission}
                  onChange={(e) => handleChangePermission(selectedFile.id, e.target.value as VirtualFile['permission'])}
                  className="w-full sm:w-auto bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none min-w-0"
                >
                  <option value="Restricted View">Restricted View (Partner Link)</option>
                  <option value="Public">Public (Anyone with link)</option>
                  <option value="Full Edit">Full Edit (Internal Collaborators)</option>
                  <option value="Quarantined">Quarantined (Access Revoked)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selectedFile.threatLevel === 'malicious' ? (
                  <button
                    onClick={() => handleToggleQuarantine(selectedFile.id)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                      selectedFile.permission === 'Quarantined'
                        ? 'bg-error text-on-error'
                        : 'bg-error-container text-on-error-container hover:bg-error'
                    }`}
                  >
                    {selectedFile.permission === 'Quarantined' ? 'Quarantined ✓' : 'Quarantine File'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleHandover(selectedFile.id)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                      selectedFile.isVerifiedHandover
                        ? 'bg-secondary text-on-secondary shadow-sm'
                        : 'bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface'
                    }`}
                  >
                    {selectedFile.isVerifiedHandover ? 'Selected for Handover ✓' : 'Select for Handover'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Audit Verification Card */}
          <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/40 shadow-sm flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-on-surface truncate">
                  Handover Verification
                </span>
                <span className="text-xs text-on-surface-variant">
                  Verify file safety and permissions before sharing with Afara Health.
                </span>
              </div>

              <button
                onClick={handleRunAudit}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <span>Verify & Complete</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </button>
            </div>

            {/* Verification Result Output */}
            {auditResult.status !== 'idle' && (
              <div className={`p-4 rounded-xl text-xs flex flex-col gap-2 w-full break-words ${
                auditResult.status === 'running'
                  ? 'bg-surface-container text-on-surface'
                  : auditResult.status === 'success'
                  ? 'bg-surface-container border border-secondary/50 text-on-surface'
                  : 'bg-surface-container border border-error/50 text-on-surface'
              }`}>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-[16px] shrink-0">
                    {auditResult.status === 'running'
                      ? 'hourglass_empty'
                      : auditResult.status === 'success'
                      ? 'task_alt'
                      : 'error'}
                  </span>
                  <span className="break-words">{auditResult.message}</span>
                </div>

                {auditResult.details.map((d, i) => (
                  <div key={i} className="pl-5 text-xs text-on-surface-variant leading-relaxed break-words">
                    {d}
                  </div>
                ))}

                {auditResult.status === 'success' && (
                  <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-secondary font-medium text-xs">
                      Achievement: Handover Verified
                    </span>
                    <button
                      onClick={() => onNavigateToTab('progress')}
                      className="px-3 py-1.5 rounded bg-secondary text-on-secondary font-semibold text-xs hover:bg-secondary-container w-full sm:w-auto text-center"
                    >
                      View in Portfolio →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
