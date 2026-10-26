import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shadows Unheard | Femicide & Gender-Based Violence Awareness in Nigeria',
  description: 'An interactive investigative documentary and narrative simulation exploring systemic failures and support gaps.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen flex flex-col selection:bg-rose-600 selection:text-white">
        
        {/* Global Persistent Editorial Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-800/80 px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm group-hover:scale-125 transition transform" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold">
                Dataphyte <span className="text-rose-500 font-normal">Interactives</span>
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
            <Link href="/choose" className="text-slate-300 hover:text-rose-400 transition hidden sm:inline-block">
              Stories
            </Link>
            <Link href="/data-story" className="text-slate-300 hover:text-rose-400 transition hidden sm:inline-block">
              Data Story
            </Link>
            <Link
              href="/support"
              className="px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 hover:bg-rose-900 transition shadow-sm"
            >
              Emergency Help
            </Link>
          </nav>
        </header>

        {/* Main Content Container with Top Padding for Sticky Header */}
        <div className="flex-1 pt-14 flex flex-col">
          {children}
        </div>

      </body>
    </html>
  );
}
