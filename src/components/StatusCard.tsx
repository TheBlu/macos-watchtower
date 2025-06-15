
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
  // Status indicator colors with modern styling
  const statusColor = {
    enabled: 'bg-emerald-500/90 shadow-emerald-500/20',
    disabled: 'bg-red-500/90 shadow-red-500/20',
    warning: 'bg-amber-500/90 shadow-amber-500/20',
    unknown: 'bg-slate-400/90 shadow-slate-400/20'
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
    <div className={cn(
      "group relative overflow-hidden",
      "bg-white/60 dark:bg-slate-900/60",
      "backdrop-blur-lg backdrop-saturate-150",
      "border border-white/20 dark:border-slate-700/30",
      "rounded-2xl shadow-xl shadow-black/5",
      "hover:shadow-2xl hover:shadow-black/10",
      "hover:bg-white/70 dark:hover:bg-slate-900/70",
      "transition-all duration-300 ease-out",
      "before:absolute before:inset-0 before:rounded-2xl",
      "before:bg-gradient-to-br before:from-white/10 before:to-transparent",
      "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      "w-full h-full flex flex-col",
      className
    )}>
      {/* Glass reflection effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className="relative flex-grow p-4 pb-3">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={cn(
              "w-2.5 h-2.5 rounded-full shadow-lg",
              statusColor[status]
            )}></span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {statusText[status]}
            </span>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="mt-auto">
            {children}
          </div>
        )}
      </div>
      
      {(lastUpdated || footerContent) && (
        <div className="relative border-t border-white/10 dark:border-slate-700/30 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm px-4 py-3 mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          {lastUpdated && (
            <span className="font-medium">
              Last updated: {formatDate(lastUpdated)}
            </span>
          )}
          {footerContent && (
            <div className="ml-auto">
              {footerContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
