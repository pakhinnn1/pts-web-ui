"use client"

import * as React from "react"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  LayoutGrid,
  List,
  MapPin,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { OnsiteLocation } from "@/lib/planner-data"
import {
  formatIsoToDisplayThaiDate,
  getPaginationPages,
  type StatusBadgeTone,
} from "@/lib/planner-logic"
import { cn } from "@/lib/utils"

export function getStatusToneBadgeClasses(tone: StatusBadgeTone): string {
  switch (tone) {
    case "slate":
      return "bg-[#f1f3f6] text-[#6b7280]"
    case "amber":
      return "bg-[#fff6e5] text-[#c88625]"
    case "yellow":
      return "bg-[#fefbe6] text-[#ca8a04]"
    case "green":
      return "bg-[#e3f8ee] text-[#179e65]"
    case "blue":
      return "bg-[#e0eeff] text-[#2563eb]"
    case "teal":
      return "bg-[#e5f5f2] text-[#176e64]"
    case "red":
      return "bg-[#fdecec] text-[#df3b3b]"
    case "gray":
      return "bg-[#f3f4f6] text-[#6b7280]"
  }
}

interface PlanStatusBadgeProps {
  label: string
  tone: StatusBadgeTone
  hasInfoReason?: boolean
  reasonTitle?: string
  reasonText?: string
  reasonDate?: string
  className?: string
}

export function PlanStatusBadge({
  label,
  tone,
  hasInfoReason = false,
  reasonTitle,
  reasonText,
  reasonDate,
  className,
}: PlanStatusBadgeProps) {
  const toneClasses = getStatusToneBadgeClasses(tone)

  if (!hasInfoReason) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1 rounded-md px-3 py-1 text-[12px] font-medium whitespace-nowrap",
          toneClasses,
          className
        )}
      >
        {label}
      </span>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        onClick={(e) => e.stopPropagation()}
        aria-label={`ดูเหตุผลสถานะ ${label}`}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 text-[12px] font-medium whitespace-nowrap transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
          toneClasses,
          className
        )}
      >
        <span>{label}</span>
        <Info className="size-3.5 shrink-0 opacity-80" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        onClick={(e) => e.stopPropagation()}
        className="w-72 rounded-xl border border-[#e3ecea] bg-white p-3.5 shadow-lg"
      >
        <p className="text-xs font-semibold text-[#1e293b]">
          {reasonTitle || label}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
          {reasonText || "ไม่มีหมายเหตุเพิ่มเติม"}
        </p>
        {reasonDate && (
          <p className="mt-2 text-[11px] text-[#94a3b8] tabular-nums">
            บันทึกเมื่อ {reasonDate}
          </p>
        )}
      </PopoverContent>
    </Popover>
  )
}

interface OnsiteLocationsDisplayProps {
  locations: OnsiteLocation[]
  maxVisible?: number
  className?: string
}

export function OnsiteLocationsDisplay({
  locations,
  maxVisible = 2,
  className,
}: OnsiteLocationsDisplayProps) {
  if (!locations || locations.length === 0) {
    return <span className={cn("text-[#64748b]", className)}>-</span>
  }

  const visible = locations.slice(0, maxVisible)
  const overflowCount = Math.max(0, locations.length - maxVisible)
  const visibleText = visible.map((loc) => loc.name).join(", ")

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-1.5", className)}>
      <span className="truncate font-medium text-[#1f2937]" title={visibleText}>
        {visibleText}
      </span>
      {overflowCount > 0 && (
        <Popover>
          <PopoverTrigger
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label={`ดูสถานที่ Onsite ทั้งหมด ${locations.length} แห่ง`}
            className="inline-flex h-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#eef2f6] px-2 text-[11px] font-semibold text-[#334155] tabular-nums transition-colors hover:bg-[#dff1ee] hover:text-[#1f7a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
          >
            +{overflowCount}
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={6}
            onClick={(e) => e.stopPropagation()}
            className="w-72 rounded-xl border border-[#e3ecea] bg-white p-3.5 shadow-lg"
          >
            <p className="text-xs font-semibold text-[#1f7a70]">
              สถานที่ปฏิบัติงาน Onsite ({locations.length} แห่ง)
            </p>
            <ul className="mt-2 space-y-2">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="flex items-start gap-2 text-xs text-[#334155]"
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#1f7a70]" />
                  <div className="min-w-0">
                    <p className="font-medium text-[#1e293b]">{loc.name}</p>
                    <p className="text-[11px] text-[#64748b]">{loc.province}</p>
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </span>
  )
}

interface ThaiDateInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel: string
}

