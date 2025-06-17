
import React, { useState } from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import { securityFeatures } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import { Download, Shield, ShieldAlert, ShieldX, Settings } from 'lucide-react';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";

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

  // Function to check if updates are available for a feature
  const hasUpdatesAvailable = (featureName: string) => {
    const feature = getFeatureByName(featureName);
    if (!feature) return false;
    
    // Check if feature needs updates based on status
    if (featureName === 'macOS Updates') {
      return feature.status === 'warning' || feature.status === 'disabled';
    }
    
    // For other features, updates are available if they're disabled
    return feature.status === 'disabled';
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

    const updatesAvailable = hasUpdatesAvailable(featureName);
    const isMacOSUpdates = featureName === 'macOS Updates';
    const buttonText = isMacOSUpdates ? 'Update' : 'Settings';
    const buttonIcon = isMacOSUpdates ? Download : Settings;

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="h-[280px] w-full"> {/* Fixed height for all tiles */}
            <SecurityFeature 
              feature={feature}
              className="h-full w-full flex flex-col"
              hideDescription={true}
              hideButton={true} // Always hide the built-in button
            >
              {/* Custom button positioned at bottom */}
              {!hideButton && (
                <div className="mt-auto pt-4"> {/* Push to bottom with margin-top auto */}
                  <Button 
                    variant={updatesAvailable ? "default" : "ghost"} 
                    size="sm" 
                    disabled={!updatesAvailable}
                    className={`w-full h-8 text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${
                      updatesAvailable 
                        ? 'bg-blue-500/90 hover:bg-blue-600/90 text-white border-0 shadow-sm hover:shadow-md' 
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-300 dark:hover:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => updatesAvailable && openSystemSettings(settingsSection)}
                  >
                    {React.createElement(buttonIcon, { className: "h-3 w-3 mr-1" })}
                    {buttonText}
                  </Button>
                </div>
              )}
              {/* For tiles without buttons, add some visual balance */}
              {hideButton && (
                <div className="mt-auto pt-4 flex justify-center">
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    System Managed
                  </div>
                </div>
              )}
            </SecurityFeature>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-700/30 rounded-xl shadow-xl">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {feature.description}
          </p>
        </HoverCardContent>
      </HoverCard>
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
          {renderFeatureTile('System Integrity Protection', 'Privacy & Security', true)}
          {renderFeatureTile('FileVault', 'Privacy & Security')}
          {renderFeatureTile('XProtect', 'Privacy & Security')}
          {renderFeatureTile('Gatekeeper', 'Privacy & Security')}
          {renderFeatureTile('Firewall', 'Network Firewall')}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
