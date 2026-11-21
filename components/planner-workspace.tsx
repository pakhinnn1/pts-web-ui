"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { AppSidebar, type WorkspaceSection } from "@/components/app-sidebar"
import { BudgetManagementView } from "@/components/budget-management-view"
import { DashboardView } from "@/components/dashboard-view"
import { PlanDetailView } from "@/components/plan-detail-view"
import { PlanListView } from "@/components/plan-list-view"
import { TopHeader } from "@/components/top-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  CURRENT_USER,
  INITIAL_NOTIFICATIONS,
  INITIAL_PLANS,
  type AccommodationCasePresetId,
  type FlightCasePresetId,
  type PlannerNotification,
  type RentalCarCasePresetId,
  type VanCasePresetId,
  type WorkPlan,
} from "@/lib/planner-data"
import {
  applyAccommodationCasePreset,
  applyFlightCasePreset,
  applyRentalCarCasePreset,
  applyVanCasePreset,
  cancelWorkPlan,
  createNextDocumentNo,
  restoreWorkPlan,
  updatePlanEstimate,
} from "@/lib/planner-logic"

type PlannerSubView = "detail" | "list"

export function PlannerWorkspace({
  initialSection = "planner",
}: {
  initialSection?: WorkspaceSection
}) {
  const [plans, setPlans] = React.useState<WorkPlan[]>(INITIAL_PLANS)
  const [notifications, setNotifications] = React.useState<
    PlannerNotification[]
  >(INITIAL_NOTIFICATIONS)
  const [activeSection, setActiveSection] =
    React.useState<WorkspaceSection>(initialSection)
  const [plannerSubView, setPlannerSubView] =
    React.useState<PlannerSubView>("list")
  const [returnSection, setReturnSection] =
    React.useState<WorkspaceSection>("planner")
  const [selectedDocNo, setSelectedDocNo] = React.useState<string>("2568100001")
  const [activeCasePreset, setActiveCasePreset] =
    React.useState<AccommodationCasePresetId>("ga_single")
  const [activeVanCasePreset, setActiveVanCasePreset] =
    React.useState<VanCasePresetId>("van_overnight")
  const [activeRentalCarCasePreset, setActiveRentalCarCasePreset] =
    React.useState<RentalCarCasePresetId>("rental_single")
  const [activeFlightCasePreset, setActiveFlightCasePreset] =
    React.useState<FlightCasePresetId>("flight_one_way")
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const toastTimerRef = React.useRef<number | null>(null)

  const showToast = React.useCallback((message: string) => {
    setToastMessage(message)
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }, [])

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const selectedPlan =
    plans.find((p) => p.documentNo === selectedDocNo) ?? plans[0]

  const handleSelectSection = (section: WorkspaceSection) => {
    setActiveSection(section)
    if (section === "planner") {
      setPlannerSubView("list")
    }
  }

  const handleOpenPlanDetail = (
    documentNo: string,
    fromSection: WorkspaceSection = "planner"
  ) => {
    setSelectedDocNo(documentNo)
    setReturnSection(fromSection)
    setActiveSection("planner")
    setPlannerSubView("detail")
  }

  const handleBackFromDetail = () => {
    if (returnSection === "budget") {
      setActiveSection("budget")
    } else if (returnSection === "dashboard") {
      setActiveSection("dashboard")
    } else {
      setActiveSection("planner")
      setPlannerSubView("list")
    }
  }

  const handleSelectCasePreset = (presetId: AccommodationCasePresetId) => {
    setActiveCasePreset(presetId)
    setPlans((prev) =>
      applyAccommodationCasePreset(prev, "2568100001", presetId)
    )
  }

  const handleSelectVanCasePreset = (presetId: VanCasePresetId) => {
    setActiveVanCasePreset(presetId)
    setPlans((prev) => applyVanCasePreset(prev, "2568100004", presetId))
  }

  const handleSelectRentalCarCasePreset = (presetId: RentalCarCasePresetId) => {
    setActiveRentalCarCasePreset(presetId)
    setPlans((prev) => applyRentalCarCasePreset(prev, "2568100005", presetId))
  }

  const handleSelectFlightCasePreset = (presetId: FlightCasePresetId) => {
    setActiveFlightCasePreset(presetId)
    setPlans((prev) => applyFlightCasePreset(prev, "2568100006", presetId))
  }

  const handleCancelPlan = (documentNo: string, reason: string) => {
    const result = cancelWorkPlan(plans, documentNo, reason, "20/11/69 10:15")
    if (result.error) {
      return result.error
    }
    setPlans(result.plans)
    showToast(`ยกเลิกแผนงานเอกสาร ${documentNo} เรียบร้อยแล้ว`)
    return undefined
  }

  const handleRestorePlan = (documentNo: string) => {
    setPlans((prev) => restoreWorkPlan(prev, documentNo))
    showToast(`กู้คืนแผนงานเอกสาร ${documentNo} กลับสู่สถานะรอ GA ประมาณค่าใช้จ่าย`)
  }

  const handleUpdateEstimate = (
    documentNo: string,
    input: {
      pricePerPerson: number
      itemTotal: number
      allowanceTotal: number
      markApproved: boolean
    }
  ) => {
    const result = updatePlanEstimate(plans, documentNo, input)
    if (result.error) {
      return result.error
    }
    setPlans(result.plans)
    if (input.markApproved) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.documentNo === documentNo ? { ...n, read: true } : n
        )
      )
    }
    return undefined
  }

  const handleCreatePlan = (payload: {
    planName: string
    project: string
    travelDateRange: string
    objective: string
    expectedOutcome: string
    locationName: string
    province: string
  }) => {
    const nextDocNo = createNextDocumentNo(plans)
    const newPlan: WorkPlan = {
      documentNo: nextDocNo,
      status: "pending_ga",
      hasExpense: true,
      planName: payload.planName,
      travelDateRange: payload.travelDateRange,
      objective: payload.objective,
      expectedOutcome: payload.expectedOutcome,
      project: payload.project,
      employees: [
        {
          code: CURRENT_USER.employeeCode,
          name: CURRENT_USER.name,
          initials: CURRENT_USER.initials,
          avatarTone: "teal",
          allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (2วัน)",
          allowanceDays: 2,
          dailyAllowanceRate: 0,
        },
      ],
      onsiteLocations: [
        {
          id: `loc-${nextDocNo}`,
          order: 1,
          name: payload.locationName,
          addressNo: "-",
          villageOrMoo: "-",
          soi: "-",
          road: "-",
          province: payload.province,
          district: "-",
          subdistrict: "-",
          postalCode: "-",
          dateRange: payload.travelDateRange,
          assignedEmployees: [
            { code: CURRENT_USER.employeeCode, name: CURRENT_USER.name },
          ],
        },
      ],
      jvCompanies: [
        {
          id: `jv-${nextDocNo}`,
          companyName: "บริษัท บลิซเทค จำกัด",
          approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
          sharePercent: 100,
        },
      ],
      accommodations: [
        {
          id: `acc-${nextDocNo}`,
          order: 1,
          categoryLabel: "ที่พัก",
          selectionMode: "ga_assigned",
          gaBadgeLabel: "GA กำหนดที่พักให้",
          stayType: "รายวัน",
          checkInOutRange: payload.travelDateRange,
          travelCompanions: [
            { code: CURRENT_USER.employeeCode, name: CURRENT_USER.name },
          ],
          totalRooms: 1,
          rooms: [
            {
              roomNumber: 1,
              bedType: "เตียงเดี่ยว",
              roommates: [
                { code: CURRENT_USER.employeeCode, name: CURRENT_USER.name },
              ],
            },
          ],
          pricePerPerson: 1500,
          itemTotal: 3000,
        },
      ],
      allowanceOverride: 0,
    }

    setPlans((prev) => [newPlan, ...prev])
    setSelectedDocNo(nextDocNo)
    setPlannerSubView("detail")
    showToast(`สร้างแผนงานเลขที่เอกสาร ${nextDocNo} เรียบร้อยแล้ว`)
    return undefined
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleSelectNotification = (notification: PlannerNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    )
    handleOpenPlanDetail(notification.documentNo)
  }

  const activeViewKey =
    activeSection === "planner"
      ? `planner-${plannerSubView}-${selectedPlan.documentNo}`
      : activeSection

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15.5rem",
        } as React.CSSProperties
      }
      className="bg-[#f2f6f5]"
    >
      <AppSidebar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      <SidebarInset className="min-h-[calc(100svh-1rem)] border border-[#e6eeec] bg-white shadow-xs">
        <TopHeader
          user={CURRENT_USER}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onSelectNotification={handleSelectNotification}
          onNavigateBudget={() => setActiveSection("budget")}
          onShowStatusToast={showToast}
        />

        <div className="flex-1 bg-white md:rounded-b-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeViewKey}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSection === "planner" && plannerSubView === "detail" && (
                <PlanDetailView
                  plan={selectedPlan}
                  activeCasePreset={activeCasePreset}
                  onSelectCasePreset={handleSelectCasePreset}
                  activeVanCasePreset={activeVanCasePreset}
                  onSelectVanCasePreset={handleSelectVanCasePreset}
                  activeRentalCarCasePreset={activeRentalCarCasePreset}
                  onSelectRentalCarCasePreset={handleSelectRentalCarCasePreset}
                  activeFlightCasePreset={activeFlightCasePreset}
                  onSelectFlightCasePreset={handleSelectFlightCasePreset}
                  onBackToList={handleBackFromDetail}
                  onCancelPlan={handleCancelPlan}
                  onRestorePlan={handleRestorePlan}
                  onShowToast={showToast}
                />
              )}

              {activeSection === "planner" && plannerSubView === "list" && (
                <PlanListView
                  plans={plans}
                  onSelectPlan={(docNo) =>
                    handleOpenPlanDetail(docNo, "planner")
                  }
                  onCreatePlan={handleCreatePlan}
                />
              )}

              {activeSection === "dashboard" && (
                <DashboardView
                  plans={plans}
                  onOpenPlan={(docNo) =>
                    handleOpenPlanDetail(docNo, "dashboard")
                  }
                  onOpenBudget={() => setActiveSection("budget")}
                  onOpenAllPlans={() => {
                    setActiveSection("planner")
                    setPlannerSubView("list")
                  }}
                />
              )}

              {activeSection === "budget" && (
                <BudgetManagementView
                  plans={plans}
                  initialSelectedDocNo={selectedPlan.documentNo}
                  onUpdateEstimate={handleUpdateEstimate}
                  onViewPlanDetail={(docNo) =>
                    handleOpenPlanDetail(docNo, "budget")
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Transient status toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              className="fixed right-5 bottom-5 z-50 rounded-lg border border-[#cbe2de] bg-[#145952] px-4 py-2.5 text-xs font-medium text-white shadow-lg"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  )
}
