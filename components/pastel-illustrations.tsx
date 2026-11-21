import * as React from "react"
import { cn } from "@/lib/utils"

interface IllustrationProps {
  className?: string
  sticker?: boolean
}

const NAVY_STROKE = "#3B4A6B"
const MAROON_STROKE = "#7A3238"
const DOODLE_AMBER = "#F4A63B"

/**
 * Cozy pastel die-cut sticker wrapper for SVG illustrations
 */
function StickerSvg({
  children,
  className,
  sticker = false,
  viewBox = "0 0 64 64",
}: {
  children: React.ReactNode
  className?: string
  sticker?: boolean
  viewBox?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none",
        sticker &&
          "drop-shadow-[0_1.5px_0_rgba(255,255,255,0.95)] drop-shadow-[0_3px_6px_rgba(59,74,107,0.12)]",
        className
      )}
    >
      {children}
    </svg>
  )
}

/**
 * Brand Mark: Cozy Pastel Hand-Drawn Rising Chart + Tag Emblem
 */
export function PlannerBrandIllustration({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Soft cream sticker backing */}
      <rect
        x="5"
        y="6"
        width="54"
        height="52"
        rx="16"
        fill="#FFFBF2"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <rect
        x="7"
        y="8"
        width="50"
        height="48"
        rx="14"
        fill="#FFF6E3"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Doodle sparkles top-right */}
      <path
        d="M52 13L55 10M55 18H59M47 10V7"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Bar 1 - Warm Butter Yellow */}
      <rect
        x="14"
        y="34"
        width="9.5"
        height="15"
        rx="3.5"
        fill="#FCD88B"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 37.5V41.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Bar 2 - Soft Mint */}
      <rect
        x="27.2"
        y="27"
        width="9.5"
        height="22"
        rx="3.5"
        fill="#9ADDC6"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.4 30.5V36"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Bar 3 - Pastel Sky Blue */}
      <rect
        x="40.4"
        y="19"
        width="9.5"
        height="30"
        rx="3.5"
        fill="#9CCAE8"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.6 22.8V29.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Hand-drawn Rising Coral Trend Arrow */}
      <path
        d="M15 27C22 25 27 21 37 15"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 14.5L37.8 14.4L36.2 20.5"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="27" r="2.6" fill="#F6A192" stroke={MAROON_STROKE} strokeWidth="1.8" />
    </StickerSvg>
  )
}

/**
 * Sidebar Nav: Dashboard (Cozy Pastel House)
 */
export function NavDashboardIllustration({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Roof */}
      <path
        d="M10 30L32 12L54 30"
        fill="#F6A89E"
        stroke={NAVY_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House Body */}
      <path
        d="M16 28V50C16 52.2 17.8 54 20 54H44C46.2 54 48 52.2 48 50V28"
        fill="#FFF5DE"
        stroke={NAVY_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Soft cel shadow under eaves */}
      <path
        d="M17.5 31H46.5"
        stroke="#F0D8B3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Pastel Mint Door */}
      <path
        d="M26 54V39C26 36.8 27.8 35 30 35H34C36.2 35 38 36.8 38 39V54"
        fill="#9EDCC7"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34.5" cy="45" r="1.4" fill={NAVY_STROKE} />
      {/* Roof white highlight */}
      <path
        d="M22 21L30 14.8"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Doodle sparks */}
      <path
        d="M52 15L55 12M55 20H58.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Sidebar Nav: Planner (Cozy Pastel Clipboard & Check)
 */
export function NavPlannerIllustration({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Board */}
      <rect
        x="13"
        y="13"
        width="38"
        height="44"
        rx="9"
        fill="#CBE8DF"
        stroke={NAVY_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner cream sheet */}
      <rect
        x="18"
        y="19"
        width="28"
        height="33"
        rx="5"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top coral clip */}
      <rect
        x="24"
        y="9"
        width="16"
        height="8"
        rx="4"
        fill="#F6A69B"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lines & check */}
      <path
        d="M23 30L25.5 32.5L30.5 27.5"
        stroke="#2F8F83"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 30H41M23 39H41M23 45H35"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* White highlight */}
      <path
        d="M27.5 11.8H32.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Doodle ticks */}
      <path
        d="M8 18L5.5 15.5M7 24H4.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Sidebar Nav: Budget & Expense Management (Cozy Receipt + Pastel Coin)
 */
export function NavBudgetIllustration({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Receipt Sheet */}
      <path
        d="M13 13C13 10.8 14.8 9 17 9H41C43.2 9 45 10.8 45 13V51L40 47.5L35 51L30 47.5L25 51L20 47.5L13 51V13Z"
        fill="#FFF9EC"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Receipt Lines */}
      <path
        d="M20 19H38M20 26H35M20 33H29"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Pastel Gold Coin */}
      <circle
        cx="45"
        cy="42"
        r="12"
        fill="#FDE08E"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
      />
      {/* Inner cel shading arc */}
      <path
        d="M37 47.5C40 51 47 51.5 51.5 47"
        stroke="#F0BE5C"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Coin white highlight */}
      <path
        d="M38.5 36.2C40.2 34.4 42.5 33.6 44.8 33.8"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Baht / Star emblem */}
      <path
        d="M45 36.5V47.5M42 39H46.5C47.9 39 48.8 39.8 48.8 41C48.8 42.1 47.9 42.8 46.5 42.8H42M42 42.8H47C48.4 42.8 49.3 43.7 49.3 44.9C49.3 46.1 48.3 46.8 46.8 46.8H42"
        stroke={MAROON_STROKE}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Doodle sparks */}
      <path
        d="M52 24L55.5 21M55 29H58.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Accommodation Section: Cozy Pastel Boutique Hotel Illustration
 */
export function PastelHotelIllustration({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Doodle sparkles around roof */}
      <path
        d="M11 16L8 13M8 22H5M53 15L56 12M56 21H59"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Side Wing Left */}
      <rect
        x="10"
        y="30"
        width="12"
        height="25"
        rx="3"
        fill="#DCEEF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Side Wing Right */}
      <rect
        x="42"
        y="30"
        width="12"
        height="25"
        rx="3"
        fill="#DCEEF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Hotel Tower */}
      <rect
        x="19"
        y="17"
        width="26"
        height="38"
        rx="5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Soft right cel shade */}
      <path
        d="M41.5 20V52"
        stroke="#92C5E2"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Top HOTEL Roof Sign */}
      <rect
        x="22.5"
        y="9"
        width="19"
        height="8.5"
        rx="3.5"
        fill="#F6A69B"
        stroke={MAROON_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 13.2H37"
        stroke="#FFFDF9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cozy Warm Yellow Windows */}
      <rect
        x="24"
        y="23"
        width="5.5"
        height="6"
        rx="1.8"
        fill="#FDE49B"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      <rect
        x="34.5"
        y="23"
        width="5.5"
        height="6"
        rx="1.8"
        fill="#FDE49B"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      <rect
        x="24"
        y="33"
        width="5.5"
        height="6"
        rx="1.8"
        fill="#FFF5D6"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      <rect
        x="34.5"
        y="33"
        width="5.5"
        height="6"
        rx="1.8"
        fill="#FFF5D6"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />

      {/* Side windows */}
      <rect
        x="13.5"
        y="36"
        width="4"
        height="5"
        rx="1.2"
        fill="#FFF5D6"
        stroke={NAVY_STROKE}
        strokeWidth="1.7"
      />
      <rect
        x="46.5"
        y="36"
        width="4"
        height="5"
        rx="1.2"
        fill="#FFF5D6"
        stroke={NAVY_STROKE}
        strokeWidth="1.7"
      />

      {/* Entrance Arch & Awning */}
      <path
        d="M27.5 55V45.5C27.5 43.8 28.8 42.5 30.5 42.5H33.5C35.2 42.5 36.5 43.8 36.5 45.5V55"
        fill="#9EDCC7"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ground line */}
      <path
        d="M7 55H57"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* White Specular Highlight */}
      <path
        d="M22.2 21V26"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </StickerSvg>
  )
}

