// "use client"

// import type React from "react"

// import { useEffect } from "react"
// import { usePathname } from "next/navigation"

// declare global {
//   interface Window {
//     gtag: (...args: any[]) => void
//     dataLayer: any[]
//   }
// }

// export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Initialize Google Analytics
//     if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID) {
//       const script = document.createElement("script")
//       script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
//       script.async = true
//       document.head.appendChild(script)

//       window.dataLayer = window.dataLayer || []
//       window.gtag = function gtag() {
//         window.dataLayer.push(arguments)
//       }
//       window.gtag("js", new Date())
//       window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
//         page_path: pathname,
//       })
//     }

//     // Track page views
//     if (window.gtag) {
//       window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
//         page_path: pathname,
//       })
//     }
//   }, [pathname])

//   // Track custom events
//   useEffect(() => {
//     ;(window as any).trackEvent = (action: string, category: string, label?: string, value?: number) => {
//       if (window.gtag) {
//         window.gtag("event", action, {
//           event_category: category,
//           event_label: label,
//           value: value,
//         })
//       }
//     }
//   }, [])

//   return <>{children}</>
// }
