
import React, { useState, useEffect } from 'react';
import SecurityFeatureIcon from './SecurityFeatureIcon';
import { SecurityFeature as SecurityFeatureType } from '@/utils/mockData';
import { RefreshCw, Info } from 'lucide-react';
import { getStatusBorderColors } from '@/utils/statusUtils';
import { formatDate } from '@/utils/formatters';

interface SecurityFeatureProps {
  feature: SecurityFeatureType;
  className?: string;
  children?: React.ReactNode;
  hideDescription?: boolean;
  hideButton?: boolean;
  onIconClick?: () => void;
  isFlipped?: boolean;
}

const SecurityFeature = ({ 
  feature, 
  className, 
  children,
  hideDescription = false,
  hideButton = false,
  onIconClick,
  isFlipped = false
}: SecurityFeatureProps) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);

  useEffect(() => {
    setInternalIsFlipped(isFlipped);
  }, [isFlipped]);

  return (
    <div className={`${className} min-h-[240px] group relative overflow-hidden w-full h-full`}>
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${internalIsFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of card */}
        <div className={`absolute inset-0 backface-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 ${getStatusBorderColors(feature.status)}`}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="relative h-full p-4 pb-3 flex flex-col">
            {feature.lastUpdated && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setInternalIsFlipped(!internalIsFlipped)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
                >
                  <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            )}

            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div 
                  className={`flex items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 transition-colors duration-200 ${
                    onIconClick ? 'cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-105 transform transition-transform' : ''
                  }`}
                  onClick={onIconClick}
                >
                  <SecurityFeatureIcon 
                    featureName={feature.name} 
                    status={feature.status} 
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                  {feature.name}
                </h3>
              </div>
            </div>

            {children && (
              <div className="mt-auto">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Back of card */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl shadow-black/5 ${getStatusBorderColors(feature.status)}`}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="relative h-full flex flex-col">
            <div className="flex-grow p-4 pb-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                  {feature.name}
                </h3>
                <button
                  onClick={() => setInternalIsFlipped(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
                >
                  <Info className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Description</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {feature.setting && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                      {feature.name === 'macOS Updates' ? 'Version' : 'Current Setting'}
                    </h4>
                    <div className="text-slate-700 dark:text-slate-300 font-mono text-sm bg-slate-100/80 dark:bg-slate-800/80 px-3 py-2 rounded-lg">
                      {feature.setting}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {feature.lastUpdated && (
              <div className="relative border-t border-white/10 dark:border-slate-700/30 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm px-4 py-3 mt-auto">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Last Updated:</h4>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30">
                    <RefreshCw className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formatDate(feature.lastUpdated)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default SecurityFeature;
