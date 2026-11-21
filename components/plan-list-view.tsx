"use client"

import * as React from "react"
import { ChevronDown, Eye, Plus, Search } from "lucide-react"
import {
  PastelCalendarClockMiniIcon,
  PastelDocMiniIcon,
  PastelLocationMiniIcon,
  PastelPeopleMiniIcon,
  PastelPlanSectionIcon,
} from "@/components/pastel-illustrations"
import {
  OnsiteLocationsDisplay,
  PlannerPaginationBar,
  PlanStatusBadge,
  ThaiDateInput,
  ViewModeSwitcher,
  type ViewMode,
} from "@/components/planner-list-controls"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PlanStatus, WorkPlan } from "@/lib/planner-data"
import {
  computePlannerPendingCounts,
  filterPlansAdvanced,
  getStatusMeta,
  orderPlansForPlannerView,
  paginateItems,
} from "@/lib/planner-logic"
import { cn } from "@/lib/utils"

interface PlanListViewProps {
  plans: WorkPlan[]
  onSelectPlan: (documentNo: string) => void
  onCreatePlan: (payload: {
    planName: string
    project: string
    travelDateRange: string
    objective: string
    expectedOutcome: string
    locationName: string
    province: string
  }) => string | undefined
}

const PLANNER_STATUS_OPTIONS: { value: PlanStatus | "all"; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "draft", label: "บันทึกร่าง" },
  { value: "pending_ga", label: "รอ GA ประมาณค่าใช้จ่าย" },
  { value: "waiting_summary", label: "รอพนักงานสรุปผล" },
  { value: "jv_pending", label: "รอ JV อนุมัติ" },
  { value: "jv_approved", label: "JV อนุมัติ" },
  { value: "jv_rejected", label: "JV ปฏิเสธ" },
  { value: "approved", label: "GA ประมาณค่าใช้จ่ายแล้ว" },
  { value: "cancelled", label: "ยกเลิกแผนงาน" },
]

