
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
    <header className="border-b border-gray-200 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Watchtower</h1>
            <p className="text-sm text-gray-500">Monitoring your Mac's security features</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <div className="text-sm text-gray-500">
            Last refresh: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
