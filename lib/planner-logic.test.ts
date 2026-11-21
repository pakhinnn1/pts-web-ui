import test from "node:test"
import assert from "node:assert/strict"
import { INITIAL_PLANS } from "./planner-data"
import {
  applyAccommodationCasePreset,
  applyFlightCasePreset,
  applyRentalCarCasePreset,
  applyVanCasePreset,
  calculateFlightAdditionalTotal,
  calculatePlanTotals,
  calculateRentalCarAdditionalTotal,
  calculateRoomAdditionalTotal,
  calculateVanTripAdditionalTotal,
  cancelWorkPlan,
  computeBudgetReviewMetrics,
  computeDashboardMetrics,
  computePlannerPendingCounts,
  createNextDocumentNo,
  filterBudgetPlans,
  filterPlans,
  filterPlansAdvanced,
  formatIsoToDisplayThaiDate,
  formatThaiCompactAmount,
  formatThaiCurrency,
  getBudgetStatusMeta,
  getPaginationPages,
  getStatusMeta,
  paginateItems,
  parseThaiDateRange,
  parseThaiDateString,
  restoreWorkPlan,
  updatePlanEstimate,
} from "./planner-logic"

test("formatThaiCurrency and formatThaiCompactAmount format numbers properly", () => {
  assert.equal(formatThaiCurrency(4500), "4,500.00")
  assert.equal(formatThaiCurrency(0), "0.00")
  assert.equal(formatThaiCurrency(1600.5), "1,600.50")
  assert.equal(formatThaiCompactAmount(1300), "1,300")
  assert.equal(formatThaiCompactAmount(1200.5), "1,200.50")
})

test("calculatePlanTotals matches all 3 Accommodation cases for plan 2568100001", () => {
  // Case 1: GA กำหนดที่พักให้ (1 รายการ) — 3,200 + 1,300 = 4,500.00
  const case1 = INITIAL_PLANS[0]
  assert.equal(case1.documentNo, "2568100001")
  assert.equal(
    calculateRoomAdditionalTotal(case1.accommodations[0].rooms[0]),
    1300
  )
  const totalsCase1 = calculatePlanTotals(case1)
  assert.equal(totalsCase1.roomSubtotal, 3200)
  assert.equal(totalsCase1.additionalExpensesTotal, 1300)
  assert.equal(totalsCase1.accommodationTotal, 4500)
  assert.equal(totalsCase1.allowanceTotal, 0)
  assert.equal(totalsCase1.grandTotal, 4500)

  // Case 2: กำหนดเอง (2 รายการ) — (3,200 + 1,300) * 2 = 9,000.00
  const plansCase2 = applyAccommodationCasePreset(
    INITIAL_PLANS,
    "2568100001",
    "self_multi"
  )
  assert.equal(plansCase2[0].accommodations.length, 2)
  assert.equal(
    plansCase2[0].accommodations[0].hotelName,
    "โรงแรมแบงค็อก แมริออท มาร์คีส์ ควีนส์ปาร์ค"
  )
  const totalsCase2 = calculatePlanTotals(plansCase2[0])
  assert.equal(totalsCase2.roomSubtotal, 6400)
  assert.equal(totalsCase2.additionalExpensesTotal, 2600)
  assert.equal(totalsCase2.accommodationTotal, 9000)
  assert.equal(totalsCase2.grandTotal, 9000)

  // Case 3: กำหนดเอง (1 รายการ) — 3,200 + 1,300 = 4,500.00
  const plansCase3 = applyAccommodationCasePreset(
    INITIAL_PLANS,
    "2568100001",
    "self_single"
  )
  assert.equal(plansCase3[0].accommodations.length, 1)
  assert.equal(plansCase3[0].accommodations[0].selectionMode, "self_selected")
  const totalsCase3 = calculatePlanTotals(plansCase3[0])
  assert.equal(totalsCase3.accommodationTotal, 4500)
  assert.equal(totalsCase3.grandTotal, 4500)
})

