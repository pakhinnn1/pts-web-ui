"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  AlertCircle,
  ChevronLeft,
  ChevronUp,
  Copy,
  Eye,
  Link2,
  MapPin,
  RotateCcw,
} from "lucide-react"
import {
  PastelBedRoomIcon,
  PastelCharacterAvatar,
  PastelEmployeesSectionIcon,
  PastelExpenseSectionIcon,
  PastelExtraReceiptIcon,
  PastelFuelExpenseIcon,
  PastelHotelIllustration,
  PastelImageAttachmentIcon,
  PastelJvCompanyIcon,
  PastelLateReturnFeeIcon,
  PastelOnsitePinIcon,
  PastelPlanSectionIcon,
  PastelRentalCarIllustration,
  PastelRouteDestinationPinIcon,
  PastelVanIllustration,
  type CharacterVariant,
} from "@/components/pastel-illustrations"
import { FlightExpenseSection } from "@/components/flight-expense-section"
import { getStatusToneBadgeClasses } from "@/components/planner-list-controls"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ACCOMMODATION_CASE_PRESETS,
  FLIGHT_CASE_PRESETS,
  RENTAL_CAR_CASE_PRESETS,
  VAN_CASE_PRESETS,
  type AccommodationCasePresetId,
  type FlightCasePresetId,
  type RentalCarCasePresetId,
  type RouteStop,
  type VanCasePresetId,
  type WorkPlan,
} from "@/lib/planner-data"
import {
  calculatePlanTotals,
  calculateRentalCarAdditionalTotal,
  calculateRoomAdditionalTotal,
  calculateVanTripAdditionalTotal,
  formatThaiCompactAmount,
  formatThaiCurrency,
  getStatusMeta,
} from "@/lib/planner-logic"
import { cn } from "@/lib/utils"

interface PlanDetailViewProps {
  plan: WorkPlan
  activeCasePreset?: AccommodationCasePresetId
  onSelectCasePreset?: (presetId: AccommodationCasePresetId) => void
  activeVanCasePreset?: VanCasePresetId
  onSelectVanCasePreset?: (presetId: VanCasePresetId) => void
  activeRentalCarCasePreset?: RentalCarCasePresetId
  onSelectRentalCarCasePreset?: (presetId: RentalCarCasePresetId) => void
  activeFlightCasePreset?: FlightCasePresetId
  onSelectFlightCasePreset?: (presetId: FlightCasePresetId) => void
  onBackToList: () => void
  onCancelPlan: (documentNo: string, reason: string) => string | undefined
  onRestorePlan: (documentNo: string) => void
  onShowToast?: (message: string) => void
}

const ACCOMMODATION_CASE_PRESET_ORDER: AccommodationCasePresetId[] = [
  "ga_single",
  "self_multi",
  "self_single",
]

const VAN_CASE_PRESET_ORDER: VanCasePresetId[] = [
  "van_overnight",
  "van_oneway_stops",
  "van_multi",
]

const RENTAL_CAR_CASE_PRESET_ORDER: RentalCarCasePresetId[] = [
  "rental_single",
  "rental_multi",
]

const FLIGHT_CASE_PRESET_ORDER: FlightCasePresetId[] = [
  "flight_one_way",
  "flight_round_trip",
  "flight_multi_city",
]

function getEmployeeCharacterVariant(code: string): CharacterVariant {
  switch (code) {
    case "61221":
      return "theerakh"
    case "61222":
      return "sasithorn"
    case "62125":
      return "kittikhun"
    case "63490":
      return "jirawat"
    default:
      return "farlada"
  }
}