/**
 * Room Detail: Cozy Pastel Hand-Drawn Bed Icon (Filled Outline + Rounded Monoline)
 */
export function PastelBedRoomIcon({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Doodle sparkle ticks */}
      <path
        d="M50 15L53 12M54 20H57.5M12 17L9.5 14.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Wooden Pastel Headboard */}
      <rect
        x="11"
        y="19"
        width="42"
        height="18"
        rx="6"
        fill="#F6D7AE"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 23.5H24"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Soft Cream Pillow */}
      <rect
        x="16.5"
        y="25.5"
        width="14"
        height="8.5"
        rx="4"
        fill="#FFFBF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="33.5"
        y="25.5"
        width="14"
        height="8.5"
        rx="4"
        fill="#FFFBF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cozy Pastel Mint Duvet / Mattress */}
      <path
        d="M8.5 39C8.5 35.4 11.4 32.5 15 32.5H49C52.6 32.5 55.5 35.4 55.5 39V46.5C55.5 48.2 54.1 49.5 52.5 49.5H11.5C9.9 49.5 8.5 48.2 8.5 46.5V39Z"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cel shading fold on blanket */}
      <path
        d="M11 45.5H53"
        stroke="#7FC9AE"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Blanket top coral trim */}
      <path
        d="M11 36.8C19 38.6 28 38.6 35 37C41.5 35.6 47.5 36 53 37"
        stroke="#F6A69B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Specular white highlight */}
      <path
        d="M14.5 34.5H23"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Rounded Bed Legs */}
      <path
        d="M14 49.5V54M50 49.5V54"
        stroke={MAROON_STROKE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Additional Expense Accordion Header: Cozy Pastel Hand-Drawn Receipt & Coin Slip
 */
export function PastelExtraReceiptIcon({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Mini Pastel Ticket / Receipt */}
      <path
        d="M13 14C13 11.8 14.8 10 17 10H41C43.2 10 45 11.8 45 14V49.5L40 46.2L35 49.5L30 46.2L25 49.5L20 46.2L13 49.5V14Z"
        fill="#FFF9EB"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Soft top tint strip */}
      <path
        d="M17 14H41"
        stroke="#F6D7AE"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Receipt detail lines */}
      <path
        d="M19.5 22.5H36.5M19.5 29.5H32M19.5 36.5H27.5"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
      />

      {/* Cute Pastel Peach Plus Badge */}
      <circle
        cx="45.5"
        cy="42"
        r="11"
        fill="#F8B1A5"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
      />
      {/* Subtle lower cel shade */}
      <path
        d="M38.5 47C41.5 50.2 47.8 50.5 51.8 46.8"
        stroke="#E78D80"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Plus mark */}
      <path
        d="M45.5 37.5V46.5M41 42H50"
        stroke="#FFFDF9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* White specular highlight */}
      <path
        d="M39.2 36.2C40.6 34.8 42.5 34.1 44.5 34.2"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.72"
      />
      {/* Warm amber doodle sparkles */}
      <path
        d="M52 21L55.5 18M55 26H58.5M9 21L6.5 18.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Section Spot Icons (Cozy Pastel Japanese/Korean Editorial Infographic Style)
 */
export function PastelPlanSectionIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      <rect
        x="12"
        y="12"
        width="36"
        height="42"
        rx="8"
        fill="#E4F5EE"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
      />
      <path
        d="M20 23H39M20 31H39M20 39H31"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Cozy Pencil */}
      <path
        d="M41 37L51 27C52.5 25.5 54.8 25.5 56.2 27C57.6 28.4 57.6 30.7 56.2 32.2L46.2 42.2L39.5 43.8L41 37Z"
        fill="#FCD88B"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 17.5V22"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M52 14L55 11M55 19H58"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

export function PastelEmployeesSectionIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Back friend */}
      <circle
        cx="42"
        cy="24"
        r="7"
        fill="#FBE1CE"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
      />
      <path
        d="M34 45C34 39.5 37.5 36 42.5 36C47.5 36 51 39.5 51 45V48H34V45Z"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Front friend */}
      <circle
        cx="25"
        cy="23"
        r="8.5"
        fill="#FFE6D4"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
      />
      {/* Rosy cheeks */}
      <circle cx="21.5" cy="24.8" r="1.4" fill="#F5A4A4" />
      <circle cx="28.5" cy="24.8" r="1.4" fill="#F5A4A4" />
      <path
        d="M22.5 26.8C24 28 26 28 27.5 26.8"
        stroke={MAROON_STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 49C12 42 17.5 37 25 37C32.5 37 38 42 38 49V52H12V49Z"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M19 18.5C20.5 17 22.5 16.5 24 16.8"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M11 16L8 13M52 14L55 11"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

export function PastelOnsitePinIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Soft ground shadow oval */}
      <ellipse cx="32" cy="54" rx="14" ry="4" fill="#D5EBE5" />
      {/* Plump Pastel Coral Pin */}
      <path
        d="M32 10C21.5 10 14 17.6 14 27.2C14 38.8 27.2 48.2 30.8 51C31.5 51.6 32.5 51.6 33.2 51C36.8 48.2 50 38.8 50 27.2C50 17.6 42.5 10 32 10Z"
        fill="#F7A79B"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cel shading crescent */}
      <path
        d="M44.5 24C45.2 31.5 39 39.5 33 45.5"
        stroke="#E9887C"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Inner cream circle */}
      <circle
        cx="32"
        cy="26.5"
        r="7.5"
        fill="#FFFBF2"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
      />
      {/* Cute mini heart/cross dot */}
      <circle cx="32" cy="26.5" r="2.6" fill="#9EDCC7" />
      {/* White specular highlight */}
      <path
        d="M20 22.5C20.5 18.8 23.2 15.8 26.8 14.8"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Doodle sparks */}
      <path
        d="M52 14L55.5 11M55 20H59M10 15L7 12"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

export function PastelJvCompanyIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Left Pastel Building */}
      <rect
        x="11"
        y="21"
        width="21"
        height="33"
        rx="4"
        fill="#DCEAF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
      />
      {/* Right Taller Mint Building */}
      <rect
        x="28"
        y="12"
        width="24"
        height="42"
        rx="5"
        fill="#B6E3D3"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
      />
      {/* Windows */}
      <rect x="16" y="27" width="4.5" height="5" rx="1.3" fill="#FDE49B" stroke={NAVY_STROKE} strokeWidth="1.7" />
      <rect x="16" y="36" width="4.5" height="5" rx="1.3" fill="#FFFDF7" stroke={NAVY_STROKE} strokeWidth="1.7" />
      <rect x="33.5" y="19" width="5" height="5.5" rx="1.4" fill="#FFFDF7" stroke={NAVY_STROKE} strokeWidth="1.8" />
      <rect x="42" y="19" width="5" height="5.5" rx="1.4" fill="#FDE49B" stroke={NAVY_STROKE} strokeWidth="1.8" />
      <rect x="33.5" y="29" width="5" height="5.5" rx="1.4" fill="#FDE49B" stroke={NAVY_STROKE} strokeWidth="1.8" />
      <rect x="42" y="29" width="5" height="5.5" rx="1.4" fill="#FFFDF7" stroke={NAVY_STROKE} strokeWidth="1.8" />
      {/* Cozy Coral Door */}
      <rect x="36.5" y="42" width="7" height="12" rx="2.5" fill="#F6A69B" stroke={NAVY_STROKE} strokeWidth="2" />
      {/* White highlight */}
      <path
        d="M31.5 16.5V22"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Ground & Doodle ticks */}
      <path d="M8 54H56" stroke={NAVY_STROKE} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M13 13L10 10M18 10V7"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

