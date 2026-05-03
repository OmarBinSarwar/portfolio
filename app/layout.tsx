import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Omar Bin Sarwar | Software Developer",
  description:
    "A creative software developer focused on building modern, responsive, scalable, and user-centric digital experiences. Explore my interactive portfolio.",
  keywords: [
    "Software Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Full Stack",
    "Omar Bin Sarwar",
    "Portfolio",
    "Interactive Portfolio",
  ],
  authors: [{ name: "Omar Bin Sarwar" }],
  creator: "Omar Bin Sarwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omar Bin Sarwar | Software Developer",
    description:
      "A creative software developer focused on building modern, responsive, scalable, and user-centric digital experiences.",
    siteName: "Omar Bin Sarwar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Bin Sarwar | Software Developer",
    description:
      "A creative software developer focused on building modern, responsive, scalable, and user-centric digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#171a23" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
