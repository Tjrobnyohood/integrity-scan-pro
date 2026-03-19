import { Activity, BarChart3, FileText, Home, Settings, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Activity },
  { title: "Network Audit", url: "/audit", icon: Shield },
  { title: "Proposals", url: "/proposals", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [missionVisible, setMissionVisible] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setMissionVisible(true)}
              onMouseLeave={() => setMissionVisible(false)}
            >
              <img src={logo} alt="Rooted Tech Services" className="h-10 w-10 flex-shrink-0" />
              {!collapsed && (
                <span className="text-lg font-bold text-foreground tracking-tight">
                  Rooted<span className="text-primary">Tech</span>
                </span>
              )}
            </div>
          </SidebarGroupLabel>

          {!collapsed && missionVisible && (
            <div className="px-4 pb-3 text-xs text-muted-foreground italic animate-in fade-in duration-300">
              "God-first. Integrity-driven. Your network, rooted in excellence."
            </div>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground/40 text-center select-none" title="Colossians 3:23">
            Col 3:23 — Whatever you do, work at it with all your heart.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