export function PastelExpenseSectionIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Soft Pastel Wallet */}
      <rect
        x="10"
        y="19"
        width="40"
        height="31"
        rx="8"
        fill="#FCE3A6"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
      />
      {/* Flap */}
      <path
        d="M15 19V15.5C15 13.5 16.6 12 18.5 12H42C44 12 45.5 13.5 45.5 15.5V19"
        fill="#F6A89E"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Clasp */}
      <rect
        x="38"
        y="30"
        width="15"
        height="10"
        rx="5"
        fill="#FFFBF2"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
      />
      <circle cx="43.5" cy="35" r="2.2" fill="#9EDCC7" stroke={MAROON_STROKE} strokeWidth="1.6" />
      {/* White sheen */}
      <path
        d="M15 25.5H23"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Doodle sparks */}
      <path
        d="M52 13L55.5 10M55 18H58.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Van Transport Category Header: Cozy Pastel Hand-Drawn Commuter Van ("รถตู้")
 * Rounded filled outline (#3B4A6B), warm pastel mint/sky palette, cel shading, white sheen & amber doodle sparks
 */
export function PastelVanIllustration({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Doodle sparkle accents */}
      <path
        d="M11 16L8 13M7.5 22H4.5M53 15L56 12M56 20.5H59"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Soft road shadow */}
      <ellipse cx="32" cy="51.5" rx="23" ry="3.5" fill="#D5EBE5" />

      {/* Plump Rounded Van Body */}
      <path
        d="M9 34C9 24.5 13 18.5 21 18.5H40.5C45.2 18.5 48.2 21.2 50.2 25.5L53.5 32C55.4 33.4 56.5 35.6 56.5 38.2V42.5C56.5 45.2 54.4 47.2 51.8 47.2H13.5C11 47.2 9 45.2 9 42.5V34Z"
        fill="#E9F7F3"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Pastel Mint Chassis Band (Cel Shading) */}
      <path
        d="M10.2 38H55.2V42.2C55.2 44.3 53.6 46 51.5 46H13.8C11.8 46 10.2 44.3 10.2 42.2V38Z"
        fill="#A4DFC9"
      />
      {/* Re-stroke body outline cleanly over chassis band */}
      <path
        d="M9 34C9 24.5 13 18.5 21 18.5H40.5C45.2 18.5 48.2 21.2 50.2 25.5L53.5 32C55.4 33.4 56.5 35.6 56.5 38.2V42.5C56.5 45.2 54.4 47.2 51.8 47.2H13.5C11 47.2 9 45.2 9 42.5V34Z"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cozy Coral Accent Stripe */}
      <path
        d="M11 37.5H54"
        stroke="#F6A69B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Passenger Side Window 1 */}
      <rect
        x="14"
        y="23"
        width="10.5"
        height="10"
        rx="3"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Passenger Side Window 2 */}
      <rect
        x="27.2"
        y="23"
        width="10.5"
        height="10"
        rx="3"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Front Windshield */}
      <path
        d="M40.5 23H44.6C46.3 23 47.6 24 48.4 25.6L50.8 30.8C51.3 32 50.4 33 49.1 33H40.5V23Z"
        fill="#CFE8F7"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* White Specular Window Highlights */}
      <path
        d="M16.5 26L19.5 25.5M29.7 26L32.7 25.5M43 26L45.5 26"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Roof Specular Sheen */}
      <path
        d="M19.5 20.8H32"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Warm Butter-Yellow Headlight */}
      <rect
        x="51"
        y="36.2"
        width="5"
        height="4.4"
        rx="2"
        fill="#FDE08E"
        stroke={MAROON_STROKE}
        strokeWidth="1.8"
      />

      {/* Rounded Cute Wheels */}
      <circle
        cx="20.5"
        cy="47.2"
        r="5.6"
        fill="#5D6B88"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
      />
      <circle cx="20.5" cy="47.2" r="2.2" fill="#FFFDF7" />

      <circle
        cx="45.5"
        cy="47.2"
        r="5.6"
        fill="#5D6B88"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
      />
      <circle cx="45.5" cy="47.2" r="2.2" fill="#FFFDF7" />

      {/* Ground accent line */}
      <path
        d="M6.5 52.8H57.5"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </StickerSvg>
  )
}

/**
 * Route Timeline Destination Pin: Cozy Pastel Coral Map Pin over Mint Map Fold ("จุดส่ง(ปลายทาง)")
 */
export function PastelRouteDestinationPinIcon({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Pastel Mint & Cream Folded Map Base */}
      <path
        d="M11 45.5L23.5 41L40.5 45L53 40.5V52.5L40.5 56.5L23.5 52.5L11 56.5V45.5Z"
        fill="#B6E3D3"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 41L40.5 45V56.5L23.5 52.5V41Z"
        fill="#FFF8E6"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Plump Pastel Coral Destination Pin */}
      <path
        d="M32 9C22.8 9 16 15.8 16 24.4C16 34.4 27.6 43.2 30.9 45.7C31.5 46.2 32.5 46.2 33.1 45.7C36.4 43.2 48 34.4 48 24.4C48 15.8 41.2 9 32 9Z"
        fill="#F69E92"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cel shading crescent */}
      <path
        d="M42.8 21.5C43.5 28.4 38 35.6 32.8 41"
        stroke="#E47E72"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Inner cream ring */}
      <circle
        cx="32"
        cy="23.8"
        r="6.6"
        fill="#FFFBF2"
        stroke={MAROON_STROKE}
        strokeWidth="2.1"
      />
      <circle cx="32" cy="23.8" r="2.3" fill="#FDE08E" />

      {/* Specular white highlight */}
      <path
        d="M21.2 20.5C21.8 17 24.2 14.3 27.5 13.4"
        stroke="#FFFFFF"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Warm amber doodle sparks */}
      <path
        d="M51 12L54.5 9M54 18H58M10 13L7 10"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Additional Fuel Expense Icon: Cozy Pastel Hand-Drawn Fuel Dispenser ("ค่าน้ำมัน")
 */
export function PastelFuelExpenseIcon({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Doodle sparkle ticks */}
      <path
        d="M11 15L8 12M8 21H5M53 14L56 11"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Pump Hose */}
      <path
        d="M42 25H46.5C49.5 25 51.5 27 51.5 30V41.5C51.5 44.2 49.5 46 47 46C44.5 46 43 44.2 43 41.8V36.5"
        stroke={NAVY_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nozzle Tip */}
      <path
        d="M49 20L54 24.5C55 25.4 55 27 54 27.8L51.5 30"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Dispenser Body */}
      <rect
        x="15"
        y="13"
        width="27"
        height="39"
        rx="6"
        fill="#FCE1A2"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cel shade right edge */}
      <path
        d="M38.5 17V48.5"
        stroke="#F1C36A"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Top Display Screen */}
      <rect
        x="20"
        y="18.5"
        width="17"
        height="11"
        rx="3"
        fill="#CFE8F7"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Screen White Glint */}
      <path
        d="M23 21.8H29"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.72"
      />

      {/* Cute Pastel Fuel Drop Emblem */}
      <path
        d="M28.5 34.5C28.5 34.5 23.8 39.8 23.8 42.8C23.8 45.4 25.9 47.4 28.5 47.4C31.1 47.4 33.2 45.4 33.2 42.8C33.2 39.8 28.5 34.5 28.5 34.5Z"
        fill="#F6A69B"
        stroke={MAROON_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.8 41.8C26.5 42.9 26.9 44 27.6 44.6"
        stroke="#FFFFFF"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Base Plinth */}
      <rect
        x="11.5"
        y="50"
        width="34"
        height="5.5"
        rx="2.75"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
      />
    </StickerSvg>
  )
}

/**
 * Dashboard KPI Cozy Pastel Icons
 */
