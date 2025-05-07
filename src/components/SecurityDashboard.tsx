import React from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import ActivityLogs from './ActivityLogs';
import { securityFeatures, gatekeeperLogs } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

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

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Security Status */}
        <StatusCard
          title="Security Status"
          status={overallStatus}
          description="Summary of your Mac's security features"
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
          <TabsContent value="features" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* macOS Updates */}
                {getFeatureByName('macOS Updates') && (
                  <SecurityFeature 
                    feature={getFeatureByName('macOS Updates')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Software Update')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open Software Update
                    </Button>
                  </SecurityFeature>
                )}
                
                {/* FileVault */}
                {getFeatureByName('FileVault') && (
                  <SecurityFeature 
                    feature={getFeatureByName('FileVault')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Privacy & Security')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open FileVault Settings
                    </Button>
                  </SecurityFeature>
                )}
                
                {/* Firewall */}
                {getFeatureByName('Firewall') && (
                  <SecurityFeature 
                    feature={getFeatureByName('Firewall')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Network Firewall')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open Firewall Settings
                    </Button>
                  </SecurityFeature>
                )}
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* XProtect */}
                {getFeatureByName('XProtect') && (
                  <SecurityFeature 
                    feature={getFeatureByName('XProtect')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Privacy & Security')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open Security Settings
                    </Button>
                  </SecurityFeature>
                )}
                
                {/* Gatekeeper */}
                {getFeatureByName('Gatekeeper') && (
                  <SecurityFeature 
                    feature={getFeatureByName('Gatekeeper')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Privacy & Security')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open App Security Settings
                    </Button>
                  </SecurityFeature>
                )}
                
                {/* System Integrity Protection */}
                {getFeatureByName('System Integrity Protection') && (
                  <SecurityFeature 
                    feature={getFeatureByName('System Integrity Protection')!} 
                    className="h-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => openSystemSettings('Privacy & Security')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Open Security Settings
                    </Button>
                  </SecurityFeature>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Activity Logs Tab */}
          <TabsContent value="logs" className="mt-4">
            <ActivityLogs logs={gatekeeperLogs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;
