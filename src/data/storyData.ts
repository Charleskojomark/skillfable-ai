import { Character, ModuleData } from '../types';

export const CHARACTERS: Record<string, Character> = {
  amara: {
    id: 'amara',
    name: 'Amara Eze',
    role: 'Product & Operations Lead',
    city: 'Lagos, Nigeria',
    avatarColor: '#ffc174',
    initials: 'AE',
    bio: 'Persuasive, ambitious, and quick to spot market opportunities. Has a tendency to rush delivery before comprehensive verification.'
  },
  kojo: {
    id: 'kojo',
    name: 'Kojo Mensah',
    role: 'Research & Data Analyst',
    city: 'Accra, Ghana',
    avatarColor: '#6bd8cb',
    initials: 'KM',
    bio: 'Systematic, curious, and grounded in evidence. Occasionally forgets to ask whether clean-looking numbers represent messy human realities.'
  },
  zuri: {
    id: 'zuri',
    name: 'Zuri Kamau',
    role: 'Engineer & Builder',
    city: 'Nairobi, Kenya',
    avatarColor: '#f59e0b',
    initials: 'ZK',
    bio: 'Loves rapid prototyping, terminal scripts, and elegant architectures. Can build something impressive before fully validating user needs.'
  },
  ibrahima: {
    id: 'ibrahima',
    name: 'Ibrahima Sow',
    role: 'Community Partnerships Lead',
    city: 'Dakar, Senegal',
    avatarColor: '#e2cc73',
    initials: 'IS',
    bio: 'An exceptional listener who spots nuances others miss. Ensures technology solves authentic human problems rather than creating new friction.'
  }
};

export const ALL_18_MODULES_OVERVIEW = [
  { number: 1, title: 'Digital Foundations and Readiness', chapter: 'The 08:43 Folder', status: 'active', xp: 450 },
  { number: 2, title: 'AI Literacy & Core Mechanics', chapter: 'Three Answers, One Question', status: 'available', xp: 500 },
  { number: 3, title: 'Generative AI & Prompt Engineering', chapter: 'The Brief That Backfired', status: 'locked', xp: 550 },
  { number: 4, title: 'AI Research & Fact-Checking', chapter: 'The Report That Never Existed', status: 'locked', xp: 600 },
  { number: 5, title: 'Writing, Communication & Language', chapter: 'The Apology That Made Things Worse', status: 'locked', xp: 600 },
  { number: 6, title: 'Multimodal AI & Creative Production', chapter: 'The Campaign Everyone Shared', status: 'locked', xp: 650 },
  { number: 7, title: 'Office Productivity & Professional Work', chapter: 'The Meeting with Two Versions', status: 'locked', xp: 650 },
  { number: 8, title: 'Data Literacy, Spreadsheets & Analytics', chapter: 'The Numbers That Changed Overnight', status: 'locked', xp: 700 },
  { number: 9, title: 'Workflow Design & AI Automation', chapter: 'The Midnight Order', status: 'locked', xp: 750 },
  { number: 10, title: 'Computational Thinking & Assisted Coding', chapter: 'The Demo That Broke on First Input', status: 'locked', xp: 800 },
  { number: 11, title: 'Entrepreneurship & Freelancing with AI', chapter: 'The Client Who Said Yes', status: 'locked', xp: 850 },
  { number: 12, title: 'AI Applications by Industry & Sector', chapter: 'Three Partners, Three Realities', status: 'locked', xp: 850 },
  { number: 13, title: 'AI Solution Design & Evaluation', chapter: 'Do We Need AI at All?', status: 'locked', xp: 900 },
  { number: 14, title: 'AI Ethics, Bias & Responsible Governance', chapter: 'The Score That Left Someone Out', status: 'locked', xp: 950 },
  { number: 15, title: 'Privacy, Cybersecurity & Compliance', chapter: 'The File in the Prompt', status: 'locked', xp: 950 },
  { number: 16, title: 'Human Skills & Lifelong Learning', chapter: 'The Expert Who Couldn\'t Explain It', status: 'locked', xp: 1000 },
  { number: 17, title: 'African Context, Localisation & Inclusion', chapter: 'It Works at Headquarters', status: 'locked', xp: 1000 },
  { number: 18, title: 'Capstone Project & Portfolio Launch', chapter: 'Launch Day', status: 'locked', xp: 1200 }
];