export function PastelCalendarKpiIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      <rect
        x="10"
        y="15"
        width="44"
        height="39"
        rx="9"
        fill="#FFFBF2"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
      />
      <path
        d="M10 25C10 19.5 14 15 19 15H45C50 15 54 19.5 54 25V27H10V25Z"
        fill="#F6A69B"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M22 10V18M42 10V18"
        stroke={NAVY_STROKE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="18" y="33" width="7" height="6" rx="2" fill="#A6DFCA" />
      <rect x="28.5" y="33" width="7" height="6" rx="2" fill="#FDE08E" />
      <rect x="39" y="33" width="7" height="6" rx="2" fill="#B6DCF0" />
      <rect x="18" y="42" width="7" height="6" rx="2" fill="#F8C8D4" />
      <path
        d="M16 19.5H24"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M54 10L57 7"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

export function PastelClockKpiIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      <circle
        cx="32"
        cy="34"
        r="20"
        fill="#FDE49B"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
      />
      <circle
        cx="32"
        cy="34"
        r="14.5"
        fill="#FFFDF7"
        stroke={MAROON_STROKE}
        strokeWidth="2"
      />
      {/* Bell ears */}
      <path
        d="M16 16L21 13M48 16L43 13"
        stroke={MAROON_STROKE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Hands */}
      <path
        d="M32 25V34L39 37.5"
        stroke={NAVY_STROKE}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="34" r="2.2" fill="#F6A69B" stroke={MAROON_STROKE} strokeWidth="1.6" />
      {/* Specular highlight */}
      <path
        d="M19.5 23.5C21.5 20.8 24.2 19 27 18.2"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Doodle ticks */}
      <path
        d="M52 15L56 12M55 21H59"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Cozy Pastel Hand-Drawn Character Avatars (Japanese/Korean Editorial Infographic Portrait Style)
 */
export type CharacterVariant =
  | "farlada"
  | "theerakh"
  | "sasithorn"
  | "kittikhun"
  | "jirawat"

const CHARACTER_CONFIG: Record<
  CharacterVariant,
  {
    bg: string
    shirt: string
    collar: string
    hair: string
    hairStyle: "bob" | "short" | "wavy" | "parted" | "spiky"
    glasses?: boolean
  }
> = {
  farlada: {
    bg: "#FBEAF0",
    shirt: "#A9DFCE",
    collar: "#FFFDF7",
    hair: "#4A3F55",
    hairStyle: "bob",
  },
  theerakh: {
    bg: "#E6F5F1",
    shirt: "#F7FAFC",
    collar: "#B5DBF0",
    hair: "#434E68",
    hairStyle: "short",
  },
  sasithorn: {
    bg: "#EBF4FB",
    shirt: "#F8B9B0",
    collar: "#FFFDF7",
    hair: "#5C434B",
    hairStyle: "wavy",
  },
  kittikhun: {
    bg: "#FEF5E4",
    shirt: "#B2D7EE",
    collar: "#FFFDF7",
    hair: "#3F4B66",
    hairStyle: "parted",
    glasses: true,
  },
  jirawat: {
    bg: "#EEF2FA",
    shirt: "#FCD88B",
    collar: "#FFFDF7",
    hair: "#424C63",
    hairStyle: "spiky",
  },
}