test("calculatePlanTotals matches all 3 Van Transport cases for plan 2568100004", () => {
  // Case 1: ค้างคืน (1 รายการ) — 3,200 + 1,200 = 4,400.00
  const vanPlan = INITIAL_PLANS.find((p) => p.documentNo === "2568100004")
  assert.ok(vanPlan)
  assert.ok(vanPlan.vanTrips && vanPlan.vanTrips.length === 1)
  assert.equal(vanPlan.vanTrips[0].tripTypeBadgeLabel, "ค้างคืน")
  assert.equal(vanPlan.vanTrips[0].routeStops.length, 2)
  assert.equal(calculateVanTripAdditionalTotal(vanPlan.vanTrips[0]), 1200)
  const totalsCase1 = calculatePlanTotals(vanPlan)
  assert.equal(totalsCase1.vanSubtotal, 3200)
  assert.equal(totalsCase1.additionalExpensesTotal, 1200)
  assert.equal(totalsCase1.accommodationTotal, 4400)
  assert.equal(totalsCase1.grandTotal, 4400)

  // Case 2: เที่ยวเดียว มีจุดแวะ (1 รายการ) — 4 stops, 3,200 + 1,200 = 4,400.00
  const plansCase2 = applyVanCasePreset(
    INITIAL_PLANS,
    "2568100004",
    "van_oneway_stops"
  )
  const vanCase2 = plansCase2.find((p) => p.documentNo === "2568100004")!
  assert.equal(vanCase2.vanTrips?.length, 1)
  assert.equal(vanCase2.vanTrips?.[0].tripTypeBadgeLabel, "เที่ยวเดียว")
  assert.equal(vanCase2.vanTrips?.[0].routeStops.length, 4)
  assert.equal(calculatePlanTotals(vanCase2).grandTotal, 4400)

  // Case 3: หลายรายการ (2 รายการ) — (3,200 + 1,200) * 2 = 8,800.00
  const plansCase3 = applyVanCasePreset(
    INITIAL_PLANS,
    "2568100004",
    "van_multi"
  )
  const vanCase3 = plansCase3.find((p) => p.documentNo === "2568100004")!
  assert.equal(vanCase3.vanTrips?.length, 2)
  assert.equal(vanCase3.vanTrips?.[0].tripTypeBadgeLabel, undefined)
  assert.equal(calculatePlanTotals(vanCase3).grandTotal, 8800)
})

test("calculatePlanTotals matches both Rental Car cases for plan 2568100005", () => {
  // Case 1: 1 รายการ — 3,200 + 500 = 3,700.00
  const rentalPlan = INITIAL_PLANS.find((p) => p.documentNo === "2568100005")
  assert.ok(rentalPlan)
  assert.ok(rentalPlan.rentalCars && rentalPlan.rentalCars.length === 1)
  assert.equal(rentalPlan.rentalCars[0].pickupLocation, "สนามบินสุวรรณภูมิ")
  assert.equal(rentalPlan.rentalCars[0].pickupDateTime, "05/01/2026  10:00")
  assert.equal(rentalPlan.rentalCars[0].returnDateTime, "08/01/2026  10:00")
  assert.equal(rentalPlan.rentalCars[0].attachments.length, 2)
  assert.equal(
    calculateRentalCarAdditionalTotal(rentalPlan.rentalCars[0]),
    500
  )
  const totalsCase1 = calculatePlanTotals(rentalPlan)
  assert.equal(totalsCase1.rentalCarSubtotal, 3200)
  assert.equal(totalsCase1.additionalExpensesTotal, 500)
  assert.equal(totalsCase1.accommodationTotal, 3700)
  assert.equal(totalsCase1.allowanceTotal, 0)
  assert.equal(totalsCase1.grandTotal, 3700)

  // Case 2: 2 รายการ — (3,200 + 500) * 2 = 7,400.00
  const plansCase2 = applyRentalCarCasePreset(
    INITIAL_PLANS,
    "2568100005",
    "rental_multi"
  )
  const rentalCase2 = plansCase2.find((p) => p.documentNo === "2568100005")!
  assert.equal(rentalCase2.rentalCars?.length, 2)
  assert.equal(rentalCase2.rentalCars?.[1].pickupDateTime, "05/01/2026  12:00")
  assert.equal(rentalCase2.rentalCars?.[1].returnDateTime, "08/01/2026  13:45")
  const totalsCase2 = calculatePlanTotals(rentalCase2)
  assert.equal(totalsCase2.rentalCarSubtotal, 6400)
  assert.equal(totalsCase2.additionalExpensesTotal, 1000)
  assert.equal(totalsCase2.accommodationTotal, 7400)
  assert.equal(totalsCase2.grandTotal, 7400)
})

