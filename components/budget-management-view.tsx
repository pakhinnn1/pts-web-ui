"use client"

import * as React from "react"
import { Eye, Search, X } from "lucide-react"
import {
  PastelCalendarClockMiniIcon,
  PastelDocMiniIcon,
  PastelKpiAllChartIllustration,
  PastelKpiCancelledIllustration,
  PastelKpiCompletedIllustration,
  PastelKpiPendingReviewIllustration,
  PastelKpiRejectedIllustration,
  PastelLocationMiniIcon,
  PastelPeopleMiniIcon,
  PastelPlanSectionIcon,
  PastelReviewerMiniIcon,
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
import type { BudgetAnalysisStatus, WorkPlan } from "@/lib/planner-data"
import {
  computeBudgetReviewMetrics,
  filterBudgetPlans,
  getBudgetStatusMeta,
  orderPlansForBudgetView,
  paginateItems,
  type BudgetKpiFilter,
} from "@/lib/planner-logic"
import { cn } from "@/lib/utils"

interface BudgetManagementViewProps {
  plans: WorkPlan[]
  initialSelectedDocNo?: string
  onUpdateEstimate?: (
    documentNo: string,
    input: {
      pricePerPerson: number
      itemTotal: number
      allowanceTotal: number
      markApproved: boolean
    }
  ) => string | undefined
  onViewPlanDetail: (documentNo: string) => void
}

export function BudgetManagementView({
  plans,
  onViewPlanDetail,
}: BudgetManagementViewProps) {
  const [kpiFilter, setKpiFilter] = React.useState<BudgetKpiFilter>("all")
  const [analysisFilter, setAnalysisFilter] = React.useState<
    BudgetAnalysisStatus | "all"
  >("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(6)

  const orderedPlans = React.useMemo(
    () => orderPlansForBudgetView(plans),
    [plans]
  )
  const metrics = React.useMemo(
    () => computeBudgetReviewMetrics(plans),
    [plans]
  )

  const filteredPlans = React.useMemo(
    () =>
      filterBudgetPlans(orderedPlans, {
        searchQuery,
        startDate,
        endDate,
        kpiFilter,
        analysisFilter,
      }),
    [orderedPlans, searchQuery, startDate, endDate, kpiFilter, analysisFilter]
  )

  const paginated = React.useMemo(
    () => paginateItems(filteredPlans, currentPage, pageSize),
    [filteredPlans, currentPage, pageSize]
  )

  const hasActiveFilters =
    kpiFilter !== "all" ||
    analysisFilter !== "all" ||
    searchQuery.trim() !== "" ||
    startDate.trim() !== "" ||
    endDate.trim() !== ""

  const handleResetFilters = () => {
    setKpiFilter("all")
    setAnalysisFilter("all")
    setSearchQuery("")
    setStartDate("")
    setEndDate("")
    setCurrentPage(1)
  }

  const handleSelectKpi = (target: BudgetKpiFilter) => {
    if (target === "all") {
      setKpiFilter("all")
      setAnalysisFilter("all")
    } else if (kpiFilter === target && analysisFilter === "all") {
      setKpiFilter("all")
    } else {
      setKpiFilter(target)
      setAnalysisFilter("all")
    }
    setCurrentPage(1)
  }

  const handleSelectAnalysisSubFilter = (
    e: React.MouseEvent,
    sub: BudgetAnalysisStatus
  ) => {
    e.stopPropagation()
    if (kpiFilter === "completed" && analysisFilter === sub) {
      setAnalysisFilter("all")
    } else {
      setKpiFilter("completed")
      setAnalysisFilter(sub)
    }
    setCurrentPage(1)
  }

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    if (mode === "table" && pageSize === 6) {
      setPageSize(10)
      setCurrentPage(1)
    } else if (mode === "grid" && pageSize === 10) {
      setPageSize(6)
      setCurrentPage(1)
    }
  }

  const activeKpiLabel =
    analysisFilter === "waiting_analysis"
      ? "เสร็จสิ้น · รอวิเคราะห์"
      : analysisFilter === "analyzed"
      ? "เสร็จสิ้น · วิเคราะห์แล้ว"
      : kpiFilter === "pending"
      ? "รอดำเนินการ"
      : kpiFilter === "completed"
      ? "เสร็จสิ้น"
      : kpiFilter === "jv_rejected"
      ? "JV ปฏิเสธ"
      : kpiFilter === "cancelled"
      ? "ยกเลิกแผนงาน"
      : null

  return (
    <div
      data-testid="budget-review-view"
      className="mx-auto w-full max-w-[1220px] px-5 py-6 sm:px-8 sm:py-7"
    >
      {/* Page Heading */}
      <h1 className="text-[21px] font-bold tracking-tight text-[#1e293b]">
        ตรวจสอบประมาณค่าใช้จ่าย
      </h1>

      {/* 5 Interactive KPI Summary Cards (4 + 1 Layout on Desktop) */}
      <div
        data-testid="budget-kpi-grid"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* KPI 1: ทั้งหมด */}
        <button
          type="button"
          onClick={() => handleSelectKpi("all")}
          aria-pressed={kpiFilter === "all"}
          data-testid="kpi-card-all"
          className={cn(
            "relative flex h-[112px] cursor-pointer items-center justify-between overflow-hidden rounded-2xl border bg-white py-4 pr-4 pl-6 text-left shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-all hover:border-[#1f7a70]/45 hover:shadow-[0_6px_20px_rgba(31,122,112,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
            kpiFilter === "all" && analysisFilter === "all"
              ? "border-[#e8f0ef]"
              : "border-[#eef2f1] opacity-85 hover:opacity-100"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-[#1f7a70]"
          />
          <div>
            <p className="text-[13px] font-medium text-[#374151]">ทั้งหมด</p>
            <p
              data-testid="kpi-count-all"
              className="mt-2 text-[26px] font-bold leading-none text-[#1f7a70] tabular-nums"
            >
              {metrics.total}
            </p>
          </div>
          <PastelKpiAllChartIllustration className="size-15 shrink-0" />
        </button>

        {/* KPI 2: รอดำเนินการ */}
        <button
          type="button"
          onClick={() => handleSelectKpi("pending")}
          aria-pressed={kpiFilter === "pending"}
          data-testid="kpi-card-pending"
          className={cn(
            "relative flex h-[112px] cursor-pointer items-center justify-between overflow-hidden rounded-2xl border bg-white py-4 pr-4 pl-6 text-left shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-all hover:border-[#f5b400]/60 hover:shadow-[0_6px_20px_rgba(245,180,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b400]",
            kpiFilter === "pending"
              ? "border-[#f5b400] ring-2 ring-[#f5b400]/25"
              : "border-[#eef2f1]"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-[#f5b400]"
          />
          <div>
            <p className="text-[13px] font-medium text-[#374151]">รอดำเนินการ</p>
            <p
              data-testid="kpi-count-pending"
              className="mt-2 text-[26px] font-bold leading-none text-[#f5b400] tabular-nums"
            >
              {metrics.pending}
            </p>
          </div>
          <PastelKpiPendingReviewIllustration className="size-15 shrink-0" />
        </button>

        {/* KPI 3: เสร็จสิ้น (with single-line รอวิเคราะห์ | วิเคราะห์แล้ว split sub-row) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSelectKpi("completed")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleSelectKpi("completed")
            }
          }}
          aria-pressed={kpiFilter === "completed"}
          data-testid="kpi-card-completed"
          className={cn(
            "relative flex h-[112px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-white pt-3 pr-3 pb-2.5 pl-5 text-left shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-all hover:border-[#1d78d8]/55 hover:shadow-[0_6px_20px_rgba(29,120,216,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d78d8]",
            kpiFilter === "completed"
              ? "border-[#1d78d8] ring-2 ring-[#1d78d8]/25"
              : "border-[#eef2f1]"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-[#1d78d8]"
          />
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[13px] font-medium text-[#374151]">เสร็จสิ้น</p>
              <p
                data-testid="kpi-count-completed"
                className="mt-1 text-[26px] font-bold leading-none text-[#1d78d8] tabular-nums"
              >
                {metrics.completed}
              </p>
            </div>
            <PastelKpiCompletedIllustration className="size-13 shrink-0" />
          </div>

          <div className="flex flex-nowrap items-center gap-1.5 border-t border-[#f1f5f9] pt-1.5 text-[10.5px] leading-none whitespace-nowrap">
            <button
              type="button"
              onClick={(e) =>
                handleSelectAnalysisSubFilter(e, "waiting_analysis")
              }
              data-testid="kpi-sub-waiting-analysis"
              className={cn(
                "cursor-pointer rounded px-1 py-0.5 transition-colors hover:bg-[#eaf3fe]",
                analysisFilter === "waiting_analysis"
                  ? "bg-[#e0eeff] font-semibold text-[#1d78d8]"
                  : "text-[#4b5563]"
              )}
            >
              รอวิเคราะห์{" "}
              <span className="font-semibold text-[#1d78d8] tabular-nums">
                {metrics.waitingAnalysis} รายการ
              </span>
            </button>
            <span aria-hidden="true" className="text-[#cbd5e1]">
              |
            </span>
            <button
              type="button"
              onClick={(e) => handleSelectAnalysisSubFilter(e, "analyzed")}
              data-testid="kpi-sub-analyzed"
              className={cn(
                "cursor-pointer rounded px-1 py-0.5 transition-colors hover:bg-[#eaf3fe]",
                analysisFilter === "analyzed"
                  ? "bg-[#e0eeff] font-semibold text-[#1d78d8]"
                  : "text-[#4b5563]"
              )}
            >
              วิเคราะห์แล้ว{" "}
              <span className="font-semibold text-[#1d78d8] tabular-nums">
                {metrics.analyzed} รายการ
              </span>
            </button>
          </div>
        </div>

        {/* KPI 4: JV ปฏิเสธ */}
        <button
          type="button"
          onClick={() => handleSelectKpi("jv_rejected")}
          aria-pressed={kpiFilter === "jv_rejected"}
          data-testid="kpi-card-rejected"
          className={cn(
            "relative flex h-[112px] cursor-pointer items-center justify-between overflow-hidden rounded-2xl border bg-white py-4 pr-4 pl-6 text-left shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-all hover:border-[#ef1f1f]/55 hover:shadow-[0_6px_20px_rgba(239,31,31,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef1f1f]",
            kpiFilter === "jv_rejected"
              ? "border-[#ef1f1f] ring-2 ring-[#ef1f1f]/25"
              : "border-[#eef2f1]"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-[#ef1f1f]"
          />
          <div>
            <p className="text-[13px] font-medium text-[#374151]">JV ปฏิเสธ</p>
            <p
              data-testid="kpi-count-rejected"
              className="mt-2 text-[26px] font-bold leading-none text-[#ef1f1f] tabular-nums"
            >
              {metrics.jvRejected}
            </p>
          </div>
          <PastelKpiRejectedIllustration className="size-15 shrink-0" />
        </button>

        {/* KPI 5: ยกเลิกแผนงาน (Row 2, Col 1 on lg+) */}
        <button
          type="button"
          onClick={() => handleSelectKpi("cancelled")}
          aria-pressed={kpiFilter === "cancelled"}
          data-testid="kpi-card-cancelled"
          className={cn(
            "relative flex h-[112px] cursor-pointer items-center justify-between overflow-hidden rounded-2xl border bg-white py-4 pr-4 pl-6 text-left shadow-[0_3px_14px_rgba(15,23,42,0.06)] transition-all hover:border-[#94a3b8] hover:shadow-[0_6px_20px_rgba(100,116,139,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94a3b8]",
            kpiFilter === "cancelled"
              ? "border-[#64748b] ring-2 ring-[#94a3b8]/35"
              : "border-[#eef2f1]"
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-[#9ca3af]"
          />
          <div>
            <p className="text-[13px] font-medium text-[#374151]">
              ยกเลิกแผนงาน
            </p>
            <p
              data-testid="kpi-count-cancelled"
              className="mt-2 text-[26px] font-bold leading-none text-[#6b7280] tabular-nums"
            >
              {metrics.cancelled}
            </p>
          </div>
          <PastelKpiCancelledIllustration className="size-15 shrink-0" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mt-6 grid grid-cols-1 items-end gap-3.5 md:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)_auto]">
        {/* Search Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="budget-search-input"
            className="block text-[13px] font-medium text-[#374151]"
          >
            ค้นหาชื่อแผนงาน / เลขที่เอกสาร
          </label>
          <div className="relative flex items-center">
            <input
              id="budget-search-input"
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
          <div className="grid grid-cols-2 gap-3">
            <ThaiDateInput
              id="budget-start-date"
              value={startDate}
              onChange={(val) => {
                setStartDate(val)
                setCurrentPage(1)
              }}
              ariaLabel="วันที่เริ่มต้นตรวจสอบงบประมาณ"
            />
            <ThaiDateInput
              id="budget-end-date"
              value={endDate}
              onChange={(val) => {
                setEndDate(val)
                setCurrentPage(1)
              }}
              ariaLabel="วันที่สิ้นสุดตรวจสอบงบประมาณ"
            />
          </div>
        </div>

        {/* Reset Filter Button */}
        <div className="flex items-center md:justify-end">
          <button
            type="button"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            data-testid="budget-reset-filters"
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

      {/* Summary Row & View Mode Toggle */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[13.5px] font-semibold text-[#1f2937]">
            ทั้งหมด{" "}
            <span
              data-testid="budget-filtered-count"
              className="text-[#1f7a70] tabular-nums"
            >
              {filteredPlans.length} รายการ
            </span>
          </p>

          {activeKpiLabel && (
            <button
              type="button"
              onClick={() => {
                setKpiFilter("all")
                setAnalysisFilter("all")
                setCurrentPage(1)
              }}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#e8f4f2] px-3 py-0.5 text-xs font-medium text-[#1f7a70] transition-colors hover:bg-[#d8ece9]"
            >
              <span>ตัวกรอง: {activeKpiLabel}</span>
              <X className="size-3" />
            </button>
          )}
        </div>

        <ViewModeSwitcher value={viewMode} onChange={handleChangeViewMode} />
      </div>

      {/* Empty State */}
      {paginated.items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfe2df] bg-[#f8fbfb] px-6 py-14 text-center">
          <PastelPlanSectionIcon className="size-16" sticker />
          <p className="mt-3 text-sm font-semibold text-[#1e293b]">
            ไม่พบรายการตรวจสอบประมาณค่าใช้จ่ายที่ตรงกับเงื่อนไข
          </p>
          <p className="mt-1 text-xs text-[#64748b]">
            ลองล้างตัวกรองหรือเลือกหมวดหมู่ KPI อื่นเพื่อดูรายการทั้งหมด
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
        /* 2-Column Budget Review Card Grid (Matches Image 2) */
        <div
          data-testid="budget-cards-grid"
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {paginated.items.map((plan) => {
            const budgetStatus = getBudgetStatusMeta(plan)
            const reasonText =
              budgetStatus.category === "jv_rejected"
                ? plan.rejectionReason
                : plan.cancellationReason
            const reasonTitle =
              budgetStatus.category === "jv_rejected"
                ? "เหตุผลที่ JV ปฏิเสธ"
                : "เหตุผลการยกเลิกแผนงาน"

            return (
              <div
                key={plan.documentNo}
                onClick={() => onViewPlanDetail(plan.documentNo)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onViewPlanDetail(plan.documentNo)
                  }
                }}
                role="button"
                tabIndex={0}
                data-testid={`budget-card-${plan.documentNo}`}
                className="group flex cursor-pointer flex-col justify-between rounded-xl border border-[#e6efed] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.035)] transition-all hover:border-[#2a8b81] hover:shadow-[0_4px_16px_rgba(31,122,112,0.09)] focus-visible:border-[#1f7a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]/25"
              >
                <div>
                  {/* Card Top: Plan Title + Budget Review Status Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-[15px] font-semibold text-[#1f7a70] transition-colors group-hover:text-[#155e56]">
                      {plan.planName}
                    </h2>
                    <PlanStatusBadge
                      label={budgetStatus.label}
                      tone={budgetStatus.tone}
                      hasInfoReason={budgetStatus.hasInfoReason}
                      reasonTitle={reasonTitle}
                      reasonText={reasonText}
                      reasonDate={plan.cancelledAt ?? plan.reviewedAt}
                    />
                  </div>

                  {/* Metadata Rows (Conditional Reviewer & Review Timestamp when assigned) */}
                  <dl className="mt-4 space-y-2.5 text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <PastelDocMiniIcon className="size-5 shrink-0" />
                      <dt className="shrink-0 text-[#4b5563]">เลขที่เอกสาร :</dt>
                      <dd className="font-medium text-[#1f2937] tabular-nums">
                        {plan.documentNo}
                      </dd>
                    </div>

                    {plan.reviewerName && (
                      <div className="flex items-center gap-2.5">
                        <PastelReviewerMiniIcon className="size-5 shrink-0" />
                        <dt className="shrink-0 text-[#4b5563]">ผู้ตรวจสอบ :</dt>
                        <dd className="font-medium text-[#1f2937]">
                          {plan.reviewerName}
                        </dd>
                      </div>
                    )}

                    {plan.reviewedAt && (
                      <div className="flex items-center gap-2.5">
                        <PastelCalendarClockMiniIcon className="size-5 shrink-0" />
                        <dt className="shrink-0 text-[#4b5563]">
                          วันเวลาตรวจสอบ :
                        </dt>
                        <dd className="font-medium text-[#1f2937] tabular-nums">
                          {plan.reviewedAt}
                        </dd>
                      </div>
                    )}

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

                {/* Bottom-Right View Detail CTA */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewPlanDetail(plan.documentNo)
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
        /* Horizontally Scrollable Separated Pill-Row Table View (Matches Image 3) */
        <div
          data-testid="budget-table-view"
          className="mt-5 overflow-x-auto pb-2"
        >
          <div className="min-w-[980px]">
            {/* Table Column Headers */}
            <div className="grid grid-cols-[1.5fr_1.15fr_1.2fr_1fr_1.35fr_1.15fr_84px] items-center gap-3 border-b border-[#e5eceb] px-4 py-3 text-[13px] font-semibold text-[#1f7a70]">
              <div>ชื่อแผนงาน</div>
              <div className="flex items-center gap-1.5">
                <PastelReviewerMiniIcon className="size-4 shrink-0" />
                <span>ผู้ตรวจสอบ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PastelCalendarClockMiniIcon className="size-4 shrink-0" />
                <span>วันเวลาตรวจสอบ</span>
              </div>
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
              <div className="text-center">จัดการ</div>
            </div>

            {/* Separated Rounded Pill Rows */}
            <div className="mt-3 space-y-2.5">
              {paginated.items.map((plan, idx) => (
                <div
                  key={plan.documentNo}
                  onClick={() => onViewPlanDetail(plan.documentNo)}
                  data-testid={`budget-table-row-${plan.documentNo}`}
                  className={cn(
                    "grid cursor-pointer grid-cols-[1.5fr_1.15fr_1.2fr_1fr_1.35fr_1.15fr_84px] items-center gap-3 rounded-xl border px-4 py-3 text-[13px] transition-all hover:border-[#1f7a70] hover:bg-white hover:shadow-[0_2px_10px_rgba(31,122,112,0.09)]",
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
                  <div className="truncate text-[#334155]">
                    {plan.reviewerName ?? "-"}
                  </div>
                  <div className="text-[#334155] tabular-nums">
                    {plan.reviewedAt ?? "-"}
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
                  <div className="flex items-center justify-center border-l border-[#e5eceb] pl-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewPlanDetail(plan.documentNo)
                      }}
                      aria-label={`ดูรายละเอียดประมาณค่าใช้จ่าย ${plan.planName}`}
                      data-testid={`budget-table-eye-${plan.documentNo}`}
                      className="inline-flex h-8 w-11 cursor-pointer items-center justify-center rounded-full bg-[#1f7a70] text-white shadow-xs transition-colors hover:bg-[#176159] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
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
    </div>
  )
}
