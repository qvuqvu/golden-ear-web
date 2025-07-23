import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Ear - Daily Dictation App",
  description: "Improve your listening and transcription skills in English, French, and Chinese",
  keywords: ["dictation", "language learning", "CEFR", "listening", "transcription", "English", "French", "Chinese"],
  authors: [{ name: "Golden Ear Team" }],
  creator: "Golden Ear",
  publisher: "Golden Ear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(100% 0 0)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(13.38% 0.0092 285.75)" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased h-full bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
