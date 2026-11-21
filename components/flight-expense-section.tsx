"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Briefcase,
  Calendar,
  ChevronUp,
  Clock,
  Eye,
  Plane,
  Users,
} from "lucide-react"
import {
  PastelAirplaneIllustration,
  PastelFlightExtraExpenseIcon,
  PastelPdfAttachmentIcon,
} from "@/components/pastel-illustrations"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { FlightAttachment, FlightItem } from "@/lib/planner-data"
import {
  calculateFlightAdditionalTotal,
  formatThaiCompactAmount,
  formatThaiCurrency,
} from "@/lib/planner-logic"
import { cn } from "@/lib/utils"

interface FlightExpenseSectionProps {
  documentNo: string
  flights: FlightItem[]
  collapsedExtras: Record<string, boolean>
  onToggleAdditionalExpense: (itemKey: string) => void
}

interface TicketPreviewState {
  attachment: FlightAttachment
  flight: FlightItem
}

export function FlightExpenseSection({
  documentNo,
  flights,
  collapsedExtras,
  onToggleAdditionalExpense,
}: FlightExpenseSectionProps) {
  const [ticketPreview, setTicketPreview] =
    React.useState<TicketPreviewState | null>(null)

  if (flights.length === 0) return null

  return (
    <>
      <div
        data-testid="flight-section-card"
        className="mt-4 rounded-2xl border border-[#d6e2e0] bg-white p-5 sm:p-6"
      >
        {/* Shared Category Header: เครื่องบิน */}
        <div className="flex items-center gap-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] ring-1 ring-[#d7eaf3]"
            aria-hidden="true"
          >
            <PastelAirplaneIllustration className="size-10" />
          </div>
          <span className="text-[15.5px] font-semibold text-[#1f7a70]">
            {flights[0].categoryLabel}
          </span>
        </div>

        <div className="mt-4">
          {flights.map((flight, flightIdx) => {
            const flightExtraKey = `${flight.id}-extra`
            const hasAdditional =
              !!flight.additionalExpenses &&
              flight.additionalExpenses.length > 0
            const flightAdditionalTotal = calculateFlightAdditionalTotal(flight)
            const isExpanded = !collapsedExtras[flightExtraKey]
            const isOneWay = flight.tripType === "one_way"

            return (
              <div
                key={flight.id}
                data-testid={`flight-item-${flight.order}`}
                className={cn(
                  flightIdx > 0 &&
                    "mt-7 border-t border-dashed border-[#b9dcd6] pt-6"
                )}
              >
                {/* Item Order & Trip-Type Badge (เที่ยวเดียว / ไป - กลับ / หลายเมือง(ต่อเครื่อง)) */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-[#1e293b]">
                    รายการที่ {flight.order}
                  </span>
                  <span
                    data-testid="flight-trip-type-badge"
                    className="inline-flex items-center rounded-md bg-[#e5f5f2] px-3 py-1 text-xs font-medium text-[#1b7a6e]"
                  >
                    {flight.tripTypeBadgeLabel}
                  </span>
                </div>

                {/* Flight Leg Cards */}
                <div className="mt-3.5 space-y-3">
                  {flight.legs.map((leg) => (
                    <div
                      key={leg.id}
                      data-testid={`flight-leg-${leg.id}`}
                      className="rounded-xl border border-[#ebf2f1] bg-[#f4f8f7] px-4 py-4 sm:px-5"
                    >
                      <p className="text-[13.5px] font-semibold text-[#1f7a70]">
                        {leg.heading}
                      </p>

                      <div className="mt-2.5 space-y-2.5 text-[13.5px]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              จังหวัดต้นทาง-ปลายทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {leg.routeLabel}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              วันที่เดินทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {leg.travelDate}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              ช่วงเวลาที่สะดวกเดินทาง :
                            </span>
                            <span className="font-semibold text-[#1e293b] tabular-nums">
                              {leg.preferredTimeWindow}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-[#7e8a95]">
                              เพิ่มน้ำหนักกระเป๋า :
                            </span>
                            <span className="font-semibold text-[#1e293b]">
                              {leg.extraBaggage}
                            </span>
                          </div>
                        </div>

                        {/* One-Way Reference Placement: Co-travelers & Note inside the single leg card */}
                        {isOneWay && (
                          <>
                            <div className="flex flex-wrap items-center gap-2 pt-0.5">
                              <span className="text-[#7e8a95]">
                                พนักงานร่วมเดินทาง :
                              </span>
                              {flight.travelCompanions.map((companion) => (
                                <span
                                  key={companion.code}
                                  className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                                >
                                  {companion.code} {companion.name}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-baseline gap-1.5">
                              <span className="text-[#7e8a95]">
                                หมายเหตุ :
                              </span>
                              <span className="font-medium text-[#1e293b]">
                                {flight.legNote ?? "-"}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Item Cost Footer (placed directly below leg cards matching all 3 uploaded screenshots) */}
                <div className="mt-4 flex flex-wrap items-center justify-end gap-6 pt-0.5 text-[13.5px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#7e8a95]">ราคาต่อคน :</span>
                    <span className="font-medium text-[#1e293b] tabular-nums">
                      {formatThaiCurrency(flight.pricePerPerson)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7e8a95]">รวม :</span>
                    <span className="font-semibold text-[#1e293b] tabular-nums">
                      {formatThaiCurrency(flight.itemTotal)}
                    </span>
                  </div>
                </div>

                {/* Round-Trip & Multi-City Reference Placement: Co-travelers below pricing */}
                {!isOneWay && (
                  <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[13.5px]">
                    <span className="text-[#7e8a95]">
                      พนักงานร่วมเดินทาง :
                    </span>
                    {flight.travelCompanions.map((companion) => (
                      <span
                        key={companion.code}
                        className="inline-flex items-center rounded-md bg-[#ebf6f9] px-2.5 py-1 text-xs font-medium text-[#1c6c75]"
                      >
                        {companion.code} {companion.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Additional Document Attachments (ไฟล์แนบเอกสารเพิ่มเติม :) */}
                {flight.attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[13px] text-[#7e8a95]">
                      ไฟล์แนบเอกสารเพิ่มเติม :
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {flight.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#e5ebea] bg-white px-4 py-3 shadow-[0_1px_4px_rgba(59,74,107,0.03)] sm:w-[272px]"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <PastelPdfAttachmentIcon className="size-8 shrink-0" />
                            <span className="truncate text-[13px] font-medium text-[#1e293b]">
                              {attachment.fileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            aria-label={`ดูตัวอย่างไฟล์ ${attachment.fileName} (รายการที่ ${flight.order})`}
                            onClick={() =>
                              setTicketPreview({ attachment, flight })
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

                {/* Outer Note Line */}
                <div className="mt-4 flex flex-wrap items-baseline gap-1.5 text-[13.5px]">
                  <span className="text-[#7e8a95]">หมายเหตุ :</span>
                  <span className="font-medium text-[#1e293b]">
                    {flight.note}
                  </span>
                </div>

                {/* Collapsible Additional Expenses Block (ค่าใช้จ่ายเพิ่มเติม — Mint Container) */}
                {hasAdditional && flight.additionalExpenses && (
                  <div className="mt-3.5 overflow-hidden rounded-xl border border-[#dfeeec] bg-[#edf7f6]">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={`${flightExtraKey}-panel`}
                      onClick={() => onToggleAdditionalExpense(flightExtraKey)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#e3f2f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1f7a70]"
                    >
                      <span className="flex items-center gap-2 text-[13.5px]">
                        <PastelFlightExtraExpenseIcon className="size-6" />
                        <span className="font-semibold text-[#1b7a6e]">
                          ค่าใช้จ่ายเพิ่มเติม :
                        </span>
                        <span
                          data-testid="flight-additional-total"
                          className="font-semibold text-[#1e293b] tabular-nums"
                        >
                          {formatThaiCompactAmount(flightAdditionalTotal)}
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
                          id={`${flightExtraKey}-panel`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
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
                                ทั้งหมด : {flight.additionalExpenses.length}{" "}
                                รายการ
                              </p>

                              <div className="mt-2.5 divide-y divide-dashed divide-[#e4eeec]">
                                {flight.additionalExpenses.map((expense) => (
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
                                          {formatThaiCurrency(expense.price)}
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

      {/* Read-Only E-Ticket Preview Dialog (Preview Only, No Download CTA) */}
      <Dialog
        open={!!ticketPreview}
        onOpenChange={(open) => {
          if (!open) setTicketPreview(null)
        }}
      >
        <DialogContent
          data-testid="flight-ticket-preview-dialog"
          className="sm:max-w-lg"
        >
          {ticketPreview && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fff4f2] ring-1 ring-[#f6d9d4]">
                    <PastelPdfAttachmentIcon className="size-8" />
                  </span>
                  <div className="min-w-0 text-left">
                    <DialogTitle className="text-base font-bold text-[#1e293b]">
                      ตัวอย่างเอกสาร — {ticketPreview.attachment.fileName}
                    </DialogTitle>
                    <DialogDescription className="mt-0.5 text-xs text-[#64748b]">
                      เอกสารอิเล็กทรอนิกส์สำหรับแผนงานเลขที่{" "}
                      <span className="font-semibold text-[#1f7a70] tabular-nums">
                        {documentNo}
                      </span>{" "}
                      · ประเภท {ticketPreview.flight.tripTypeBadgeLabel}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Electronic Ticket Document Sheet Preview */}
              <div className="overflow-hidden rounded-xl border border-[#dce8e6] bg-[#fafdfc]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#c7deda] bg-[#eef7f6] px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1f7a70]">
                    <Plane className="size-4 shrink-0" aria-hidden="true" />
                    <span>{ticketPreview.attachment.airlineName}</span>
                  </div>
                  <div className="text-xs text-[#475569] tabular-nums">
                    รหัสการจอง:{" "}
                    <span className="font-mono font-bold text-[#1e293b]">
                      {ticketPreview.attachment.bookingRef}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {ticketPreview.flight.legs.map((leg) => (
                    <div
                      key={leg.id}
                      className="rounded-lg border border-[#e6efed] bg-white px-3.5 py-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#1f7a70]">
                          {leg.heading}
                        </span>
                        <span className="text-[11.5px] font-medium text-[#64748b]">
                          {ticketPreview.attachment.seatClass}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-[#1e293b]">
                        {leg.routeLabel}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#475569]">
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Calendar
                            className="size-3.5 text-[#1f7a70]"
                            aria-hidden="true"
                          />
                          วันที่ {leg.travelDate}
                        </span>
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Clock
                            className="size-3.5 text-[#1f7a70]"
                            aria-hidden="true"
                          />
                          เวลา {leg.preferredTimeWindow}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase
                            className="size-3.5 text-[#1f7a70]"
                            aria-hidden="true"
                          />
                          กระเป๋าเพิ่ม: {leg.extraBaggage}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e8f0ef] pt-3 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-[#475569]">
                      <Users
                        className="size-3.5 text-[#1f7a70]"
                        aria-hidden="true"
                      />
                      <span>ผู้โดยสารร่วมเดินทาง:</span>
                      {ticketPreview.flight.travelCompanions.map((c) => (
                        <span
                          key={c.code}
                          className="rounded-md bg-[#ebf6f9] px-2 py-0.5 font-medium text-[#1c6c75]"
                        >
                          {c.code} {c.name}
                        </span>
                      ))}
                    </div>

                    <div className="font-semibold text-[#1e293b] tabular-nums">
                      ค่าตั๋วรวม{" "}
                      <span className="text-[#1f7a70]">
                        {formatThaiCurrency(ticketPreview.flight.itemTotal)} บาท
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTicketPreview(null)}
                  className="border-[#6ea49e] text-xs font-medium text-[#1f7a70] hover:bg-[#edf6f4]"
                >
                  ปิดหน้าต่าง
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
