import {
  ACCOMMODATION_CASE_PRESETS,
  FLIGHT_CASE_PRESETS,
  RENTAL_CAR_CASE_PRESETS,
  VAN_CASE_PRESETS,
  type AccommodationCasePresetId,
  type AccommodationItem,
  type BudgetAnalysisStatus,
  type FlightCasePresetId,
  type FlightItem,
  type PlanStatus,
  type RentalCarCasePresetId,
  type RentalCarItem,
  type RoomDetail,
  type VanCasePresetId,
  type VanTripItem,
  type WorkPlan,
} from "./planner-data"

export type StatusBadgeTone =
  | "slate"
  | "amber"
  | "yellow"
  | "green"
  | "blue"
  | "red"
  | "gray"
  | "teal"

export type BudgetCategory = "pending" | "completed" | "jv_rejected" | "cancelled"
export type BudgetKpiFilter = "all" | BudgetCategory

export interface BudgetReviewMetrics {
  total: number
  pending: number
  completed: number
  waitingAnalysis: number
  analyzed: number
  jvRejected: number
  cancelled: number
}

export interface PlannerPendingCounts {
  draftCount: number
  waitingSummaryCount: number
}

export interface PaginatedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface PlanTotals {
  roomSubtotal: number
  vanSubtotal: number
  rentalCarSubtotal: number
  flightSubtotal: number
  additionalExpensesTotal: number
  accommodationTotal: number
  allowanceTotal: number
  grandTotal: number
}

export interface DashboardMetrics {
  totalPlans: number
  pendingGaCount: number
  approvedCount: number
  cancelledCount: number
  totalEstimatedBudget: number
  totalOnsiteEmployees: number
}

export function formatThaiCurrency(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0
  return safe.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatThaiCompactAmount(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0
  const hasFraction = Math.abs(safe % 1) > 1e-6
  return safe.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  })
}

export function getStatusMeta(
  status: PlanStatus,
  jvApprovalProgress?: string
): {
  label: string
  tone: StatusBadgeTone
  hasInfoReason: boolean
} {
  switch (status) {
    case "draft":
      return {
        label: "บันทึกร่าง",
        tone: "slate",
        hasInfoReason: false,
      }
    case "pending_ga":
      return {
        label: "รอ GA ประมาณค่าใช้จ่าย",
        tone: "amber",
        hasInfoReason: false,
      }
    case "waiting_summary":
      return {
        label: "รอพนักงานสรุปผล",
        tone: "amber",
        hasInfoReason: false,
      }
    case "jv_pending":
      return {
        label: `รอ JV อนุมัติ ${jvApprovalProgress || "1/2"}`,
        tone: "yellow",
        hasInfoReason: false,
      }
    case "jv_approved":
      return {
        label: "JV อนุมัติ",
        tone: "green",
        hasInfoReason: false,
      }
    case "jv_rejected":
      return {
        label: "JV ปฏิเสธ",
        tone: "red",
        hasInfoReason: true,
      }
    case "approved":
      return {
        label: "GA ประมาณค่าใช้จ่ายแล้ว",
        tone: "teal",
        hasInfoReason: false,
      }
    case "cancelled":
      return {
        label: "ยกเลิกแผนงาน",
        tone: "gray",
        hasInfoReason: true,
      }
  }
}

export function getBudgetCategory(plan: WorkPlan): BudgetCategory | null {
  switch (plan.status) {
    case "draft":
      return null
    case "pending_ga":
      return "pending"
    case "approved":
    case "jv_approved":
    case "jv_pending":
    case "waiting_summary":
      return "completed"
    case "jv_rejected":
      return "jv_rejected"
    case "cancelled":
      return "cancelled"
  }
}

