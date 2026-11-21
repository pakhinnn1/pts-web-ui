export type PlanStatus =
  | "draft"
  | "pending_ga"
  | "waiting_summary"
  | "jv_pending"
  | "jv_approved"
  | "jv_rejected"
  | "approved"
  | "cancelled"

export type BudgetAnalysisStatus = "waiting_analysis" | "analyzed"


export interface PlanEmployee {
  code: string
  name: string
  initials: string
  avatarTone: "teal" | "slate" | "amber" | "sky"
  allowanceLabel: string
  allowanceDays: number
  dailyAllowanceRate: number
}

export interface OnsiteLocation {
  id: string
  order: number
  name: string
  addressNo: string
  villageOrMoo: string
  soi: string
  road: string
  province: string
  district: string
  subdistrict: string
  postalCode: string
  dateRange: string
  assignedEmployees: { code: string; name: string }[]
}

export interface JvCompany {
  id: string
  companyName: string
  approverName: string
  sharePercent: number
}

export interface AdditionalExpenseItem {
  id: string
  order: number
  note: string
  roommates: { code: string; name: string }[]
  price: number
}

export interface RoomDetail {
  roomNumber: number
  bedType: string
  roommates: { code: string; name: string }[]
  additionalExpenses?: AdditionalExpenseItem[]
}

export type AccommodationSelectionMode = "ga_assigned" | "self_selected"

export type AccommodationCasePresetId =
  | "ga_single"
  | "self_multi"
  | "self_single"

export interface AccommodationItem {
  id: string
  order: number
  categoryLabel: string
  selectionMode: AccommodationSelectionMode
  gaBadgeLabel: string
  hotelName?: string
  stayType: string
  checkInOutRange: string
  travelCompanions: { code: string; name: string }[]
  note?: string
  totalRooms: number
  rooms: RoomDetail[]
  pricePerPerson: number
  itemTotal: number
}

export type RouteStopKind = "origin" | "stop" | "destination"

export interface RouteStop {
  id: string
  kind: RouteStopKind
  label: string
  placeName: string
  addressSummary: string
  mapUrl: string
}

export type VanTripType = "overnight" | "one_way" | "standard"

export type VanCasePresetId =
  | "van_overnight"
  | "van_oneway_stops"
  | "van_multi"

export interface VanTripItem {
  id: string
  order: number
  categoryLabel: string
  tripType: VanTripType
  tripTypeBadgeLabel?: string
  departureDateTime: string
  returnDateTime?: string
  provinceRoute: string
  travelCompanions: { code: string; name: string }[]
  note: string
  routeStops: RouteStop[]
  pricePerPerson: number
  itemTotal: number
  additionalExpenses?: AdditionalExpenseItem[]
}

export interface RentalCarAttachment {
  id: string
  fileName: string
  fileType: "png" | "jpg" | "pdf"
}

export type RentalCarCasePresetId = "rental_single" | "rental_multi"

export interface RentalCarItem {
  id: string
  order: number
  categoryLabel: string
  pickupLocation: string
  returnLocation: string
  pickupDateTime: string
  returnDateTime: string
  driver: { code: string; name: string }
  travelCompanions: { code: string; name: string }[]
  attachments: RentalCarAttachment[]
  note: string
  pricePerPerson: number
  itemTotal: number
  additionalExpenses?: AdditionalExpenseItem[]
}

export type FlightTripType = "one_way" | "round_trip" | "multi_city"

export type FlightCasePresetId =
  | "flight_one_way"
  | "flight_round_trip"
  | "flight_multi_city"

export interface FlightLeg {
  id: string
  heading: string
  routeLabel: string
  travelDate: string
  preferredTimeWindow: string
  extraBaggage: string
}

export interface FlightAttachment {
  id: string
  fileName: string
  fileType: "pdf" | "png" | "jpg"
  bookingRef: string
  airlineName: string
  seatClass: string
}

export interface FlightItem {
  id: string
  order: number
  categoryLabel: string
  tripType: FlightTripType
  tripTypeBadgeLabel: string
  legs: FlightLeg[]
  travelCompanions: { code: string; name: string }[]
  legNote?: string
  attachments: FlightAttachment[]
  note: string
  pricePerPerson: number
  itemTotal: number
  additionalExpenses?: AdditionalExpenseItem[]
}

export interface WorkPlan {
  documentNo: string
  status: PlanStatus
  hasExpense: boolean
  planName: string
  travelDateRange: string
  objective: string
  expectedOutcome: string
  project: string
  employees: PlanEmployee[]
  onsiteLocations: OnsiteLocation[]
  jvCompanies: JvCompany[]
  vanTrips?: VanTripItem[]
  rentalCars?: RentalCarItem[]
  flights?: FlightItem[]
  accommodations: AccommodationItem[]
  allowanceOverride: number
  jvApprovalProgress?: string
  reviewerName?: string
  reviewedAt?: string
  analysisStatus?: BudgetAnalysisStatus
  rejectionReason?: string
  cancellationReason?: string
  cancelledAt?: string
}

export interface PlannerNotification {
  id: string
  title: string
  description: string
  documentNo: string
  timeAgo: string
  read: boolean
}

export interface UserProfile {
  name: string
  role: string
  email: string
  department: string
  employeeCode: string
  initials: string
}

export const CURRENT_USER: UserProfile = {
  name: "ฟ้าลดา ฐานานุศักดิ์",
  role: "UX/UI Design",
  email: "farlada.t@bliztech.co.th",
  department: "Product & Experience Design",
  employeeCode: "60118",
  initials: "ฟฐ",
}

export const INITIAL_NOTIFICATIONS: PlannerNotification[] = [
  {
    id: "notif-1",
    title: "รอ GA ประมาณค่าใช้จ่าย",
    description:
      "เอกสารเลขที่ 2568100001 แผนงาน A อยู่ระหว่างรอฝ่าย GA ตรวจสอบค่าที่พัก",
    documentNo: "2568100001",
    timeAgo: "12 นาทีที่แล้ว",
    read: false,
  },
]

function createVanFuelAdditionalExpenses(
  prefix: string
): AdditionalExpenseItem[] {
  return [
    {
      id: `${prefix}-fuel-1`,
      order: 1,
      note: "ค่าน้ำมัน",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 1200,
    },
  ]
}

function createDirectRouteStops(prefix: string): RouteStop[] {
  return [
    {
      id: `${prefix}-origin`,
      kind: "origin",
      label: "จุดรับ(ต้นทาง)",
      placeName: "บริษัทอินเทอร์เน็ต ประเทศไทย จำกัด(มหาชน)",
      addressSummary:
        "1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10-12 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
      mapUrl: "https://maps.google.com/?q=13.7485,100.5695",
    },
    {
      id: `${prefix}-destination`,
      kind: "destination",
      label: "จุดส่ง(ปลายทาง)",
      placeName: "บริษัทอินเทอร์เน็ต ประเทศไทย จำกัด(มหาชน) สาขาเชียงใหม่",
      addressSummary:
        "ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200 (ศูนย์ปฏิบัติการภาคเหนือ)",
      mapUrl: "https://maps.google.com/?q=18.7883,98.9853",
    },
  ]
}

