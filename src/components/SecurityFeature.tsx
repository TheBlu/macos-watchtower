
import React from 'react';
import StatusCard from './StatusCard';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { Shield, ShieldOff, CalendarCheck, CalendarX, CalendarClock } from 'lucide-react';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
  children?: React.ReactNode;
  hideDescription?: boolean;
  hideButton?: boolean;
}

const SecurityFeature = ({ 
  feature, 
  className, 
  children,
  hideDescription = false,
  hideButton = false
}: SecurityFeatureProps) => {
  // Determine which icon to use based on the feature name and status
  const renderFeatureIcon = () => {
    if (feature.name === 'Firewall') {
      return feature.status === 'enabled' ? 
        <Shield className="h-3 w-3 text-green-500" /> : 
        <ShieldOff className="h-3 w-3 text-red-500" />;
    }
    
    if (feature.name === 'macOS Updates') {
      if (feature.status === 'enabled') {
        return <CalendarCheck className="h-3 w-3 text-green-500" />;
      } else if (feature.status === 'warning') {
        return <CalendarClock className="h-3 w-3 text-yellow-500" />;
      } else if (feature.status === 'disabled') {
        return <CalendarX className="h-3 w-3 text-red-500" />;
      }
    }
    
    return null;
  };

  return (
    <StatusCard
      title={feature.name}
      status={feature.status}
      description={hideDescription ? "" : feature.description}
      lastUpdated={feature.lastUpdated}
      className={`${className} h-[170px]`}
      footerContent={
        children && !hideButton ? (
          <div className="ml-auto">
            {children}
          </div>
        ) : undefined
      }
    >
      <div className="flex flex-col h-full">
        {feature.setting && (
          <div className="text-xs mb-1">
            <span className="font-medium">{feature.name === 'macOS Updates' ? 'Version:' : 'Setting:'}</span> {feature.setting}
          </div>
        )}
        
        {renderFeatureIcon() && (
          <div className="flex items-center">
            {renderFeatureIcon()}
            <span className="ml-1 text-xs">
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