export function getBudgetStatusMeta(plan: WorkPlan): {
  category: BudgetCategory
  label: string
  tone: StatusBadgeTone
  hasInfoReason: boolean
} {
  const category = getBudgetCategory(plan) ?? "pending"
  switch (category) {
    case "pending":
      return {
        category,
        label: "รอดำเนินการ",
        tone: "yellow",
        hasInfoReason: false,
      }
    case "completed":
      return {
        category,
        label: "เสร็จสิ้น",
        tone: "blue",
        hasInfoReason: false,
      }
    case "jv_rejected":
      return {
        category,
        label: "JV ปฏิเสธ",
        tone: "red",
        hasInfoReason: true,
      }
    case "cancelled":
      return {
        category,
        label: "ยกเลิกแผนงาน",
        tone: "gray",
        hasInfoReason: true,
      }
  }
}

export function calculateRoomAdditionalTotal(room: RoomDetail): number {
  if (!room.additionalExpenses || room.additionalExpenses.length === 0) {
    return 0
  }
  return room.additionalExpenses.reduce(
    (sum, exp) => sum + Math.max(0, exp.price),
    0
  )
}

export function calculateAccommodationAdditionalTotal(
  item: AccommodationItem
): number {
  return item.rooms.reduce(
    (sum, room) => sum + calculateRoomAdditionalTotal(room),
    0
  )
}

export function calculateVanTripAdditionalTotal(trip: VanTripItem): number {
  if (!trip.additionalExpenses || trip.additionalExpenses.length === 0) {
    return 0
  }
  return trip.additionalExpenses.reduce(
    (sum, exp) => sum + Math.max(0, exp.price),
    0
  )
}

export function calculateRentalCarAdditionalTotal(
  item: RentalCarItem
): number {
  if (!item.additionalExpenses || item.additionalExpenses.length === 0) {
    return 0
  }
  return item.additionalExpenses.reduce(
    (sum, exp) => sum + Math.max(0, exp.price),
    0
  )
}

export function calculateFlightAdditionalTotal(item: FlightItem): number {
  if (!item.additionalExpenses || item.additionalExpenses.length === 0) {
    return 0
  }
  return item.additionalExpenses.reduce(
    (sum, exp) => sum + Math.max(0, exp.price),
    0
  )
}

export function calculatePlanTotals(plan: WorkPlan): PlanTotals {
  if (!plan.hasExpense) {
    return {
      roomSubtotal: 0,
      vanSubtotal: 0,
      rentalCarSubtotal: 0,
      flightSubtotal: 0,
      additionalExpensesTotal: 0,
      accommodationTotal: 0,
      allowanceTotal: 0,
      grandTotal: 0,
    }
  }

  const vanTrips = plan.vanTrips ?? []
  const vanSubtotal = vanTrips.reduce(
    (sum, trip) => sum + Math.max(0, trip.itemTotal),
    0
  )
  const vanAdditionalTotal = vanTrips.reduce(
    (sum, trip) => sum + calculateVanTripAdditionalTotal(trip),
    0
  )

  const rentalCars = plan.rentalCars ?? []
  const rentalCarSubtotal = rentalCars.reduce(
    (sum, car) => sum + Math.max(0, car.itemTotal),
    0
  )
  const rentalCarAdditionalTotal = rentalCars.reduce(
    (sum, car) => sum + calculateRentalCarAdditionalTotal(car),
    0
  )

  const flights = plan.flights ?? []
  const flightSubtotal = flights.reduce(
    (sum, flight) => sum + Math.max(0, flight.itemTotal),
    0
  )
  const flightAdditionalTotal = flights.reduce(
    (sum, flight) => sum + calculateFlightAdditionalTotal(flight),
    0
  )

  const roomSubtotal = plan.accommodations.reduce(
    (sum, item) => sum + Math.max(0, item.itemTotal),
    0
  )
  const roomAdditionalTotal = plan.accommodations.reduce(
    (sum, item) => sum + calculateAccommodationAdditionalTotal(item),
    0
  )

  const additionalExpensesTotal =
    vanAdditionalTotal +
    rentalCarAdditionalTotal +
    flightAdditionalTotal +
    roomAdditionalTotal
  const accommodationTotal =
    vanSubtotal +
    rentalCarSubtotal +
    flightSubtotal +
    roomSubtotal +
    additionalExpensesTotal
  const allowanceTotal = Math.max(0, plan.allowanceOverride)

  return {
    roomSubtotal,
    vanSubtotal,
    rentalCarSubtotal,
    flightSubtotal,
    additionalExpensesTotal,
    accommodationTotal,
    allowanceTotal,
    grandTotal: accommodationTotal + allowanceTotal,
  }
}