export const MODULE_1: ModuleData = {
  id: 'module-01',
  number: 1,
  title: 'Digital Foundations and Readiness',
  subtitle: 'The 08:43 Folder',
  category: 'Foundation',
  coverImage: '/assets/story/season-01/module-01/m01-cover.png',
  overview: 'The team is preparing for its first partner demonstration when essential supporting documents turn out to be scattered across devices, duplicated with conflicting timestamps, and poisoned with an untrusted attachment. The meeting begins in 40 minutes.',
  learningOutcomes: [
    'Master professional file hierarchy, version control principles, and format integrity.',
    'Differentiate authentic data assets from deceptive or executable threats (.exe disguised as spreadsheets).',
    'Evaluate cloud sharing access permissions (view-only vs open edit) to protect client confidentiality.',
    'Build a verified digital handover dossier for external stakeholders.'
  ],
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      title: 'The 08:43 Folder',
      subtitle: 'Version Chaos & The Unseen Breach',
      hook: 'At 08:43 WAT in the Lagos studio, Amara rushes in. A key folder for our health cooperative client has 4 duplicate spreadsheets, and one suspicious file won\'t open.',
      heroImage: '/assets/story/season-01/module-01/episode-01/m01-e01-hero.png',
      heroAlt: 'Lagos studio workstation at 08:43 with overlapping digital folders and telemetry',
      sceneLocation: 'Relay Studio • Ikoyi, Lagos',
      sceneTime: '08:43:12 WAT',
      logId: 'LOG #101 // DIGITAL HANDOVER',
      durationMinutes: 8,
      beats: [
        {
          id: 'b1',
          type: 'narration',
          content: 'The glass doors of Relay Studio slide open with a hiss. Rain lashes against the high windows overlooking Ikoyi. On your first morning as an AI Fellow, the atmosphere is charged with electric tension.'
        },
        {
          id: 'b2',
          type: 'dialogue',
          characterId: 'amara',
          speakerName: 'Amara Eze',
          speakerRole: 'Product & Operations Lead',
          speakerInitials: 'AE',
          timestamp: '08:43:28',
          content: 'Good, you’re logged in! In exactly thirty-seven minutes, Afara Health Innovations is joining a live video review. They want our verified patient intake evaluation model. But look at this shared drive—someone renamed the folder last night, files are everywhere, and there is a script called emergency_patch.exe sitting right next to the clinic data!'
        },
        {
          id: 'b3',
          type: 'dialogue',
          characterId: 'kojo',
          speakerName: 'Kojo Mensah',
          speakerRole: 'Research & Data Analyst',
          speakerInitials: 'KM',
          timestamp: '08:44:05',
          content: 'Wait, Amara. Do not double-click that patch. I noticed three separate files: Afara_Metrics_v1.2.xlsx, v1.2_final_FINAL.xlsx, and a CSV export with today’s timestamp. If we feed the AI prototype dirty or corrupted baseline data, the entire demonstration will crash.'
        },
        {
          id: 'b4',
          type: 'dialogue',
          characterId: 'zuri',
          speakerName: 'Zuri Kamau',
          speakerRole: 'Engineer & Builder',
          speakerInitials: 'ZK',
          timestamp: '08:44:40',
          content: 'I pulled the git repository commit logs. The prototype expects a clean structured CSV with SHA-256 validation. Fellow, what is our immediate protocol before touching any file?'
        },
        {
          id: 'b5',
          type: 'decision',
          content: 'The team turns to you for your judgment. You need to establish digital order without risking malware execution or sharing unverified numbers.',
          decision: {
            prompt: 'How should Relay Studio handle the unverified 08:43 folder contents?',
            options: [
              {
                id: 'opt_1',
                text: 'Launch emergency_patch.exe first to ensure the software dependencies are updated, then open the spreadsheet marked FINAL.',
                rationale: 'Relying on optimistic filenames and launching unverified executables.',
                isOptimal: false,
                feedbackTitle: 'High Security Risk Triggered!',
                feedbackText: 'Never execute an untrusted binary (.exe) sent through unauthenticated channels or placed into a shared drive! That is the primary vector for ransomware. Furthermore, filenames like "FINAL_v2" are notoriously deceptive compared to file hash and timestamp verification.',
                xpReward: 50
              },
              {
                id: 'opt_2',
                text: 'Isolate emergency_patch.exe into quarantine, compare file modification hashes/timestamps to identify the true dataset, and verify permissions.',
                rationale: 'Rigorous digital hygiene: isolate threats, verify file integrity, inspect file metadata.',
                isOptimal: true,
                feedbackTitle: 'Optimal Operational Response (+150 XP)',
                feedbackText: 'Flawless judgment! You prioritized operational security by quarantining the executable and demanding verified file hashes over superficial file names. Amara and Kojo both nod with relief.',
                xpReward: 150
              },
              {
                id: 'opt_3',
                text: 'Wipe the shared folder completely and ask Amara to re-send files from her personal WhatsApp messages.',
                rationale: 'Destructive action that causes data loss and bypasses secure channels.',
                isOptimal: false,
                feedbackTitle: 'Ineffective & Unsafe Practice',
                feedbackText: 'Deleting shared folders without backup destroys audit trails and version history. Moving sensitive healthcare data onto unmanaged messaging apps also violates client confidentiality and compliance.',
                xpReward: 60
              }
            ]
          }
        },
        {
          id: 'b6',
          type: 'dialogue',
          characterId: 'ibrahima',
          speakerName: 'Ibrahima Sow',
          speakerRole: 'Community Partnerships Lead',
          speakerInitials: 'IS',
          timestamp: '08:46:15',
          content: 'Ibrahima smiles quietly from his terminal in Dakar: "Well said, Fellow. Our partners at Afara trust us with community clinical information. If we cannot manage our digital folders safely, why would they trust our AI algorithms?"'
        }
      ],
      mission: {
        id: 'm1-audit',
        title: 'Workspace Integrity Audit: The 08:43 Folder',
        moduleCode: 'M01-E01',
        estimatedMinutes: 6,
        learningObjective: 'Inspect virtual file metadata, quarantine malicious executables, identify the verified handover data, and apply restricted permissions.',
        context: 'You have direct terminal access to the Relay Studio cloud storage partition. Before Amara starts the presentation, inspect each item in the 08:43 directory.',
        instructions: [
          'Examine the 5 files in the virtual file browser.',
          'Flag and quarantine the suspicious executable (emergency_patch.exe).',
          'Select the authentic verified handover file based on SHA-256 and modification date.',
          'Set the handover file permissions to "Restricted View" for external partners.'
        ],
        files: [
          {
            id: 'f1',
            name: 'emergency_patch.exe',
            size: '4.8 MB',
            extension: 'EXE',
            modified: 'Today, 04:12 AM',
            checksum: 'b4a8e291... [UNVERIFIED CERT]',
            threatLevel: 'malicious',
            isVerifiedHandover: false,
            notes: 'Unsigned executable binary uploaded from external IP. Disguised as software fix.',
            permission: 'Quarantined'
          },
          {
            id: 'f2',
            name: 'Afara_Metrics_v1.2_final_FINAL.xlsx',
            size: '1.2 MB',
            extension: 'XLSX',
            modified: 'Yesterday, 11:30 PM',
            checksum: '9f2c114e... [OUTDATED]',
            threatLevel: 'safe',
            isVerifiedHandover: false,
            notes: 'Contains formula calculation errors in column H. Superseded by today’s audit.',
            permission: 'Restricted View'
          },
          {
            id: 'f3',
            name: 'Afara_Evaluation_v1.3_verified.csv',
            size: '840 KB',
            extension: 'CSV',
            modified: 'Today, 08:15 AM',
            checksum: 'e71b4a90... [MATCHES REPO]',
            threatLevel: 'safe',
            isVerifiedHandover: true,
            notes: 'Clean tabular intake records validated against Lagos State clinic baseline registry.',
            permission: 'Restricted View'
          },
          {
            id: 'f4',
            name: 'Client_Brief_Internal.docx',
            size: '420 KB',
            extension: 'DOCX',
            modified: 'Oct 24, 09:00 AM',
            checksum: '3a710e62... [CONFIDENTIAL]',
            threatLevel: 'safe',
            isVerifiedHandover: false,
            notes: 'Internal partner contract and commercial negotiations. Must never be shared externally.',
            permission: 'Restricted View'
          },
          {
            id: 'f5',
            name: 'system_audit_telemetry.json',
            size: '120 KB',
            extension: 'JSON',
            modified: 'Today, 08:40 AM',
            checksum: 'c281df09... [SYSTEM LOG]',
            threatLevel: 'safe',
            isVerifiedHandover: false,
            notes: 'Cloud sync telemetry log indicating automated file synchronization events.',
            permission: 'Restricted View'
          }
        ],
        hints: [
          'Look for file extensions that are executable (.exe, .bat, .sh) in a data folder.',
          'Check the modification timestamp: the true verified version was finalized this morning at 08:15 AM.',
          'Client data should never be set to "Public" or open edit when preparing an external handover.'
        ],
        steps: [
          {
            id: 's1',
            title: 'Isolate Threat File',
            description: 'Quarantine the untrusted .exe binary to eliminate malware vectors.',
            targetFileId: 'f1',
            expectedAction: 'quarantine'
          },
          {
            id: 's2',
            title: 'Select Verified Data Handover',
            description: 'Identify the authentic Afara CSV dataset that matches repo checksums.',
            targetFileId: 'f3',
            expectedAction: 'select_handover'
          },
          {
            id: 's3',
            title: 'Configure Safe Sharing Permissions',
            description: 'Ensure the handover file is set to "Restricted View" rather than "Public".',
            targetFileId: 'f3',
            expectedAction: 'set_permission'
          }
        ]
      }
    },
    {
      id: 'ep-02',
      number: 2,
      title: 'The Suspicious Attachment',
      subtitle: 'Phishing Vectors & The Partner Challenge',
      hook: 'Just as the files are organized, an urgent email pops up from info@afara-health-eval.com containing the mysterious riddle: "Show us what happens when it fails."',
      heroImage: '/assets/story/season-01/module-01/episode-02/m01-e02-hero.png',
      heroAlt: 'Relay studio briefing space as an unexpected encrypted transmission arrives',
      sceneLocation: 'Relay Studio • Operations Hub',
      sceneTime: '08:58:45 WAT',
      logId: 'LOG #102 // INCOMING TRANSMISSION',
      durationMinutes: 10,
      beats: [
        {
          id: 'b2_1',
          type: 'narration',
          content: 'The studio clock ticks to 08:58. Amara has just finalized her opening remarks when a chime echoes across the team’s unified inbox. A high-priority banner flashes crimson.'
        },
        {
          id: 'b2_2',
          type: 'dialogue',
          characterId: 'amara',
          speakerName: 'Amara Eze',
          speakerRole: 'Product & Operations Lead',
          speakerInitials: 'AE',
          timestamp: '08:59:02',
          content: 'Wait! Look at this email. Subject: "CRITICAL: Urgent test dataset update before 9:15 AM meeting". The sender name says "Dr. Chidi - Afara Health Board". There is an attached link to a Google Drive download.'
        },
        {
          id: 'b2_3',
          type: 'dialogue',
          characterId: 'kojo',
          speakerName: 'Kojo Mensah',
          speakerRole: 'Research & Data Analyst',
          speakerInitials: 'KM',
          timestamp: '08:59:30',
          content: 'Hold on. Look at the sender address closely: info@afara-health-eval.com. The official domain for Afara Health Innovations is afarahealth.org. That domain was registered only 48 hours ago.'
        },
        {
          id: 'b2_4',
          type: 'dialogue',
          characterId: 'zuri',
          speakerName: 'Zuri Kamau',
          speakerRole: 'Engineer & Builder',
          speakerInitials: 'ZK',
          timestamp: '09:00:10',
          content: 'Inside the preview of the email, there is only one plain sentence: "Don\'t show us another tool that works only in a demonstration. Show us what happens when it fails." Fellow, is this a real client test or a phishing trap?'
        },
        {
          id: 'b5_2',
          type: 'decision',
          content: 'You must guide the team’s response to the suspicious message and protect the studio credentials.',
          decision: {
            prompt: 'How should Relay Studio respond to the message from afara-health-eval.com?',
            options: [
              {
                id: 'opt_2_1',
                text: 'Click the link immediately to see what test cases they sent, but do not enter any passwords.',
                rationale: 'Visiting spoofed domains exposes IP, browser telemetry, and drive-by download vectors.',
                isOptimal: false,
                feedbackTitle: 'Security Breach Risk',
                feedbackText: 'Visiting malicious links can trigger drive-by session hijacking or automated cookie theft even if you do not type your credentials. Never click links from spoofed domains.',
                xpReward: 40
              },
              {
                id: 'opt_2_2',
                text: 'Inspect the full email headers, verify the DKIM/SPF status, flag the message to IT, and verify directly with Dr. Chidi via the official channel.',
                rationale: 'Professional email literacy: out-of-band verification and header analysis.',
                isOptimal: true,
                feedbackTitle: 'Flawless Digital Defense (+150 XP)',
                feedbackText: 'Outstanding! You correctly recognized domain typo-squatting, advised out-of-band verification, and preserved the team\'s digital perimeter. The partner was testing whether Relay Studio blindly follows unverified digital instructions.',
                xpReward: 150
              },
              {
                id: 'opt_2_3',
                text: 'Forward the email to everyone in Relay Studio asking if anyone knows who sent it.',
                rationale: 'Spreading suspicious links across internal channels increases accidental click probability.',
                isOptimal: false,
                feedbackTitle: 'Security Protocol Violation',
                feedbackText: 'Forwarding potential phishing emails to colleagues increases internal contagion risk. Always use dedicated "Report Phishing" security workflows.',
                xpReward: 50
              }
            ]
          }
        }
      ],
      mission: {
        id: 'm2-email-audit',
        title: 'Phishing & Email Header Analysis',
        moduleCode: 'M01-E02',
        estimatedMinutes: 5,
        learningObjective: 'Detect spoofed domains, identify fake urgent pressure triggers, and understand multifactor authentication.',
        context: 'Audit the incoming transmission headers to verify sender authenticity and prevent credential interception.',
        instructions: [
          'Inspect the sender envelope and DKIM verification status.',
          'Identify domain spoofing (afara-health-eval.com vs afarahealth.org).',
          'Confirm that MFA is active on the Relay Studio organizational admin account.'
        ],
        files: [
          {
            id: 'em1',
            name: 'urgent_test_dataset_link.eml',
            size: '18 KB',
            extension: 'EML',
            modified: 'Today, 08:58 AM',
            checksum: 'd198... [SPOOFED DOMAIN]',
            threatLevel: 'malicious',
            isVerifiedHandover: false,
            notes: 'Sender failed SPF verification. Domain created 2 days ago in Iceland.',
            permission: 'Quarantined'
          },
          {
            id: 'em2',
            name: 'Relay_Security_Checklist.pdf',
            size: '220 KB',
            extension: 'PDF',
            modified: 'Oct 20, 10:00 AM',
            checksum: 'a872... [APPROVED POLICY]',
            threatLevel: 'safe',
            isVerifiedHandover: true,
            notes: 'Standard Operating Procedure for handling unverified external digital requests.',
            permission: 'Restricted View'
          }
        ],
        hints: [
          'Check the Return-Path header against the displayed From name.',
          'Official partners will always communicate from their registered organizational domain.'
        ],
        steps: [
          {
            id: 's2_1',
            title: 'Isolate Email Threat',
            description: 'Quarantine the phishing email package.',
            targetFileId: 'em1',
            expectedAction: 'quarantine'
          },
          {
            id: 's2_2',
            title: 'Verify Security Protocol',
            description: 'Certify the Relay Security Standard Checklist.',
            targetFileId: 'em2',
            expectedAction: 'select_handover'
          }
        ]
      }
    },
    {
      id: 'ep-03',
      number: 3,
      title: 'The Final Handover',
      subtitle: 'Spreadsheet Forensics & The Live Handshake',
      hook: 'Ten minutes to launch. Kojo discovers an arithmetic formula error in the clinic patient wait-time column that skews the AI baseline by 400%.',
      heroImage: '/assets/story/season-01/module-01/episode-03/m01-e03-hero.png',
      heroAlt: 'Split terminal audit workspace with spreadsheet formulas and live status indicators',
      sceneLocation: 'Relay Studio • War Room',
      sceneTime: '09:07:30 WAT',
      logId: 'LOG #103 // PRE-MEETING LOCKDOWN',
      durationMinutes: 8,
      beats: [
        {
          id: 'b3_1',
          type: 'narration',
          content: '09:07 WAT. The studio monitors switch to the presentation dock. In eight minutes, Dr. Chidi and the Afara board will join the meeting. Kojo suddenly gasps from behind his twin displays.'
        },
        {
          id: 'b3_2',
          type: 'dialogue',
          characterId: 'kojo',
          speakerName: 'Kojo Mensah',
          speakerRole: 'Research & Data Analyst',
          speakerInitials: 'KM',
          timestamp: '09:07:45',
          content: 'Look at Column F in the patient wait-time evaluation! Someone used =SUM(C2:C100)/24 instead of calculating the dynamic non-empty row average =AVERAGE(C2:C100). It makes our model look like patient triage takes 4 hours instead of 22 minutes!'
        },
        {
          id: 'b3_3',
          type: 'dialogue',
          characterId: 'zuri',
          speakerName: 'Zuri Kamau',
          speakerRole: 'Engineer & Builder',
          speakerInitials: 'ZK',
          timestamp: '09:08:15',
          content: 'And that is why the partner left that cryptic message: "Show us what happens when it fails." If we had just demoed the flashy UI without checking basic spreadsheet math, we would have presented false metrics to the entire ministry.'
        },
        {
          id: 'b3_4',
          type: 'decision',
          content: 'The meeting begins in 5 minutes. What is the professional course of action?',
          decision: {
            prompt: 'How do you fix the spreadsheet and prepare the final client pack?',
            options: [
              {
                id: 'opt_3_1',
                text: 'Quickly overwrite the displayed chart with a static image that shows a good-looking number.',
                rationale: 'Faking demo data undermines integrity and destroys client trust permanently.',
                isOptimal: false,
                feedbackTitle: 'Fatal Professional Error',
                feedbackText: 'Faking data to impress a client is the exact opposite of trustworthy innovation. When the client attempts to replicate it in real clinical operations, the failure will be devastating.',
                xpReward: 30
              },
              {
                id: 'opt_3_2',
                text: 'Correct the spreadsheet formula to =AVERAGE(C2:C100), generate an updated verified CSV, and transparently demonstrate how the audit caught the discrepancy.',
                rationale: 'True engineering integrity: fix the root arithmetic, update verified artifacts, and demonstrate resilience.',
                isOptimal: true,
                feedbackTitle: 'Mastery Demonstrated (+150 XP)',
                feedbackText: 'Magnificent! You fixed the formula, documented the discrepancy, and turned potential embarrassment into proof of Relay Studio’s rigorous verification standards. The team is ready.',
                xpReward: 150
              }
            ]
          }
        }
      ],
      mission: {
        id: 'm3-handover-pack',
        title: 'Final Handover Dossier & Formula Validation',
        moduleCode: 'M01-E03',
        estimatedMinutes: 5,
        learningObjective: 'Correct spreadsheet formulas, lock sharing permissions, and assemble the official client handover pack.',
        context: 'Assemble the final 3 verified digital artifacts into the client handover bundle for Afara Health Innovations.',
        instructions: [
          'Verify the audited CSV dataset.',
          'Confirm view-only client permissions on cloud links.',
          'Submit the final handover dossier to complete Module 1.'
        ],
        files: [
          {
            id: 'h1',
            name: 'Afara_Health_Intake_Audit_v1.4_FINAL.csv',
            size: '860 KB',
            extension: 'CSV',
            modified: 'Today, 09:09 AM',
            checksum: '4f901a... [AUDITED & LOCKED]',
            threatLevel: 'safe',
            isVerifiedHandover: true,
            notes: 'Calculated with verified =AVERAGE formulas. Validated against clinic registry.',
            permission: 'Restricted View'
          },
          {
            id: 'h2',
            name: 'Relay_Studio_Handover_Charter.pdf',
            size: '512 KB',
            extension: 'PDF',
            modified: 'Today, 09:10 AM',
            checksum: '7b11c... [SIGNED CHARTER]',
            threatLevel: 'safe',
            isVerifiedHandover: true,
            notes: 'Official Fellow handover charter detailing verified metrics and operational safeguards.',
            permission: 'Restricted View'
          }
        ],
        hints: [
          'Ensure all client deliverables are marked safe and set to Restricted View.',
          'Click Submit Handover to unlock your first verified portfolio credential.'
        ],
        steps: [
          {
            id: 's3_1',
            title: 'Verify Handover Dataset',
            description: 'Certify the audited CSV dataset with correct formula math.',
            targetFileId: 'h1',
            expectedAction: 'select_handover'
          },
          {
            id: 's3_2',
            title: 'Seal Handover Charter',
            description: 'Attach the signed Relay Studio Handover Charter.',
            targetFileId: 'h2',
            expectedAction: 'select_handover'
          }
        ]
      }
    }
  ]
};