export function ThaiDateInput({
  id,
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  ariaLabel,
}: ThaiDateInputProps) {
  const nativeDateRef = React.useRef<HTMLInputElement | null>(null)

  const handleOpenCalendar = () => {
    const input = nativeDateRef.current
    if (!input) return
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker()
        return
      } catch {
        // Fallback for browsers disallowing showPicker programmatically
      }
    }
    input.focus()
    input.click()
  }

  return (
    <div className="relative flex items-center">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-10 w-full rounded-lg border border-[#e2e8f0] bg-white pr-10 pl-3.5 text-[13px] text-[#1f2937] tabular-nums placeholder:text-[#9ca3af] transition-colors focus:border-[#1f7a70] focus:outline-none focus:ring-2 focus:ring-[#1f7a70]/15"
      />
      <input
        ref={nativeDateRef}
        type="date"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.value) {
            onChange(formatIsoToDisplayThaiDate(e.target.value))
          }
        }}
        className="pointer-events-none absolute right-2 size-6 opacity-0"
      />
      <button
        type="button"
        onClick={handleOpenCalendar}
        aria-label={`เลือกปฏิทิน ${ariaLabel}`}
        className="absolute right-2.5 inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-[#1f7a70] transition-colors hover:bg-[#edf6f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
      >
        <Calendar className="size-4" />
      </button>
    </div>
  )
}

export type ViewMode = "grid" | "table"

interface ViewModeSwitcherProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewModeSwitcher({ value, onChange }: ViewModeSwitcherProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[13px] font-medium text-[#374151] whitespace-nowrap">
        รูปแบบการแสดงข้อมูล
      </span>
      <div
        role="group"
        aria-label="รูปแบบการแสดงข้อมูล"
        className="inline-flex items-center gap-1"
      >
        <button
          type="button"
          onClick={() => onChange("table")}
          aria-label="แสดงแบบตาราง"
          aria-pressed={value === "table"}
          data-testid="view-mode-table"
          className={cn(
            "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
            value === "table"
              ? "bg-[#1f7a70] text-white shadow-xs"
              : "text-[#9ca3af] hover:bg-[#eef5f4] hover:text-[#1f7a70]"
          )}
        >
          <List className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onChange("grid")}
          aria-label="แสดงแบบการ์ด"
          aria-pressed={value === "grid"}
          data-testid="view-mode-grid"
          className={cn(
            "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
            value === "grid"
              ? "bg-[#1f7a70] text-white shadow-xs"
              : "text-[#9ca3af] hover:bg-[#eef5f4] hover:text-[#1f7a70]"
          )}
        >
          <LayoutGrid className="size-4" />
        </button>
      </div>
    </div>
  )
}

interface PlannerPaginationBarProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
}

export function PlannerPaginationBar({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [6, 10, 24],
}: PlannerPaginationBarProps) {
  const pages = getPaginationPages(currentPage, totalPages)

  return (
    <div
      data-testid="pagination-bar"
      className="mt-6 flex flex-wrap items-center justify-end gap-4 pt-2"
    >
      <div className="flex items-center gap-2 text-[13px] text-[#374151]">
        <label htmlFor="rows-per-page-select" className="whitespace-nowrap">
          จำนวนแถว
        </label>
        <select
          id="rows-per-page-select"
          aria-label="จำนวนแถวต่อหน้า"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer border-b border-[#94a3b8] bg-transparent pr-1 pb-0.5 text-[13px] font-medium text-[#1f2937] tabular-nums focus:border-[#1f7a70] focus:outline-none"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <nav
        aria-label="การแบ่งหน้า"
        className="flex items-center gap-1 text-[13px]"
      >
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          aria-label="หน้าก่อนหน้า"
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[#64748b] transition-colors hover:bg-[#edf5f4] hover:text-[#1f7a70] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {pages.map((entry, idx) =>
          entry === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex size-8 items-center justify-center text-[#94a3b8]"
            >
              ...
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => onPageChange(entry)}
              aria-label={`หน้า ${entry}`}
              aria-current={entry === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[13px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                entry === currentPage
                  ? "bg-[#1f7a70] font-semibold text-white shadow-xs"
                  : "text-[#374151] hover:bg-[#edf5f4] hover:text-[#1f7a70]"
              )}
            >
              {entry}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          aria-label="หน้าถัดไป"
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[#64748b] transition-colors hover:bg-[#edf5f4] hover:text-[#1f7a70] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </nav>
    </div>
  )
}
