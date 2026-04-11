import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halka - Doctor-Led Weight Loss for India",
  description: "Clinically-proven weight loss treatments prescribed by licensed Indian doctors. Personalized plans, medication at your door, and a coach who actually cares.",
  keywords: ["weight loss", "GLP-1", "health", "india", "doctor"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