function createRouteStopsWithWaypoints(prefix: string): RouteStop[] {
  return [
    {
      id: `${prefix}-origin`,
      kind: "origin",
      label: "จุดรับ(ต้นทาง)",
      placeName: "บริษัทอินเทอร์เน็ต ประเทศไทย จำกัด(มหาชน)",
      addressSummary:
        "1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10-12 ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310",
      mapUrl: "https://maps.google.com/?q=13.7485,100.5695",
    },
    {
      id: `${prefix}-stop-1`,
      kind: "stop",
      label: "จุดแวะที่ 1",
      placeName: "ปั๊มน้ำมัน ปตท.",
      addressSummary:
        "สถานีบริการน้ำมัน ปตท. ถนนสายเอเชีย กม.54 อำเภอบางปะอิน จังหวัดพระนครศรีอยุธยา",
      mapUrl: "https://maps.google.com/?q=14.2301,100.6088",
    },
    {
      id: `${prefix}-stop-2`,
      kind: "stop",
      label: "จุดแวะที่ 2",
      placeName: "ปั๊มน้ำมัน ปตท.",
      addressSummary:
        "สถานีบริการน้ำมัน ปตท. ถนนพหลโยธิน อำเภอเมืองตาก จังหวัดตาก (จุดพักรถและเติมน้ำมัน)",
      mapUrl: "https://maps.google.com/?q=16.8839,99.1258",
    },
    {
      id: `${prefix}-destination`,
      kind: "destination",
      label: "จุดส่ง(ปลายทาง)",
      placeName: "บริษัทอินเทอร์เน็ต ประเทศไทย จำกัด(มหาชน) สาขาเชียงใหม่",
      addressSummary:
        "ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200 (ศูนย์ปฏิบัติการภาคเหนือ)",
      mapUrl: "https://maps.google.com/?q=18.7883,98.9853",
    },
  ]
}

export interface VanCasePreset {
  id: VanCasePresetId
  label: string
  shortSummary: string
  vanTrips: VanTripItem[]
}

export const VAN_CASE_PRESETS: Record<VanCasePresetId, VanCasePreset> = {
  van_overnight: {
    id: "van_overnight",
    label: "ค้างคืน (1 รายการ)",
    shortSummary: "รวม 4,400.00",
    vanTrips: [
      {
        id: "van-overnight-1",
        order: 1,
        categoryLabel: "รถตู้",
        tripType: "overnight",
        tripTypeBadgeLabel: "ค้างคืน",
        departureDateTime: "05/01/2026  10:00",
        returnDateTime: "07/01/2026  15:00",
        provinceRoute: "กรุงเทพมหานคร - เชียงใหม่",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        routeStops: createDirectRouteStops("overnight-1"),
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createVanFuelAdditionalExpenses("overnight-1"),
      },
    ],
  },
  van_oneway_stops: {
    id: "van_oneway_stops",
    label: "เที่ยวเดียว มีจุดแวะ (1 รายการ)",
    shortSummary: "รวม 4,400.00",
    vanTrips: [
      {
        id: "van-oneway-1",
        order: 1,
        categoryLabel: "รถตู้",
        tripType: "one_way",
        tripTypeBadgeLabel: "เที่ยวเดียว",
        departureDateTime: "05/01/2026  10:00",
        provinceRoute: "กรุงเทพมหานคร - เชียงใหม่",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        routeStops: createRouteStopsWithWaypoints("oneway-1"),
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createVanFuelAdditionalExpenses("oneway-1"),
      },
    ],
  },
  van_multi: {
    id: "van_multi",
    label: "หลายรายการ (2 รายการ)",
    shortSummary: "รวม 8,800.00",
    vanTrips: [
      {
        id: "van-multi-1",
        order: 1,
        categoryLabel: "รถตู้",
        tripType: "standard",
        departureDateTime: "05/01/2026  10:00",
        provinceRoute: "กรุงเทพมหานคร - เชียงใหม่",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        routeStops: createRouteStopsWithWaypoints("multi-1"),
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createVanFuelAdditionalExpenses("multi-1"),
      },
      {
        id: "van-multi-2",
        order: 2,
        categoryLabel: "รถตู้",
        tripType: "standard",
        departureDateTime: "05/01/2026  10:00",
        provinceRoute: "กรุงเทพมหานคร - เชียงใหม่",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        routeStops: createRouteStopsWithWaypoints("multi-2"),
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createVanFuelAdditionalExpenses("multi-2"),
      },
    ],
  },
}

export interface RentalCarCasePreset {
  id: RentalCarCasePresetId
  label: string
  shortSummary: string
  rentalCars: RentalCarItem[]
}

function createRentalCarAttachments(prefix: string): RentalCarAttachment[] {
  return [
    {
      id: `${prefix}-id-card`,
      fileName: "สำเนาบัตรประชาชน .png",
      fileType: "png",
    },
    {
      id: `${prefix}-driver-license`,
      fileName: "สำเนาใบขับขี่ .png",
      fileType: "png",
    },
  ]
}

function createRentalCarLateFeeExpenses(
  prefix: string
): AdditionalExpenseItem[] {
  return [
    {
      id: `${prefix}-late-fee-1`,
      order: 1,
      note: "ค่าปรับคืนรถสายตามกำหนด",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 500,
    },
  ]
}

export const RENTAL_CAR_CASE_PRESETS: Record<
  RentalCarCasePresetId,
  RentalCarCasePreset
> = {
  rental_single: {
    id: "rental_single",
    label: "1 รายการ (3,700.00)",
    shortSummary: "รวม 3,700.00",
    rentalCars: [
      {
        id: "rental-single-1",
        order: 1,
        categoryLabel: "รถเช่า",
        pickupLocation: "สนามบินสุวรรณภูมิ",
        returnLocation: "สนามบินสุวรรณภูมิ",
        pickupDateTime: "05/01/2026  10:00",
        returnDateTime: "08/01/2026  10:00",
        driver: { code: "62125", name: "กิตติคุณ ใจภักดี" },
        travelCompanions: [{ code: "65261", name: "รุสลาน มาลินี" }],
        attachments: createRentalCarAttachments("rental-single-1"),
        note: "-",
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createRentalCarLateFeeExpenses("rental-single-1"),
      },
    ],
  },
  rental_multi: {
    id: "rental_multi",
    label: "2 รายการ (7,400.00)",
    shortSummary: "รวม 7,400.00",
    rentalCars: [
      {
        id: "rental-multi-1",
        order: 1,
        categoryLabel: "รถเช่า",
        pickupLocation: "สนามบินสุวรรณภูมิ",
        returnLocation: "สนามบินสุวรรณภูมิ",
        pickupDateTime: "05/01/2026  10:00",
        returnDateTime: "08/01/2026  10:00",
        driver: { code: "62125", name: "กิตติคุณ ใจภักดี" },
        travelCompanions: [{ code: "65261", name: "รุสลาน มาลินี" }],
        attachments: createRentalCarAttachments("rental-multi-1"),
        note: "-",
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createRentalCarLateFeeExpenses("rental-multi-1"),
      },
      {
        id: "rental-multi-2",
        order: 2,
        categoryLabel: "รถเช่า",
        pickupLocation: "สนามบินสุวรรณภูมิ",
        returnLocation: "สนามบินสุวรรณภูมิ",
        pickupDateTime: "05/01/2026  12:00",
        returnDateTime: "08/01/2026  13:45",
        driver: { code: "62125", name: "กิตติคุณ ใจภักดี" },
        travelCompanions: [{ code: "65261", name: "รุสลาน มาลินี" }],
        attachments: createRentalCarAttachments("rental-multi-2"),
        note: "-",
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses: createRentalCarLateFeeExpenses("rental-multi-2"),
      },
    ],
  },
}