export function PlanDetailView({
  plan,
  activeCasePreset,
  onSelectCasePreset,
  activeVanCasePreset,
  onSelectVanCasePreset,
  activeRentalCarCasePreset,
  onSelectRentalCarCasePreset,
  activeFlightCasePreset,
  onSelectFlightCasePreset,
  onBackToList,
  onCancelPlan,
  onRestorePlan,
  onShowToast,
}: PlanDetailViewProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)
  const [cancelReason, setCancelReason] = React.useState("")
  const [cancelError, setCancelError] = React.useState<string | null>(null)
  const [collapsedExtras, setCollapsedExtras] = React.useState<
    Record<string, boolean>
  >({})
  const [previewStop, setPreviewStop] = React.useState<RouteStop | null>(null)

  const statusMeta = getStatusMeta(plan.status, plan.jvApprovalProgress)
  const totals = calculatePlanTotals(plan)
  const vanTrips = plan.vanTrips ?? []
  const hasVanTrips = vanTrips.length > 0
  const rentalCars = plan.rentalCars ?? []
  const hasRentalCars = rentalCars.length > 0
  const flights = plan.flights ?? []
  const hasFlights = flights.length > 0
  const totalEstimateItems = hasVanTrips
    ? vanTrips.length
    : hasRentalCars
    ? rentalCars.length
    : hasFlights
    ? flights.length
    : plan.accommodations.length
  const showAccommodationCaseSwitcher =
    plan.documentNo === "2568100001" &&
    !!activeCasePreset &&
    !!onSelectCasePreset
  const showVanCaseSwitcher =
    plan.documentNo === "2568100004" &&
    !!activeVanCasePreset &&
    !!onSelectVanCasePreset
  const showRentalCarCaseSwitcher =
    plan.documentNo === "2568100005" &&
    !!activeRentalCarCasePreset &&
    !!onSelectRentalCarCasePreset
  const showFlightCaseSwitcher =
    plan.documentNo === "2568100006" &&
    !!activeFlightCasePreset &&
    !!onSelectFlightCasePreset

  const handleToggleAdditionalExpense = (itemKey: string) => {
    setCollapsedExtras((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }))
  }

  const handleSelectAccommodationPreset = (
    presetId: AccommodationCasePresetId
  ) => {
    setCollapsedExtras({})
    onSelectCasePreset?.(presetId)
  }

  const handleSelectVanPreset = (presetId: VanCasePresetId) => {
    setCollapsedExtras({})
    onSelectVanCasePreset?.(presetId)
  }

  const handleSelectRentalCarPreset = (presetId: RentalCarCasePresetId) => {
    setCollapsedExtras({})
    onSelectRentalCarCasePreset?.(presetId)
  }

  const handleSelectFlightPreset = (presetId: FlightCasePresetId) => {
    setCollapsedExtras({})
    onSelectFlightCasePreset?.(presetId)
  }

  const handleCopyStopLink = async (stop: RouteStop) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(stop.mapUrl)
      }
      onShowToast?.(`คัดลอกลิงก์พิกัด "${stop.placeName}" เรียบร้อยแล้ว`)
    } catch {
      onShowToast?.(`เตรียมลิงก์พิกัด "${stop.placeName}" เรียบร้อยแล้ว`)
    }
    setPreviewStop(null)
  }

  const handleOpenCancelDialog = () => {
    setCancelReason("")
    setCancelError(null)
    setCancelDialogOpen(true)
  }

  const handleConfirmCancel = (e: React.FormEvent) => {
    e.preventDefault()
    const error = onCancelPlan(plan.documentNo, cancelReason)
    if (error) {
      setCancelError(error)
      return
    }
    setCancelDialogOpen(false)
    setCancelReason("")
    setCancelError(null)
  }

  return (
    <div className="mx-auto w-full max-w-[1140px] px-4 py-6 sm:px-8 sm:py-7">
      {/* Page Title & Status Row */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBackToList}
          aria-label="กลับไปยังรายการแผนงาน"
          className="inline-flex size-8 items-center justify-center rounded-lg text-[#334155] transition-colors hover:bg-[#edf5f4] hover:text-[#1f7a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
        >
          <ChevronLeft className="size-5" />
        </button>

        <h1 className="text-xl font-bold tracking-tight text-[#1e293b] sm:text-[22px]">
          ดูรายละเอียดแผนงาน
        </h1>

        <span
          data-testid="plan-status-badge"
          className={cn(
            "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap",
            getStatusToneBadgeClasses(statusMeta.tone)
          )}
        >
          {statusMeta.label}
        </span>
      </div>

      {/* Document Number & Cancel/Restore Action Row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#eff3f3] pb-5">
        <div className="flex items-center gap-2 text-sm text-[#475569]">
          <span>เลขที่เอกสาร :</span>
          <span
            data-testid="plan-document-no"
            className="font-semibold text-[#1e293b] tabular-nums"
          >
            {plan.documentNo}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {plan.status === "cancelled" ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => onRestorePlan(plan.documentNo)}
              className="h-9 rounded-md border-[#1f7a70] px-4 text-xs font-medium text-[#1f7a70] hover:bg-[#edf6f4] hover:text-[#155d55]"
            >
              <RotateCcw className="mr-1.5 size-3.5" />
              กู้คืนแผนงาน
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleOpenCancelDialog}
              className="h-9 rounded-md border-[#6ea49e] bg-white px-5 text-[13px] font-medium text-[#1f7a70] hover:border-[#1f7a70] hover:bg-[#f1f8f7] hover:text-[#145e56]"
            >
              ยกเลิกแผนงาน
            </Button>
          )}
        </div>
      </div>

      {/* Cancelled Notice Banner (shown only when cancelled) */}
      {plan.status === "cancelled" && plan.cancellationReason && (
        <div
          role="status"
          className="mt-5 flex items-start gap-3 rounded-lg border border-[#f5c8c8] bg-[#fef5f5] px-4 py-3 text-sm text-[#9e2c2c]"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div className="space-y-0.5">
            <p className="font-semibold">แผนงานนี้ถูกยกเลิกแล้ว</p>
            <p className="text-xs text-[#7f2b2b]">
              เหตุผล: {plan.cancellationReason}
              {plan.cancelledAt ? ` · เมื่อ ${plan.cancelledAt}` : ""}
            </p>
          </div>
        </div>
      )}

      {/* Section 1: ข้อมูลแผนงาน */}
      <section aria-labelledby="section-plan-info" className="mt-6">
        <div className="flex items-center gap-2">
          <PastelPlanSectionIcon className="size-7" />
          <h2
            id="section-plan-info"
            className="text-[16px] font-semibold text-[#1f7a70]"
          >
            ข้อมูลแผนงาน
          </h2>
        </div>

        <div className="mt-3.5 flex items-center gap-2.5">
          <Checkbox
            id="has-expense-flag"
            checked={plan.hasExpense}
            disabled
            className="size-[18px] rounded-[4px] border-[#1f7a70] opacity-100 disabled:opacity-100 data-checked:border-[#1f7a70] data-checked:bg-[#1f7a70] data-checked:text-white"
          />
          <Label
            htmlFor="has-expense-flag"
            className="text-[13.5px] font-medium text-[#1e293b]"
          >
            แผนงานมีค่าใช้จ่าย
          </Label>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-[260px_1fr]">
          <div className="space-y-1">
            <p className="text-xs text-[#8a949e]">ชื่อแผนงาน</p>
            <p className="text-sm font-medium text-[#1e293b]">
              {plan.planName}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#8a949e]">วันที่ไป - กลับ</p>
            <p className="text-sm font-medium text-[#1e293b] tabular-nums">
              {plan.travelDateRange}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#8a949e]">วัตถุประสงค์</p>
            <p className="text-sm font-medium leading-relaxed text-[#1e293b]">
              {plan.objective}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#8a949e]">ผลลัพธ์ที่คาดหวัง</p>
            <p className="text-sm font-medium leading-relaxed text-[#1e293b]">
              {plan.expectedOutcome}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#8a949e]">โปรเจกต์</p>
            <p className="text-sm font-medium text-[#1e293b]">{plan.project}</p>
          </div>
        </div>
      </section>

      {/* Section 2: ข้อมูลพนักงาน */}
      <section aria-labelledby="section-employees" className="mt-9">
        <div className="flex items-center gap-2">
          <PastelEmployeesSectionIcon className="size-7" />
          <h2
            id="section-employees"
            className="text-[16px] font-semibold text-[#1f7a70]"
          >
            ข้อมูลพนักงาน
          </h2>
        </div>
        <p className="mt-2 text-[13px] font-medium text-[#334155]">
          ทั้งหมด {plan.employees.length} คน
        </p>

        <div className="mt-3.5 flex flex-wrap gap-4">
          {plan.employees.map((employee) => (
            <div
              key={employee.code}
              className="flex w-full flex-col items-center rounded-2xl border border-[#e3ecea] bg-[#fffefe] px-5 py-6 text-center shadow-[0_2px_10px_rgba(59,74,107,0.04)] sm:max-w-[232px]"
            >
              <PastelCharacterAvatar
                variant={getEmployeeCharacterVariant(employee.code)}
                className="size-[74px]"
              />
              <p className="mt-3.5 text-[13.5px] font-semibold text-[#1e293b]">
                {employee.code} {employee.name}
              </p>
              <p className="mt-1 text-xs text-[#86919c]">
                {employee.allowanceLabel}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: ข้อมูลที่อยู่สถานที่ Onsite */}
      <section aria-labelledby="section-onsite" className="mt-9">
        <div className="flex items-center gap-2">
          <PastelOnsitePinIcon className="size-7" />
          <h2
            id="section-onsite"
            className="text-[16px] font-semibold text-[#1f7a70]"
          >
            ข้อมูลที่อยู่สถานที่ Onsite
          </h2>
        </div>

        <div className="mt-3 space-y-6">
          {plan.onsiteLocations.map((loc) => (
            <div key={loc.id} className="space-y-4">
              <h3 className="text-sm font-semibold text-[#1e293b]">
                สถานที่ {loc.order}
              </h3>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">ชื่อสถานที่</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">เลขที่</p>
                  <p className="text-sm font-medium text-[#1e293b] tabular-nums">
                    {loc.addressNo}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">หมู่บ้าน / หมู่</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.villageOrMoo}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">ซอย</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.soi}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">ถนน</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.road}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">จังหวัด</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.province}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">เขต / อำเภอ</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.district}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">แขวง / ตำบล</p>
                  <p className="text-sm font-medium text-[#1e293b]">
                    {loc.subdistrict}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">รหัสไปรษณีย์</p>
                  <p className="text-sm font-medium text-[#1e293b] tabular-nums">
                    {loc.postalCode}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-[#8a949e]">
                    วันที่ไป-กลับสถานที่ Onsite
                  </p>
                  <p className="text-sm font-medium text-[#1e293b] tabular-nums">
                    {loc.dateRange}
                  </p>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <p className="text-xs text-[#8a949e]">
                    พนักงานที่ต้องไปปฏิบัติงาน
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {loc.assignedEmployees.map((emp) => (
                      <span
                        key={emp.code}
                        className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                      >
                        {emp.code} {emp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: ข้อมูล JV */}
      <section aria-labelledby="section-jv" className="mt-9">
        <div className="flex items-center gap-2">
          <PastelJvCompanyIcon className="size-7" />
          <h2
            id="section-jv"
            className="text-[16px] font-semibold text-[#1f7a70]"
          >
            ข้อมูล JV
          </h2>
        </div>
        <p className="mt-1.5 text-xs text-[#94a0ab]">
          ระบบจะคำนวณการรับผิดชอบค่าใช้จ่ายของแต่ละบริษัทให้อัตโนมัติ
        </p>
        <p className="mt-2.5 text-[13px] font-medium text-[#334155]">
          ทั้งหมด {plan.jvCompanies.length} บริษัท
        </p>

        <div className="mt-3.5 flex flex-wrap gap-4">
          {plan.jvCompanies.map((jv) => (
            <div
              key={jv.id}
              className="flex min-h-[144px] w-full flex-col justify-between rounded-2xl border border-[#e3ecea] bg-[#fffefe] p-4 shadow-[0_2px_10px_rgba(59,74,107,0.04)] sm:max-w-[232px]"
            >
              <div>
                <p className="text-[13.5px] font-semibold text-[#1e293b]">
                  {jv.companyName}
                </p>
                <p className="mt-3 text-xs text-[#8a949e]">ผู้อนุมัติ :</p>
                <p className="mt-1 text-[13px] text-[#334155]">
                  {jv.approverName}
                </p>
              </div>
              {plan.jvCompanies.length > 1 && (
                <p className="mt-3 text-[11.5px] font-medium text-[#1f7a70] tabular-nums">
                  สัดส่วนรับผิดชอบ {jv.sharePercent}%
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: ประมาณค่าใช้จ่าย */}
      <section aria-labelledby="section-estimate" className="mt-9 border-t border-[#eff3f3] pt-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <PastelExpenseSectionIcon className="size-7" />
              <h2
                id="section-estimate"
                className="text-[16px] font-semibold text-[#1f7a70]"
              >
                ประมาณค่าใช้จ่าย
              </h2>
            </div>
            <p className="mt-2 text-[13px] font-medium text-[#334155]">
              ทั้งหมด {totalEstimateItems} รายการ
            </p>
          </div>

          {/* Interactive 3-Case Switcher for Accommodation (Plan 2568100001) */}
          {showAccommodationCaseSwitcher && (
            <div
              role="tablist"
              aria-label="เลือกรูปแบบตัวอย่างรายการที่พัก"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#dce7e5] bg-[#f4f9f8] p-1"
            >
              {ACCOMMODATION_CASE_PRESET_ORDER.map((presetId) => {
                const preset = ACCOMMODATION_CASE_PRESETS[presetId]
                const isActive = activeCasePreset === presetId
                return (
                  <button
                    key={presetId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectAccommodationPreset(presetId)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                      isActive
                        ? "bg-[#1f7a70] text-white shadow-xs"
                        : "text-[#475569] hover:bg-white/80 hover:text-[#1f7a70]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Interactive 3-Case Switcher for Van Transport (Plan 2568100004) */}
          {showVanCaseSwitcher && (
            <div
              role="tablist"
              aria-label="เลือกรูปแบบตัวอย่างรายการรถตู้"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#dce7e5] bg-[#f4f9f8] p-1"
            >
              {VAN_CASE_PRESET_ORDER.map((presetId) => {
                const preset = VAN_CASE_PRESETS[presetId]
                const isActive = activeVanCasePreset === presetId
                return (
                  <button
                    key={presetId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectVanPreset(presetId)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                      isActive
                        ? "bg-[#1f7a70] text-white shadow-xs"
                        : "text-[#475569] hover:bg-white/80 hover:text-[#1f7a70]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}
          {/* Interactive 2-Case Switcher for Rental Car (Plan 2568100005) */}
          {showRentalCarCaseSwitcher && (
            <div
              role="tablist"
              aria-label="เลือกรูปแบบตัวอย่างรายการรถเช่า"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#dce7e5] bg-[#f4f9f8] p-1"
            >
              {RENTAL_CAR_CASE_PRESET_ORDER.map((presetId) => {
                const preset = RENTAL_CAR_CASE_PRESETS[presetId]
                const isActive = activeRentalCarCasePreset === presetId
                return (
                  <button
                    key={presetId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectRentalCarPreset(presetId)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                      isActive
                        ? "bg-[#1f7a70] text-white shadow-xs"
                        : "text-[#475569] hover:bg-white/80 hover:text-[#1f7a70]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Interactive 3-Case Switcher for Flight (Plan 2568100006) */}
          {showFlightCaseSwitcher && (
            <div
              role="tablist"
              aria-label="เลือกรูปแบบตัวอย่างรายการเครื่องบิน"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#dce7e5] bg-[#f4f9f8] p-1"
            >
              {FLIGHT_CASE_PRESET_ORDER.map((presetId) => {
                const preset = FLIGHT_CASE_PRESETS[presetId]
                const isActive = activeFlightCasePreset === presetId
                return (
                  <button
                    key={presetId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectFlightPreset(presetId)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]",
                      isActive
                        ? "bg-[#1f7a70] text-white shadow-xs"
                        : "text-[#475569] hover:bg-white/80 hover:text-[#1f7a70]"
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Grouped Van Transport Category Container (matches all 3 uploaded screenshots) */}
        {hasVanTrips && (
          <div className="mt-4 rounded-2xl border border-[#d6e2e0] bg-white p-5 sm:p-6">
            {/* Shared Category Header: รถตู้ */}
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef8f5] ring-1 ring-[#d6ebe4]"
                aria-hidden="true"
              >
                <PastelVanIllustration className="size-10" />
              </div>
              <span className="text-[15.5px] font-semibold text-[#1f7a70]">
                {vanTrips[0].categoryLabel}
              </span>
            </div>

            <div className="mt-4">
              {vanTrips.map((trip, tripIdx) => {
                const tripExtraKey = `${trip.id}-extra`
                const hasAdditional =
                  !!trip.additionalExpenses &&
                  trip.additionalExpenses.length > 0
                const tripAdditionalTotal =
                  calculateVanTripAdditionalTotal(trip)
                const isExpanded = !collapsedExtras[tripExtraKey]

                return (
                  <div
                    key={trip.id}
                    className={cn(
                      tripIdx > 0 &&
                        "mt-7 border-t border-dashed border-[#b9dcd6] pt-6"
                    )}
                  >
                    {/* Item Order & Optional Trip-Type Badge (ค้างคืน / เที่ยวเดียว) */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-[#1e293b]">
                        รายการที่ {trip.order}
                      </span>
                      {trip.tripTypeBadgeLabel && (
                        <span className="inline-flex items-center rounded-md bg-[#e5f5f2] px-3 py-1 text-xs font-medium text-[#1b7a6e]">
                          {trip.tripTypeBadgeLabel}
                        </span>
                      )}
                    </div>

                    {/* Metadata Grid matching overnight vs one-way/multi layouts */}
                    {trip.returnDateTime ? (
                      <div className="mt-3.5 space-y-3 text-[13.5px]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันและเวลาเดินทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {trip.departureDateTime}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันและเวลาเดินทางกลับ :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {trip.returnDateTime}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              จังหวัดต้นทาง - ปลายทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {trip.provinceRoute}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#7e8a95]">
                              พนักงานร่วมเดินทาง :
                            </span>
                            {trip.travelCompanions.map((companion) => (
                              <span
                                key={companion.code}
                                className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                              >
                                {companion.code} {companion.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">หมายเหตุ :</span>
                          <span className="font-medium text-[#1e293b]">
                            {trip.note}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3.5 space-y-3 text-[13.5px]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันและเวลาเดินทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {trip.departureDateTime}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              จังหวัดต้นทาง - ปลายทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {trip.provinceRoute}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#7e8a95]">
                            พนักงานร่วมเดินทาง :
                          </span>
                          {trip.travelCompanions.map((companion) => (
                            <span
                              key={companion.code}
                              className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                            >
                              {companion.code} {companion.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">หมายเหตุ :</span>
                          <span className="font-medium text-[#1e293b]">
                            {trip.note}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Route Plan Panel (รายละเอียดแผนการเดินทาง) */}
                    <div className="mt-4 rounded-xl border border-[#e7efef] bg-[#fcfefe] px-4 py-4 sm:px-5 sm:py-5">
                      <p className="text-[13px] font-semibold text-[#334155]">
                        รายละเอียดแผนการเดินทาง
                      </p>

                      <ol className="mt-4 space-y-0">
                        {trip.routeStops.map((stop, stopIdx) => {
                          const isLast = stopIdx === trip.routeStops.length - 1
                          const isDestination = stop.kind === "destination"

                          return (
                            <li
                              key={stop.id}
                              className="flex items-stretch gap-3"
                            >
                              {/* Vertical Node & Dashed Line Column */}
                              <div className="flex w-6 shrink-0 flex-col items-center">
                                {isDestination ? (
                                  <PastelRouteDestinationPinIcon className="size-6 shrink-0" />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-[#c2cece] bg-white"
                                  />
                                )}
                                {!isLast && (
                                  <span
                                    aria-hidden="true"
                                    className="my-1.5 min-h-[26px] w-px flex-1 border-l-[1.5px] border-dashed border-[#c5d1d1]"
                                  />
                                )}
                              </div>

                              {/* Stop Label & Interactive Location Link */}
                              <div
                                className={cn(
                                  "min-w-0 flex-1",
                                  !isLast && "pb-5"
                                )}
                              >
                                <p className="text-xs text-[#8a949e]">
                                  {stop.label}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setPreviewStop(stop)}
                                  className="mt-0.5 inline-flex items-center gap-1.5 text-left text-[13.5px] font-semibold text-[#1f7a70] underline decoration-[#1f7a70]/60 underline-offset-4 transition-colors hover:text-[#145e56] hover:decoration-[#145e56] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
                                >
                                  <span>{stop.placeName}</span>
                                  <Link2
                                    className="size-3.5 shrink-0 text-[#4a89c8]"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </li>
                          )
                        })}
                      </ol>
                    </div>

                    {/* Item Cost Footer (placed directly above Additional Expenses matching screenshots) */}
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-6 pt-1 text-[13.5px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">ราคาต่อคน :</span>
                        <span className="font-medium text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(trip.pricePerPerson)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">รวม :</span>
                        <span className="font-semibold text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(trip.itemTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Additional Expenses Block (ค่าใช้จ่ายเพิ่มเติม — Mint Container) */}
                    {hasAdditional && trip.additionalExpenses && (
                      <div className="mt-3.5 overflow-hidden rounded-xl border border-[#dfeeec] bg-[#edf7f6]">
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={`${tripExtraKey}-panel`}
                          onClick={() =>
                            handleToggleAdditionalExpense(tripExtraKey)
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#e3f2f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f7a70]"
                        >
                          <span className="flex items-center gap-2 text-[13.5px]">
                            <PastelFuelExpenseIcon className="size-6" />
                            <span className="font-semibold text-[#1b7a6e]">
                              ค่าใช้จ่ายเพิ่มเติม :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {formatThaiCompactAmount(tripAdditionalTotal)}
                            </span>
                          </span>

                          <ChevronUp
                            className={cn(
                              "size-4 shrink-0 text-[#1f7a70] transition-transform duration-200",
                              !isExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              id={`${tripExtraKey}-panel`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.18,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3">
                                <div className="rounded-lg border border-[#e6f0ee] bg-white px-4 py-3.5">
                                  <p className="text-[13px] font-semibold text-[#1e293b]">
                                    ทั้งหมด : {trip.additionalExpenses.length}{" "}
                                    รายการ
                                  </p>

                                  <div className="mt-2.5 divide-y divide-[#eef3f2]">
                                    {trip.additionalExpenses.map((expense) => (
                                      <div
                                        key={expense.id}
                                        className="py-3 first:pt-1 last:pb-0.5"
                                      >
                                        <p className="text-[13px] font-medium text-[#1e293b]">
                                          รายการที่ {expense.order}
                                        </p>

                                        <div className="mt-2 grid grid-cols-1 gap-3 text-[13px] md:grid-cols-2">
                                          <div className="flex flex-wrap items-baseline gap-1.5">
                                            <span className="text-[#7e8a95]">
                                              หมายเหตุ:
                                            </span>
                                            <span className="font-medium text-[#1e293b]">
                                              {expense.note}
                                            </span>
                                          </div>

                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[#7e8a95]">
                                              พนักงานร่วมห้องพัก :
                                            </span>
                                            {expense.roommates.map((mate) => (
                                              <span
                                                key={mate.code}
                                                className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                                              >
                                                {mate.code} {mate.name}
                                              </span>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="mt-2.5 flex justify-end text-[13.5px]">
                                          <span className="text-[#475569]">
                                            ราคา :{" "}
                                            <span className="font-semibold text-[#1e293b] tabular-nums">
                                              {formatThaiCurrency(
                                                expense.price
                                              )}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Grouped Rental Car Category Container (matches both uploaded รถเช่า screenshots) */}
        {!hasVanTrips && hasRentalCars && (
          <div
            data-testid="rental-car-section-card"
            className="mt-4 rounded-2xl border border-[#d6e2e0] bg-white p-5 sm:p-6"
          >
            {/* Shared Category Header: รถเช่า */}
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] ring-1 ring-[#d7eaf3]"
                aria-hidden="true"
              >
                <PastelRentalCarIllustration className="size-10" />
              </div>
              <span className="text-[15.5px] font-semibold text-[#1f7a70]">
                {rentalCars[0].categoryLabel}
              </span>
            </div>

            <div className="mt-4">
              {rentalCars.map((car, carIdx) => {
                const carExtraKey = `${car.id}-extra`
                const hasAdditional =
                  !!car.additionalExpenses && car.additionalExpenses.length > 0
                const carAdditionalTotal =
                  calculateRentalCarAdditionalTotal(car)
                const isExpanded = !collapsedExtras[carExtraKey]

                return (
                  <div
                    key={car.id}
                    data-testid={`rental-car-item-${car.order}`}
                    className={cn(
                      carIdx > 0 &&
                        "mt-7 border-t border-dashed border-[#b9dcd6] pt-6"
                    )}
                  >
                    {/* Item Order Heading */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-[#1e293b]">
                        รายการที่ {car.order}
                      </span>
                    </div>

                    {/* 3-Row Metadata Grid */}
                    <div className="mt-3.5 space-y-3 text-[13.5px]">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">สถานที่รับรถ :</span>
                          <span className="font-semibold text-[#1e293b]">
                            {car.pickupLocation}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">สถานที่คืนรถ :</span>
                          <span className="font-semibold text-[#1e293b]">
                            {car.returnLocation}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">
                            วันและเวลารับรถ :
                          </span>
                          <span className="font-semibold text-[#1e293b] tabular-nums">
                            {car.pickupDateTime}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">
                            วันและเวลาคืนรถ :
                          </span>
                          <span className="font-semibold text-[#1e293b] tabular-nums">
                            {car.returnDateTime}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#7e8a95]">
                            พนักงานผู้รับรถ :
                          </span>
                          <span className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]">
                            {car.driver.code} {car.driver.name}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#7e8a95]">
                            พนักงานร่วมเดินทาง :
                          </span>
                          {car.travelCompanions.map((companion) => (
                            <span
                              key={companion.code}
                              className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                            >
                              {companion.code} {companion.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Attachments Block (ไฟล์แนบเอกสาร) */}
                    {car.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[13px] text-[#7e8a95]">
                          ไฟล์แนบเอกสาร
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-3">
                          {car.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#e5ebea] bg-white px-4 py-3 shadow-[0_1px_4px_rgba(59,74,107,0.03)] sm:w-[272px]"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <PastelImageAttachmentIcon className="size-8 shrink-0" />
                                <span className="truncate text-[13px] font-medium text-[#1e293b]">
                                  {attachment.fileName}
                                </span>
                              </div>
                              <button
                                type="button"
                                aria-label={`ดาวน์โหลด ${attachment.fileName} (รายการที่ ${car.order})`}
                                onClick={() =>
                                  onShowToast?.(
                                    `กำลังดาวน์โหลดไฟล์ "${attachment.fileName}"...`
                                  )
                                }
                                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-[#1f7a70] transition-colors hover:bg-[#e8f5f3] hover:text-[#145e56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a70]"
                              >
                                <Eye className="size-[18px]" aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note Line */}
                    <div className="mt-4 flex flex-wrap items-baseline gap-1.5 text-[13.5px]">
                      <span className="text-[#7e8a95]">หมายเหตุ :</span>
                      <span className="font-medium text-[#1e293b]">
                        {car.note}
                      </span>
                    </div>

                    {/* Item Cost Footer (placed directly above Additional Expenses matching screenshots) */}
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-6 pt-1 text-[13.5px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">ราคาต่อคน :</span>
                        <span className="font-medium text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(car.pricePerPerson)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">รวม :</span>
                        <span className="font-semibold text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(car.itemTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Additional Expenses Block (ค่าใช้จ่ายเพิ่มเติม — Mint Container) */}
                    {hasAdditional && car.additionalExpenses && (
                      <div className="mt-3.5 overflow-hidden rounded-xl border border-[#dfeeec] bg-[#edf7f6]">
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={`${carExtraKey}-panel`}
                          onClick={() =>
                            handleToggleAdditionalExpense(carExtraKey)
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#e3f2f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f7a70]"
                        >
                          <span className="flex items-center gap-2 text-[13.5px]">
                            <PastelLateReturnFeeIcon className="size-6" />
                            <span className="font-semibold text-[#1b7a6e]">
                              ค่าใช้จ่ายเพิ่มเติม :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {formatThaiCompactAmount(carAdditionalTotal)}
                            </span>
                          </span>

                          <ChevronUp
                            className={cn(
                              "size-4 shrink-0 text-[#1f7a70] transition-transform duration-200",
                              !isExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              id={`${carExtraKey}-panel`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.18,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3">
                                <div className="rounded-lg border border-[#e6f0ee] bg-white px-4 py-3.5">
                                  <p className="text-[13px] font-semibold text-[#1e293b]">
                                    ทั้งหมด : {car.additionalExpenses.length}{" "}
                                    รายการ
                                  </p>

                                  <div className="mt-2.5 divide-y divide-[#eef3f2]">
                                    {car.additionalExpenses.map((expense) => (
                                      <div
                                        key={expense.id}
                                        className="py-3 first:pt-1 last:pb-0.5"
                                      >
                                        <p className="text-[13px] font-medium text-[#1e293b]">
                                          รายการที่ {expense.order}
                                        </p>

                                        <div className="mt-2 grid grid-cols-1 gap-3 text-[13px] md:grid-cols-2">
                                          <div className="flex flex-wrap items-baseline gap-1.5">
                                            <span className="text-[#7e8a95]">
                                              หมายเหตุ:
                                            </span>
                                            <span className="font-medium text-[#1e293b]">
                                              {expense.note}
                                            </span>
                                          </div>

                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[#7e8a95]">
                                              พนักงานร่วมห้องพัก :
                                            </span>
                                            {expense.roommates.map((mate) => (
                                              <span
                                                key={mate.code}
                                                className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                                              >
                                                {mate.code} {mate.name}
                                              </span>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="mt-2.5 flex justify-end text-[13.5px]">
                                          <span className="text-[#475569]">
                                            ราคา :{" "}
                                            <span className="font-semibold text-[#1e293b] tabular-nums">
                                              {formatThaiCurrency(
                                                expense.price
                                              )}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Grouped Flight Category Container (matches all 3 uploaded เครื่องบิน screenshots) */}
        {!hasVanTrips && !hasRentalCars && hasFlights && (
          <FlightExpenseSection
            documentNo={plan.documentNo}
            flights={flights}
            collapsedExtras={collapsedExtras}
            onToggleAdditionalExpense={handleToggleAdditionalExpense}
          />
        )}

        {/* Grouped Accommodation Category Container (for plans using accommodation items) */}
        {!hasVanTrips &&
          !hasRentalCars &&
          !hasFlights &&
          plan.accommodations.length > 0 && (
          <div className="mt-4 rounded-2xl border border-[#d6e2e0] bg-white p-5 sm:p-6">
            {/* Shared Category Header: ที่พัก */}
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f3f9fc] ring-1 ring-[#dcebf3]"
                aria-hidden="true"
              >
                <PastelHotelIllustration className="size-10" />
              </div>
              <span className="text-[15.5px] font-semibold text-[#1f7a70]">
                {plan.accommodations[0].categoryLabel}
              </span>
            </div>

            <div className="mt-4 divide-y divide-[#e6efed]">
              {plan.accommodations.map((item, itemIdx) => {
                const isSelfSelected = item.selectionMode === "self_selected"

                return (
                  <div
                    key={item.id}
                    className={cn(itemIdx > 0 && "mt-6 pt-6")}
                  >
                    {/* Item Order & Mode Badge */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-[#1e293b]">
                        รายการที่ {item.order}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-[#e5f5f2] px-3 py-1 text-xs font-medium text-[#1b7a6e]">
                        {item.gaBadgeLabel}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    {isSelfSelected ? (
                      <div className="mt-3.5 space-y-3 text-[13.5px]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">ชื่อที่พัก :</span>
                            <span className="font-semibold text-[#1e293b]">
                              {item.hotelName ?? "-"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              รูปแบบที่พัก :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {item.stayType}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันที่เช็คอิน - เช็คเอ้าท์ :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {item.checkInOutRange}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#7e8a95]">
                              พนักงานร่วมเดินทาง :
                            </span>
                            {item.travelCompanions.map((companion) => (
                              <span
                                key={companion.code}
                                className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                              >
                                {companion.code} {companion.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-[#7e8a95]">หมายเหตุ :</span>
                          <span className="font-medium text-[#1e293b]">
                            {item.note ?? "-"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3.5 space-y-3 text-[13.5px]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[#7e8a95]">
                              รูปแบบที่พัก :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {item.stayType}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันที่เช็คอิน - เช็คเอ้าท์ :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {item.checkInOutRange}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#7e8a95]">
                            พนักงานร่วมเดินทาง :
                          </span>
                          {item.travelCompanions.map((companion) => (
                            <span
                              key={companion.code}
                              className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                            >
                              {companion.code} {companion.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Room Breakdown Panel */}
                    <div className="mt-4 rounded-xl border border-[#e7efef] bg-[#fbfdfd] p-4">
                      <p className="text-[13px] font-medium text-[#334155]">
                        จำนวนห้องพักทั้งหมด : {item.totalRooms}
                      </p>

                      <div className="mt-3 space-y-3">
                        {item.rooms.map((room) => {
                          const roomKey = `${item.id}-room-${room.roomNumber}`
                          const hasAdditional =
                            !!room.additionalExpenses &&
                            room.additionalExpenses.length > 0
                          const roomAdditionalTotal =
                            calculateRoomAdditionalTotal(room)
                          const isExpanded = !collapsedExtras[roomKey]

                          return (
                            <div
                              key={room.roomNumber}
                              className="rounded-xl border border-[#ebf1f0] bg-white px-4 py-4"
                            >
                              <div className="flex items-center gap-2">
                                <PastelBedRoomIcon className="size-6" />
                                <p className="text-[13.5px] font-semibold text-[#1e293b]">
                                  ห้องที่ {room.roomNumber}
                                </p>
                              </div>

                              <div className="mt-2.5 grid grid-cols-1 gap-3 text-[13px] md:grid-cols-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#7e8a95]">
                                    ประเภทเตียง :
                                  </span>
                                  <span className="font-medium text-[#1e293b]">
                                    {room.bedType}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[#7e8a95]">
                                    พนักงานร่วมห้องพัก :
                                  </span>
                                  {room.roommates.map((mate) => (
                                    <span
                                      key={mate.code}
                                      className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                                    >
                                      {mate.code} {mate.name}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Collapsible Additional Expenses Block */}
                              {hasAdditional && room.additionalExpenses && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-[#e3efed] bg-white">
                                  <button
                                    type="button"
                                    aria-expanded={isExpanded}
                                    aria-controls={`${roomKey}-extra-panel`}
                                    onClick={() =>
                                      handleToggleAdditionalExpense(roomKey)
                                    }
                                    className="flex w-full items-center justify-between gap-3 bg-[#edf7f6] px-4 py-2.5 text-left transition-colors hover:bg-[#e3f2f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f7a70]"
                                  >
                                    <span className="flex items-center gap-2 text-[13.5px]">
                                      <PastelExtraReceiptIcon className="size-6" />
                                      <span className="font-semibold text-[#1b7a6e]">
                                        ค่าใช้จ่ายเพิ่มเติม :
                                      </span>
                                      <span className="font-semibold text-[#1e293b] tabular-nums">
                                        {formatThaiCompactAmount(
                                          roomAdditionalTotal
                                        )}
                                      </span>
                                    </span>

                                    <ChevronUp
                                      className={cn(
                                        "size-4 shrink-0 text-[#1f7a70] transition-transform duration-200",
                                        !isExpanded && "rotate-180"
                                      )}
                                    />
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        id={`${roomKey}-extra-panel`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                          opacity: 1,
                                          height: "auto",
                                        }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                          duration: 0.18,
                                          ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 py-3.5">
                                          <p className="text-[13px] font-semibold text-[#1e293b]">
                                            ทั้งหมด :{" "}
                                            {room.additionalExpenses.length}{" "}
                                            รายการ
                                          </p>

                                          <div className="mt-2.5 divide-y divide-[#eef3f2]">
                                            {room.additionalExpenses.map(
                                              (expense) => (
                                                <div
                                                  key={expense.id}
                                                  className="py-3 first:pt-1 last:pb-0.5"
                                                >
                                                  <p className="text-[13px] font-medium text-[#1e293b]">
                                                    รายการที่ {expense.order}
                                                  </p>

                                                  <div className="mt-2 grid grid-cols-1 gap-3 text-[13px] md:grid-cols-2">
                                                    <div className="flex flex-wrap items-baseline gap-1.5">
                                                      <span className="text-[#7e8a95]">
                                                        หมายเหตุ:
                                                      </span>
                                                      <span className="font-medium text-[#1e293b]">
                                                        {expense.note}
                                                      </span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2">
                                                      <span className="text-[#7e8a95]">
                                                        พนักงานร่วมห้องพัก :
                                                      </span>
                                                      {expense.roommates.map(
                                                        (mate) => (
                                                          <span
                                                            key={mate.code}
                                                            className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                                                          >
                                                            {mate.code}{" "}
                                                            {mate.name}
                                                          </span>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>

                                                  <div className="mt-2.5 flex justify-end text-[13.5px]">
                                                    <span className="text-[#475569]">
                                                      ราคา :{" "}
                                                      <span className="font-semibold text-[#1e293b] tabular-nums">
                                                        {formatThaiCurrency(
                                                          expense.price
                                                        )}
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Item Cost Footer */}
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-6 pt-1 text-[13.5px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">ราคาต่อคน :</span>
                        <span className="font-medium text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(item.pricePerPerson)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#7e8a95]">รวม :</span>
                        <span className="font-semibold text-[#1e293b] tabular-nums">
                          {formatThaiCurrency(item.itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Grand Totals Summary (Right-Aligned) */}
        <div
          data-testid="plan-totals-summary"
          className="mt-6 flex flex-col items-end gap-2.5 pr-1 text-[14.5px]"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#475569]">ค่าใช้จ่ายรวมทั้งหมด :</span>
            <span className="min-w-[96px] text-right font-bold text-[#1f7a70] tabular-nums">
              {formatThaiCurrency(totals.accommodationTotal)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#475569]">ค่าเบี้ยเลี้ยงรวม :</span>
            <span className="min-w-[96px] text-right font-bold text-[#1f7a70] tabular-nums">
              {formatThaiCurrency(totals.allowanceTotal)}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-0.5 text-[15.5px]">
            <span className="font-medium text-[#1e293b]">รวม :</span>
            <span className="min-w-[96px] text-right font-bold text-[#1f7a70] tabular-nums">
              {formatThaiCurrency(totals.grandTotal)}
            </span>
          </div>
        </div>
      </section>

      {/* Route Stop Location Detail Dialog */}
      <Dialog
        open={!!previewStop}
        onOpenChange={(open) => {
          if (!open) setPreviewStop(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          {previewStop && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3f0] ring-1 ring-[#f6d6cf]">
                    {previewStop.kind === "destination" ? (
                      <PastelRouteDestinationPinIcon className="size-8" />
                    ) : (
                      <PastelOnsitePinIcon className="size-8" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#1f7a70]">
                      {previewStop.label}
                    </p>
                    <DialogTitle className="mt-0.5 text-base leading-snug text-[#1e293b]">
                      {previewStop.placeName}
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="pt-2 text-left text-xs leading-relaxed text-[#5f6c78]">
                  {previewStop.addressSummary}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-lg border border-[#e5ebea] bg-[#f8fbfa] px-3.5 py-2.5 text-xs text-[#475569]">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0 text-[#1f7a70]" />
                  <span className="truncate font-mono text-[11.5px]">
                    {previewStop.mapUrl}
                  </span>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPreviewStop(null)}
                >
                  ปิดหน้าต่าง
                </Button>
                <Button
                  type="button"
                  onClick={() => handleCopyStopLink(previewStop)}
                  className="bg-[#1f7a70] text-white hover:bg-[#17645c]"
                >
                  <Copy className="mr-1.5 size-3.5" />
                  คัดลอกลิงก์แผนที่
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Plan Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการยกเลิกแผนงาน</DialogTitle>
            <DialogDescription>
              คุณต้องการยกเลิกแผนงานเลขที่เอกสาร {plan.documentNo} ({plan.planName})
              ใช่หรือไม่ กรุณาระบุเหตุผลเพื่อบันทึกในระบบ
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmCancel} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancel-reason-input">เหตุผลการยกเลิก</Label>
              <Textarea
                id="cancel-reason-input"
                value={cancelReason}
                onChange={(e) => {
                  setCancelReason(e.target.value)
                  if (cancelError) setCancelError(null)
                }}
                placeholder="เช่น ลูกค้าขอเลื่อนกำหนดการนำเสนองาน"
                rows={3}
                aria-invalid={!!cancelError}
              />
              {cancelError && (
                <p role="alert" className="text-xs font-medium text-[#c53a3a]">
                  {cancelError}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
              >
                ปิดหน้าต่าง
              </Button>
              <Button
                type="submit"
                className="bg-[#d94646] text-white hover:bg-[#c03939]"
              >
                ยืนยันยกเลิกแผนงาน
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
