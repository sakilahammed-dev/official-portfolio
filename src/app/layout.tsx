import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakil Ahammed • Full-Stack AI Automation & Autonomous Operations Architect",
  description:
    "Engineering resilient autonomous AI ecosystems, intelligent multi-agent swarms, and enterprise workflow architectures that scale businesses with precision and ethics.",
  keywords: [
    "Sakil Ahammed",
    "AI Automation Architect",
    "Autonomous Operations",
    "Multi-Agent Systems",
    "Enterprise AI Workflows",
    "Full-Stack Architect",
    "n8n Automation",
  ],
  authors: [{ name: "Sakil Ahammed" }],
  creator: "Sakil Ahammed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sakilahammed.com",
    title: "Sakil Ahammed • Full-Stack AI Automation & Autonomous Operations Architect",
    description:
      "Engineering resilient autonomous AI ecosystems and enterprise workflow architectures.",
    siteName: "Sakil Ahammed Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueMontreal.variable} font-sans dark`}>
      <body className="bg-background text-text-primary min-h-screen antialiased selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
