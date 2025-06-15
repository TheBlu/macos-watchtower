import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock, Lock, LockOpen, CheckCircle, XCircle, HardDrive, AlertTriangle, RefreshCw } from 'lucide-react';

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

  // Determine which icon to use based on the feature name and status for content area
  const renderFeatureIcon = () => {
    const iconClass = `h-4 w-4 ${getStatusColors()}`;
    
    switch (feature.name) {
      case 'Firewall':
        return feature.status === 'enabled' ? 
          <Shield className={iconClass} /> : 
          <ShieldOff className={iconClass} />;
          
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

  // Determine which header icon to use based on the feature name
  const renderHeaderIcon = () => {
    const headerIconClass = `h-6 w-6 ${getStatusColors()}`;
    
    switch (feature.name) {
      case 'Firewall':
        return <Shield className={headerIconClass} />;
          
      case 'macOS Updates':
        return <RefreshCw className={headerIconClass} />;
        
      case 'FileVault':
        return <Lock className={headerIconClass} />;
          
      case 'Gatekeeper':
        return <CheckCircle className={headerIconClass} />;
          
      case 'System Integrity Protection':
        return <HardDrive className={headerIconClass} />;
          
      case 'XProtect':
        return <Shield className={headerIconClass} />;
    }
    
    return null;
  };

  const getStatusText = () => {
    if (feature.name === 'Firewall') {
      return feature.status === 'enabled' ? 'Protection active' : 'Not protecting';
    }
    
    if (feature.name === 'macOS Updates') {
      switch (feature.status) {
        case 'enabled': return 'Up to date';
        case 'warning': return 'Updates available';
        case 'disabled': return 'Updates disabled';
        default: return '';
      }
    }
    
    switch (feature.status) {
      case 'enabled': return 'Active';
      case 'disabled': return 'Inactive';
      case 'warning': return 'Needs attention';
      default: return 'Unknown';
    }
  };

  return (
    <StatusCard
      title={feature.name}
      status={feature.status}
      description={hideDescription ? "" : feature.description}
      lastUpdated={feature.lastUpdated}
      className={`${className} min-h-[200px]`}
      headerIcon={renderHeaderIcon()}
      footerContent={
        children && !hideButton ? (
          <div className="ml-auto">
            {children}
          </div>
        ) : undefined
      }
    >
      <div className="flex flex-col space-y-3 mt-2">
        {feature.setting && (
          <div className="text-sm">
            <span className="font-semibold text-slate-600 dark:text-slate-400">
              {feature.name === 'macOS Updates' ? 'Version:' : 'Setting:'}
            </span>
            <span className="ml-2 text-slate-700 dark:text-slate-300 font-mono text-xs bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-lg">
              {feature.setting}
            </span>
          </div>
        )}
        
        {renderFeatureIcon() && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30">
            {renderFeatureIcon()}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {getStatusText()}
            </span>
          </div>
        )}
      </div>
    </StatusCard>
  );
};

export default SecurityFeature;
