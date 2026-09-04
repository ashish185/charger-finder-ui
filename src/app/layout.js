import ThemeInitializer from "@/components/ThemeInitializer";
import QueryProvider from "./query-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://charge-finder.vercel.app";

export const metadata = {
  title: {
    default: "Charge Finder",
    template: "Charge Finder",
  },
  description: "Find the electric charger for your vehicle",
  keywords: ["EV charger", "electric vehicle", "charging station", "charge finder"],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Charge Finder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: appUrl,
    title: "Charge Finder",
    description: "Find the electric charger for your vehicle",
    siteName: "Charge Finder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charge Finder",
    description: "Find the electric charger for your vehicle",
  },
};

export const viewport = {
  themeColor: "#16a34a",
};

const RootLayout = ({ children }) => {
  return (
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <head>
          
        </head>
        <body className="min-h-full flex flex-col">
            <ThemeInitializer />
            {/* <ServiceWorkerRegistration /> */}
            <QueryProvider>
              {children}
            </QueryProvider>
        </body>
      </html>
  );
};

export default RootLayout;
