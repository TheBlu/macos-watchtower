
import React from 'react';
import StatusCard from './StatusCard';
import SecurityFeature from './SecurityFeature';
import ActivityLogs from './ActivityLogs';
import { securityFeatures, gatekeeperLogs } from '@/utils/mockData';

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

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <SecurityFeature key={index} feature={feature} />
          ))}
        </div>

        {/* Gatekeeper Activity Logs */}
        <ActivityLogs logs={gatekeeperLogs} />
      </div>
    </div>
  );
};

export default SecurityDashboard;
