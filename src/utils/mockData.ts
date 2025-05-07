
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
