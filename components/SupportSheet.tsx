'use client';
import React from 'react';
import supportData from '@/content/support.json';

interface SupportSheetProps {
  onClose: () => void;
}

export default function SupportSheet({ onClose }: SupportSheetProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-rose-500">Support & Resources</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            If you or someone you know is in immediate danger or experiencing gender-based violence, please reach out to verified Nigerian support services below.
          </p>

          <div className="flex flex-col gap-4">
            {supportData.map((res, i) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-semibold text-sm text-slate-100">{res.name}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-2">{res.description}</p>
                <div className="flex items-center justify-between text-xs font-mono text-rose-400">
                  <span>{res.phone}</span>
                  {!res.verified && (
                    <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                      [VERIFY]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
        >
          Return to Experience
        </button>
      </div>
    </div>
  );
}