export interface FlightCasePreset {
  id: FlightCasePresetId
  label: string
  shortSummary: string
  flights: FlightItem[]
}

function createFlightAttachments(
  prefix: string,
  bookingRef: string
): FlightAttachment[] {
  return [
    {
      id: `${prefix}-ticket-pdf`,
      fileName: "ตั๋วเครื่องบิน .pdf",
      fileType: "pdf",
      bookingRef,
      airlineName: "Thai Airways (Corporate Fare)",
      seatClass: "Economy Flex (Y)",
    },
  ]
}

function createFlightAdditionalExpenses(
  prefix: string
): AdditionalExpenseItem[] {
  return [
    {
      id: `${prefix}-inflight-1`,
      order: 1,
      note: "ซื้ออาหารบนเครื่อง",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 150,
    },
    {
      id: `${prefix}-inflight-2`,
      order: 2,
      note: "ซื้อของที่ระลึก",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 800,
    },
  ]
}

export const FLIGHT_CASE_PRESETS: Record<
  FlightCasePresetId,
  FlightCasePreset
> = {
  flight_one_way: {
    id: "flight_one_way",
    label: "เที่ยวเดียว (2,550.00)",
    shortSummary: "รวม 2,550.00",
    flights: [
      {
        id: "flight-oneway-1",
        order: 1,
        categoryLabel: "เครื่องบิน",
        tripType: "one_way",
        tripTypeBadgeLabel: "เที่ยวเดียว",
        legs: [
          {
            id: "flight-oneway-leg-1",
            heading: "วันไป",
            routeLabel:
              "ท่าอากาศยานสุวรรณภูมิ - ท่าอากาศยานนานาชาติเชียงใหม่",
            travelDate: "05/01/69",
            preferredTimeWindow: "10:00 - 11:00",
            extraBaggage: "10 กิโลกรัม",
          },
        ],
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        legNote: "-",
        attachments: createFlightAttachments("flight-oneway-1", "BLZ-OW-6901"),
        note: "-",
        pricePerPerson: 800,
        itemTotal: 1600,
        additionalExpenses: createFlightAdditionalExpenses("flight-oneway-1"),
      },
    ],
  },
  flight_round_trip: {
    id: "flight_round_trip",
    label: "ไป - กลับ (4,150.00)",
    shortSummary: "รวม 4,150.00",
    flights: [
      {
        id: "flight-roundtrip-1",
        order: 1,
        categoryLabel: "เครื่องบิน",
        tripType: "round_trip",
        tripTypeBadgeLabel: "ไป - กลับ",
        legs: [
          {
            id: "flight-roundtrip-leg-1",
            heading: "วันไป",
            routeLabel:
              "ท่าอากาศยานสุวรรณภูมิ - ท่าอากาศยานนานาชาติเชียงใหม่",
            travelDate: "05/01/69",
            preferredTimeWindow: "10:00 - 11:00",
            extraBaggage: "10 กิโลกรัม",
          },
          {
            id: "flight-roundtrip-leg-2",
            heading: "วันกลับ",
            routeLabel:
              "ท่าอากาศยานนานาชาติเชียงใหม่ - ท่าอากาศยานสุวรรณภูมิ",
            travelDate: "07/01/69",
            preferredTimeWindow: "11:00 - 12:00",
            extraBaggage: "-",
          },
        ],
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        attachments: createFlightAttachments(
          "flight-roundtrip-1",
          "BLZ-RT-6905"
        ),
        note: "-",
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses:
          createFlightAdditionalExpenses("flight-roundtrip-1"),
      },
    ],
  },
  flight_multi_city: {
    id: "flight_multi_city",
    label: "หลายเมือง(ต่อเครื่อง) (4,150.00)",
    shortSummary: "รวม 4,150.00",
    flights: [
      {
        id: "flight-multicity-1",
        order: 1,
        categoryLabel: "เครื่องบิน",
        tripType: "multi_city",
        tripTypeBadgeLabel: "หลายเมือง(ต่อเครื่อง)",
        legs: [
          {
            id: "flight-multicity-leg-1",
            heading: "เที่ยวที่ 1",
            routeLabel:
              "ท่าอากาศยานสุวรรณภูมิ - ท่าอากาศยานนานาชาติเชียงใหม่",
            travelDate: "05/01/69",
            preferredTimeWindow: "10:00 - 11:00",
            extraBaggage: "10 กิโลกรัม",
          },
          {
            id: "flight-multicity-leg-2",
            heading: "เที่ยวที่ 2",
            routeLabel: "ท่าอากาศยานนานาชาติเชียงใหม่ - ท่าอากาศยานขอนแก่น",
            travelDate: "05/01/69",
            preferredTimeWindow: "15:00 - 17:10",
            extraBaggage: "10 กิโลกรัม",
          },
        ],
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        attachments: createFlightAttachments(
          "flight-multicity-1",
          "BLZ-MC-6909"
        ),
        note: "-",
        pricePerPerson: 1600,
        itemTotal: 3200,
        additionalExpenses:
          createFlightAdditionalExpenses("flight-multicity-1"),
      },
    ],
  },
}

function createStandardAdditionalExpenses(
  prefix: string
): AdditionalExpenseItem[] {
  return [
    {
      id: `${prefix}-exp-1`,
      order: 1,
      note: "ทำแก้วน้ำแตก",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 500,
    },
    {
      id: `${prefix}-exp-2`,
      order: 2,
      note: "Room Service",
      roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      price: 800,
    },
  ]
}

export interface AccommodationCasePreset {
  id: AccommodationCasePresetId
  label: string
  shortSummary: string
  accommodations: AccommodationItem[]
}

export const ACCOMMODATION_CASE_PRESETS: Record<
  AccommodationCasePresetId,
  AccommodationCasePreset
