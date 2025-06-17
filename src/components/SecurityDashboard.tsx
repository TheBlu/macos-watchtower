
import React, { useState } from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import { securityFeatures } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, ShieldX, Info } from 'lucide-react';
import { calculateOverallStatus, getStatusDisplayText } from '@/utils/statusUtils';

// Constants for feature names and settings
const FEATURE_SETTINGS = {
  'macOS Updates': 'Software Update',
  'FileVault': 'Privacy & Security',
  'Firewall': 'Network Firewall',
  'XProtect': 'Privacy & Security',
  'Gatekeeper': 'Privacy & Security',
  'System Integrity Protection': 'Privacy & Security'
} as const;

const SecurityDashboard = () => {
  const [areAllTilesFlipped, setAreAllTilesFlipped] = useState(false);

  const overallStatus = calculateOverallStatus(securityFeatures);

  const getStatusMessage = () => {
    if (overallStatus === 'enabled') {
      return "All security features are enabled and up to date.";
    } else if (overallStatus === 'disabled') {
      const disabledFeatures = securityFeatures
        .filter(f => f.status === 'disabled')
        .map(f => f.name)
        .join(', ');
      return `Some security features are disabled: ${disabledFeatures}.`;
    } else {
      return "Some security features need attention. Check the details below.";
    }
  };

  const getSecurityStatusIcon = () => {
    const baseIconClass = "h-6 w-6";
    
    switch (overallStatus) {
      case 'enabled':
        return <Shield className={`${baseIconClass} text-emerald-600 dark:text-emerald-400`} />;
      case 'warning':
        return <ShieldAlert className={`${baseIconClass} text-amber-600 dark:text-amber-400`} />;
      case 'disabled':
        return <ShieldX className={`${baseIconClass} text-red-600 dark:text-red-400`} />;
      default:
        return <Shield className={`${baseIconClass} text-slate-600 dark:text-slate-400`} />;
    }
  };

  const getFeatureByName = (name: string) => {
    return securityFeatures.find(feature => feature.name === name);
  };

  const openSystemSettings = (section: string) => {
    console.log(`Opening System Settings: ${section}`);
    alert(`This would open System Settings: ${section} (Would use Swift in a native macOS app)`);
  };

  const toggleAllTilesFlip = () => {
    setAreAllTilesFlipped(!areAllTilesFlipped);
  };

  const renderFeatureTile = (featureName: keyof typeof FEATURE_SETTINGS, hideButton = false) => {
    const feature = getFeatureByName(featureName);
    if (!feature) return null;

    return (
      <div className="h-[280px] w-full">
        <SecurityFeature 
          feature={feature}
          className="h-full w-full flex flex-col"
          hideDescription={true}
          hideButton={true}
          onIconClick={hideButton ? undefined : () => openSystemSettings(FEATURE_SETTINGS[featureName])}
          isFlipped={areAllTilesFlipped}
        />
      </div>
    );
  };

  return (
    <div className="px-6 py-6 w-full min-h-screen bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
      <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
        <div className="mb-2">
          <StatusCard
            title="Security Status"
            status={overallStatus}
            description="Summary of your Mac's security features"
            className="max-w-none h-auto"
            headerIcon={getSecurityStatusIcon()}
          >
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium leading-relaxed ${
                  overallStatus === 'enabled' ? 'text-emerald-700 dark:text-emerald-400' : 
                  overallStatus === 'disabled' ? 'text-red-700 dark:text-red-400' :
                  'text-amber-700 dark:text-amber-400'
                }`}>
                  {getStatusMessage()}
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAllTilesFlip}
                  className="h-8 px-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                >
                  <Info className="h-4 w-4 mr-2" />
                  {areAllTilesFlipped ? 'Hide Details' : 'Show Details'}
                </Button>
              </div>
            </div>
          </StatusCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {renderFeatureTile('macOS Updates')}
          {renderFeatureTile('FileVault')}
          {renderFeatureTile('Firewall')}
          {renderFeatureTile('XProtect')}
          {renderFeatureTile('Gatekeeper')}
          {renderFeatureTile('System Integrity Protection', true)}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
