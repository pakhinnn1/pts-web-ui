"use client"

import * as React from "react"
import {
  Bell,
  Building2,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Mail,
  UserRound,
} from "lucide-react"
import { PastelCharacterAvatar } from "@/components/pastel-illustrations"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSidebar } from "@/components/ui/sidebar"
import type { PlannerNotification, UserProfile } from "@/lib/planner-data"
import { cn } from "@/lib/utils"

interface TopHeaderProps {
  user: UserProfile
  notifications: PlannerNotification[]
  onMarkAllRead: () => void
  onSelectNotification: (notification: PlannerNotification) => void
  onNavigateBudget: () => void
  onShowStatusToast: (message: string) => void
}

export function TopHeader({
  user,
  notifications,
  onMarkAllRead,
  onSelectNotification,
  onNavigateBudget,
  onShowStatusToast,
}: TopHeaderProps) {
  const { state, isMobile, toggleSidebar } = useSidebar()
  const unreadCount = notifications.filter((item) => !item.read).length
  const isExpanded = isMobile ? false : state === "expanded"

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-[#e8efee] bg-white/95 px-4 backdrop-blur-xs md:rounded-t-xl md:px-6">
      {/* Left: Circular Sidebar Collapse/Expand Control */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "ย่อแถบเมนูด้านข้าง" : "ขยายแถบเมนูด้านข้าง"}
          title={isExpanded ? "ย่อแถบเมนู" : "ขยายแถบเมนู"}
          className="inline-flex size-8 items-center justify-center rounded-full border border-[#dce6e5] bg-white text-[#1f7a70] shadow-xs transition-colors hover:bg-[#edf6f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
        >
          {isExpanded ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </button>
      </div>

      {/* Right: Notification Bell + User Profile Dropdown */}
      <div className="flex items-center gap-3 sm:gap-5">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`การแจ้งเตือน${unreadCount > 0 ? ` (${unreadCount} รายการใหม่)` : ""}`}
                className="relative size-10 rounded-full text-[#334155] hover:bg-[#edf6f4] hover:text-[#1f7a70]"
              />
            }
          >
            <Bell className="size-[19px]" />
            {unreadCount > 0 && (
              <span
                data-testid="unread-notification-count"
                className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e53935] px-1 text-[10px] font-semibold leading-none text-white tabular-nums"
              >
                {unreadCount}
              </span>
            )}
          </PopoverTrigger>

          <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
            <PopoverHeader className="flex flex-row items-center justify-between border-b border-[#e8efee] px-4 py-3">
              <PopoverTitle className="text-sm font-semibold text-[#1e293b]">
                การแจ้งเตือน
              </PopoverTitle>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1f7a70] hover:underline"
                >
                  <CheckCheck className="size-3.5" />
                  อ่านทั้งหมด
                </button>
              )}
            </PopoverHeader>

            <div className="max-h-72 divide-y divide-[#eef3f2] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs text-[#7a8692]">
                  ไม่มีการแจ้งเตือนในขณะนี้
                </div>
              ) : (
                notifications.map((notif) => (
                  <button
                    key={notif.id}
                    type="button"
                    onClick={() => onSelectNotification(notif)}
                    className={cn(
                      "flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-[#f4f9f8]",
                      !notif.read && "bg-[#f2faf8]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#1f7a70]">
                        {notif.title}
                      </span>
                      <span className="text-[11px] text-[#7a8692] whitespace-nowrap">
                        {notif.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#475569]">
                      {notif.description}
                    </p>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label={`เมนูบัญชีผู้ใช้ ${user.name}`}
                className="flex items-center gap-3 rounded-full py-1 pr-2 pl-1 text-left transition-colors hover:bg-[#f4f8f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
              />
            }
          >
            <PastelCharacterAvatar
              variant="farlada"
              className="size-10"
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-[13.5px] font-semibold text-[#1e293b] whitespace-nowrap">
                {user.name}
              </span>
              <span className="text-[11.5px] text-[#83909b] whitespace-nowrap">
                {user.role}
              </span>
            </div>
            <ChevronDown className="size-4 text-[#64748b]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-2.5">
                  <PastelCharacterAvatar
                    variant="farlada"
                    className="size-10"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#1e293b]">
                      {user.name}
                    </span>
                    <span className="text-xs text-[#7a8692]">
                      รหัส {user.employeeCode} · {user.role}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  onShowStatusToast(
                    `${user.name} (${user.department}) — ${user.email}`
                  )
                }
              >
                <UserRound className="size-4" />
                ข้อมูลโปรไฟล์ผู้ใช้งาน
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onNavigateBudget}>
                <Building2 className="size-4" />
                จัดการงบประมาณ GA
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onShowStatusToast(`อีเมลแจ้งเตือน: ${user.email}`)
                }
              >
                <Mail className="size-4" />
                ตั้งค่าการแจ้งเตือนอีเมล
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                onShowStatusToast("บันทึกสถานะเซสชันปัจจุบันเรียบร้อยแล้ว")
              }
            >
              <LogOut className="size-4" />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
