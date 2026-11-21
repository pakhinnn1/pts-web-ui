"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import {
  PastelCalendarKpiIcon,
  PastelClockKpiIcon,
  PastelEmployeesSectionIcon,
  PastelExpenseSectionIcon,
} from "@/components/pastel-illustrations"
import { Button } from "@/components/ui/button"
import type { WorkPlan } from "@/lib/planner-data"
import {
  calculatePlanTotals,
  computeDashboardMetrics,
  formatThaiCurrency,
  getStatusMeta,
} from "@/lib/planner-logic"
import { getStatusToneBadgeClasses } from "@/components/planner-list-controls"
import { cn } from "@/lib/utils"

interface DashboardViewProps {
  plans: WorkPlan[]
  onOpenPlan: (documentNo: string) => void
  onOpenBudget: () => void
  onOpenAllPlans: () => void
}

export function DashboardView({
  plans,
  onOpenPlan,
  onOpenBudget,
  onOpenAllPlans,
}: DashboardViewProps) {
  const metrics = computeDashboardMetrics(plans)

  const kpis = [
    {
      label: "แผนงานทั้งหมด",
      value: `${metrics.totalPlans} เอกสาร`,
      sub: `อนุมัติแล้ว ${metrics.approvedCount} · ยกเลิก ${metrics.cancelledCount}`,
      Icon: PastelCalendarKpiIcon,
      chipBg: "bg-[#fff4f1]",
    },
    {
      label: "รอ GA ประมาณค่าใช้จ่าย",
      value: `${metrics.pendingGaCount} รายการ`,
      sub: "ต้องตรวจสอบและยืนยันค่ารถตู้ รถเช่า และที่พัก",
      Icon: PastelClockKpiIcon,
      chipBg: "bg-[#fff8e7]",
    },
    {
      label: "งบประมาณรวมที่ใช้งาน",
      value: `฿${formatThaiCurrency(metrics.totalEstimatedBudget)}`,
      sub: "ไม่รวมเอกสารที่ยกเลิกแล้ว",
      Icon: PastelExpenseSectionIcon,
      chipBg: "bg-[#eef9f5]",
    },
    {
      label: "พนักงานปฏิบัติงาน Onsite",
      value: `${metrics.totalOnsiteEmployees} คน`,
      sub: "ผู้เดินทางในแผนงานรอบปัจจุบัน",
      Icon: PastelEmployeesSectionIcon,
      chipBg: "bg-[#eef6fc]",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1140px] px-4 py-6 sm:px-8 sm:py-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1e293b] sm:text-[22px]">
            ภาพรวมระบบ Planner Tag System
          </h1>
          <p className="mt-1 text-xs text-[#7a8692]">
            สรุปสถานะแผนงาน Onsite การประมาณการค่าใช้จ่ายโดย GA
            และพนักงานที่ได้รับมอบหมาย
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenAllPlans}
            className="h-9 border-[#6ea49e] text-xs font-medium text-[#1f7a70] hover:bg-[#edf6f4]"
          >
            ดูรายการแผนงานทั้งหมด
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onOpenBudget}
            className="h-9 bg-[#1f7a70] text-xs font-medium text-white hover:bg-[#17645c]"
          >
            จัดการงบประมาณ GA
          </Button>
        </div>
      </div>

      {/* 4-Column KPI Row */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Illustration = kpi.Icon
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-[#e3ecea] bg-white p-5 shadow-[0_2px_10px_rgba(59,74,107,0.03)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#7a8692]">
                  {kpi.label}
                </span>
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    kpi.chipBg
                  )}
                >
                  <Illustration className="size-8" />
                </span>
              </div>
              <p className="mt-2.5 text-xl font-bold text-[#1e293b] tabular-nums">
                {kpi.value}
              </p>
              <p className="mt-1 text-[11.5px] text-[#85929d]">{kpi.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Plans */}
      <section aria-labelledby="recent-plans-heading" className="mt-8">
        <div className="flex items-center justify-between">
          <h2
            id="recent-plans-heading"
            className="text-[16px] font-semibold text-[#1f7a70]"
          >
            แผนงานล่าสุด
          </h2>
          <button
            type="button"
            onClick={onOpenAllPlans}
            className="text-xs font-medium text-[#1f7a70] hover:underline"
          >
            ทั้งหมด ({plans.length})
          </button>
        </div>

        <div className="mt-3.5 divide-y divide-[#eef3f2] rounded-xl border border-[#e5ebea] bg-white">
          {plans.slice(0, 8).map((plan) => {
            const status = getStatusMeta(plan.status, plan.jvApprovalProgress)
            const totals = calculatePlanTotals(plan)
            const loc = plan.onsiteLocations[0]

            return (
              <div
                key={plan.documentNo}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#1f7a70] tabular-nums">
                      {plan.documentNo}
                    </span>
                    <span className="text-sm font-semibold text-[#1e293b]">
                      {plan.planName}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
                        getStatusToneBadgeClasses(status.tone)
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#7a8692]">
                    {plan.project} · {plan.travelDateRange}
                    {loc ? ` · ${loc.name}` : ""}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="text-right">
                    <p className="text-[11px] text-[#8a949e]">ยอดรวมประมาณการ</p>
                    <p className="font-mono text-sm font-bold text-[#1f7a70] tabular-nums">
                      {formatThaiCurrency(totals.grandTotal)} บาท
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenPlan(plan.documentNo)}
                    className="h-8 border-[#cfe0de] text-xs text-[#1f7a70] hover:bg-[#edf6f4]"
                  >
                    เปิดดู
                    <ArrowRight className="ml-1 size-3.5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
