
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="flex h-auto shrink-0 items-center">
              <div className="flex items-center gap-2 p-2">
                <SidebarTrigger className="rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <Header />
              </div>
            </header>
            <main className="flex-1">
              <div id="main-content" className="w-full">
                {/* Content will be rendered here based on sidebar selection */}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
