
import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
}

const SecurityFeature = ({ feature, className }: SecurityFeatureProps) => {
  return (
    <StatusCard
      title={feature.name}
      status={feature.status}
      description={feature.description}
      lastUpdated={feature.lastUpdated}
      className={className}
    >
      {feature.setting && (
        <div className="text-sm mt-2">
          <span className="font-medium">Current Setting:</span> {feature.setting}
        </div>
      )}
    </StatusCard>
  );
};

export default SecurityFeature;
