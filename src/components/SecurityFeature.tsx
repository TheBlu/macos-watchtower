
import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock } from 'lucide-react';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
}

const SecurityFeature = ({ feature, className }: SecurityFeatureProps) => {
  // Determine which icon to use based on the feature name and status
  const renderFeatureIcon = () => {
    if (feature.name === 'Firewall') {
      return feature.status === 'enabled' ? 
        <Shield className="h-5 w-5 text-green-500" /> : 
        <ShieldOff className="h-5 w-5 text-red-500" />;
    }
    
    if (feature.name === 'macOS Updates') {
      if (feature.status === 'enabled') {
        return <CalendarCheck className="h-5 w-5 text-green-500" />;
      } else if (feature.status === 'warning') {
        return <CalendarClock className="h-5 w-5 text-yellow-500" />;
      } else if (feature.status === 'disabled') {
        return <CalendarX className="h-5 w-5 text-red-500" />;
      }
    }
    
    return null;
  };

  return (
    <StatusCard
      title={feature.name}
      status={feature.status}
      description={feature.description}
      lastUpdated={feature.lastUpdated}
      className={className}
    >
      <div className="text-sm mt-2 space-y-2">
        {feature.setting && (
          <div>
            <span className="font-medium">Current Setting:</span> {feature.setting}
          </div>
        )}
        
        {renderFeatureIcon() && (
          <div className="flex items-center">
            {renderFeatureIcon()}
            <span className="ml-2">
              {feature.name === 'Firewall' && 
                (feature.status === 'enabled' ? 'Protection active' : 'Not protecting')}
              {feature.name === 'macOS Updates' && 
                (feature.status === 'enabled' ? 'Up to date' : 
                 feature.status === 'warning' ? 'Updates available' : 'Updates disabled')}
            </span>
          </div>
        )}
      </div>
    </StatusCard>
  );
};

export default SecurityFeature;
