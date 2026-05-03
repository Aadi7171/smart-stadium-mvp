import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Smart Stadium Command Center",
  description: "Agentic Command Center for Stadium Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", jetbrainsMono.variable, spaceGrotesk.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        {children}
      </body>
    </html>
  );
}
