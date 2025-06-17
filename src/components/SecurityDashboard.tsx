import React, { useState } from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import { securityFeatures } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import { RefreshCw, Shield, ShieldAlert, ShieldX, Settings } from 'lucide-react';

const SecurityDashboard = () => {
  // Calculate overall security status
  const overallStatus = securityFeatures.every(
    feature => feature.status === 'enabled'
  )
    ? 'enabled'
    : securityFeatures.some(feature => feature.status === 'disabled')
    ? 'disabled'
    : 'warning';

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

  // Get the appropriate header icon for the security status
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

  // Get specific features by name
  const getFeatureByName = (name: string) => {
    return securityFeatures.find(feature => feature.name === name);
  };

  // Function to open system settings
  const openSystemSettings = (section: string) => {
    // In a real macOS app, this would use Swift to open System Settings
    console.log(`Opening System Settings: ${section}`);
    alert(`This would open System Settings: ${section} (Would use Swift in a native macOS app)`);
  };

  // Render individual feature tiles
  const renderFeatureTile = (featureName: string, settingsSection: string, hideButton = false) => {
    const feature = getFeatureByName(featureName);
    if (!feature) return null;

    return (
      <div className="h-[280px] w-full">
        <SecurityFeature 
          feature={feature}
          className="h-full w-full flex flex-col"
          hideDescription={true}
          hideButton={true}
          onIconClick={hideButton ? undefined : () => openSystemSettings(settingsSection)}
        />
      </div>
    );
  };

  return (
    <div className="px-6 py-6 w-full min-h-screen bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
      <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
        {/* Security Status */}
        <div className="mb-2">
          <StatusCard
            title="Security Status"
            status={overallStatus}
            description="Summary of your Mac's security features"
            className="max-w-none h-auto"
            headerIcon={getSecurityStatusIcon()}
          >
            <div className="mt-2">
              <p className={`text-sm font-medium leading-relaxed ${
                overallStatus === 'enabled' ? 'text-emerald-700 dark:text-emerald-400' : 
                overallStatus === 'disabled' ? 'text-red-700 dark:text-red-400' :
                'text-amber-700 dark:text-amber-400'
              }`}>
                {getStatusMessage()}
              </p>
            </div>
          </StatusCard>
        </div>

        {/* Security Features Grid with consistent heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {renderFeatureTile('macOS Updates', 'Software Update')}
          {renderFeatureTile('FileVault', 'Privacy & Security')}
          {renderFeatureTile('Firewall', 'Network Firewall')}
          {renderFeatureTile('XProtect', 'Privacy & Security')}
          {renderFeatureTile('Gatekeeper', 'Privacy & Security')}
          {renderFeatureTile('System Integrity Protection', 'Privacy & Security', true)}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