export function applyVanCasePreset(
  plans: WorkPlan[],
  documentNo: string,
  presetId: VanCasePresetId
): WorkPlan[] {
  const preset = VAN_CASE_PRESETS[presetId]
  return plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          vanTrips: preset.vanTrips,
          rentalCars: undefined,
          flights: undefined,
          accommodations: [],
        }
      : plan
  )
}

export function applyRentalCarCasePreset(
  plans: WorkPlan[],
  documentNo: string,
  presetId: RentalCarCasePresetId
): WorkPlan[] {
  const preset = RENTAL_CAR_CASE_PRESETS[presetId]
  return plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          vanTrips: undefined,
          rentalCars: preset.rentalCars,
          flights: undefined,
          accommodations: [],
        }
      : plan
  )
}

export function applyFlightCasePreset(
  plans: WorkPlan[],
  documentNo: string,
  presetId: FlightCasePresetId
): WorkPlan[] {
  const preset = FLIGHT_CASE_PRESETS[presetId]
  return plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          vanTrips: undefined,
          rentalCars: undefined,
          flights: preset.flights,
          accommodations: [],
        }
      : plan
  )
}

export function applyAccommodationCasePreset(
  plans: WorkPlan[],
  documentNo: string,
  presetId: AccommodationCasePresetId
): WorkPlan[] {
  const preset = ACCOMMODATION_CASE_PRESETS[presetId]
  return plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          vanTrips: undefined,
          rentalCars: undefined,
          flights: undefined,
          accommodations: preset.accommodations,
        }
      : plan
  )
}

export function parseThaiDateString(raw: string): number | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  // ISO format YYYY-MM-DD (from native date input)
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed)
  if (isoMatch) {
    let year = Number.parseInt(isoMatch[1], 10)
    const month = Number.parseInt(isoMatch[2], 10)
    const day = Number.parseInt(isoMatch[3], 10)
    if (year >= 2400) year -= 543
    if (month < 1 || month > 12 || day < 1 || day > 31) return null
    return Date.UTC(year, month - 1, day)
  }

  // Thai/Slash format DD/MM/YY or DD/MM/YYYY (BE or CE)
  const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(trimmed)
  if (!slashMatch) return null

  const day = Number.parseInt(slashMatch[1], 10)
  const month = Number.parseInt(slashMatch[2], 10)
  let year = Number.parseInt(slashMatch[3], 10)

  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  if (year < 100) {
    // 2-digit Thai Buddhist Era year (e.g. 68 -> 2568 BE -> 2025 CE)
    year = 2500 + year - 543
  } else if (year >= 2400) {
    // 4-digit Thai Buddhist Era year (e.g. 2568 -> 2025 CE)
    year -= 543
  }

  return Date.UTC(year, month - 1, day)
}

export function formatIsoToDisplayThaiDate(iso: string): string {
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim())
  if (!isoMatch) return iso
  const yearCe = Number.parseInt(isoMatch[1], 10)
  const month = isoMatch[2]
  const day = isoMatch[3]
  const yearBe = yearCe < 2400 ? yearCe + 543 : yearCe
  return `${day}/${month}/${yearBe}`
}

export function parseThaiDateRange(
  rangeStr: string
): { start: number; end: number } | null {
  const parts = rangeStr.split("-").map((s) => s.trim())
  if (parts.length === 0) return null
  const start = parseThaiDateString(parts[0])
  if (start === null) return null
  const end = parts.length > 1 ? parseThaiDateString(parts[1]) : start
  if (end === null) return { start, end: start }
  return start <= end ? { start, end } : { start: end, end: start }
}

function matchesSearchQuery(plan: WorkPlan, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true
  const haystack = [
    plan.documentNo,
    plan.planName,
    plan.project,
    plan.objective,
    plan.reviewerName ?? "",
    ...plan.employees.map((emp) => `${emp.code} ${emp.name}`),
    ...plan.onsiteLocations.map((loc) => `${loc.name} ${loc.province}`),
  ]
    .join(" ")
    .toLowerCase()

  return haystack.includes(normalizedQuery)
}

