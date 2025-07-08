import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Ana Milena Mejía Ochoa - Psicóloga Sistémica en Medellín",
  description: "Psicóloga con más de 10 años de experiencia. Terapia individual, de pareja y familiar con enfoque sistémico. Acompaño procesos de transformación y crecimiento personal.",
  keywords: "psicóloga medellín, terapia sistémica, terapia de pareja, terapia familiar, psicología medellín, ana milena mejía",
  authors: [{ name: "Ana Milena Mejía Ochoa" }],
  openGraph: {
    title: "Ana Milena Mejía Ochoa - Psicóloga Sistémica",
    description: "Psicóloga con enfoque sistémico. Terapia individual, de pareja y familiar en Medellín.",
    url: "https://anamilenapsicologa.com",
    siteName: "Ana Milena Psicóloga",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Milena Mejía Ochoa - Psicóloga",
    description: "Psicóloga con enfoque sistémico en Medellín",
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
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
