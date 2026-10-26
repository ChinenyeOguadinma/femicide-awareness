'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SupportSheet from './SupportSheet';

export default function SafetyBar() {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-50 text-xs text-slate-300">
        <Link 
          href="/choose" 
          className="hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition"
        >
          ✕ Exit to Menu
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSupport(true)}
            className="bg-rose-900/80 hover:bg-rose-800 text-rose-100 font-semibold px-3 py-1 rounded border border-rose-700 transition"
          >
            Get Help & Support
          </button>
        </div>
      </header>

      {showSupport && <SupportSheet onClose={() => setShowSupport(false)} />}
    </>
  );
}