function matchesDateFilter(
  plan: WorkPlan,
  startDate?: string,
  endDate?: string
): boolean {
  const filterStart = startDate ? parseThaiDateString(startDate) : null
  const filterEnd = endDate ? parseThaiDateString(endDate) : null
  if (filterStart === null && filterEnd === null) return true

  const range = parseThaiDateRange(plan.travelDateRange)
  if (!range) return true

  if (filterStart !== null && range.end < filterStart) return false
  if (filterEnd !== null && range.start > filterEnd) return false
  return true
}

export function filterPlans(
  plans: WorkPlan[],
  searchQuery: string,
  statusFilter: PlanStatus | "all"
): WorkPlan[] {
  return filterPlansAdvanced(plans, { searchQuery, statusFilter })
}

export function filterPlansAdvanced(
  plans: WorkPlan[],
  options: {
    searchQuery?: string
    statusFilter?: PlanStatus | "all"
    startDate?: string
    endDate?: string
  }
): WorkPlan[] {
  const normalized = (options.searchQuery ?? "").trim().toLowerCase()
  const statusFilter = options.statusFilter ?? "all"

  return plans.filter((plan) => {
    if (statusFilter !== "all" && plan.status !== statusFilter) {
      return false
    }
    if (!matchesDateFilter(plan, options.startDate, options.endDate)) {
      return false
    }
    return matchesSearchQuery(plan, normalized)
  })
}

export function computePlannerPendingCounts(
  plans: WorkPlan[]
): PlannerPendingCounts {
  let draftCount = 0
  let waitingSummaryCount = 0

  for (const plan of plans) {
    if (plan.status === "draft") draftCount += 1
    if (plan.status === "waiting_summary") waitingSummaryCount += 1
  }

  return { draftCount, waitingSummaryCount }
}

export function computeBudgetReviewMetrics(
  plans: WorkPlan[]
): BudgetReviewMetrics {
  let pending = 0
  let completed = 0
  let waitingAnalysis = 0
  let analyzed = 0
  let jvRejected = 0
  let cancelled = 0

  for (const plan of plans) {
    const category = getBudgetCategory(plan)
    if (!category) continue

    if (category === "pending") {
      pending += 1
    } else if (category === "completed") {
      completed += 1
      if (plan.analysisStatus === "analyzed") {
        analyzed += 1
      } else {
        waitingAnalysis += 1
      }
    } else if (category === "jv_rejected") {
      jvRejected += 1
    } else if (category === "cancelled") {
      cancelled += 1
    }
  }

  return {
    total: pending + completed + jvRejected + cancelled,
    pending,
    completed,
    waitingAnalysis,
    analyzed,
    jvRejected,
    cancelled,
  }
}

export function filterBudgetPlans(
  plans: WorkPlan[],
  options: {
    searchQuery?: string
    startDate?: string
    endDate?: string
    kpiFilter?: BudgetKpiFilter
    analysisFilter?: BudgetAnalysisStatus | "all"
  }
): WorkPlan[] {
  const normalized = (options.searchQuery ?? "").trim().toLowerCase()
  const kpiFilter = options.kpiFilter ?? "all"
  const analysisFilter = options.analysisFilter ?? "all"

  return plans.filter((plan) => {
    const category = getBudgetCategory(plan)
    if (!category) return false

    if (kpiFilter !== "all" && category !== kpiFilter) {
      return false
    }

    if (analysisFilter !== "all") {
      if (category !== "completed") return false
      const effectiveAnalysis: BudgetAnalysisStatus =
        plan.analysisStatus ?? "waiting_analysis"
      if (effectiveAnalysis !== analysisFilter) return false
    }

    if (!matchesDateFilter(plan, options.startDate, options.endDate)) {
      return false
    }

    return matchesSearchQuery(plan, normalized)
  })
}