export function PastelCharacterAvatar({
  variant,
  className,
}: {
  variant: CharacterVariant
  className?: string
}) {
  const cfg = CHARACTER_CONFIG[variant]

  return (
    <StickerSvg className={className} sticker>
      {/* Circular pastel sticker backdrop */}
      <circle
        cx="32"
        cy="32"
        r="29"
        fill={cfg.bg}
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <circle
        cx="32"
        cy="32"
        r="27.5"
        fill={cfg.bg}
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />

      {/* Hair Back Layer for longer styles */}
      {cfg.hairStyle === "bob" && (
        <path
          d="M17 29C17 17.5 23.5 13 32 13C40.5 13 47 17.5 47 29V41C47 43 44.5 44 42 43H22C19.5 44 17 43 17 41V29Z"
          fill={cfg.hair}
          stroke={NAVY_STROKE}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      )}
      {cfg.hairStyle === "wavy" && (
        <path
          d="M16 30C16 17 23 12 32 12C41 12 48 17 48 30C48 37 46 42 43 45H21C18 42 16 37 16 30Z"
          fill={cfg.hair}
          stroke={NAVY_STROKE}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      )}

      {/* Shoulders / Cozy Shirt */}
      <path
        d="M13 55C14.5 45.5 21.5 41.5 32 41.5C42.5 41.5 49.5 45.5 51 55"
        fill={cfg.shirt}
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cute Collar */}
      <path
        d="M26 42L32 47.5L38 42"
        fill={cfg.collar}
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Neck */}
      <rect
        x="28.5"
        y="36.5"
        width="7"
        height="7"
        rx="3"
        fill="#FADAC5"
        stroke={MAROON_STROKE}
        strokeWidth="1.9"
      />

      {/* Ears */}
      <circle cx="20.5" cy="29.5" r="3" fill="#FDE2CF" stroke={MAROON_STROKE} strokeWidth="1.9" />
      <circle cx="43.5" cy="29.5" r="3" fill="#FDE2CF" stroke={MAROON_STROKE} strokeWidth="1.9" />

      {/* Plump Friendly Face */}
      <ellipse
        cx="32"
        cy="28.5"
        rx="11.5"
        ry="11"
        fill="#FFE7D6"
        stroke={MAROON_STROKE}
        strokeWidth="2.1"
      />

      {/* Front Hair Fringe */}
      {cfg.hairStyle === "bob" && (
        <path
          d="M20.5 26C21 18.5 25.5 14.5 32 14.5C38.5 14.5 43 18.5 43.5 26C40 22.8 36 22 33 22.5C29 23.2 25 22.5 20.5 26Z"
          fill={cfg.hair}
          stroke={NAVY_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {cfg.hairStyle === "wavy" && (
        <path
          d="M20.5 26C21 18 25.5 14 32 14C38.5 14 43 18 43.5 26C39 23 36.5 20.5 32 22C27.5 23.5 24 22.5 20.5 26Z"
          fill={cfg.hair}
          stroke={NAVY_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {(cfg.hairStyle === "short" ||
        cfg.hairStyle === "parted" ||
        cfg.hairStyle === "spiky") && (
        <path
          d="M20.2 27C19.5 19 24.5 13.5 32 13.5C39.5 13.5 44.5 19 43.8 27C41 22.8 37.5 21 32 21.5C26.5 22 23 23 20.2 27Z"
          fill={cfg.hair}
          stroke={NAVY_STROKE}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      )}

      {/* White Hair Specular Highlight */}
      <path
        d="M26 17.8C28.5 16.7 31.5 16.6 34.5 17.4"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Cute Eyes */}
      <circle cx="27.5" cy="29.5" r="1.5" fill={NAVY_STROKE} />
      <circle cx="36.5" cy="29.5" r="1.5" fill={NAVY_STROKE} />

      {/* Optional Round Glasses */}
      {cfg.glasses && (
        <>
          <circle cx="27.5" cy="29.5" r="3.6" stroke={NAVY_STROKE} strokeWidth="1.6" />
          <circle cx="36.5" cy="29.5" r="3.6" stroke={NAVY_STROKE} strokeWidth="1.6" />
          <path d="M31.1 29.5H32.9" stroke={NAVY_STROKE} strokeWidth="1.6" />
        </>
      )}

      {/* Warm Rosy Cheeks */}
      <ellipse cx="24.5" cy="32.2" rx="2.1" ry="1.2" fill="#F7A7A7" opacity="0.7" />
      <ellipse cx="39.5" cy="32.2" rx="2.1" ry="1.2" fill="#F7A7A7" opacity="0.7" />

      {/* Warm Gentle Smile */}
      <path
        d="M29.2 33.4C30.8 35.1 33.2 35.1 34.8 33.4"
        stroke={MAROON_STROKE}
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* Tiny sparkle accent */}
      <path
        d="M50 13L52.5 10.5M53 16.5H55.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Cozy Pastel Hand-Drawn Empty State Illustration (for filtered Plan List)
 */
export function PastelEmptySearchIllustration({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker viewBox="0 0 96 72">
      {/* Soft clouds */}
      <path
        d="M15 24C15 20.5 18 18 21.5 18C22.4 15 25.2 13 28.5 13C32.5 13 35.8 16 36 20C38.5 20.4 40.5 22.3 40.5 24.8C40.5 27.5 38.2 29.5 35.5 29.5H20C17.2 29.5 15 27 15 24Z"
        fill="#EBF6FA"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cozy Folder */}
      <path
        d="M24 30C24 27.2 26.2 25 29 25H42L46 30H67C69.8 30 72 32.2 72 35V56C72 58.8 69.8 61 67 61H29C26.2 61 24 58.8 24 56V30Z"
        fill="#FDE3A2"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      {/* Magnifier */}
      <circle
        cx="55"
        cy="43"
        r="11"
        fill="#FFFDF7"
        stroke={MAROON_STROKE}
        strokeWidth="2.4"
      />
      <path
        d="M63 51L71 59"
        stroke={MAROON_STROKE}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M49.5 38.5C51 36.8 53 36 55.2 36.2"
        stroke="#A9D2E8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Doodle sparkles */}
      <path
        d="M77 23L81 19M80 29H84M15 41L12 38"
        stroke={DOODLE_AMBER}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Sidebar Bottom: Cozy Pastel Hand-Drawn Japanese/Korean Cityscape Skyline
 */
export function PastelCityscapeBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden rounded-b-xl select-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#186860]/75 via-[#68afa5]/30 to-transparent" />
      <svg
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 bottom-0 h-full w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Soft Floating Clouds */}
        <path
          d="M28 52C28 48 31.5 45 35.5 45C36.8 41.5 40.2 39 44.5 39C49.5 39 53.5 42.8 54 47.5C57.5 48 60 50.8 60 54.2C60 57.5 57.2 60 53.8 60H34.5C30.8 60 28 56.8 28 52Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
          stroke="#2E645F"
          strokeOpacity="0.22"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M168 42C168 38.8 171 36.2 174.5 36.2C175.8 33 178.8 31 182.5 31C186.8 31 190.2 34.2 190.6 38.2C193.5 38.6 195.8 41 195.8 43.8C195.8 46.8 193.2 49 190.2 49H173.8C170.5 49 168 46 168 42Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
          stroke="#2E645F"
          strokeOpacity="0.2"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Warm Sparkle Accents in sky */}
        <path
          d="M114 48L117 45M118 53H121.5M109 45V42"
          stroke="#FDE29B"
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Soft Back Buildings */}
        <rect
          x="10"
          y="92"
          width="34"
          height="72"
          rx="6"
          fill="#9ED3C8"
          fillOpacity="0.5"
          stroke="#275854"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <rect
          x="128"
          y="80"
          width="38"
          height="84"
          rx="7"
          fill="#8AC7BC"
          fillOpacity="0.55"
          stroke="#275854"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <rect
          x="196"
          y="96"
          width="34"
          height="68"
          rx="6"
          fill="#9ED3C8"
          fillOpacity="0.5"
          stroke="#275854"
          strokeOpacity="0.35"
          strokeWidth="2"
        />

        {/* Cozy Front Buildings */}
        <rect
          x="36"
          y="74"
          width="44"
          height="90"
          rx="8"
          fill="#4A9A90"
          fillOpacity="0.65"
          stroke="#1E4B47"
          strokeOpacity="0.45"
          strokeWidth="2.1"
        />
        <rect
          x="86"
          y="64"
          width="48"
          height="100"
          rx="9"
          fill="#2D7E75"
          fillOpacity="0.72"
          stroke="#19423E"
          strokeOpacity="0.5"
          strokeWidth="2.1"
        />
        <rect
          x="156"
          y="72"
          width="46"
          height="92"
          rx="8"
          fill="#3E8F85"
          fillOpacity="0.68"
          stroke="#1E4B47"
          strokeOpacity="0.45"
          strokeWidth="2.1"
        />

        {/* Warm Pastel Glowing Windows */}
        <rect x="46" y="88" width="9" height="10" rx="2.5" fill="#FFF2C6" fillOpacity="0.7" />
        <rect x="61" y="88" width="9" height="10" rx="2.5" fill="#DFF4F0" fillOpacity="0.55" />
        <rect x="46" y="106" width="9" height="10" rx="2.5" fill="#DFF4F0" fillOpacity="0.5" />
        <rect x="61" y="106" width="9" height="10" rx="2.5" fill="#FFF2C6" fillOpacity="0.65" />

        <rect x="97" y="78" width="10" height="11" rx="2.8" fill="#FFF2C6" fillOpacity="0.75" />
        <rect x="113" y="78" width="10" height="11" rx="2.8" fill="#FFF2C6" fillOpacity="0.55" />
        <rect x="97" y="96" width="10" height="11" rx="2.8" fill="#DFF4F0" fillOpacity="0.55" />
        <rect x="113" y="96" width="10" height="11" rx="2.8" fill="#FFF2C6" fillOpacity="0.7" />
        <rect x="97" y="114" width="10" height="11" rx="2.8" fill="#FFF2C6" fillOpacity="0.5" />
        <rect x="113" y="114" width="10" height="11" rx="2.8" fill="#DFF4F0" fillOpacity="0.45" />

        <rect x="167" y="86" width="9" height="10" rx="2.5" fill="#FFF2C6" fillOpacity="0.68" />
        <rect x="182" y="86" width="9" height="10" rx="2.5" fill="#DFF4F0" fillOpacity="0.5" />
        <rect x="167" y="104" width="9" height="10" rx="2.5" fill="#DFF4F0" fillOpacity="0.45" />
        <rect x="182" y="104" width="9" height="10" rx="2.5" fill="#FFF2C6" fillOpacity="0.6" />

        {/* Subtle White Roof Highlights */}
        <path
          d="M93 70H108M43 80H55M163 78H176"
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/**
 * Expense Category Header: Cozy Pastel Rental Car Sedan Illustration
 */
export function PastelRentalCarIllustration({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Soft pastel shadow */}
      <ellipse cx="32" cy="51.5" rx="23" ry="3.6" fill="#DCE9EE" />

      {/* Warm amber doodle sparkles */}
      <path
        d="M52 14L55 11M55.5 19H59M10 17L7.5 14.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Car Cabin Roof */}
      <path
        d="M17 31L22.5 19.5C23.8 17 26.2 15.5 29 15.5H39.5C42.5 15.5 45 17.2 46.2 20L50 31H17Z"
        fill="#E9F5FB"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cabin Windows */}
      <path
        d="M21 29.5L25 21C25.7 19.6 27 18.8 28.6 18.8H33.5V29.5H21Z"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M36.5 18.8H39.2C41 18.8 42.4 19.8 43.2 21.4L46.5 29.5H36.5V18.8Z"
        fill="#9CCAE8"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Window Specular Gloss */}
      <path
        d="M26 22.5L29 20.8M39 22.2L41.5 20.8"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.78"
      />

      {/* Main Car Body */}
      <path
        d="M8.5 39.5C8.5 34.5 12 31 17 31H48.5C53 31 56 34.2 56 38.8V43.5C56 45.4 54.4 47 52.5 47H11.5C9.8 47 8.5 45.6 8.5 43.8V39.5Z"
        fill="#A9D4EC"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Body Cel-Shading Band */}
      <path
        d="M10.5 42.5H54V44C54 45 53.2 45.8 52.2 45.8H12.3C11.3 45.8 10.5 45 10.5 44V42.5Z"
        fill="#89BCDA"
      />

      {/* Door Handle & Accent Line */}
      <path
        d="M27.5 35.5H32.5"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 34.2H22"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Front Headlight (Warm Butter Yellow) & Rear Taillight (Soft Coral) */}
      <rect
        x="10.2"
        y="35"
        width="4.8"
        height="4.6"
        rx="2"
        fill="#FDE08E"
        stroke={MAROON_STROKE}
        strokeWidth="1.8"
      />
      <rect
        x="51"
        y="35.2"
        width="3.6"
        height="4.4"
        rx="1.6"
        fill="#F6A69B"
        stroke={MAROON_STROKE}
        strokeWidth="1.8"
      />

      {/* Wheels */}
      <circle
        cx="19.5"
        cy="47"
        r="6.2"
        fill="#536382"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
      />
      <circle cx="19.5" cy="47" r="2.6" fill="#FFFDF7" />

      <circle
        cx="45.5"
        cy="47"
        r="6.2"
        fill="#536382"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
      />
      <circle cx="45.5" cy="47" r="2.6" fill="#FFFDF7" />
    </StickerSvg>
  )
}

