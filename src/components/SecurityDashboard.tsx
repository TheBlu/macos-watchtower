
import React from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import ActivityLogs from './ActivityLogs';
import { securityFeatures, gatekeeperLogs } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

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
  const renderFeatureTile = (featureName: string, settingsSection: string) => {
    const feature = getFeatureByName(featureName);
    if (!feature) return null;

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="h-full w-full">
            <SecurityFeature 
              feature={feature}
              className="h-full w-full"
              hideDescription={true}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1 h-7 text-xs px-2 py-0"
                onClick={() => openSystemSettings(settingsSection)}
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Open
              </Button>
            </SecurityFeature>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-2">
          <p className="text-sm">{feature.description}</p>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <div className="px-4 py-4 w-full">
      <div className="grid grid-cols-1 gap-4 max-w-[1400px] mx-auto">
        {/* Security Status */}
        <StatusCard
          title="Security Status"
          status={overallStatus}
          description="Summary of your Mac's security features"
          className="max-w-none"
        >
          <div className="text-sm">
            <p className={`
              ${overallStatus === 'enabled' ? 'text-green-700' : ''} 
              ${overallStatus === 'disabled' ? 'text-red-700' : ''}
              ${overallStatus === 'warning' ? 'text-yellow-700' : ''}
            `}>
              {getStatusMessage()}
            </p>
          </div>
        </StatusCard>

        {/* Tabbed Interface */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Security Features</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>
          
          {/* Security Features Tab */}
          <TabsContent value="features" className="mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Left Column */}
              <div className="grid grid-cols-1 gap-4 h-full">
                {renderFeatureTile('macOS Updates', 'Software Update')}
                {renderFeatureTile('System Integrity Protection', 'Privacy & Security')}
                {renderFeatureTile('FileVault', 'Privacy & Security')}
              </div>
              
              {/* Right Column */}
              <div className="grid grid-cols-1 gap-4 h-full">
                {renderFeatureTile('XProtect', 'Privacy & Security')}
                {renderFeatureTile('Gatekeeper', 'Privacy & Security')}
                {renderFeatureTile('Firewall', 'Network Firewall')}
              </div>
            </div>
          </TabsContent>
          
          {/* Activity Logs Tab */}
          <TabsContent value="logs" className="mt-3">
            <ActivityLogs logs={gatekeeperLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;
