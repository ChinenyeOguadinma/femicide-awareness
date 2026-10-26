import type { Metadata } from 'next';
import './globals.css';
import SafetyBar from '@/components/SafetyBar';

export const metadata: Metadata = {
  title: 'Femicide Awareness Interactive Storyboard',
  description: 'A mobile-first story and data project documenting femicide patterns.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen">
        <SafetyBar />
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
