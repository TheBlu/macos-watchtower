
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  status: 'enabled' | 'disabled' | 'warning' | 'unknown';
  description: string;
  lastUpdated?: string;
  className?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const StatusCard = ({ 
  title, 
  status, 
  description, 
  lastUpdated, 
  className,
  children,
  footerContent
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

  // Format the date to remove seconds
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={cn("bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden w-full h-full flex flex-col", className)}>
      <div className="p-3 pb-2 flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${statusColor[status]} mr-1`}></span>
            <span className="text-xs font-medium text-gray-700">{statusText[status]}</span>
          </div>
        </div>
        
        {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
        
        {children && (
          <div className="mt-0.5">
            {children}
          </div>
        )}
      </div>
      
      {(lastUpdated || footerContent) && (
        <div className="text-xs text-gray-500 px-3 py-1 border-t border-gray-100 mt-auto flex items-center">
          {lastUpdated && (
            <span>Last updated: {formatDate(lastUpdated)}</span>
          )}
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