/**
 * Attachment Card Icon: Cozy Pastel Framed Photo / Image File Illustration
 */
export function PastelImageAttachmentIcon({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className}>
      {/* Cream Outer Photo Frame */}
      <rect
        x="8"
        y="10"
        width="48"
        height="44"
        rx="10"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Sky Canvas */}
      <rect
        x="13"
        y="15"
        width="38"
        height="34"
        rx="6"
        fill="#DCEFF9"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />

      {/* Warm Butter Yellow Sun */}
      <circle
        cx="23"
        cy="24"
        r="4.5"
        fill="#FDE08E"
        stroke={MAROON_STROKE}
        strokeWidth="1.8"
      />

      {/* Soft Rolling Mint & Sage Hills */}
      <path
        d="M14 43L24 33C25.4 31.6 27.6 31.6 29 33L36 40L40.5 35.5C41.8 34.2 44 34.2 45.3 35.5L50 40.5V46C50 47.6 48.6 48.8 47 48.8H17C15.4 48.8 14 47.6 14 46V43Z"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle Cel-Shade Hill Depth */}
      <path
        d="M34 48.5L40.8 41.2C42 40 43.8 40 45 41.2L49.5 45.8V47C49.5 47.8 48.8 48.5 48 48.5H34Z"
        fill="#82CBAE"
      />

      {/* Gloss Highlight */}
      <path
        d="M16.5 18.5H20.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </StickerSvg>
  )
}

/**
 * Rental Car Additional Expense Icon: Cozy Pastel Late-Return Clock & Fine Slip
 */
export function PastelLateReturnFeeIcon({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Cream Receipt Slip */}
      <path
        d="M14 12C14 9.8 15.8 8 18 8H42C44.2 8 46 9.8 46 12V53L41.5 49.5L37 53L32.5 49.5L28 53L23.5 49.5L19 53L14 49.5V12Z"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Mint Top Ribbon */}
      <rect
        x="19.5"
        y="14"
        width="21"
        height="6"
        rx="3"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="1.8"
      />

      {/* Receipt Lines */}
      <path
        d="M20 26H33M20 33H29M20 40H27"
        stroke="#8EA4B8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Warm Coral-Yellow Clock Badge (Late Return Indicator) */}
      <circle
        cx="45"
        cy="39"
        r="12"
        fill="#FDE08E"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
      />
      <circle
        cx="45"
        cy="39"
        r="8.2"
        fill="#FFFDF7"
        stroke={MAROON_STROKE}
        strokeWidth="1.7"
      />
      <path
        d="M45 34.5V39L48.5 41"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Specular & Sparkle */}
      <path
        d="M52 15L55 12M55 20H58.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Expense Category Header: Cozy Pastel Commercial Airplane Illustration ("เครื่องบิน")
 * Rounded filled outline (#3B4A6B), warm pastel sky-blue & cream fuselage, mint tailfin, cel shading, white gloss & amber doodle sparks
 */
export function PastelAirplaneIllustration({
  className,
  sticker = true,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Warm amber doodle sparkles */}
      <path
        d="M11 16L8 13M8 22H4.5M53 15L56 12M56 21H59.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Soft Puffy Cloud Below */}
      <path
        d="M12 49.5C12 46.8 14.2 44.8 17 44.8C18 42.2 20.6 40.5 23.5 40.5C26.8 40.5 29.5 42.8 30 45.8C32.2 46.2 33.8 47.9 33.8 50C33.8 52.3 31.8 54 29.5 54H16.5C14 54 12 52 12 49.5Z"
        fill="#EAF6FC"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Far Wing Behind Fuselage */}
      <path
        d="M27 28L35 16.5C36 15.2 37.8 15 39 16L41.5 18.2L35 28.5H27Z"
        fill="#9CCAE8"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Mint Vertical Tailfin */}
      <path
        d="M12.5 34.5L9.5 23C9.2 21.6 10.2 20.2 11.7 20.2H15.8C17 20.2 18.1 20.9 18.6 22L22.5 30.5L12.5 34.5Z"
        fill="#9ADDC6"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tailfin Coral Stripe */}
      <path
        d="M13 24.5H17.5"
        stroke="#F6A69B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Plump Cream & Sky Fuselage */}
      <path
        d="M11.5 35.5C11.5 31.8 14.5 29.2 18.8 28.6L44.5 25C50.2 24.2 55.8 26.8 56.5 30.5C57.1 33.8 53.6 36.8 48 37.6L19.5 41.4C14.8 42 11.5 39.2 11.5 35.5Z"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Sky-Blue Belly Cel Shading */}
      <path
        d="M14.5 38.8L47.5 34.5C51.2 34 54 32.2 55 30.8C54.6 33.8 51.6 36.2 47.4 36.8L19.5 40.5C17.2 40.8 15.5 40 14.5 38.8Z"
        fill="#B6DCF0"
      />
      {/* Re-stroke Fuselage Crisp Outline */}
      <path
        d="M11.5 35.5C11.5 31.8 14.5 29.2 18.8 28.6L44.5 25C50.2 24.2 55.8 26.8 56.5 30.5C57.1 33.8 53.6 36.8 48 37.6L19.5 41.4C14.8 42 11.5 39.2 11.5 35.5Z"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cockpit Windshield */}
      <path
        d="M45.5 26.6C48.8 26.4 51.4 27.3 52.8 29.2L47 30C46 30.1 45.2 29.4 45.1 28.4L45.5 26.6Z"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
        strokeLinejoin="round"
      />

      {/* Cozy Butter-Yellow Passenger Windows */}
      <circle cx="24" cy="33.2" r="2" fill="#FDE08E" stroke={NAVY_STROKE} strokeWidth="1.6" />
      <circle cx="30.5" cy="32.3" r="2" fill="#FDE08E" stroke={NAVY_STROKE} strokeWidth="1.6" />
      <circle cx="37" cy="31.4" r="2" fill="#FDE08E" stroke={NAVY_STROKE} strokeWidth="1.6" />

      {/* Front Swept Wing */}
      <path
        d="M27.5 37.2L37.8 35.8L30.5 48.5C29.6 49.9 27.6 50.2 26.4 49.1L24.8 47.6L27.5 37.2Z"
        fill="#A9D4EC"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Specular White Highlights */}
      <path
        d="M20.5 30.2L29 29"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M28.5 41.5L27.2 45.2"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </StickerSvg>
  )
}

/**
 * Attachment Card Icon: Cozy Pastel PDF Document Sticker ("ตั๋วเครื่องบิน .pdf")
 */