export function paginateItems<T>(
  items: T[],
  requestedPage: number,
  pageSize: number
): PaginatedResult<T> {
  const safeSize = Math.max(1, pageSize)
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / safeSize))
  const page = Math.min(Math.max(1, requestedPage), totalPages)
  const startIndex = (page - 1) * safeSize
  return {
    items: items.slice(startIndex, startIndex + safeSize),
    page,
    pageSize: safeSize,
    totalItems,
    totalPages,
  }
}

export function getPaginationPages(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, "ellipsis", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      2,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ]
}

const PLANNER_FEATURED_ORDER = [
  "2568100007", // แผนการเดินทาง 01 (บันทึกร่าง)
  "2568100001", // A (รอ GA ประมาณค่าใช้จ่าย — Hotel)
  "2568100010", // แผนการเดินทาง 02 (JV อนุมัติ)
  "2568100011", // แผนการเดินทาง 05 (รอ JV อนุมัติ 1/2)
  "2568100012", // แผนการเดินทาง 06 (JV ปฏิเสธ)
  "2568100003", // สำรวจหน้างานระบบคลังสินค้าอัจฉริยะ (รอพนักงานสรุปผล)
  "2568100004", // Van
  "2568100005", // Rental Car
  "2568100006", // Flight
]

const BUDGET_FEATURED_ORDER = [
  "2568100001", // A (รอดำเนินการ, unassigned)
  "2568100004", // รถตู้ (รอดำเนินการ, วิโรจน์ คมปราชญ์)
  "2568100008", // แผนการเดินทาง 04 (ยกเลิกแผนงาน)
  "2568100009", // แผนการเดินทาง 03 (ยกเลิกแผนงาน + 3 venues +1 chip)
  "2568100005", // รถเช่า (รอดำเนินการ)
  "2568100010", // แผนการเดินทาง 02 (เสร็จสิ้น)
  "2568100012", // แผนการเดินทาง 06 (JV ปฏิเสธ)
  "2568100006", // เครื่องบิน (รอดำเนินการ)
]

function orderByFeaturedDocs(
  plans: WorkPlan[],
  featuredDocs: string[]
): WorkPlan[] {
  const rankMap = new Map<string, number>()
  featuredDocs.forEach((docNo, idx) => rankMap.set(docNo, idx))

  return [...plans].sort((a, b) => {
    const isNewA = Number.parseInt(a.documentNo, 10) > 2568100033
    const isNewB = Number.parseInt(b.documentNo, 10) > 2568100033
    if (isNewA && !isNewB) return -1
    if (!isNewA && isNewB) return 1

    const rankA = rankMap.get(a.documentNo)
    const rankB = rankMap.get(b.documentNo)
    if (rankA !== undefined && rankB !== undefined) return rankA - rankB
    if (rankA !== undefined) return -1
    if (rankB !== undefined) return 1
    return 0
  })
}

export function orderPlansForPlannerView(plans: WorkPlan[]): WorkPlan[] {
  return orderByFeaturedDocs(plans, PLANNER_FEATURED_ORDER)
}

export function orderPlansForBudgetView(plans: WorkPlan[]): WorkPlan[] {
  return orderByFeaturedDocs(plans, BUDGET_FEATURED_ORDER)
}

export function cancelWorkPlan(
  plans: WorkPlan[],
  documentNo: string,
  reason: string,
  timestamp: string
): { plans: WorkPlan[]; error?: string } {
  const trimmedReason = reason.trim()
  if (!trimmedReason) {
    return {
      plans,
      error: "กรุณาระบุเหตุผลการยกเลิกแผนงาน",
    }
  }

  const updated = plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          status: "cancelled" as PlanStatus,
          cancellationReason: trimmedReason,
          cancelledAt: timestamp,
        }
      : plan
  )

  return { plans: updated }
}

export function restoreWorkPlan(
  plans: WorkPlan[],
  documentNo: string
): WorkPlan[] {
  return plans.map((plan) =>
    plan.documentNo === documentNo
      ? {
          ...plan,
          status: "pending_ga" as PlanStatus,
          cancellationReason: undefined,
          cancelledAt: undefined,
        }
      : plan
  )
}

