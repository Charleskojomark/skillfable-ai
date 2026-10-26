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
  // Find current mission in Module 1
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
    setAuditResult({ status: 'running', message: 'Executing Relay Studio Cloud Directory Integrity Scan...', details: [] });

    setTimeout(() => {
      // Validate rules:
      // 1. emergency_patch.exe (f1) must be Quarantined
      // 2. Afara_Evaluation_v1.3_verified.csv (f3) or audited file must be isVerifiedHandover
      // 3. No malicious file can be Public or Open Edit
      const threatFile = filesState.find((f) => f.threatLevel === 'malicious');
      const isThreatQuarantined = threatFile?.permission === 'Quarantined';

      const handoverCandidate = filesState.find((f) => f.isVerifiedHandover);
      const isCorrectHandover = handoverCandidate?.extension === 'CSV' && handoverCandidate.permission === 'Restricted View';

      if (isThreatQuarantined && isCorrectHandover) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        setAuditResult({
          status: 'success',
          message: 'AUDIT CERTIFIED: Workspace Clean & Client Handover Verified!',
          details: [
            '✓ Untrusted executable (emergency_patch.exe) quarantined safely.',
            '✓ Verified baseline CSV dataset confirmed against Lagos State clinic registry.',
            '✓ Access controls locked to "Restricted View" for Afara Health partners.',
            '✓ +350 XP awarded to Fellow Profile.'
          ]
        });

        onCompleteMission(mission.id, 350);
      } else {
        const failurePoints: string[] = [];
        if (!isThreatQuarantined) {
          failurePoints.push('SECURITY ALERT: The executable binary emergency_patch.exe is not in Quarantine!');
        }
        if (!handoverCandidate) {
          failurePoints.push('DATA INTEGRITY: No verified handover file was designated for the client presentation.');
        } else if (handoverCandidate.extension !== 'CSV') {
          failurePoints.push(`DATA INTEGRITY: ${handoverCandidate.name} has unverified formulas or outdated timestamps. Choose the CSV verified this morning.`);
        } else if (handoverCandidate.permission !== 'Restricted View') {
          failurePoints.push('PERMISSIONS: The handover file must be set to "Restricted View" to prevent external tampering.');
        }

        setAuditResult({
          status: 'failed',
          message: 'AUDIT FAILED: Operational Risks Detected in Handover Directory.',
          details: failurePoints
        });
      }
    }, 800);
  };

  const isMissionCompleted = user.completedMissionIds.includes(mission.id);

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 pt-18 sm:pt-20 md:pt-24 pb-28 md:pb-24 flex flex-col gap-6">
      
      {/* Mission Dossier Header */}
      <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-secondary-container/20 border border-secondary/30 text-secondary text-xs font-mono font-bold tracking-widest uppercase">
              {mission.moduleCode} MISSION WORKSPACE
            </span>
            {isMissionCompleted && (
              <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary text-[10px] font-mono font-bold uppercase">
                Audited & Completed
              </span>
            )}
            <span className="text-xs font-mono text-on-surface-variant">
              Est. {mission.estimatedMinutes} Mins
            </span>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl text-on-surface font-semibold">
            {mission.title}
          </h1>

          <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl">
            {mission.context}
          </p>
        </div>

        <button
          onClick={onReturnToStory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-semibold hover:border-primary transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Story</span>
        </button>
      </div>

      {/* Main Terminal Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Virtual File Browser (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 shadow-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-tertiary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                /relay_studio/afara_handover_0843/
              </span>
              <span className="text-[11px] font-mono text-on-surface-variant">
                {filesState.length} Objects
              </span>
            </div>

            {/* File List */}
            <div className="flex flex-col gap-2">
              {filesState.map((file) => {
                const isSelected = file.id === selectedFileId;
                const isQuarantined = file.permission === 'Quarantined';

                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-surface-container-high border-primary ring-1 ring-primary/40 shadow-md'
                        : isQuarantined
                        ? 'bg-error-container/10 border-error/40 hover:border-error'
                        : 'bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        file.extension === 'EXE'
                          ? 'bg-error-container text-on-error'
                          : file.extension === 'CSV'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-highest text-primary'
                      }`}>
                        {file.extension}
                      </span>

                      <div className="flex flex-col min-w-0">
                        <span className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-primary' : isQuarantined ? 'text-error line-through' : 'text-on-surface'
                        }`}>
                          {file.name}
                        </span>
                        <span className="text-[10px] font-mono text-on-surface-variant">
                          {file.size} • {file.modified}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isQuarantined && (
                        <span className="px-1.5 py-0.5 rounded bg-error/20 text-error font-mono text-[9px] uppercase font-bold">
                          QUARANTINE
                        </span>
                      )}
                      {file.isVerifiedHandover && (
                        <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary font-mono text-[9px] uppercase font-bold">
                          HANDOVER
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progressive Hints Accordion */}
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">lightbulb</span>
                Field Guidance Hints
              </span>
              <button
                onClick={() => setHintIndex((prev) => (prev < mission.hints.length - 1 ? prev + 1 : 0))}
                className="text-[11px] font-mono text-secondary hover:text-primary transition-colors"
              >
                {hintIndex === -1 ? 'Reveal First Hint' : `Next Hint (${hintIndex + 1}/${mission.hints.length})`}
              </button>
            </div>

            {hintIndex >= 0 && (
              <div className="p-3 rounded-lg bg-surface-container-high/80 border border-tertiary/30 text-xs text-on-surface leading-relaxed animate-fadeIn">
                <strong>Clue #{hintIndex + 1}:</strong> {mission.hints[hintIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: File Inspector & Security Action Console (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* File Forensics Inspector Panel */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/40 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                  File Metadata Forensics // {selectedFile.name}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                selectedFile.threatLevel === 'malicious'
                  ? 'bg-error-container text-on-error'
                  : 'bg-secondary-container/20 text-secondary'
              }`}>
                {selectedFile.threatLevel === 'malicious' ? 'Untrusted Threat' : 'Safe Data Object'}
              </span>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1">
                <span className="text-[10px] text-on-surface-variant">SHA-256 Checksum Signature</span>
                <span className="text-on-surface truncate">{selectedFile.checksum}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1">
                <span className="text-[10px] text-on-surface-variant">Last File System Update</span>
                <span className="text-on-surface">{selectedFile.modified}</span>
              </div>
            </div>

            {/* Forensic Analyst Notes */}
            <div className="p-3 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Telemetry Note: </strong>
              {selectedFile.notes}
            </div>

            {/* Interactive Operations for this file */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-surface-container-highest">
              
              {/* Permission Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-xs font-mono text-on-surface-variant whitespace-nowrap">
                  Sharing Access:
                </label>
                <select
                  value={selectedFile.permission}
                  onChange={(e) => handleChangePermission(selectedFile.id, e.target.value as VirtualFile['permission'])}
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:border-primary outline-none font-mono"
                >
                  <option value="Restricted View">Restricted View (Partner Link)</option>
                  <option value="Public">Public (Anyone with link)</option>
                  <option value="Full Edit">Full Edit (Internal Collab)</option>
                  <option value="Quarantined">Quarantined (Locked/Isolated)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {selectedFile.threatLevel === 'malicious' ? (
                  <button
                    onClick={() => handleToggleQuarantine(selectedFile.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      selectedFile.permission === 'Quarantined'
                        ? 'bg-error text-on-error'
                        : 'bg-error-container text-on-error-container hover:bg-error'
                    }`}
                  >
                    {selectedFile.permission === 'Quarantined' ? 'Quarantined ✓' : 'Isolate / Quarantine'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleHandover(selectedFile.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                      selectedFile.isVerifiedHandover
                        ? 'bg-secondary text-on-secondary shadow-md'
                        : 'bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface'
                    }`}
                  >
                    {selectedFile.isVerifiedHandover ? 'Handover Candidate ✓' : 'Designate for Handover'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Audit Execution Bar */}
          <div className="p-5 rounded-2xl bg-surface-container-high border border-primary/40 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-primary">
                  INTEGRITY VERIFICATION GATEWAY
                </span>
                <span className="text-xs text-on-surface-variant">
                  Ensures zero malware and valid checksums before external client sync.
                </span>
              </div>

              <button
                onClick={handleRunAudit}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95 glow-primary"
              >
                <span>Run Integrity Audit</span>
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </button>
            </div>

            {/* Audit Report Terminal Output */}
            {auditResult.status !== 'idle' && (
              <div className={`p-4 rounded-xl font-mono text-xs flex flex-col gap-2 ${
                auditResult.status === 'running'
                  ? 'bg-surface-container-lowest text-primary'
                  : auditResult.status === 'success'
                  ? 'bg-secondary-container/20 border border-secondary text-on-surface'
                  : 'bg-error-container/20 border border-error text-on-surface'
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    {auditResult.status === 'running'
                      ? 'sync'
                      : auditResult.status === 'success'
                      ? 'task_alt'
                      : 'error'}
                  </span>
                  <span>{auditResult.message}</span>
                </div>

                {auditResult.details.map((d, i) => (
                  <div key={i} className="pl-6 text-[11px] leading-relaxed">
                    {d}
                  </div>
                ))}

                {auditResult.status === 'success' && (
                  <div className="mt-3 pt-3 border-t border-secondary/30 flex items-center justify-between">
                    <span className="text-secondary font-bold">
                      Badge Unlocked: "Verified Handover Architect"
                    </span>
                    <button
                      onClick={() => onNavigateToTab('progress')}
                      className="px-3 py-1 rounded bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary-container"
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
