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

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Overall Security Status */}
        <StatusCard
          title="Overall Security Status"
          status={overallStatus}
          description="Summary of your Mac's security features"
        >
          <div className="text-sm">
            {overallStatus === 'enabled' ? (
              <p className="text-green-700">All security features are enabled and up to date.</p>
            ) : overallStatus === 'disabled' ? (
              <p className="text-red-700">One or more security features are disabled. Review your settings below.</p>
            ) : (
              <p className="text-yellow-700">Some security features need attention. Check the details below.</p>
            )}
          </div>
        </StatusCard>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
