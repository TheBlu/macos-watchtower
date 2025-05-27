// This file contains mock data for the macOS security features
// In a real application, this would be replaced with actual system calls

export interface SecurityFeature {
  name: string;
  status: 'enabled' | 'disabled' | 'warning' | 'unknown';
  description: string;
  lastUpdated?: string;
  setting?: string; // Added setting field for features like Gatekeeper
}

export interface LogEntry {
  timestamp: string;
  application: string;
  path: string;
  action: 'allowed' | 'blocked';
  reason?: string;
}

interface XProtectLog {
  id: string;
  timestamp: Date;
  threat: string;
  file: string;
  action: 'blocked' | 'quarantined' | 'cleaned';
  severity: 'low' | 'medium' | 'high';
  details: string;
}

// Mock security features data
export const securityFeatures: SecurityFeature[] = [
  {
    name: 'FileVault',
    status: 'enabled',
    description: 'Full-disk encryption that helps prevent unauthorized access to your Mac.',
    lastUpdated: '2023-05-01T10:30:45Z',
  },
  {
    name: 'Gatekeeper',
    status: 'enabled',
    description: 'Helps protect your Mac from malware by restricting software from unidentified developers.',
    lastUpdated: '2023-04-28T14:22:10Z',
    setting: 'App Store and identified developers', // Added Gatekeeper setting
  },
  {
    name: 'XProtect',
    status: 'enabled',
    description: 'Built-in malware scanning tool that automatically checks for known malicious content.',
    lastUpdated: '2023-05-03T09:15:33Z',
  },
  {
    name: 'System Integrity Protection',
    status: 'enabled',
    description: 'Prevents potentially malicious software from modifying protected files and folders.',
    lastUpdated: '2023-04-25T11:20:15Z',
  },
  {
    name: 'Firewall',
    status: 'disabled',
    description: 'Controls incoming connections to your applications and services.',
    lastUpdated: '2023-05-02T08:45:22Z',
    setting: 'Allow all incoming connections',
  },
  {
    name: 'macOS Updates',
    status: 'warning',
    description: 'Keeps your Mac secure with the latest security updates and patches.',
    lastUpdated: '2023-05-04T16:10:30Z',
    setting: 'macOS Sonoma 14.4.1',
  },
];

// Mock Gatekeeper logs
export const gatekeeperLogs: LogEntry[] = [
  {
    timestamp: '2023-05-06T18:42:11Z',
    application: 'Microsoft Word.app',
    path: '/Applications/Microsoft Word.app',
    action: 'allowed',
    reason: 'Signed by identified developer',
  },
  {
    timestamp: '2023-05-06T16:30:22Z',
    application: 'Chrome.app',
    path: '/Applications/Chrome.app',
    action: 'allowed',
    reason: 'Signed by identified developer',
  },
  {
    timestamp: '2023-05-05T20:15:36Z',
    application: 'UnknownApp.app',
    path: '/Downloads/UnknownApp.app',
    action: 'blocked',
    reason: 'Not signed by identified developer',
  },
  {
    timestamp: '2023-05-04T12:05:41Z',
    application: 'Photoshop.app',
    path: '/Applications/Adobe Photoshop 2023/Photoshop.app',
    action: 'allowed',
    reason: 'Signed by identified developer',
  },
  {
    timestamp: '2023-05-03T08:52:18Z',
    application: 'SuspiciousApp.app',
    path: '/Downloads/SuspiciousApp.app',
    action: 'blocked',
    reason: 'Malicious content detected',
  },
  {
    timestamp: '2023-05-02T14:30:55Z',
    application: 'Sketch.app',
    path: '/Applications/Sketch.app',
    action: 'allowed',
    reason: 'Signed by identified developer',
  },
  {
    timestamp: '2023-05-01T11:22:09Z',
    application: 'MalwareTest.app',
    path: '/Downloads/MalwareTest.app',
    action: 'blocked',
    reason: 'Malicious content detected',
  },
];

// Mock XProtect logs
export const xprotectLogs: XProtectLog[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T14:30:00'),
    threat: 'Malware.Generic.12345',
    file: '/Users/john/Downloads/suspicious_file.dmg',
    action: 'blocked',
    severity: 'high',
    details: 'Detected malicious payload in downloaded DMG file'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T13:45:00'),
    threat: 'Adware.OSX.Bundler',
    file: '/Applications/FreeApp.app/Contents/MacOS/installer',
    action: 'quarantined',
    severity: 'medium',
    details: 'Suspicious adware component detected during scan'
  },
  {
    id: '3',
    timestamp: new Date('2024-01-15T12:20:00'),
    threat: 'PUA.OSX.CoinMiner',
    file: '/tmp/cryptominer_binary',
    action: 'cleaned',
    severity: 'high',
    details: 'Cryptocurrency mining software removed automatically'
  },
  {
    id: '4',
    timestamp: new Date('2024-01-15T11:15:00'),
    threat: 'Trojan.OSX.Backdoor',
    file: '/Users/john/Desktop/update.pkg',
    action: 'blocked',
    severity: 'high',
    details: 'Backdoor trojan prevented from executing'
  },
  {
    id: '5',
    timestamp: new Date('2024-01-15T10:30:00'),
    threat: 'Spyware.OSX.KeyLogger',
    file: '/Library/LaunchAgents/com.malware.plist',
    action: 'quarantined',
    severity: 'medium',
    details: 'Keylogger launch agent moved to quarantine'
  },
  {
    id: '6',
    timestamp: new Date('2024-01-15T09:45:00'),
    threat: 'Virus.OSX.FileInfector',
    file: '/Applications/Games/infected_game.app',
    action: 'cleaned',
    severity: 'medium',
    details: 'File infector virus successfully removed'
  },
  {
    id: '7',
    timestamp: new Date('2024-01-15T08:20:00'),
    threat: 'Rootkit.OSX.Hidden',
    file: '/System/Library/Extensions/malicious.kext',
    action: 'blocked',
    severity: 'high',
    details: 'Rootkit kernel extension blocked from loading'
  },
  {
    id: '8',
    timestamp: new Date('2024-01-14T16:30:00'),
    threat: 'Phishing.OSX.FakeApp',
    file: '/Users/john/Downloads/BankingApp.dmg',
    action: 'quarantined',
    severity: 'medium',
    details: 'Fake banking application moved to quarantine'
  }
];
