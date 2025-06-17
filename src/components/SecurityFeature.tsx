
import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock, Lock, LockOpen, CheckCircle, XCircle, HardDrive, AlertTriangle, RefreshCw, BrickWall, Info } from 'lucide-react';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
  children?: React.ReactNode;
  hideDescription?: boolean;
  hideButton?: boolean;
  onIconClick?: () => void;
  isFlipped?: boolean;
}

const SecurityFeature = ({ 
  feature, 
  className, 
  children,
  hideDescription = false,
  hideButton = false,
  onIconClick,
  isFlipped = false
}: SecurityFeatureProps) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);

  // Sync internal state with external prop
  useEffect(() => {
    setInternalIsFlipped(isFlipped);
  }, [isFlipped]);

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

  // Get status border colors for the tile
  const getStatusBorderColors = () => {
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
    // Make all icons larger and uniform size
    const iconClass = `h-16 w-16 ${getStatusColors()}`;
    
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
    <div className={`${className} min-h-[240px] group relative overflow-hidden w-full h-full`}>
      {/* Card container with flip animation */}
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${internalIsFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of card */}
        <div className={`absolute inset-0 backface-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 ${getStatusBorderColors()}`}>
          {/* Glass reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="relative h-full p-4 pb-3 flex flex-col">
            {/* Info button in upper right corner - made larger */}
            {feature.lastUpdated && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setInternalIsFlipped(!internalIsFlipped)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
                >
                  <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            )}

            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              {/* Large centered icon without ring - clickable if onIconClick is provided */}
              <div className="relative">
                <div 
                  className={`flex items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 transition-colors duration-200 ${
                    onIconClick ? 'cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-105 transform transition-transform' : ''
                  }`}
                  onClick={onIconClick}
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
            </div>

            {/* Children content (buttons, etc.) positioned at bottom */}
            {children && (
              <div className="mt-auto">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Back of card */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl shadow-black/5 ${getStatusBorderColors()}`}>
          {/* Glass reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="relative h-full p-4 flex flex-col">
            {/* Header with title and close button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                {feature.name}
              </h3>
              <button
                onClick={() => setInternalIsFlipped(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
              >
                <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-4">
              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Description</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Setting details */}
              {feature.setting && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    {feature.name === 'macOS Updates' ? 'Version' : 'Current Setting'}
                  </h4>
                  <div className="text-slate-700 dark:text-slate-300 font-mono text-sm bg-slate-100/80 dark:bg-slate-800/80 px-3 py-2 rounded-lg">
                    {feature.setting}
                  </div>
                </div>
              )}

              {/* Last updated */}
              {feature.lastUpdated && (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Last Updated:</h4>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30">
                      <RefreshCw className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(feature.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D transforms */}
      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default SecurityFeature;