export function PastelPdfAttachmentIcon({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Cream Rounded Document Sheet */}
      <path
        d="M14 11C14 8.8 15.8 7 18 7H39L50 18V53C50 55.2 48.2 57 46 57H18C15.8 57 14 55.2 14 53V11Z"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Folded Corner */}
      <path
        d="M39 7V15C39 16.7 40.3 18 42 18H50L39 7Z"
        fill="#FCE3DE"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle Document Lines */}
      <path
        d="M21 17.5H33M21 24.5H42"
        stroke="#A4B4C7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cozy Pastel Coral PDF Ribbon Badge */}
      <rect
        x="10"
        y="31"
        width="44"
        height="17"
        rx="5.5"
        fill="#F69E92"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
      />
      {/* Subtle lower cel shade on ribbon */}
      <path
        d="M12.5 44.5H51.5"
        stroke="#E58074"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Crisp White Specular Highlight */}
      <path
        d="M14.5 34H22"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.72"
      />
      {/* Hand-drawn PDF Letters */}
      <text
        x="32"
        y="42.8"
        textAnchor="middle"
        fill="#FFFDF9"
        fontSize="10.5"
        fontWeight="800"
        letterSpacing="0.8"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        PDF
      </text>

      {/* Tiny Amber Sparkle Accent */}
      <path
        d="M54 11L57 8M56 16H59"
        stroke={DOODLE_AMBER}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Flight Additional Expense Icon: Cozy Pastel In-Flight Snack Cup & Souvenir Bag Sticker
 */
export function PastelFlightExtraExpenseIcon({
  className,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker>
      {/* Doodle Sparkle Ticks */}
      <path
        d="M10 15L7 12M7.5 21H4.5M53 14L56 11"
        stroke={DOODLE_AMBER}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Souvenir Bag Handle */}
      <path
        d="M35 23V18.5C35 15.5 37.5 13 40.5 13C43.5 13 46 15.5 46 18.5V23"
        stroke={MAROON_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cozy Pastel Souvenir Bag */}
      <rect
        x="28"
        y="22"
        width="25"
        height="29"
        rx="6"
        fill="#FCE1A2"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bag Cel Shading */}
      <path
        d="M49.5 26V47.5"
        stroke="#F0C26B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Cute Coral Ribbon Bow on Bag */}
      <circle cx="40.5" cy="36.5" r="4.5" fill="#F6A69B" stroke={MAROON_STROKE} strokeWidth="1.9" />

      {/* In-Flight Beverage Cup Foreground Left */}
      <path
        d="M12.5 29H31.5L29.2 49C28.9 51.2 27.1 52.8 24.9 52.8H19.1C16.9 52.8 15.1 51.2 14.8 49L12.5 29Z"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mint Sleeve on Cup */}
      <path
        d="M13.6 36H30.4L29.6 43.5H14.4L13.6 36Z"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cup Lid & Straw */}
      <rect
        x="10.5"
        y="24.5"
        width="23"
        height="5"
        rx="2.5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
      />
      <path
        d="M22 24.5L24.5 16.5L28 15"
        stroke={MAROON_STROKE}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* White Specular Highlight */}
      <path
        d="M16.8 38.6H21"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.75"
      />
    </StickerSvg>
  )
}

/* ============================================================================
 * Budget Review KPI Card Illustrations (Cozy Pastel Hand-Drawn Vector Style)
 * ============================================================================ */

/**
 * KPI 1 ("ทั้งหมด"): Cozy Pastel Rising Bar Chart + Teal Trend Arrow
 */