> = {
  ga_single: {
    id: "ga_single",
    label: "GA กำหนดที่พักให้ (1 รายการ)",
    shortSummary: "รวม 4,500.00",
    accommodations: [
      {
        id: "acc-ga-1",
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "ga_assigned",
        gaBadgeLabel: "GA กำหนดที่พักให้",
        stayType: "รายวัน",
        checkInOutRange: "05/01/2026 - 07/01/2026",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
            additionalExpenses: createStandardAdditionalExpenses("ga-1-r1"),
          },
        ],
        pricePerPerson: 1600,
        itemTotal: 3200,
      },
    ],
  },
  self_multi: {
    id: "self_multi",
    label: "กำหนดเอง (2 รายการ)",
    shortSummary: "รวม 9,000.00",
    accommodations: [
      {
        id: "acc-self-multi-1",
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "self_selected",
        gaBadgeLabel: "กำหนดเอง",
        hotelName: "โรงแรมแบงค็อก แมริออท มาร์คีส์ ควีนส์ปาร์ค",
        stayType: "รายวัน",
        checkInOutRange: "05/01/2026 - 07/01/2026",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
            additionalExpenses:
              createStandardAdditionalExpenses("self-multi-1-r1"),
          },
        ],
        pricePerPerson: 1600,
        itemTotal: 3200,
      },
      {
        id: "acc-self-multi-2",
        order: 2,
        categoryLabel: "ที่พัก",
        selectionMode: "self_selected",
        gaBadgeLabel: "กำหนดเอง",
        hotelName: "โรงแรมแบงค็อก แมริออท มาร์คีส์ ควีนส์ปาร์ค",
        stayType: "รายวัน",
        checkInOutRange: "05/01/2026 - 07/01/2026",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
            additionalExpenses:
              createStandardAdditionalExpenses("self-multi-2-r1"),
          },
        ],
        pricePerPerson: 1600,
        itemTotal: 3200,
      },
    ],
  },
  self_single: {
    id: "self_single",
    label: "กำหนดเอง (1 รายการ)",
    shortSummary: "รวม 4,500.00",
    accommodations: [
      {
        id: "acc-self-single-1",
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "self_selected",
        gaBadgeLabel: "กำหนดเอง",
        hotelName: "โรงแรมแบงค็อก แมริออท มาร์คีส์ ควีนส์ปาร์ค",
        stayType: "รายวัน",
        checkInOutRange: "05/01/2026 - 07/01/2026",
        travelCompanions: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
        note: "-",
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
            additionalExpenses:
              createStandardAdditionalExpenses("self-single-1-r1"),
          },
        ],
        pricePerPerson: 1600,
        itemTotal: 3200,
      },
    ],
  },
}