export function PlanListView({
  plans,
  onSelectPlan,
  onCreatePlan,
}: PlanListViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<PlanStatus | "all">(
    "all"
  )
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(6)

  // Create Plan Dialog State
  const [createOpen, setCreateOpen] = React.useState(false)
  const [planName, setPlanName] = React.useState("")
  const [project, setProject] = React.useState("Planner Tag System")
  const [travelDateRange, setTravelDateRange] = React.useState(
    "22/10/68 - 24/10/68"
  )
  const [locationName, setLocationName] = React.useState("")
  const [province, setProvince] = React.useState("กรุงเทพมหานคร")
  const [objective, setObjective] = React.useState("")
  const [expectedOutcome, setExpectedOutcome] = React.useState("")
  const [formError, setFormError] = React.useState<string | null>(null)

  const orderedPlans = React.useMemo(
    () => orderPlansForPlannerView(plans),
    [plans]
  )
  const pendingCounts = React.useMemo(
    () => computePlannerPendingCounts(plans),
    [plans]
  )

  const filteredPlans = React.useMemo(
    () =>
      filterPlansAdvanced(orderedPlans, {
        searchQuery,
        statusFilter,
        startDate,
        endDate,
      }),
    [orderedPlans, searchQuery, statusFilter, startDate, endDate]
  )

  const paginated = React.useMemo(
    () => paginateItems(filteredPlans, currentPage, pageSize),
    [filteredPlans, currentPage, pageSize]
  )

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    startDate.trim() !== "" ||
    endDate.trim() !== "" ||
    statusFilter !== "all"

  const handleResetFilters = () => {
    setSearchQuery("")
    setStartDate("")
    setEndDate("")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  const handleTogglePendingChip = (targetStatus: "draft" | "waiting_summary") => {
    setStatusFilter((prev) => (prev === targetStatus ? "all" : targetStatus))
    setCurrentPage(1)
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!planName.trim() || !locationName.trim() || !objective.trim()) {
      setFormError("กรุณากรอกชื่อแผนงาน สถานที่ Onsite และวัตถุประสงค์ให้ครบถ้วน")
      return
    }
    const err = onCreatePlan({
      planName: planName.trim(),
      project: project.trim() || "Planner Tag System",
      travelDateRange: travelDateRange.trim() || "22/10/68 - 24/10/68",
      objective: objective.trim(),
      expectedOutcome:
        expectedOutcome.trim() || "ดำเนินการตามแผนงานสำเร็จตามเป้าหมาย",
      locationName: locationName.trim(),
      province: province.trim() || "กรุงเทพมหานคร",
    })
    if (err) {
      setFormError(err)
      return
    }
    setCreateOpen(false)
    setPlanName("")
    setLocationName("")
    setObjective("")
    setExpectedOutcome("")
    setFormError(null)
  }

  return (
    <div
      data-testid="planner-list-view"
      className="mx-auto w-full max-w-[1220px] px-5 py-6 sm:px-8 sm:py-7"
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold tracking-tight text-[#1e293b]">
          Planner
        </h1>

        <Button
          type="button"
          onClick={() => {
            setFormError(null)
            setCreateOpen(true)
          }}
          data-testid="create-plan-button"
          className="h-10 cursor-pointer rounded-lg bg-[#1f7a70] px-4 text-[13px] font-medium text-white shadow-xs hover:bg-[#176159]"
        >
          <Plus className="mr-1.5 size-4" />
          สร้างแผนงานใหม่
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="mt-5 grid grid-cols-1 items-end gap-3.5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.75fr)_minmax(0,1fr)_auto]">
        {/* Search Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="planner-search-input"
            className="block text-[13px] font-medium text-[#374151]"
          >
            ค้นหาชื่อแผนงาน / เลขที่เอกสาร
          </label>
          <div className="relative flex items-center">
            <input
              id="planner-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="ค้นหา"
              className="h-10 w-full rounded-lg border border-[#e2e8f0] bg-white pr-9 pl-3.5 text-[13px] text-[#1f2937] placeholder:text-[#9ca3af] transition-colors focus:border-[#1f7a70] focus:outline-none focus:ring-2 focus:ring-[#1f7a70]/15"
            />
            <Search className="pointer-events-none absolute right-3 size-4 text-[#1f7a70]" />
          </div>
        </div>

        {/* Dual Date Range Inputs */}
        <div className="space-y-1.5">
          <span className="block text-[13px] font-medium text-[#374151]">
            วันที่ไป - กลับ
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <ThaiDateInput
              id="planner-start-date"
              value={startDate}
              onChange={(val) => {
                setStartDate(val)
                setCurrentPage(1)
              }}
              ariaLabel="วันที่เริ่มต้น"
            />
            <ThaiDateInput
              id="planner-end-date"
              value={endDate}
              onChange={(val) => {
                setEndDate(val)
                setCurrentPage(1)
              }}
              ariaLabel="วันที่สิ้นสุด"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="planner-status-select"
            className="block text-[13px] font-medium text-[#374151]"
          >
            สถานะ
          </label>
          <div className="relative flex items-center">
            <select
              id="planner-status-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as PlanStatus | "all")
                setCurrentPage(1)
              }}
              className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-[#e2e8f0] bg-white pr-9 pl-3.5 text-[13px] text-[#374151] transition-colors focus:border-[#1f7a70] focus:outline-none focus:ring-2 focus:ring-[#1f7a70]/15"
            >
              {PLANNER_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 size-4 text-[#64748b]" />
          </div>
        </div>

        {/* Reset Filters */}
        <div className="flex items-center lg:justify-end">
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            data-testid="planner-reset-filters"
            className={cn(
              "h-10 cursor-pointer px-1 text-[13px] font-medium whitespace-nowrap transition-colors",
              hasActiveFilters
                ? "text-[#1f7a70] hover:text-[#145952] hover:underline"
                : "cursor-default text-[#9ca3af]"
            )}
          >
            ล้างค่าตัวกรอง
          </button>
        </div>
      </div>

      {/* Summary & Pending Chips + View Switcher Row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          <p className="text-[13.5px] font-semibold text-[#1f2937]">
            ทั้งหมด{" "}
            <span
              data-testid="planner-total-count"
              className="text-[#1f7a70] tabular-nums"
            >
              {filteredPlans.length} รายการ
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-medium text-[#374151]">
              รายการคงค้าง :
            </span>
            <button
              type="button"
              onClick={() => handleTogglePendingChip("draft")}
              aria-pressed={statusFilter === "draft"}
              data-testid="pending-chip-draft"
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1 text-[12.5px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                statusFilter === "draft"
                  ? "bg-[#e3e7f3] text-[#334155] ring-2 ring-[#7b88a8]"
                  : "bg-[#f1f3f9] text-[#5c667a] hover:bg-[#e7ebf5]"
              )}
            >
              <span className="size-2 rounded-full bg-[#8490aa]" />
              <span className="tabular-nums">
                บันทึกร่าง {pendingCounts.draftCount} รายการ
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTogglePendingChip("waiting_summary")}
              aria-pressed={statusFilter === "waiting_summary"}
              data-testid="pending-chip-summary"
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1 text-[12.5px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                statusFilter === "waiting_summary"
                  ? "bg-[#ffedc2] text-[#b46908] ring-2 ring-[#f5a623]"
                  : "bg-[#fff6e0] text-[#d98a12] hover:bg-[#ffefc9]"
              )}
            >
              <span className="size-2 rounded-full bg-[#f5a623]" />
              <span className="tabular-nums">
                รอพนักงานสรุปผล {pendingCounts.waitingSummaryCount} รายการ
              </span>
            </button>
          </div>
        </div>

        <ViewModeSwitcher value={viewMode} onChange={setViewMode} />
      </div>

      {/* Empty State */}
      {paginated.items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfe2df] bg-[#f8fbfb] px-6 py-14 text-center">
          <PastelPlanSectionIcon className="size-16" sticker />
          <p className="mt-3 text-sm font-semibold text-[#1e293b]">
            ไม่พบแผนงานที่ตรงกับเงื่อนไขการค้นหา
          </p>
          <p className="mt-1 text-xs text-[#64748b]">
            ลองปรับคำค้นหา ช่วงวันที่ หรือสถานะแผนงานใหม่อีกครั้ง
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="mt-4 h-9 cursor-pointer border-[#1f7a70] text-xs font-medium text-[#1f7a70] hover:bg-[#edf6f4]"
          >
            ล้างค่าตัวกรอง
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* 2-Column Card Grid View */
        <div
          data-testid="planner-cards-grid"
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {paginated.items.map((plan) => {
            const status = getStatusMeta(plan.status, plan.jvApprovalProgress)
            const reasonText =
              plan.status === "jv_rejected"
                ? plan.rejectionReason
                : plan.cancellationReason
            const reasonTitle =
              plan.status === "jv_rejected"
                ? "เหตุผลที่ JV ปฏิเสธ"
                : "เหตุผลการยกเลิกแผนงาน"

            return (
              <div
                key={plan.documentNo}
                onClick={() => onSelectPlan(plan.documentNo)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onSelectPlan(plan.documentNo)
                  }
                }}
                role="button"
                tabIndex={0}
                data-testid={`planner-card-${plan.documentNo}`}
                className="group flex cursor-pointer flex-col justify-between rounded-xl border border-[#e6efed] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.035)] transition-all hover:border-[#2a8b81] hover:shadow-[0_4px_16px_rgba(31,122,112,0.09)] focus-visible:border-[#1f7a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]/25"
              >
                <div>
                  {/* Card Top: Plan Title + Semantic Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-[15px] font-semibold text-[#1f7a70] transition-colors group-hover:text-[#155e56]">
                      {plan.planName}
                    </h2>
                    <PlanStatusBadge
                      label={status.label}
                      tone={status.tone}
                      hasInfoReason={status.hasInfoReason}
                      reasonTitle={reasonTitle}
                      reasonText={reasonText}
                      reasonDate={plan.cancelledAt ?? plan.reviewedAt}
                    />
                  </div>

                  {/* 4 Cozy Pastel Metadata Rows */}
                  <dl className="mt-4 space-y-2.5 text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <PastelDocMiniIcon className="size-5 shrink-0" />
                      <dt className="shrink-0 text-[#4b5563]">เลขที่เอกสาร :</dt>
                      <dd className="font-medium text-[#1f2937] tabular-nums">
                        {plan.documentNo}
                      </dd>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <PastelLocationMiniIcon className="size-5 shrink-0" />
                      <dt className="shrink-0 text-[#4b5563]">
                        ชื่อสถานที่ Onsite :
                      </dt>
                      <dd className="min-w-0 flex-1">
                        <OnsiteLocationsDisplay
                          locations={plan.onsiteLocations}
                          maxVisible={2}
                        />
                      </dd>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <PastelCalendarClockMiniIcon className="size-5 shrink-0" />
                      <dt className="shrink-0 text-[#4b5563]">
                        วันที่ไป-กลับ :
                      </dt>
                      <dd className="font-medium text-[#1f2937] tabular-nums">
                        {plan.travelDateRange}
                      </dd>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <PastelPeopleMiniIcon className="size-5 shrink-0" />
                      <dt className="shrink-0 text-[#4b5563]">จำนวนคน :</dt>
                      <dd className="font-medium text-[#1f2937] tabular-nums">
                        {plan.employees.length}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Card Bottom-Right CTA */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectPlan(plan.documentNo)
                    }}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-[#1f7a70] transition-colors hover:text-[#145952]"
                  >
                    <Eye className="size-4" />
                    <span>ดูรายละเอียด</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Separated Rounded Pill-Row Table View */
        <div
          data-testid="planner-table-view"
          className="mt-5 overflow-x-auto pb-2"
        >
          <div className="min-w-[920px]">
            {/* Table Column Headers */}
            <div className="grid grid-cols-[1.5fr_1.1fr_1fr_1.5fr_1.15fr_0.65fr_84px] items-center gap-3 border-b border-[#e5eceb] px-4 py-3 text-[13px] font-semibold text-[#1f7a70]">
              <div>ชื่อแผนงาน</div>
              <div>สถานะ</div>
              <div className="flex items-center gap-1.5">
                <PastelDocMiniIcon className="size-4 shrink-0" />
                <span>เลขที่เอกสาร</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PastelLocationMiniIcon className="size-4 shrink-0" />
                <span>ชื่อสถานที่ Onsite</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PastelCalendarClockMiniIcon className="size-4 shrink-0" />
                <span>วันที่ไป-กลับ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PastelPeopleMiniIcon className="size-4 shrink-0" />
                <span>จำนวนคน</span>
              </div>
              <div className="text-center">จัดการ</div>
            </div>

            {/* Separated Rounded Pill Rows */}
            <div className="mt-3 space-y-2.5">
              {paginated.items.map((plan, idx) => {
                const status = getStatusMeta(
                  plan.status,
                  plan.jvApprovalProgress
                )
                const reasonText =
                  plan.status === "jv_rejected"
                    ? plan.rejectionReason
                    : plan.cancellationReason
                const reasonTitle =
                  plan.status === "jv_rejected"
                    ? "เหตุผลที่ JV ปฏิเสธ"
                    : "เหตุผลการยกเลิกแผนงาน"

                return (
                  <div
                    key={plan.documentNo}
                    onClick={() => onSelectPlan(plan.documentNo)}
                    className={cn(
                      "grid cursor-pointer grid-cols-[1.5fr_1.1fr_1fr_1.5fr_1.15fr_0.65fr_84px] items-center gap-3 rounded-xl border px-4 py-3 text-[13px] transition-all hover:border-[#1f7a70] hover:bg-white hover:shadow-[0_2px_10px_rgba(31,122,112,0.08)]",
                      idx % 2 === 0
                        ? "border-[#e6efed] bg-white"
                        : "border-[#edf2f1] bg-[#f9fbfb]"
                    )}
                  >
                    <div
                      className="truncate font-medium text-[#1f2937]"
                      title={plan.planName}
                    >
                      {plan.planName}
                    </div>
                    <div>
                      <PlanStatusBadge
                        label={status.label}
                        tone={status.tone}
                        hasInfoReason={status.hasInfoReason}
                        reasonTitle={reasonTitle}
                        reasonText={reasonText}
                        reasonDate={plan.cancelledAt ?? plan.reviewedAt}
                      />
                    </div>
                    <div className="font-medium text-[#334155] tabular-nums">
                      {plan.documentNo}
                    </div>
                    <div className="min-w-0">
                      <OnsiteLocationsDisplay
                        locations={plan.onsiteLocations}
                        maxVisible={1}
                      />
                    </div>
                    <div className="text-[#334155] tabular-nums">
                      {plan.travelDateRange}
                    </div>
                    <div className="pl-2 font-medium text-[#334155] tabular-nums">
                      {plan.employees.length}
                    </div>
                    <div className="flex items-center justify-center border-l border-[#e5eceb] pl-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectPlan(plan.documentNo)
                        }}
                        aria-label={`ดูรายละเอียดแผนงาน ${plan.planName}`}
                        className="inline-flex h-8 w-11 cursor-pointer items-center justify-center rounded-full bg-[#1f7a70] text-white shadow-xs transition-colors hover:bg-[#176159] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {filteredPlans.length > 0 && (
        <PlannerPaginationBar
          currentPage={paginated.page}
          totalPages={paginated.totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
        />
      )}

      {/* Create Plan Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <form onSubmit={handleCreateSubmit}>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-[#1f7a70]">
                สร้างแผนงานใหม่
              </DialogTitle>
              <DialogDescription className="text-xs text-[#64748b]">
                กรอกรายละเอียดเบื้องต้นเพื่อสร้างเอกสารแผนงานและส่งต่อให้ฝ่าย GA
                ประมาณค่าใช้จ่าย
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="new-plan-name" className="text-xs font-medium">
                    ชื่อแผนงาน <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="new-plan-name"
                    value={planName}
                    onChange={(e) => {
                      setPlanName(e.target.value)
                      if (formError) setFormError(null)
                    }}
                    placeholder="เช่น แผนการเดินทาง 12"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-plan-project" className="text-xs font-medium">
                    โครงการ
                  </Label>
                  <Input
                    id="new-plan-project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="new-plan-location"
                    className="text-xs font-medium"
                  >
                    สถานที่ Onsite <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="new-plan-location"
                    value={locationName}
                    onChange={(e) => {
                      setLocationName(e.target.value)
                      if (formError) setFormError(null)
                    }}
                    placeholder="เช่น โรงพยาบาลพระราม 9"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-plan-dates" className="text-xs font-medium">
                    วันที่เดินทาง
                  </Label>
                  <Input
                    id="new-plan-dates"
                    value={travelDateRange}
                    onChange={(e) => setTravelDateRange(e.target.value)}
                    placeholder="DD/MM/YY - DD/MM/YY"
                    className="h-9 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-plan-province" className="text-xs font-medium">
                  จังหวัด
                </Label>
                <Input
                  id="new-plan-province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-plan-objective" className="text-xs font-medium">
                  วัตถุประสงค์ <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="new-plan-objective"
                  value={objective}
                  onChange={(e) => {
                    setObjective(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  placeholder="ระบุวัตถุประสงค์ในการเดินทางปฏิบัติงาน..."
                  className="min-h-20 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-plan-outcome" className="text-xs font-medium">
                  ผลลัพธ์ที่คาดหวัง
                </Label>
                <Input
                  id="new-plan-outcome"
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  placeholder="เช่น ส่งมอบระบบและสรุปรายงานครบถ้วน"
                  className="h-9 text-sm"
                />
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-[#dc2626]">
                  {formError}
                </p>
              )}
            </div>

            <DialogFooter className="mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="cursor-pointer text-xs"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-[#1f7a70] text-xs text-white hover:bg-[#176159]"
              >
                บันทึกแผนงาน
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
