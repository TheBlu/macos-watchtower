
import { SecurityFeature } from './mockData';

// Status color utilities
export const getStatusColors = (status: string) => {
  switch (status) {
    case 'enabled':
      return 'text-emerald-600 dark:text-emerald-400';
    case 'warning':
      return 'text-amber-600 dark:text-amber-400';
    case 'disabled':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-slate-600 dark:text-slate-400';
  }
};

export const getStatusBorderColors = (status: string) => {
  switch (status) {
    case 'enabled':
      return 'ring-emerald-500/40 ring-4';
    case 'warning':
      return 'ring-amber-500/40 ring-4';
    case 'disabled':
      return 'ring-red-500/40 ring-4';
    default:
      return 'ring-slate-400/40 ring-4';
  }
};

// Calculate overall security status
export const calculateOverallStatus = (features: SecurityFeature[]) => {
  return features.every(feature => feature.status === 'enabled')
    ? 'enabled'
    : features.some(feature => feature.status === 'disabled')
    ? 'disabled'
    : 'warning';
};

export const getStatusDisplayText = (status: string) => {
  switch (status) {
    case 'enabled':
      return 'Fully Protected';
    case 'disabled':
      return 'Critical';
    case 'warning':
      return 'Needs Attention';
    default:
      return 'Unknown';
  }
};