export const INITIAL_PLANS: WorkPlan[] = [
  {
    documentNo: "2568100001",
    status: "pending_ga",
    hasExpense: true,
    planName: "A",
    travelDateRange: "01/10/68 - 03/10/68",
    objective: "เพื่อนำเสนองานกับลูกค้า",
    expectedOutcome:
      "ได้ผลประกอบการตามเป้าหมายที่วางไว้ และประสบผลสำเร็จในการนำเสนองาน",
    project: "Planner Tag System",
    employees: [
      {
        code: "61221",
        name: "ธีรัคม์ ยงคง",
        initials: "ธย",
        avatarTone: "teal",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 0,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-1",
        order: 1,
        name: "โรงพยาบาลพระราม 9",
        addressNo: "39/5",
        villageOrMoo: "-",
        soi: "-",
        road: "-",
        province: "กรุงเทพมหานคร",
        district: "ห้วยขวาง",
        subdistrict: "บางกะปิ",
        postalCode: "10310",
        dateRange: "01/10/68 - 03/10/68",
        assignedEmployees: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "61221", name: "ธีรัคม์ ยงคง" },
        ],
      },
    ],
    jvCompanies: [
      {
        id: "jv-1",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    accommodations: ACCOMMODATION_CASE_PRESETS.ga_single.accommodations,
    allowanceOverride: 0,
  },
  {
    documentNo: "2568100004",
    status: "pending_ga",
    hasExpense: true,
    planName: "เดินทางนำเสนองานลูกค้า (รถตู้)",
    travelDateRange: "01/10/68 - 03/10/68",
    objective: "เพื่อนำเสนองานกับลูกค้า",
    expectedOutcome:
      "ได้ผลประกอบการตามเป้าหมายที่วางไว้ และประสบผลสำเร็จในการนำเสนองาน",
    project: "Planner Tag System",
    reviewerName: "วิโรจน์ คมปราชญ์",
    reviewedAt: "11/10/68 09:00น.",
    employees: [
      {
        code: "61221",
        name: "ธีรัคม์ ยงคง",
        initials: "ธย",
        avatarTone: "teal",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 0,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-van-1",
        order: 1,
        name: "โรงพยาบาลพระราม 9",
        addressNo: "39/5",
        villageOrMoo: "-",
        soi: "-",
        road: "-",
        province: "กรุงเทพมหานคร",
        district: "ห้วยขวาง",
        subdistrict: "บางกะปิ",
        postalCode: "10310",
        dateRange: "01/10/68 - 03/10/68",
        assignedEmployees: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "61221", name: "ธีรัคม์ ยงคง" },
        ],
      },
    ],
    jvCompanies: [
      {
        id: "jv-van-1",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    vanTrips: VAN_CASE_PRESETS.van_overnight.vanTrips,
    accommodations: [],
    allowanceOverride: 0,
  },
  {
    documentNo: "2568100005",
    status: "pending_ga",
    hasExpense: true,
    planName: "เดินทางนำเสนองานลูกค้า (รถเช่า)",
    travelDateRange: "01/10/68 - 03/10/68",
    objective: "เพื่อนำเสนองานกับลูกค้า",
    expectedOutcome:
      "ได้ผลประกอบการตามเป้าหมายที่วางไว้ และประสบผลสำเร็จในการนำเสนองาน",
    project: "Planner Tag System",
    reviewerName: "วีระชัย แสงจันทร์",
    reviewedAt: "11/10/68 10:30น.",
    employees: [
      {
        code: "61221",
        name: "ธีรัคม์ ยงคง",
        initials: "ธย",
        avatarTone: "teal",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 0,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-rental-1",
        order: 1,
        name: "โรงพยาบาลพระราม 9",
        addressNo: "39/5",
        villageOrMoo: "-",
        soi: "-",
        road: "-",
        province: "กรุงเทพมหานคร",
        district: "ห้วยขวาง",
        subdistrict: "บางกะปิ",
        postalCode: "10310",
        dateRange: "01/10/68 - 03/10/68",
        assignedEmployees: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "61221", name: "ธีรัคม์ ยงคง" },
        ],
      },
    ],
    jvCompanies: [
      {
        id: "jv-rental-1",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    rentalCars: RENTAL_CAR_CASE_PRESETS.rental_single.rentalCars,
    accommodations: [],
    allowanceOverride: 0,
  },
  {
    documentNo: "2568100006",
    status: "pending_ga",
    hasExpense: true,
    planName: "เดินทางนำเสนองานลูกค้า (เครื่องบิน)",
    travelDateRange: "01/10/68 - 03/10/68",
    objective: "เพื่อนำเสนองานกับลูกค้า",
    expectedOutcome:
      "ได้ผลประกอบการตามเป้าหมายที่วางไว้ และประสบผลสำเร็จในการนำเสนองาน",
    project: "Planner Tag System",
    reviewerName: "กาญจนา วัฒนา",
    reviewedAt: "11/10/68 11:15น.",
    employees: [
      {
        code: "61221",
        name: "ธีรัคม์ ยงคง",
        initials: "ธย",
        avatarTone: "teal",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 0,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-flight-1",
        order: 1,
        name: "โรงพยาบาลพระราม 9",
        addressNo: "39/5",
        villageOrMoo: "-",
        soi: "-",
        road: "-",
        province: "กรุงเทพมหานคร",
        district: "ห้วยขวาง",
        subdistrict: "บางกะปิ",
        postalCode: "10310",
        dateRange: "01/10/68 - 03/10/68",
        assignedEmployees: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "61221", name: "ธีรัคม์ ยงคง" },
        ],
      },
    ],
    jvCompanies: [
      {
        id: "jv-flight-1",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    flights: FLIGHT_CASE_PRESETS.flight_one_way.flights,
    accommodations: [],
    allowanceOverride: 0,
  },
  {
    documentNo: "2568100002",
    status: "approved",
    hasExpense: true,
    planName: "ติดตั้งระบบ Tag Tracking เฟส 2",
    travelDateRange: "08/10/68 - 10/10/68",
    objective: "ติดตั้งอุปกรณ์และฝึกอบรมผู้ใช้งานประจำสาขาชลบุรี",
    expectedOutcome:
      "ทีมหน้างานสามารถใช้งานระบบติดตาม Tag ได้ครบทุกจุดบริการภายในกำหนดเวลา",
    project: "Planner Tag System",
    reviewerName: "สมชาย ใจดี",
    reviewedAt: "06/10/68 14:20น.",
    analysisStatus: "analyzed",
    employees: [
      {
        code: "61222",
        name: "ศศิธร อินทรเกียรติ",
        initials: "ศอ",
        avatarTone: "sky",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 450,
      },
      {
        code: "62125",
        name: "กิตติคุณ ใจภักดี",
        initials: "กจ",
        avatarTone: "amber",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
        allowanceDays: 3,
        dailyAllowanceRate: 450,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-2",
        order: 1,
        name: "นิคมอุตสาหกรรมอมตะซิตี้ ชลบุรี",
        addressNo: "700/124",
        villageOrMoo: "หมู่ 1",
        soi: "-",
        road: "บางนา-ตราด",
        province: "ชลบุรี",
        district: "เมืองชลบุรี",
        subdistrict: "คลองตำหรุ",
        postalCode: "20000",
        dateRange: "08/10/68 - 10/10/68",
        assignedEmployees: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "62125", name: "กิตติคุณ ใจภักดี" },
        ],
      },
    ],
    jvCompanies: [
      {
        id: "jv-2",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 60,
      },
      {
        id: "jv-3",
        companyName: "บริษัท ซินเนอร์จี โลจิสติกส์ จำกัด",
        approverName: "นายปรมัตถ์ เลิศสกุล",
        sharePercent: 40,
      },
    ],
    accommodations: [
      {
        id: "acc-2",
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "ga_assigned",
        gaBadgeLabel: "GA กำหนดที่พักให้",
        stayType: "รายวัน",
        checkInOutRange: "08/10/2025 - 10/10/2025",
        travelCompanions: [
          { code: "61222", name: "ศศิธร อินทรเกียรติ" },
          { code: "62125", name: "กิตติคุณ ใจภักดี" },
        ],
        totalRooms: 2,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "61222", name: "ศศิธร อินทรเกียรติ" }],
          },
          {
            roomNumber: 2,
            bedType: "เตียงเดี่ยว",
            roommates: [{ code: "62125", name: "กิตติคุณ ใจภักดี" }],
          },
        ],
        pricePerPerson: 1850,
        itemTotal: 7400,
      },
    ],
    allowanceOverride: 2700,
  },
  {
    documentNo: "2568100003",
    status: "waiting_summary",
    hasExpense: true,
    planName: "สำรวจหน้างานระบบคลังสินค้าอัจฉริยะ",
    travelDateRange: "15/10/68 - 16/10/68",
    objective: "เก็บข้อมูลโครงสร้างพื้นที่และประเมินจุดติดตั้งเสาสัญญาณ",
    expectedOutcome:
      "ได้แบบแปลนจุดติดตั้งและเอกสารประมาณการอุปกรณ์พร้อมเสนอราคา",
    project: "Smart Warehouse Tag",
    reviewerName: "ประเสริฐ อัครเดช",
    reviewedAt: "12/10/68 09:45น.",
    analysisStatus: "waiting_analysis",
    employees: [
      {
        code: "63490",
        name: "จิราวัฒน์ เชี่ยวชาญ",
        initials: "จช",
        avatarTone: "slate",
        allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (2วัน)",
        allowanceDays: 2,
        dailyAllowanceRate: 400,
      },
    ],
    onsiteLocations: [
      {
        id: "loc-3",
        order: 1,
        name: "ศูนย์กระจายสินค้าวังน้อย",
        addressNo: "88/4",
        villageOrMoo: "หมู่ 5",
        soi: "-",
        road: "พหลโยธิน",
        province: "พระนครศรีอยุธยา",
        district: "วังน้อย",
        subdistrict: "ลำไทร",
        postalCode: "13170",
        dateRange: "15/10/68 - 16/10/68",
        assignedEmployees: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
      },
    ],
    jvCompanies: [
      {
        id: "jv-4",
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    accommodations: [
      {
        id: "acc-3",
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "ga_assigned",
        gaBadgeLabel: "GA กำหนดที่พักให้",
        stayType: "รายวัน",
        checkInOutRange: "15/10/2025 - 16/10/2025",
        travelCompanions: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงคู่",
            roommates: [{ code: "63490", name: "จิราวัฒน์ เชี่ยวชาญ" }],
          },
        ],
        pricePerPerson: 1200,
        itemTotal: 1200,
      },
    ],
    allowanceOverride: 800,
  },
  ...createExpandedSamplePlans(),
]

interface SamplePlanSeed {
  documentNo: string
  planName: string
  status: PlanStatus
  travelDateRange: string
  locations: { name: string; province: string }[]
  employeeCount: number
  project: string
  reviewerName?: string
  reviewedAt?: string
  jvApprovalProgress?: string
  analysisStatus?: BudgetAnalysisStatus
  rejectionReason?: string
  cancellationReason?: string
  cancelledAt?: string
  itemTotal: number
  allowanceOverride: number
}

function getSampleEmployeesPool(): PlanEmployee[] {
  return [
    {
      code: "61221",
      name: "ธีรัคม์ ยงคง",
      initials: "ธย",
      avatarTone: "teal",
      allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
      allowanceDays: 3,
      dailyAllowanceRate: 400,
    },
    {
      code: "61222",
      name: "ศศิธร อินทรเกียรติ",
      initials: "ศอ",
      avatarTone: "sky",
      allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
      allowanceDays: 3,
      dailyAllowanceRate: 450,
    },
    {
      code: "62125",
      name: "กิตติคุณ ใจภักดี",
      initials: "กจ",
      avatarTone: "amber",
      allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (2วัน)",
      allowanceDays: 2,
      dailyAllowanceRate: 450,
    },
    {
      code: "63490",
      name: "จิราวัฒน์ เชี่ยวชาญ",
      initials: "จช",
      avatarTone: "slate",
      allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (2วัน)",
      allowanceDays: 2,
      dailyAllowanceRate: 400,
    },
    {
      code: "65261",
      name: "รุสลาน มาลินี",
      initials: "รม",
      avatarTone: "teal",
      allowanceLabel: "เบิกค่าเบี้ยเลี้ยง (3วัน)",
      allowanceDays: 3,
      dailyAllowanceRate: 400,
    },
  ]
}