test("calculatePlanTotals matches all 3 Flight cases with dynamic extra sum (950) for plan 2568100006", () => {
  // Case 1: เที่ยวเดียว — 1,600 + (150 + 800 = 950) = 2,550.00
  const flightPlan = INITIAL_PLANS.find((p) => p.documentNo === "2568100006")
  assert.ok(flightPlan)
  assert.ok(flightPlan.flights && flightPlan.flights.length === 1)
  assert.equal(flightPlan.flights[0].tripType, "one_way")
  assert.equal(flightPlan.flights[0].tripTypeBadgeLabel, "เที่ยวเดียว")
  assert.equal(flightPlan.flights[0].legs.length, 1)
  assert.equal(flightPlan.flights[0].legs[0].heading, "วันไป")
  assert.equal(flightPlan.flights[0].attachments[0].fileName, "ตั๋วเครื่องบิน .pdf")
  assert.equal(calculateFlightAdditionalTotal(flightPlan.flights[0]), 950)
  const totalsOneWay = calculatePlanTotals(flightPlan)
  assert.equal(totalsOneWay.flightSubtotal, 1600)
  assert.equal(totalsOneWay.additionalExpensesTotal, 950)
  assert.equal(totalsOneWay.accommodationTotal, 2550)
  assert.equal(totalsOneWay.allowanceTotal, 0)
  assert.equal(totalsOneWay.grandTotal, 2550)

  // Case 2: ไป - กลับ — 3,200 + 950 = 4,150.00
  const plansRoundTrip = applyFlightCasePreset(
    INITIAL_PLANS,
    "2568100006",
    "flight_round_trip"
  )
  const roundTripPlan = plansRoundTrip.find(
    (p) => p.documentNo === "2568100006"
  )!
  assert.equal(roundTripPlan.flights?.length, 1)
  assert.equal(roundTripPlan.flights?.[0].tripTypeBadgeLabel, "ไป - กลับ")
  assert.equal(roundTripPlan.flights?.[0].legs.length, 2)
  assert.equal(roundTripPlan.flights?.[0].legs[1].heading, "วันกลับ")
  assert.equal(roundTripPlan.flights?.[0].legs[1].extraBaggage, "-")
  const totalsRoundTrip = calculatePlanTotals(roundTripPlan)
  assert.equal(totalsRoundTrip.flightSubtotal, 3200)
  assert.equal(totalsRoundTrip.additionalExpensesTotal, 950)
  assert.equal(totalsRoundTrip.grandTotal, 4150)

  // Case 3: หลายเมือง(ต่อเครื่อง) — 3,200 + 950 = 4,150.00
  const plansMultiCity = applyFlightCasePreset(
    INITIAL_PLANS,
    "2568100006",
    "flight_multi_city"
  )
  const multiCityPlan = plansMultiCity.find(
    (p) => p.documentNo === "2568100006"
  )!
  assert.equal(
    multiCityPlan.flights?.[0].tripTypeBadgeLabel,
    "หลายเมือง(ต่อเครื่อง)"
  )
  assert.equal(multiCityPlan.flights?.[0].legs.length, 2)
  assert.equal(multiCityPlan.flights?.[0].legs[0].heading, "เที่ยวที่ 1")
  assert.equal(multiCityPlan.flights?.[0].legs[1].heading, "เที่ยวที่ 2")
  assert.equal(
    multiCityPlan.flights?.[0].legs[1].preferredTimeWindow,
    "15:00 - 17:10"
  )
  const totalsMultiCity = calculatePlanTotals(multiCityPlan)
  assert.equal(totalsMultiCity.flightSubtotal, 3200)
  assert.equal(totalsMultiCity.additionalExpensesTotal, 950)
  assert.equal(totalsMultiCity.grandTotal, 4150)
})

test("filterPlans filters by document number, Thai location, and status", () => {
  const byDoc = filterPlans(INITIAL_PLANS, "2568100001", "all")
  assert.equal(byDoc.length, 1)
  assert.equal(byDoc[0].planName, "A")

  const byVanDoc = filterPlans(INITIAL_PLANS, "2568100004", "all")
  assert.equal(byVanDoc.length, 1)
  assert.equal(byVanDoc[0].documentNo, "2568100004")

  const byRentalDoc = filterPlans(INITIAL_PLANS, "2568100005", "all")
  assert.equal(byRentalDoc.length, 1)
  assert.equal(byRentalDoc[0].documentNo, "2568100005")

  const byFlightDoc = filterPlans(INITIAL_PLANS, "2568100006", "all")
  assert.equal(byFlightDoc.length, 1)
  assert.equal(byFlightDoc[0].documentNo, "2568100006")

  const approvedOnly = filterPlans(INITIAL_PLANS, "", "approved")
  assert.ok(approvedOnly.length >= 1)
  assert.ok(approvedOnly.some((p) => p.documentNo === "2568100002"))
})

