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
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(245,242,235,0.82)] backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-[4px] bg-[var(--brand-red)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--ink)]">
                Dataphyte
              </span>
            </Link>

            <nav className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] sm:gap-7">
              <Link href="/choose" className="transition hover:text-[var(--ink)]">
                Stories
              </Link>
              <Link href="/data-story" className="transition hover:text-[var(--ink)]">
                Data Story
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[var(--brand-red)] transition hover:border-[rgba(198,55,45,0.25)] hover:bg-[rgba(198,55,45,0.04)]"
              >
                Support
              </Link>
            </nav>
          </div>
        </header>

        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}