function buildSampleWorkPlan(seed: SamplePlanSeed): WorkPlan {
  const pool = getSampleEmployeesPool()
  const employees = pool.slice(
    0,
    Math.max(1, Math.min(seed.employeeCount, pool.length))
  )

  return {
    documentNo: seed.documentNo,
    status: seed.status,
    hasExpense: true,
    planName: seed.planName,
    travelDateRange: seed.travelDateRange,
    objective: `ปฏิบัติงาน Onsite และประสานงานโครงการ ${seed.project}`,
    expectedOutcome:
      "ดำเนินงานตามแผนและส่งมอบรายงานความคืบหน้าครบถ้วนตามกำหนดเวลา",
    project: seed.project,
    reviewerName: seed.reviewerName,
    reviewedAt: seed.reviewedAt,
    jvApprovalProgress: seed.jvApprovalProgress,
    analysisStatus: seed.analysisStatus,
    rejectionReason: seed.rejectionReason,
    cancellationReason: seed.cancellationReason,
    cancelledAt: seed.cancelledAt,
    employees,
    onsiteLocations: seed.locations.map((loc, index) => ({
      id: `loc-${seed.documentNo}-${index + 1}`,
      order: index + 1,
      name: loc.name,
      addressNo: `${12 + index * 15}/4`,
      villageOrMoo: "-",
      soi: "-",
      road: "ถนนหลัก",
      province: loc.province,
      district: "เมือง",
      subdistrict: "ในเมือง",
      postalCode: "10310",
      dateRange: seed.travelDateRange,
      assignedEmployees: employees.map((emp) => ({
        code: emp.code,
        name: emp.name,
      })),
    })),
    jvCompanies: [
      {
        id: `jv-${seed.documentNo}`,
        companyName: "บริษัท บลิซเทค จำกัด",
        approverName: "นางสาวศุภาภรณ์ วรรณพฤกษ์",
        sharePercent: 100,
      },
    ],
    accommodations: [
      {
        id: `acc-${seed.documentNo}`,
        order: 1,
        categoryLabel: "ที่พัก",
        selectionMode: "ga_assigned",
        gaBadgeLabel: "GA กำหนดที่พักให้",
        stayType: "รายวัน",
        checkInOutRange: seed.travelDateRange,
        travelCompanions: employees.map((emp) => ({
          code: emp.code,
          name: emp.name,
        })),
        totalRooms: 1,
        rooms: [
          {
            roomNumber: 1,
            bedType: "เตียงเดี่ยว",
            roommates: employees.map((emp) => ({
              code: emp.code,
              name: emp.name,
            })),
          },
        ],
        pricePerPerson: Math.round(seed.itemTotal / Math.max(1, employees.length)),
        itemTotal: seed.itemTotal,
      },
    ],
    allowanceOverride: seed.allowanceOverride,
  }
}

/**
 * 27 additional realistic Thai work plans so:
 * - Total plans = 33 (1 draft + 32 submitted to Budget Review)
 * - Budget Review KPIs (live exact math):
 *   - ทั้งหมด: 32
 *   - รอดำเนินการ (pending_ga): 4
 *   - เสร็จสิ้น (approved / jv_approved / jv_pending / waiting_summary): 20 (รอวิเคราะห์ 10 | วิเคราะห์แล้ว 10)
 *   - JV ปฏิเสธ (jv_rejected): 4
 *   - ยกเลิกแผนงาน (cancelled): 4
 */
