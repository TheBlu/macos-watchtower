
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  status: 'enabled' | 'disabled' | 'warning' | 'unknown';
  description: string;
  lastUpdated?: string;
  className?: string;
  children?: React.ReactNode;
}

const StatusCard = ({ 
  title, 
  status, 
  description, 
  lastUpdated, 
  className,
  children 
}: StatusCardProps) => {
  // Status indicator colors
  const statusColor = {
    enabled: 'bg-green-500',
    disabled: 'bg-red-500',
    warning: 'bg-yellow-500',
    unknown: 'bg-gray-400'
  };
  
  // Status text
  const statusText = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    warning: 'Warning',
    unknown: 'Unknown'
  };

  return (
    <div className={cn("bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden w-full", className)}>
      <div className="p-4 pb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${statusColor[status]} mr-1`}></span>
            <span className="text-xs font-medium text-gray-700">{statusText[status]}</span>
          </div>
        </div>
        
        {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
        
        {children && (
          <div className="mt-1">
            {children}
          </div>
        )}
        
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-3">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
