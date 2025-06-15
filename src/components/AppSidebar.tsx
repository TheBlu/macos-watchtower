
import React, { useState } from 'react';
import { Shield, FileText, Eye } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import SecurityDashboard from './SecurityDashboard';
import ActivityLogs from './ActivityLogs';
import XProtectLogs from './XProtectLogs';
import { gatekeeperLogs, xprotectLogs } from '@/utils/mockData';

const menuItems = [
  {
    title: "Security Dashboard",
    icon: Shield,
    id: "security"
  },
  {
    title: "Gatekeeper Logs",
    icon: FileText,
    id: "gatekeeper"
  },
  {
    title: "XProtect Logs",
    icon: Eye,
    id: "xprotect"
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("security");

  const handleMenuClick = (itemId: string) => {
    setActiveItem(itemId);
    
    // Update the main content area
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Clear existing content
      mainContent.innerHTML = '';
      
      // Create a div to render React content
      const contentDiv = document.createElement('div');
      mainContent.appendChild(contentDiv);
      
      // Import and render the appropriate component
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(contentDiv);
        
        switch (itemId) {
          case 'security':
            root.render(React.createElement(SecurityDashboard));
            break;
          case 'gatekeeper':
            root.render(React.createElement(ActivityLogs, { logs: gatekeeperLogs }));
            break;
          case 'xprotect':
            root.render(React.createElement(XProtectLogs, { logs: xprotectLogs }));
            break;
        }
      });
    }
  };

  // Initialize with security dashboard on first render
  React.useEffect(() => {
    handleMenuClick('security');
  }, []);

  return (
    <Sidebar className="border-r border-white/10 dark:border-slate-700/30 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150">
      {/* Glass reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Protection
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeItem === item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      group relative px-3 py-2.5 rounded-xl font-medium transition-all duration-200
                      ${activeItem === item.id 
                        ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <item.icon className={`h-4 w-4 transition-transform duration-200 ${
                      activeItem === item.id ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className="ml-3 text-sm">{item.title}</span>
                    
                    {/* Active indicator glow */}
                    {activeItem === item.id && (
                      <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-lg -z-10" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
