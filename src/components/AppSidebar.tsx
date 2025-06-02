
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
  SidebarHeader,
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Protection</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeItem === item.id}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
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
