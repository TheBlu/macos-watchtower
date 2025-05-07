
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
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", className)}>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
          <div className="flex items-center">
            <span className={`w-2.5 h-2.5 rounded-full ${statusColor[status]} mr-1.5`}></span>
            <span className="text-xs font-medium text-gray-700">{statusText[status]}</span>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-2">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
        
        {children && (
          <div className="mt-2 border-t border-gray-100 pt-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