test("cancelWorkPlan rejects empty reason and updates status on valid reason", () => {
  const rejected = cancelWorkPlan(
    INITIAL_PLANS,
    "2568100001",
    "   ",
    "20/11/69 09:30"
  )
  assert.ok(rejected.error)
  assert.equal(rejected.plans[0].status, "pending_ga")

  const cancelled = cancelWorkPlan(
    INITIAL_PLANS,
    "2568100001",
    "ลูกค้าขอเลื่อนวันนำเสนองาน",
    "20/11/69 09:35"
  )
  assert.equal(cancelled.error, undefined)
  assert.equal(cancelled.plans[0].status, "cancelled")
  assert.equal(
    cancelled.plans[0].cancellationReason,
    "ลูกค้าขอเลื่อนวันนำเสนองาน"
  )

  const restored = restoreWorkPlan(cancelled.plans, "2568100001")
  assert.equal(restored[0].status, "pending_ga")
  assert.equal(restored[0].cancellationReason, undefined)
})

test("updatePlanEstimate validates negative values and recalculates totals for both accommodation and van plans", () => {
  const invalid = updatePlanEstimate(INITIAL_PLANS, "2568100001", {
    pricePerPerson: -100,
    itemTotal: 3200,
    allowanceTotal: 0,
    markApproved: true,
  })
  assert.ok(invalid.error)

  const updatedAcc = updatePlanEstimate(INITIAL_PLANS, "2568100001", {
    pricePerPerson: 1800,
    itemTotal: 4000,
    allowanceTotal: 1200,
    markApproved: true,
  })
  assert.equal(updatedAcc.error, undefined)
  const accTotals = calculatePlanTotals(updatedAcc.plans[0])
  assert.equal(accTotals.roomSubtotal, 4000)
  assert.equal(accTotals.additionalExpensesTotal, 1300)
  assert.equal(accTotals.accommodationTotal, 5300)
  assert.equal(accTotals.grandTotal, 6500)
  assert.equal(updatedAcc.plans[0].status, "approved")

  const updatedVan = updatePlanEstimate(INITIAL_PLANS, "2568100004", {
    pricePerPerson: 1800,
    itemTotal: 4000,
    allowanceTotal: 500,
    markApproved: true,
  })
  assert.equal(updatedVan.error, undefined)
  const vanPlanUpdated = updatedVan.plans.find(
    (p) => p.documentNo === "2568100004"
  )!
  const vanTotals = calculatePlanTotals(vanPlanUpdated)
  assert.equal(vanTotals.vanSubtotal, 4000)
  assert.equal(vanTotals.additionalExpensesTotal, 1200)
  assert.equal(vanTotals.grandTotal, 5700)

  const updatedRental = updatePlanEstimate(INITIAL_PLANS, "2568100005", {
    pricePerPerson: 1750,
    itemTotal: 3500,
    allowanceTotal: 300,
    markApproved: true,
  })
  assert.equal(updatedRental.error, undefined)
  const rentalPlanUpdated = updatedRental.plans.find(
    (p) => p.documentNo === "2568100005"
  )!
  const rentalTotals = calculatePlanTotals(rentalPlanUpdated)
  assert.equal(rentalTotals.rentalCarSubtotal, 3500)
  assert.equal(rentalTotals.additionalExpensesTotal, 500)
  assert.equal(rentalTotals.grandTotal, 4300)
  assert.equal(rentalPlanUpdated.status, "approved")

  const updatedFlight = updatePlanEstimate(INITIAL_PLANS, "2568100006", {
    pricePerPerson: 1200,
    itemTotal: 2400,
    allowanceTotal: 450,
    markApproved: true,
  })
  assert.equal(updatedFlight.error, undefined)
  const flightPlanUpdated = updatedFlight.plans.find(
    (p) => p.documentNo === "2568100006"
  )!
  const flightTotals = calculatePlanTotals(flightPlanUpdated)
  assert.equal(flightTotals.flightSubtotal, 2400)
  assert.equal(flightTotals.additionalExpensesTotal, 950)
  assert.equal(flightTotals.allowanceTotal, 450)
  assert.equal(flightTotals.grandTotal, 3800)
  assert.equal(flightPlanUpdated.status, "approved")
})

test("computeDashboardMetrics excludes cancelled and draft plans from total estimated budget", () => {
  const initialMetrics = computeDashboardMetrics(INITIAL_PLANS)
  assert.equal(initialMetrics.totalPlans, 33)
  assert.equal(initialMetrics.pendingGaCount, 4)
  assert.equal(initialMetrics.cancelledCount, 4)

  const planATotal = calculatePlanTotals(INITIAL_PLANS[0]).grandTotal
  const { plans } = cancelWorkPlan(
    INITIAL_PLANS,
    "2568100001",
    "เลื่อนแผนงาน",
    "20/11/69"
  )
  const afterCancel = computeDashboardMetrics(plans)
  assert.equal(afterCancel.cancelledCount, 5)
  assert.equal(
    afterCancel.totalEstimatedBudget,
    initialMetrics.totalEstimatedBudget - planATotal
  )
})

