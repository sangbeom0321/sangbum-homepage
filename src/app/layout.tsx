import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sangbum.github.io"),
  title: {
    default: "Sangbum Woo — Autonomous Driving Researcher",
    template: "%s | Sangbum Woo",
  },
  description:
    "Autonomous Driving Researcher | M.S. Student at KOREATECH | Perception, Planning, and Control for Self-Driving Vehicles",
  keywords: [
    "autonomous driving",
    "self-driving",
    "perception",
    "planning",
    "control",
    "deep learning",
    "computer vision",
    "KOREATECH",
    "Sangbum Woo",
  ],
  authors: [{ name: "Sangbum Woo" }],
  openGraph: {
    title: "Sangbum Woo — Autonomous Driving Researcher",
    description:
      "Autonomous Driving Researcher | M.S. Student at KOREATECH | Perception, Planning, and Control for Self-Driving Vehicles",
    url: "https://sangbum.github.io",
    siteName: "Sangbum Woo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Sangbum Woo — Autonomous Driving Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangbum Woo — Autonomous Driving Researcher",
    description:
      "Autonomous Driving Researcher | M.S. Student at KOREATECH | Perception, Planning, and Control for Self-Driving Vehicles",
    images: ["/images/og-default.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