export function PastelKpiAllChartIllustration({
  className,
  sticker = false,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      {/* Soft pastel mint-cream cloud blob */}
      <circle cx="34" cy="34" r="22" fill="#EDF8F5" />
      {/* Base shelf */}
      <path
        d="M12 49H53"
        stroke={NAVY_STROKE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bar 1 - Soft Coral */}
      <rect
        x="15"
        y="37"
        width="7.5"
        height="12"
        rx="2.5"
        fill="#F6A69B"
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />
      {/* Bar 2 - Warm Butter Yellow */}
      <rect
        x="25"
        y="31"
        width="7.5"
        height="18"
        rx="2.5"
        fill="#FDE08E"
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />
      {/* Bar 3 - Mint Green */}
      <rect
        x="35"
        y="25"
        width="7.5"
        height="24"
        rx="2.5"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />
      {/* Bar 4 - Sky Blue */}
      <rect
        x="45"
        y="19"
        width="7.5"
        height="30"
        rx="2.5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />
      {/* Specular shine lines on bars */}
      <path
        d="M37.5 28V35"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M47.5 22V30"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Rising Trend Arrow */}
      <path
        d="M14 31L26 24L35 20L47 12"
        stroke="#1F7A70"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 11.5H47.5V17.5"
        stroke="#1F7A70"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cozy amber doodle sparks */}
      <path
        d="M17 15L19 18M12 19L15 20"
        stroke={DOODLE_AMBER}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * KPI 2 ("รอดำเนินการ"): Cozy Pastel Reviewer with Magnifying Glass & Calendar
 */
export function PastelKpiPendingReviewIllustration({
  className,
  sticker = false,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      <circle cx="33" cy="34" r="22" fill="#FFF8E8" />
      {/* Mini tilted pastel calendar */}
      <g transform="rotate(-7 26 30)">
        <rect
          x="13"
          y="16"
          width="26"
          height="26"
          rx="5"
          fill="#FFFDF7"
          stroke={NAVY_STROKE}
          strokeWidth="2"
        />
        <path
          d="M13 23H39"
          stroke={NAVY_STROKE}
          strokeWidth="2"
        />
        <rect
          x="13"
          y="16"
          width="26"
          height="7"
          rx="4"
          fill="#B6DCF0"
          stroke={NAVY_STROKE}
          strokeWidth="2"
        />
        {/* Calendar grid dots */}
        <circle cx="19" cy="29" r="1.5" fill="#9BB3C9" />
        <circle cx="25" cy="29" r="1.5" fill="#9BB3C9" />
        <circle cx="31" cy="29" r="1.5" fill="#F4A63B" />
        <circle cx="19" cy="35" r="1.5" fill="#9BB3C9" />
        <circle cx="25" cy="35" r="1.5" fill="#A4DFC9" />
      </g>
      {/* Magnifying glass */}
      <circle
        cx="31"
        cy="34"
        r="7.5"
        fill="#E5F4FC"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
      />
      <path
        d="M28 31.5C29.2 30.3 31 29.8 32.5 30.2"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M36.8 39.2L42 44.2"
        stroke={MAROON_STROKE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Cute mini character on right */}
      <circle
        cx="46.5"
        cy="29.5"
        r="4.2"
        fill="#FCE1CE"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      <path
        d="M42.8 28.5C43.5 25.5 49.5 25.5 50.2 28.5"
        fill={NAVY_STROKE}
      />
      <path
        d="M41.5 47C41.5 40.5 43.2 36.5 46.5 36.5C49.8 36.5 51.5 40.5 51.5 47"
        fill="#FDE08E"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Doodle spark */}
      <path
        d="M48 16L50.5 14M52 20L55 19.5"
        stroke={DOODLE_AMBER}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * KPI 3 ("เสร็จสิ้น"): Cozy Pastel Checklist Board + Celebrating Character
 */
export function PastelKpiCompletedIllustration({
  className,
  sticker = false,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      <circle cx="33" cy="34" r="22" fill="#EEF6FE" />
      {/* Checklist board */}
      <rect
        x="12"
        y="13"
        width="24"
        height="34"
        rx="5"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
      />
      {/* Top clip */}
      <rect
        x="19"
        y="10.5"
        width="10"
        height="5"
        rx="2.5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      {/* Check rows */}
      <path
        d="M16.5 23L18.5 25L22 21.5"
        stroke="#1F7A70"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25 23.5H32" stroke="#9BB3C9" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16.5 31L18.5 33L22 29.5"
        stroke="#1F7A70"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25 31.5H32" stroke="#9BB3C9" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16.5 39L18.5 41L22 37.5"
        stroke="#1F7A70"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25 39.5H31" stroke="#9BB3C9" strokeWidth="2" strokeLinecap="round" />
      {/* Celebrating mini character */}
      <circle
        cx="46"
        cy="26"
        r="4.2"
        fill="#FCE1CE"
        stroke={NAVY_STROKE}
        strokeWidth="1.9"
      />
      <path
        d="M42.5 34.5L39 29M49.5 34.5L53 28.5"
        stroke={NAVY_STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="42"
        y="32.5"
        width="8"
        height="11"
        rx="3.5"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="2"
      />
      <path
        d="M44 43.5V49M48 43.5V49"
        stroke={NAVY_STROKE}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Celebration sparks */}
      <path
        d="M44 15L45 12M51 17L54 15"
        stroke={DOODLE_AMBER}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * KPI 4 ("JV ปฏิเสธ"): Cozy Pastel Document Sheet with Coral/Red X Stamp
 */
export function PastelKpiRejectedIllustration({
  className,
  sticker = false,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      <circle cx="33" cy="34" r="22" fill="#FFF2F2" />
      {/* Tilted Document */}
      <g transform="rotate(-8 31 32)">
        <rect
          x="17"
          y="14"
          width="25"
          height="34"
          rx="5"
          fill="#FFFDF7"
          stroke={NAVY_STROKE}
          strokeWidth="2.1"
        />
        <path
          d="M22 22H36M22 28H35M22 34H31M22 40H29"
          stroke="#CBD5E1"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      {/* Coral/Red X Stamp Circle */}
      <circle
        cx="43"
        cy="38"
        r="10.5"
        fill="#F6A69B"
        stroke={MAROON_STROKE}
        strokeWidth="2.1"
      />
      <path
        d="M39 34L47 42M47 34L39 42"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Specular gleam */}
      <path
        d="M21 18.5H26"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </StickerSvg>
  )
}

/**
 * KPI 5 ("ยกเลิกแผนงาน"): Cozy Pastel Muted Document with Cancel X Badge
 */
export function PastelKpiCancelledIllustration({
  className,
  sticker = false,
}: IllustrationProps) {
  return (
    <StickerSvg className={className} sticker={sticker}>
      <circle cx="33" cy="34" r="22" fill="#F3F5F8" />
      {/* Document */}
      <g transform="rotate(-6 30 32)">
        <rect
          x="16"
          y="14"
          width="25"
          height="34"
          rx="5"
          fill="#F8FAFC"
          stroke={NAVY_STROKE}
          strokeWidth="2.1"
        />
        <path
          d="M21 22H35M21 28H34M21 34H30M21 40H28"
          stroke="#B8C4D4"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      {/* Muted Coral-Slate X Badge */}
      <circle
        cx="43"
        cy="38"
        r="10"
        fill="#E9B8B4"
        stroke={MAROON_STROKE}
        strokeWidth="2"
      />
      <path
        d="M39.2 34.2L46.8 41.8M46.8 34.2L39.2 41.8"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/* ============================================================================
 * Compact Cozy Pastel Icons for Card Metadata Rows & Table Column Headers
 * ============================================================================ */

/**
 * Document Sheet Icon ("เลขที่เอกสาร")
 */
export function PastelDocMiniIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} viewBox="0 0 24 24">
      <rect
        x="4.5"
        y="3"
        width="15"
        height="18"
        rx="3"
        fill="#E4E7FA"
        stroke={NAVY_STROKE}
        strokeWidth="1.6"
      />
      <path
        d="M14.5 3V7.5H19.5"
        fill="#C7CFF5"
        stroke={NAVY_STROKE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.5H15.5M8 14H15.5M8 17.2H12.5"
        stroke="#6B78A6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Map Pin over Folded Pastel Map ("ชื่อสถานที่ Onsite")
 */
export function PastelLocationMiniIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} viewBox="0 0 24 24">
      {/* Folded map base */}
      <path
        d="M4 19.5L7.5 14.5H16.5L20 19.5H4Z"
        fill="#FDE08E"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Pin body */}
      <path
        d="M12 17.5C12 17.5 17 13.2 17 9C17 6.2 14.8 4 12 4C9.2 4 7 6.2 7 9C7 13.2 12 17.5 12 17.5Z"
        fill="#F69B7B"
        stroke={MAROON_STROKE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2" fill="#FFFDF7" />
    </StickerSvg>
  )
}

/**
 * Calendar + Mini Clock Badge ("วันที่ไป-กลับ" & "วันเวลาตรวจสอบ")
 */
export function PastelCalendarClockMiniIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} viewBox="0 0 24 24">
      <rect
        x="3.5"
        y="5"
        width="14.5"
        height="13.5"
        rx="2.8"
        fill="#FFFDF7"
        stroke={NAVY_STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M3.5 8.8H18"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
      />
      <rect
        x="3.5"
        y="5"
        width="14.5"
        height="3.8"
        rx="2"
        fill="#82BEE6"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
      />
      <path
        d="M7.2 3.5V6M14.2 3.5V6"
        stroke={NAVY_STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Mini Clock Badge */}
      <circle
        cx="17"
        cy="16.8"
        r="4.5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="1.5"
      />
      <path
        d="M17 14.6V17L18.6 17.8"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StickerSvg>
  )
}

/**
 * Cute Pastel Team Trio ("จำนวนคน")
 */
export function PastelPeopleMiniIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} viewBox="0 0 24 24">
      {/* Left person */}
      <circle cx="6.8" cy="10" r="2.3" fill="#FDE08E" stroke={NAVY_STROKE} strokeWidth="1.4" />
      <path
        d="M3.5 17.5C3.5 15.1 4.9 13.8 6.8 13.8C8.1 13.8 9.1 14.4 9.7 15.4"
        fill="#FDE08E"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Right person */}
      <circle cx="17.2" cy="10" r="2.3" fill="#B6DCF0" stroke={NAVY_STROKE} strokeWidth="1.4" />
      <path
        d="M14.3 15.4C14.9 14.4 15.9 13.8 17.2 13.8C19.1 13.8 20.5 15.1 20.5 17.5"
        fill="#B6DCF0"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Center person */}
      <circle cx="12" cy="8.5" r="2.8" fill="#F6A69B" stroke={NAVY_STROKE} strokeWidth="1.5" />
      <path
        d="M7.5 18.5C7.5 15.4 9.4 13.6 12 13.6C14.6 13.6 16.5 15.4 16.5 18.5"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </StickerSvg>
  )
}

/**
 * Verified Reviewer Badge ("ผู้ตรวจสอบ")
 */
export function PastelReviewerMiniIcon({ className }: IllustrationProps) {
  return (
    <StickerSvg className={className} viewBox="0 0 24 24">
      <rect
        x="4"
        y="4.5"
        width="14.5"
        height="15"
        rx="3"
        fill="#EBF7F2"
        stroke={NAVY_STROKE}
        strokeWidth="1.5"
      />
      <circle cx="10.2" cy="10" r="2.2" fill="#FCE1CE" stroke={NAVY_STROKE} strokeWidth="1.3" />
      <path
        d="M6.8 16.2C7.3 14.3 8.6 13.5 10.2 13.5C11.8 13.5 13.1 14.3 13.6 16.2"
        fill="#A4DFC9"
        stroke={NAVY_STROKE}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Green verified check circle */}
      <circle
        cx="17.2"
        cy="16.2"
        r="4.2"
        fill="#79D2A8"
        stroke={NAVY_STROKE}
        strokeWidth="1.4"
      />
      <path
        d="M15.4 16.2L16.7 17.5L19.1 15"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StickerSvg>
  )
}


