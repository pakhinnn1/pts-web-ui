import type { Metadata } from "next"
import {
  Noto_Sans_Thai,
  Plus_Jakarta_Sans,
  IBM_Plex_Mono,
} from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import "./globals.css"

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Planner Tag System — ระบบวางแผนงานและประมาณค่าใช้จ่าย",
  description:
    "ระบบจัดการแผนงานการปฏิบัติงานนอกสถานที่และประมาณการค่าใช้จ่าย (Planner Tag System)",
  openGraph: {
    title: "Planner Tag System — ระบบวางแผนงานและประมาณค่าใช้จ่าย",
    description:
      "ระบบจัดการแผนงานการปฏิบัติงานนอกสถานที่และประมาณการค่าใช้จ่าย (Planner Tag System)",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planner Tag System — ระบบวางแผนงานและประมาณค่าใช้จ่าย",
    description:
      "ระบบจัดการแผนงานการปฏิบัติงานนอกสถานที่และประมาณการค่าใช้จ่าย (Planner Tag System)",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="th"
      className={cn(
        "font-sans",
        notoSansThai.variable,
        plusJakartaSans.variable,
        ibmPlexMono.variable
      )}
    >
      <body suppressHydrationWarning>
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
