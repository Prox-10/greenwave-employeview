import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  UserX, 
  RotateCcw, 
  FileText, 
  LogOut 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "View Evaluation", url: "/evaluation", icon: ClipboardList },
  { title: "Leave Form", url: "/leave-form", icon: Calendar },
  { title: "Absence Form", url: "/absence-form", icon: UserX },
  { title: "Return to Work Form", url: "/return-to-work", icon: RotateCcw },
  { title: "Leave/Absence Records", url: "/records", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r bg-card`} collapsible="icon">
      <SidebarContent>
        {/* Logo/Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CW</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm">CheckWise</h2>
                <p className="text-xs text-muted-foreground">CFARBEMPCO</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout at bottom */}
        <div className="mt-auto p-4 border-t">
          <SidebarMenuButton>
            <NavLink
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-destructive hover:text-destructive-foreground w-full"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="text-sm">Logout</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}