import type React from "react"
import type { Metadata, Viewport } from "next/types"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

// Dynamically import non-critical components for better performance
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false
})
const InteractiveBackground = dynamic(() => import("@/components/interactive-background"), {
  ssr: false
})
const LoadingScreen = dynamic(() => import("@/components/loading-screen"), {
  ssr: false
})

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://the-odessy-portfolio.netlify.app"),
  title: {
    default: "Jeff Mutugi ",
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
  authors: [{ name: "Jeff Mutugi", url: "https://the-odessy-portfolio.netlify.app" }],
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
    url: "https://the-odessy-portfolio.netlify.app",
    title: "Jeff Mutugi ",
    description: "Portfolio of Jeff Mutugi - Cybersecurity | Full-stack Dev | Builder | Hacker",
    siteName: "Jeff Mutugi Portfolio",
    images: [
      {
        url: "/icon-192.png",
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
    creator: "@Debug-Jeff",
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://www.vectorlogo.zone" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>

          <Suspense fallback={null}>
            <CustomCursor />
            <InteractiveBackground />
          </Suspense>

          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}