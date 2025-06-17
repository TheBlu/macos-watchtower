

import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock, Lock, LockOpen, CheckCircle, XCircle, HardDrive, AlertTriangle, RefreshCw, BrickWall, Clock } from 'lucide-react';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
  children?: React.ReactNode;
  hideDescription?: boolean;
  hideButton?: boolean;
}

const SecurityFeature = ({ 
  feature, 
  className, 
  children,
  hideDescription = false,
  hideButton = false
}: SecurityFeatureProps) => {
  // Get status-based colors
  const getStatusColors = () => {
    switch (feature.status) {
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

  // Determine which icon to use based on the feature name and status for main content
  const renderMainIcon = () => {
    // Make calendar icons smaller for macOS Updates
    const iconClass = feature.name === 'macOS Updates' 
      ? `h-8 w-8 ${getStatusColors()}` 
      : `h-12 w-12 ${getStatusColors()}`;
    
    switch (feature.name) {
      case 'Firewall':
        return <BrickWall className={iconClass} />;
          
      case 'macOS Updates':
        if (feature.status === 'enabled') {
          return <CalendarCheck className={iconClass} />;
        } else if (feature.status === 'warning') {
          return <CalendarClock className={iconClass} />;
        } else if (feature.status === 'disabled') {
          return <CalendarX className={iconClass} />;
        }
        break;
        
      case 'FileVault':
        return feature.status === 'enabled' ?
          <Lock className={iconClass} /> :
          <LockOpen className={iconClass} />;
          
      case 'Gatekeeper':
        return feature.status === 'enabled' ?
          <CheckCircle className={iconClass} /> :
          <XCircle className={iconClass} />;
          
      case 'System Integrity Protection':
        return feature.status === 'enabled' ?
          <HardDrive className={iconClass} /> :
          <AlertTriangle className={iconClass} />;
          
      case 'XProtect':
        return feature.status === 'enabled' ?
          <Shield className={iconClass} /> :
          <AlertTriangle className={iconClass} />;
    }
    
    return null;
  };

  // Get status indicator colors
  const getStatusIndicatorColors = () => {
    switch (feature.status) {
      case 'enabled':
        return 'bg-emerald-500/90 shadow-emerald-500/20';
      case 'warning':
        return 'bg-amber-500/90 shadow-amber-500/20';
      case 'disabled':
        return 'bg-red-500/90 shadow-red-500/20';
      default:
        return 'bg-slate-400/90 shadow-slate-400/20';
    }
  };

  // Get status text
  const getStatusText = () => {
    switch (feature.status) {
      case 'enabled':
        return 'Enabled';
      case 'warning':
        return 'Warning';
      case 'disabled':
        return 'Disabled';
      default:
        return 'Unknown';
    }
  };

  // Format the date to be more human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    }
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`${className} min-h-[240px] group relative overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 w-full h-full flex flex-col`}>
      {/* Glass reflection effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className="relative flex-grow p-4 pb-3">
        {/* Status and last updated row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full shadow-lg ${getStatusIndicatorColors()}`}></span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {getStatusText()}
            </span>
          </div>
          {feature.lastUpdated && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30">
              <Clock className="h-3 w-3 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {formatDate(feature.lastUpdated)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4 mt-4">
          {/* Large centered icon */}
          <div className="flex items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30">
            {renderMainIcon()}
          </div>
          
          {/* Centered title */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
              {feature.name}
            </h3>
          </div>
          
          {/* Centered content */}
          <div className="text-center space-y-2">
            {feature.setting && (
              <div className="text-sm">
                <div className="font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {feature.name === 'macOS Updates' ? 'Version' : 'Setting'}
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-mono text-xs bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg inline-block">
                  {feature.setting}
                </div>
              </div>
            )}
          </div>

          {/* Centered button */}
          {children && !hideButton && (
            <div className="flex justify-center mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityFeature;

