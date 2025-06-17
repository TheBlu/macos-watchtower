import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

const Header = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('Rescanning security attributes...');
    
    // Simulate a scan delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastRefresh(new Date());
    setIsRefreshing(false);
    console.log('Security attributes rescan completed');
  };

  return (
    <header className="relative border-b border-white/10 dark:border-slate-700/30 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150">
      {/* Glass reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/f2713749-728f-49bf-8044-63e560579c2d.png" 
                  alt="Watchtower" 
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Watchtower
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Monitoring your Mac's security features
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-9 w-9 p-0 rounded-xl border-white/20 dark:border-slate-700/30 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <div className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Last refresh: {lastRefresh.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
