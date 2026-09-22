import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GrainOverlay } from '@/components/motion/GrainOverlay';

export const metadata: Metadata = {
  title: 'FC Barcelona — The Culé Fan Experience',
  description:
    'A cinematic, editorial digital experience celebrating the legacy, tactics, squad, and soul of FC Barcelona. Unofficial & fan-made.',
  keywords: [
    'FC Barcelona',
    'Barça',
    'Camp Nou',
    'Lamine Yamal',
    'La Masia',
    'Culés',
    'Blaugrana',
    'Football',
    'La Liga',
    'Champions League',
  ],
  authors: [{ name: 'Culé Digital Collective' }],
  openGraph: {
    title: 'FC Barcelona — The Culé Fan Experience',
    description:
      'A cinematic, editorial digital experience celebrating the legacy, tactics, squad, and soul of FC Barcelona.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#060709',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground selection:bg-grana-600 selection:text-white min-h-screen flex flex-col font-sans">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <GrainOverlay />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