test("createNextDocumentNo increments highest Thai fiscal document number", () => {
  assert.equal(createNextDocumentNo(INITIAL_PLANS), "2568100034")
})

test("parseThaiDateString and parseThaiDateRange handle BE 2-digit, BE 4-digit, CE, and ISO dates", () => {
  const d1 = parseThaiDateString("01/10/68")
  const d2 = parseThaiDateString("01/10/2568")
  const d3 = parseThaiDateString("01/10/2025")
  const d4 = parseThaiDateString("2025-10-01")
  assert.ok(d1 !== null)
  assert.equal(d1, d2)
  assert.equal(d2, d3)
  assert.equal(d3, d4)
  assert.equal(formatIsoToDisplayThaiDate("2025-10-01"), "01/10/2568")

  const range = parseThaiDateRange("01/10/68 - 05/10/68")
  assert.ok(range)
  assert.equal(range.start, d1)
  assert.equal(range.end, parseThaiDateString("05/10/2568"))
})

test("computeBudgetReviewMetrics returns exact 32 submitted plans with matching sub-counts", () => {
  const metrics = computeBudgetReviewMetrics(INITIAL_PLANS)
  assert.equal(metrics.total, 32)
  assert.equal(metrics.pending, 4)
  assert.equal(metrics.completed, 20)
  assert.equal(metrics.waitingAnalysis, 10)
  assert.equal(metrics.analyzed, 10)
  assert.equal(metrics.jvRejected, 4)
  assert.equal(metrics.cancelled, 4)
  assert.equal(
    metrics.pending + metrics.completed + metrics.jvRejected + metrics.cancelled,
    metrics.total
  )
  assert.equal(metrics.waitingAnalysis + metrics.analyzed, metrics.completed)
})

test("computePlannerPendingCounts matches draft and waiting_summary counts", () => {
  const counts = computePlannerPendingCounts(INITIAL_PLANS)
  assert.equal(counts.draftCount, 1)
  assert.equal(counts.waitingSummaryCount, 1)
})

test("filterPlansAdvanced and filterBudgetPlans support date range, status, KPI, and analysis filters", () => {
  const lateOct = filterPlansAdvanced(INITIAL_PLANS, {
    startDate: "28/10/2568",
    endDate: "31/10/2568",
  })
  assert.ok(lateOct.length >= 3)
  assert.ok(lateOct.every((p) => p.documentNo >= "2568100031"))

  const waitingAnalysisPlans = filterBudgetPlans(INITIAL_PLANS, {
    kpiFilter: "completed",
    analysisFilter: "waiting_analysis",
  })
  assert.equal(waitingAnalysisPlans.length, 10)

  const analyzedPlans = filterBudgetPlans(INITIAL_PLANS, {
    kpiFilter: "completed",
    analysisFilter: "analyzed",
  })
  assert.equal(analyzedPlans.length, 10)

  const rejectedPlans = filterBudgetPlans(INITIAL_PLANS, {
    kpiFilter: "jv_rejected",
  })
  assert.equal(rejectedPlans.length, 4)
  assert.equal(getBudgetStatusMeta(rejectedPlans[0]).label, "JV ปฏิเสธ")
  assert.equal(getBudgetStatusMeta(rejectedPlans[0]).hasInfoReason, true)

  const jvPendingMeta = getStatusMeta("jv_pending", "1/2")
  assert.equal(jvPendingMeta.label, "รอ JV อนุมัติ 1/2")
})

test("paginateItems and getPaginationPages compute exact slices and smart ellipsis", () => {
  const page1 = paginateItems(INITIAL_PLANS, 1, 6)
  assert.equal(page1.items.length, 6)
  assert.equal(page1.totalPages, 6)
  assert.equal(page1.page, 1)

  const pageLast = paginateItems(INITIAL_PLANS, 99, 6)
  assert.equal(pageLast.page, 6)
  assert.equal(pageLast.items.length, 3)

  assert.deepEqual(getPaginationPages(1, 6), [1, 2, 3, 4, 5, 6])
  assert.deepEqual(getPaginationPages(1, 17), [1, 2, 3, 4, "ellipsis", 16, 17])
  assert.deepEqual(getPaginationPages(9, 17), [
    1,
    "ellipsis",
    8,
    9,
    10,
    "ellipsis",
    17,
  ])
})

