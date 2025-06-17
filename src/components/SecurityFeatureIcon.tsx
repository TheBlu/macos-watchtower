
import React from 'react';
import { BrickWall, CalendarCheck, CalendarClock, CalendarX, Lock, LockOpen, CheckCircle, XCircle, HardDrive, AlertTriangle, Shield } from 'lucide-react';
import { getStatusColors } from '@/utils/statusUtils';

interface SecurityFeatureIconProps {
  featureName: string;
  status: string;
  className?: string;
}

const SecurityFeatureIcon = ({ featureName, status, className = "h-16 w-16" }: SecurityFeatureIconProps) => {
  const iconClass = `${className} ${getStatusColors(status)}`;
  
  switch (featureName) {
    case 'Firewall':
      return <BrickWall className={iconClass} />;
        
    case 'macOS Updates':
      if (status === 'enabled') {
        return <CalendarCheck className={iconClass} />;
      } else if (status === 'warning') {
        return <CalendarClock className={iconClass} />;
      } else if (status === 'disabled') {
        return <CalendarX className={iconClass} />;
      }
      break;
      
    case 'FileVault':
      return status === 'enabled' ?
        <Lock className={iconClass} /> :
        <LockOpen className={iconClass} />;
        
    case 'Gatekeeper':
      return status === 'enabled' ?
        <CheckCircle className={iconClass} /> :
        <XCircle className={iconClass} />;
        
    case 'System Integrity Protection':
      return status === 'enabled' ?
        <HardDrive className={iconClass} /> :
        <AlertTriangle className={iconClass} />;
        
    case 'XProtect':
      return status === 'enabled' ?
        <Shield className={iconClass} /> :
        <AlertTriangle className={iconClass} />;
  }
  
  return <Shield className={iconClass} />;
};

export default SecurityFeatureIcon;
