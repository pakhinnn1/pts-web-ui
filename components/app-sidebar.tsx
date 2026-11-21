"use client"

import * as React from "react"
import {
  NavBudgetIllustration,
  NavDashboardIllustration,
  NavPlannerIllustration,
  PastelCityscapeBackdrop,
  PlannerBrandIllustration,
} from "@/components/pastel-illustrations"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export type WorkspaceSection = "dashboard" | "planner" | "budget"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: WorkspaceSection
  onSelectSection: (section: WorkspaceSection) => void
}

const NAV_ITEMS: {
  id: WorkspaceSection
  label: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: NavDashboardIllustration,
  },
  {
    id: "planner",
    label: "Planner",
    Icon: NavPlannerIllustration,
  },
  {
    id: "budget",
    label: "จัดการงบประมาณและค่าใช้จ่าย",
    Icon: NavBudgetIllustration,
  },
]

function PlannerBrandMark({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-1.5 py-2 transition-all",
        collapsed && "justify-center px-0 py-1"
      )}
    >
      <PlannerBrandIllustration
        className={cn(
          "transition-all",
          collapsed ? "size-9" : "size-12"
        )}
      />

      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-bold tracking-tight text-[#127a71]">
            Planner
          </span>
          <span className="text-[14px] font-semibold text-[#1c8a80]">
            Tag System
          </span>
        </div>
      )}
    </div>
  )
}

export function AppSidebar({
  activeSection,
  onSelectSection,
  className,
  ...props
}: AppSidebarProps) {
  const { state, isMobile, setOpenMobile } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile

  const handleSelect = (section: WorkspaceSection) => {
    onSelectSection(section)
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className={cn(
        "[&_[data-slot=sidebar-inner]]:planner-sidebar-surface [&_[data-slot=sidebar-inner]]:relative [&_[data-slot=sidebar-inner]]:overflow-hidden [&_[data-slot=sidebar-inner]]:rounded-xl [&_[data-slot=sidebar-inner]]:border [&_[data-slot=sidebar-inner]]:border-[#d5e4e1]/80",
        className
      )}
      {...props}
    >
      <SidebarHeader className="relative z-10 pt-3 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              type="button"
              onClick={() => handleSelect("planner")}
              aria-label="Planner Tag System หน้าหลัก"
              className="w-full rounded-lg text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
            >
              <PlannerBrandMark collapsed={isCollapsed} />
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="relative z-10 px-1.5 pt-1.5">
        <SidebarGroup className="p-1">
          <SidebarMenu className="gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Illustration = item.Icon
              const isActive = activeSection === item.id

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    type="button"
                    isActive={isActive}
                    tooltip={item.label}
                    aria-label={item.label}
                    onClick={() => handleSelect(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "h-auto min-h-11 rounded-xl px-2.5 py-2 text-[13.5px] font-medium transition-all duration-150 group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-1!",
                      isActive
                        ? "bg-[#1f7a70] text-white shadow-xs hover:bg-[#19685f] hover:text-white data-active:bg-[#1f7a70] data-active:text-white"
                        : "text-[#1e293b] hover:bg-white/75 hover:text-[#145952]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-white/95 shadow-2xs" : "bg-transparent"
                      )}
                    >
                      <Illustration className="size-6" />
                    </span>
                    <span className="leading-snug text-left">
                      {item.id === "budget" && !isCollapsed ? (
                        <>
                          จัดการงบประมาณและ
                          <br />
                          ค่าใช้จ่าย
                        </>
                      ) : (
                        item.label
                      )}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative z-10 pb-3" />
      <PastelCityscapeBackdrop />
    </Sidebar>
  )
}
