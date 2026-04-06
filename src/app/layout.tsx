import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BlackGoatt | Digital Privacy Ecosystem",
  description: "Enterprise-grade VPN, Cloud Phones, and Location Services. One account, complete digital freedom. Accept crypto payments worldwide.",
  keywords: ["VPN", "Cloud Phone", "Privacy", "Security", "Crypto Payments", "WireGuard", "Location Services"],
  openGraph: {
    title: "BlackGoatt | Digital Privacy Ecosystem",
    description: "Enterprise-grade VPN, Cloud Phones, and Location Services. One account, complete digital freedom.",
    url: "https://blackgoatt.com",
    siteName: "BlackGoatt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackGoatt | Digital Privacy Ecosystem",
    description: "Enterprise-grade VPN, Cloud Phones, and Location Services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