function createExpandedSamplePlans(): WorkPlan[] {
  const seeds: SamplePlanSeed[] = [
    // 1 Draft (Planner pending chip: บันทึกร่าง 1 รายการ)
    {
      documentNo: "2568100007",
      planName: "แผนการเดินทาง 01",
      status: "draft",
      travelDateRange: "01/10/68 - 05/10/68",
      locations: [{ name: "โรงพยาบาลพระราม 9", province: "กรุงเทพมหานคร" }],
      employeeCount: 1,
      project: "Planner Tag System",
      itemTotal: 3200,
      allowanceOverride: 0,
    },
    // Cancelled plans (4 total)
    {
      documentNo: "2568100008",
      planName: "แผนการเดินทาง 04",
      status: "cancelled",
      travelDateRange: "01/10/68 - 05/10/68",
      locations: [{ name: "โรงพยาบาล", province: "กรุงเทพมหานคร" }],
      employeeCount: 1,
      project: "Planner Tag System",
      reviewerName: "วิโรจน์ คมปราชญ์",
      reviewedAt: "11/10/68 09:00น.",
      cancellationReason: "ลูกค้าขอเลื่อนกำหนดการนำเสนองานเป็นเดือนถัดไป",
      cancelledAt: "11/10/68 10:15",
      itemTotal: 3200,
      allowanceOverride: 0,
    },
    {
      documentNo: "2568100009",
      planName: "แผนการเดินทาง 03",
      status: "cancelled",
      travelDateRange: "01/10/68 - 05/10/68",
      locations: [
        { name: "โรงเรียนหมอนทอง", province: "ฉะเชิงเทรา" },
        { name: "มหาวิทยาลัยเชียงใหม่", province: "เชียงใหม่" },
        { name: "ศูนย์ประชุมนานาชาติเชียงใหม่", province: "เชียงใหม่" },
      ],
      employeeCount: 2,
      project: "Campus Tag Rollout",
      reviewerName: "วิโรจน์ คมปราชญ์",
      reviewedAt: "11/10/68 09:00น.",
      cancellationReason: "ปรับเปลี่ยนแผนลงพื้นที่รวมกับรอบตรวจประเมินประจำปี",
      cancelledAt: "11/10/68 13:20",
      itemTotal: 4800,
      allowanceOverride: 1200,
    },
    // JV Approved (completed)
    {
      documentNo: "2568100010",
      planName: "แผนการเดินทาง 02",
      status: "jv_approved",
      travelDateRange: "02/10/68 - 05/10/68",
      locations: [{ name: "โรงพยาบาลจุฬาลงกรณ์", province: "กรุงเทพมหานคร" }],
      employeeCount: 2,
      project: "Hospital Asset Tag",
      reviewerName: "วิโรจน์ คมปราชญ์",
      reviewedAt: "11/10/68 09:00น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 4200,
      allowanceOverride: 900,
    },
    // JV Pending 1/2 (completed GA review, awaiting JV)
    {
      documentNo: "2568100011",
      planName: "แผนการเดินทาง 05",
      status: "jv_pending",
      jvApprovalProgress: "1/2",
      travelDateRange: "03/10/68 - 06/10/68",
      locations: [{ name: "ธนาคารสาขาสีลม", province: "กรุงเทพมหานคร" }],
      employeeCount: 2,
      project: "Smart Banking Tag",
      reviewerName: "สมชาย ใจดี",
      reviewedAt: "11/10/68 10:00น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 3800,
      allowanceOverride: 800,
    },
    // JV Rejected (4 total)
    {
      documentNo: "2568100012",
      planName: "แผนการเดินทาง 06",
      status: "jv_rejected",
      travelDateRange: "04/10/68 - 07/10/68",
      locations: [{ name: "โรงพยาบาลศิริราช", province: "กรุงเทพมหานคร" }],
      employeeCount: 3,
      project: "Hospital Asset Tag",
      reviewerName: "ประเสริฐ อัครเดช",
      reviewedAt: "11/10/68 11:10น.",
      rejectionReason:
        "ค่าที่พักเกินเกณฑ์งบประมาณร่วมทุน JV กรุณาปรับเลือกที่พักมาตรฐานบริษัท",
      itemTotal: 9600,
      allowanceOverride: 1800,
    },
    {
      documentNo: "2568100013",
      planName: "งานพี่จูน outside",
      status: "jv_approved",
      travelDateRange: "05/10/68 - 08/10/68",
      locations: [
        { name: "โรงพยาบาลบำรุงราษฎร์", province: "กรุงเทพมหานคร" },
        { name: "คลินิกศูนย์แพทย์พัฒนา", province: "กรุงเทพมหานคร" },
        { name: "ศูนย์บริการโลหิตแห่งชาติ", province: "กรุงเทพมหานคร" },
      ],
      employeeCount: 2,
      project: "Healthcare IoT",
      reviewerName: "ประเสริฐ อัครเดช",
      reviewedAt: "11/10/68 11:45น.",
      analysisStatus: "analyzed",
      itemTotal: 5400,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100014",
      planName: "ดูหน้างาน รพ.ไท",
      status: "approved",
      travelDateRange: "06/10/68 - 09/10/68",
      locations: [{ name: "ร้านยาและศูนย์เวชภัณฑ์ รพ.ไท", province: "นนทบุรี" }],
      employeeCount: 2,
      project: "MedSupply Tracking",
      reviewerName: "นงนุช ชัยชนะ",
      reviewedAt: "11/10/68 13:15น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 3400,
      allowanceOverride: 800,
    },
    {
      documentNo: "2568100015",
      planName: "แผนหน้างาน",
      status: "jv_approved",
      travelDateRange: "07/10/68 - 10/10/68",
      locations: [{ name: "โรงเรียนสาธิตเกษตร", province: "กรุงเทพมหานคร" }],
      employeeCount: 3,
      project: "Campus Tag Rollout",
      reviewerName: "วีระชัย แสงจันทร์",
      reviewedAt: "11/10/68 14:00น.",
      analysisStatus: "analyzed",
      itemTotal: 4500,
      allowanceOverride: 1500,
    },
    {
      documentNo: "2568100016",
      planName: "แผนการเดินทาง 07",
      status: "approved",
      travelDateRange: "09/10/68 - 12/10/68",
      locations: [{ name: "โรงพยาบาลเชียงใหม่ราม", province: "เชียงใหม่" }],
      employeeCount: 2,
      project: "Northern Health Network",
      reviewerName: "กาญจนา วัฒนา",
      reviewedAt: "12/10/68 09:00น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 6200,
      allowanceOverride: 1600,
    },
    {
      documentNo: "2568100017",
      planName: "แผนการเดินทาง 08",
      status: "jv_pending",
      jvApprovalProgress: "1/2",
      travelDateRange: "10/10/68 - 13/10/68",
      locations: [{ name: "โรงเรียนมงฟอร์ตวิทยาลัย", province: "เชียงใหม่" }],
      employeeCount: 2,
      project: "Campus Tag Rollout",
      reviewerName: "มนตรี รุ่งเรือง",
      reviewedAt: "12/10/68 09:30น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 5100,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100018",
      planName: "แผนการเดินทาง 09",
      status: "jv_approved",
      travelDateRange: "11/10/68 - 14/10/68",
      locations: [{ name: "ธนาคารสำนักงานใหญ่ รัชโยธิน", province: "กรุงเทพมหานคร" }],
      employeeCount: 1,
      project: "Smart Banking Tag",
      reviewerName: "สุพรรณี สุวรรณภูมิ",
      reviewedAt: "12/10/68 10:15น.",
      analysisStatus: "analyzed",
      itemTotal: 2900,
      allowanceOverride: 800,
    },
    {
      documentNo: "2568100019",
      planName: "แผนการเดินทาง 10",
      status: "approved",
      travelDateRange: "12/10/68 - 15/10/68",
      locations: [{ name: "โรงพยาบาลขอนแก่น", province: "ขอนแก่น" }],
      employeeCount: 2,
      project: "Northeast Health Tag",
      reviewerName: "ธนาคาร เกียรติศักดิ์",
      reviewedAt: "12/10/68 11:00น.",
      analysisStatus: "analyzed",
      itemTotal: 5800,
      allowanceOverride: 1600,
    },
    {
      documentNo: "2568100020",
      planName: "แผนการเดินทาง 11",
      status: "jv_approved",
      travelDateRange: "13/10/68 - 16/10/68",
      locations: [{ name: "ธนาคารสาขาขอนแก่น", province: "ขอนแก่น" }],
      employeeCount: 2,
      project: "Smart Banking Tag",
      reviewerName: "อารยา สิริวัฒน์",
      reviewedAt: "12/10/68 13:45น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 4900,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100021",
      planName: "ตรวจรับระบบคลังยา ภาคตะวันออก",
      status: "jv_rejected",
      travelDateRange: "14/10/68 - 17/10/68",
      locations: [{ name: "โรงพยาบาลระยอง", province: "ระยอง" }],
      employeeCount: 3,
      project: "MedSupply Tracking",
      reviewerName: "วิโรจน์ คมปราชญ์",
      reviewedAt: "12/10/68 14:30น.",
      rejectionReason: "จำนวนวันเดินทางเกินขอบเขตสัญญาบริการในเฟส 1",
      itemTotal: 7800,
      allowanceOverride: 2100,
    },
    {
      documentNo: "2568100022",
      planName: "อบรมผู้ดูแลระบบ Tag สาขาภูเก็ต",
      status: "approved",
      travelDateRange: "16/10/68 - 19/10/68",
      locations: [
        { name: "โรงพยาบาลวชิระภูเก็ต", province: "ภูเก็ต" },
        { name: "ท่าอากาศยานภูเก็ต", province: "ภูเก็ต" },
        { name: "ศูนย์กระจายสินค้าภูเก็ต", province: "ภูเก็ต" },
      ],
      employeeCount: 2,
      project: "Southern Rollout",
      reviewerName: "สมชาย ใจดี",
      reviewedAt: "13/10/68 09:20น.",
      analysisStatus: "analyzed",
      itemTotal: 8400,
      allowanceOverride: 1800,
    },
    {
      documentNo: "2568100023",
      planName: "สำรวจจุดติดตั้งเสาสัญญาณ โคราช",
      status: "jv_pending",
      jvApprovalProgress: "2/3",
      travelDateRange: "17/10/68 - 19/10/68",
      locations: [{ name: "โรงพยาบาลมหาราชนครราชสีมา", province: "นครราชสีมา" }],
      employeeCount: 2,
      project: "Northeast Health Tag",
      reviewerName: "ประเสริฐ อัครเดช",
      reviewedAt: "13/10/68 10:10น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 4600,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100024",
      planName: "ส่งมอบระบบคลังเวชภัณฑ์ สงขลา",
      status: "jv_approved",
      travelDateRange: "18/10/68 - 21/10/68",
      locations: [{ name: "โรงพยาบาลสงขลานครินทร์", province: "สงขลา" }],
      employeeCount: 3,
      project: "Southern Rollout",
      reviewerName: "นงนุช ชัยชนะ",
      reviewedAt: "13/10/68 11:30น.",
      analysisStatus: "analyzed",
      itemTotal: 9200,
      allowanceOverride: 2400,
    },
    {
      documentNo: "2568100025",
      planName: "ทดสอบระบบ RFID ศูนย์กระจายสินค้า",
      status: "cancelled",
      travelDateRange: "19/10/68 - 20/10/68",
      locations: [{ name: "นิคมอุตสาหกรรมบางปู", province: "สมุทรปราการ" }],
      employeeCount: 2,
      project: "Smart Warehouse Tag",
      reviewerName: "วีระชัย แสงจันทร์",
      reviewedAt: "13/10/68 13:00น.",
      cancellationReason: "พื้นที่คลังสินค้าอยู่ระหว่างปิดปรับปรุงระบบไฟฟ้า",
      cancelledAt: "13/10/68 15:00",
      itemTotal: 2800,
      allowanceOverride: 800,
    },
    {
      documentNo: "2568100026",
      planName: "ประชุมวางแผนติดตั้งเฟส 3 หาดใหญ่",
      status: "approved",
      travelDateRange: "20/10/68 - 22/10/68",
      locations: [{ name: "มหาวิทยาลัยสงขลานครินทร์", province: "สงขลา" }],
      employeeCount: 2,
      project: "Campus Tag Rollout",
      reviewerName: "กาญจนา วัฒนา",
      reviewedAt: "14/10/68 09:15น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 6800,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100027",
      planName: "ตรวจเยี่ยมสาขาและบำรุงรักษาอุปกรณ์",
      status: "jv_approved",
      travelDateRange: "21/10/68 - 23/10/68",
      locations: [{ name: "ธนาคารสาขาพัทยา", province: "ชลบุรี" }],
      employeeCount: 1,
      project: "Smart Banking Tag",
      reviewerName: "มนตรี รุ่งเรือง",
      reviewedAt: "14/10/68 10:40น.",
      analysisStatus: "analyzed",
      itemTotal: 3100,
      allowanceOverride: 800,
    },
    {
      documentNo: "2568100028",
      planName: "สำรวจระบบเครือข่ายโรงพยาบาลอุดรธานี",
      status: "jv_rejected",
      travelDateRange: "22/10/68 - 24/10/68",
      locations: [{ name: "โรงพยาบาลอุดรธานี", province: "อุดรธานี" }],
      employeeCount: 2,
      project: "Northeast Health Tag",
      reviewerName: "สุพรรณี สุวรรณภูมิ",
      reviewedAt: "14/10/68 14:15น.",
      rejectionReason: "ยังไม่มีเอกสารยืนยันสัดส่วนค่าใช้จ่ายจากบริษัทพันธมิตร JV",
      itemTotal: 6400,
      allowanceOverride: 1600,
    },
    {
      documentNo: "2568100029",
      planName: "ติดตั้งเครื่องอ่าน Tag ศูนย์โลจิสติกส์",
      status: "approved",
      travelDateRange: "24/10/68 - 26/10/68",
      locations: [{ name: "ท่าเรือแหลมฉบัง", province: "ชลบุรี" }],
      employeeCount: 3,
      project: "Smart Warehouse Tag",
      reviewerName: "ธนาคาร เกียรติศักดิ์",
      reviewedAt: "15/10/68 09:00น.",
      analysisStatus: "waiting_analysis",
      itemTotal: 5700,
      allowanceOverride: 1800,
    },
    {
      documentNo: "2568100030",
      planName: "ประเมินหน้างานคลินิกเฉพาะทาง ลำปาง",
      status: "jv_approved",
      travelDateRange: "25/10/68 - 27/10/68",
      locations: [{ name: "โรงพยาบาลลำปาง", province: "ลำปาง" }],
      employeeCount: 2,
      project: "Northern Health Network",
      reviewerName: "อารยา สิริวัฒน์",
      reviewedAt: "15/10/68 11:20น.",
      analysisStatus: "analyzed",
      itemTotal: 5200,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100031",
      planName: "แผนตรวจรับอุปกรณ์สาขาอุบลราชธานี",
      status: "jv_rejected",
      travelDateRange: "28/10/68 - 30/10/68",
      locations: [{ name: "โรงพยาบาลสรรพสิทธิประสงค์", province: "อุบลราชธานี" }],
      employeeCount: 2,
      project: "Northeast Health Tag",
      reviewerName: "สมชาย ใจดี",
      reviewedAt: "16/10/68 14:10น.",
      rejectionReason: "ซ้ำซ้อนกับรอบเดินทางของทีมวิศวกรรมภาคอีสานในสัปดาห์เดียวกัน",
      itemTotal: 6100,
      allowanceOverride: 1400,
    },
    {
      documentNo: "2568100032",
      planName: "อบรมเชิงปฏิบัติการระบบ Tag หัวหิน",
      status: "approved",
      travelDateRange: "29/10/68 - 31/10/68",
      locations: [{ name: "โรงพยาบาลหัวหิน", province: "ประจวบคีรีขันธ์" }],
      employeeCount: 2,
      project: "Hospital Asset Tag",
      reviewerName: "ประเสริฐ อัครเดช",
      reviewedAt: "17/10/68 10:00น.",
      analysisStatus: "analyzed",
      itemTotal: 4900,
      allowanceOverride: 1200,
    },
    {
      documentNo: "2568100033",
      planName: "สำรวจพื้นที่ติดตั้งเครือข่าย นครปฐม",
      status: "cancelled",
      travelDateRange: "30/10/68 - 31/10/68",
      locations: [{ name: "มหาวิทยาลัยศิลปากร วิทยาเขตสนามจันทร์", province: "นครปฐม" }],
      employeeCount: 1,
      project: "Campus Tag Rollout",
      reviewerName: "นงนุช ชัยชนะ",
      reviewedAt: "17/10/68 15:30น.",
      cancellationReason: "ปรับรูปแบบการประชุมเป็นการตรวจแบบออนไลน์แทนการลงพื้นที่",
      cancelledAt: "18/10/68 09:00",
      itemTotal: 2200,
      allowanceOverride: 400,
    },
  ]

  return seeds.map(buildSampleWorkPlan)
}

