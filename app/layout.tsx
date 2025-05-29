import type React from "react"
import type { Metadata, Viewport } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from "@/components/custom-cursor"
import CommandPalette from "@/components/command-palette"
import LoadingScreen from "@/components/loading-screen"
import NotificationSystem from "@/components/notification-system"
import EasterEggs from "@/components/easter-eggs"
import AnalyticsProvider from "@/components/analytics-provider"
import PWAProvider from "@/components/pwa-provider"
import { Suspense } from "react"
import HackThePortfolio from "@/components/hack-the-portfolio"
import InteractiveBackground from "@/components/interactive-background"
import DashboardLayout from "@/components/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://jeffmutugi.vercel.app"),
  title: {
    default: "Jeff Mutugi | Developer & Cybersecurity Specialist",
    template: "%s | Jeff Mutugi",
  },
  description:
    "Portfolio of Jeff Mutugi - Cybersecurity | Full-stack Dev | Builder | Hacker. Specializing in secure web applications and ethical hacking.",
  keywords: [
    "Jeff Mutugi",
    "Cybersecurity",
    "Full-stack Developer",
    "Ethical Hacker",
    "Web Development",
    "Security",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Jeff Mutugi", url: "https://jeffmutugi.vercel.app" }],
  creator: "Jeff Mutugi",
  publisher: "Jeff Mutugi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jeffmutugi.vercel.app",
    title: "Jeff Mutugi | Developer & Cybersecurity Specialist",
    description: "Portfolio of Jeff Mutugi - Cybersecurity | Full-stack Dev | Builder | Hacker",
    siteName: "Jeff Mutugi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeff Mutugi - Developer & Cybersecurity Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeff Mutugi | Developer & Cybersecurity Specialist",
    description: "Portfolio of Jeff Mutugi - Cybersecurity | Full-stack Dev | Builder | Hacker",
    images: ["/og-image.png"],
    creator: "@jeffmutugi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jeff Mutugi",
              url: "https://jeffmutugi.vercel.app",
              image: "https://jeffmutugi.vercel.app/og-image.png",
              jobTitle: "Full-stack Developer & Cybersecurity Specialist",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Africa Nazarene University",
              },
              knowsAbout: ["Cybersecurity", "Web Development", "Ethical Hacking", "React", "Next.js", "Python"],
              sameAs: [
                "https://github.com/jeffmutugi",
                "https://linkedin.com/in/jeffmutugi",
                "https://twitter.com/jeffmutugi",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} cursor-none`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnalyticsProvider>
            <PWAProvider>
              <LoadingScreen />
              <CustomCursor />
              <CommandPalette />
              <NotificationSystem />
              <EasterEggs />
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardLayout>{children}</DashboardLayout>
              </Suspense>
              <InteractiveBackground />
              <HackThePortfolio />
              <Toaster />
            </PWAProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