export function updatePlanEstimate(
  plans: WorkPlan[],
  documentNo: string,
  input: {
    pricePerPerson: number
    itemTotal: number
    allowanceTotal: number
    markApproved: boolean
  }
): { plans: WorkPlan[]; error?: string } {
  if (
    !Number.isFinite(input.pricePerPerson) ||
    !Number.isFinite(input.itemTotal) ||
    !Number.isFinite(input.allowanceTotal) ||
    input.pricePerPerson < 0 ||
    input.itemTotal < 0 ||
    input.allowanceTotal < 0
  ) {
    return {
      plans,
      error: "จำนวนเงินต้องเป็นตัวเลขที่มากกว่าหรือเท่ากับ 0",
    }
  }

  const updated = plans.map((plan) => {
    if (plan.documentNo !== documentNo) return plan

    const hasVanTrips = !!plan.vanTrips && plan.vanTrips.length > 0
    const hasRentalCars = !!plan.rentalCars && plan.rentalCars.length > 0
    const hasFlights = !!plan.flights && plan.flights.length > 0

    const updatedVanTrips = hasVanTrips
      ? plan.vanTrips!.map((trip, index) =>
          index === 0
            ? {
                ...trip,
                pricePerPerson: input.pricePerPerson,
                itemTotal: input.itemTotal,
              }
            : trip
        )
      : plan.vanTrips

    const updatedRentalCars = hasRentalCars
      ? plan.rentalCars!.map((car, index) =>
          index === 0
            ? {
                ...car,
                pricePerPerson: input.pricePerPerson,
                itemTotal: input.itemTotal,
              }
            : car
        )
      : plan.rentalCars

    const updatedFlights = hasFlights
      ? plan.flights!.map((flight, index) =>
          index === 0
            ? {
                ...flight,
                pricePerPerson: input.pricePerPerson,
                itemTotal: input.itemTotal,
              }
            : flight
        )
      : plan.flights

    const updatedAccommodations =
      !hasVanTrips && !hasRentalCars && !hasFlights
        ? plan.accommodations.map((acc, index) =>
            index === 0
              ? {
                  ...acc,
                  pricePerPerson: input.pricePerPerson,
                  itemTotal: input.itemTotal,
                }
              : acc
          )
        : plan.accommodations

    return {
      ...plan,
      vanTrips: updatedVanTrips,
      rentalCars: updatedRentalCars,
      flights: updatedFlights,
      accommodations: updatedAccommodations,
      allowanceOverride: input.allowanceTotal,
      status: input.markApproved
        ? ("approved" as PlanStatus)
        : plan.status === "cancelled"
        ? ("pending_ga" as PlanStatus)
        : plan.status,
    }
  })

  return { plans: updated }
}

export function computeDashboardMetrics(plans: WorkPlan[]): DashboardMetrics {
  let pendingGaCount = 0
  let approvedCount = 0
  let cancelledCount = 0
  let totalEstimatedBudget = 0
  const employeeCodes = new Set<string>()

  for (const plan of plans) {
    if (plan.status === "pending_ga") pendingGaCount += 1
    if (plan.status === "approved" || plan.status === "jv_approved") {
      approvedCount += 1
    }
    if (plan.status === "cancelled") cancelledCount += 1

    if (plan.status !== "cancelled" && plan.status !== "draft") {
      totalEstimatedBudget += calculatePlanTotals(plan).grandTotal
    }

    for (const emp of plan.employees) {
      employeeCodes.add(emp.code)
    }
  }

  return {
    totalPlans: plans.length,
    pendingGaCount,
    approvedCount,
    cancelledCount,
    totalEstimatedBudget,
    totalOnsiteEmployees: employeeCodes.size,
  }
}

export function createNextDocumentNo(plans: WorkPlan[]): string {
  const maxNum = plans.reduce((max, plan) => {
    const parsed = Number.parseInt(plan.documentNo, 10)
    return Number.isFinite(parsed) && parsed > max ? parsed : max
  }, 2568100000)

  return String(maxNum + 1)
}
