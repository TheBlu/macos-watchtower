import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock, Lock, LockOpen, CheckCircle, XCircle, HardDrive, AlertTriangle, RefreshCw, BrickWall, Info } from 'lucide-react';

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

  // Get status ring colors
  const getStatusRingColors = () => {
    switch (feature.status) {
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
        <div className="flex flex-col items-center space-y-4 mt-6">
          {/* Large centered icon with status ring */}
          <div className="relative">
            <div 
              className={`flex items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 ${getStatusRingColors()} transition-colors duration-200`}
            >
              {renderMainIcon()}
            </div>
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

        {/* Info icon in bottom right corner */}
        {(feature.lastUpdated || feature.description) && (
          <div className="absolute bottom-4 right-4">
            <div className="group/info relative">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer">
                <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              {/* Combined tooltip on hover */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 text-sm text-white bg-slate-900 dark:bg-slate-700 rounded-lg opacity-0 group-hover/info:opacity-100 transition-opacity duration-200 pointer-events-none z-50 max-w-xs shadow-lg">
                <div className="space-y-1">
                  {feature.lastUpdated && (
                    <div className="text-xs font-medium text-slate-300">
                      Last updated: {formatDate(feature.lastUpdated)}
                    </div>
                  )}
                  {feature.description && (
                    <div className="text-sm text-white">
                      {feature.description}
                    </div>
                  )}
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full right-4 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityFeature;
