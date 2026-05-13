"use client";

import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="Search applications, students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all"
            style={{ "--tw-ring-color": "#151869" } as React.CSSProperties}
            onFocus={(e) => e.target.style.borderColor = "#151869"}
            onBlur={(e) => e.target.style.borderColor = ""}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <button className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-slate-500 text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full border border-white" />
        </button>
        <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-slate-500 text-xl">mail</span>
        </button>
        <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-slate-200">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
            style={{ background: "linear-gradient(135deg, #151869, #2d35a8)" }}
          >
            AA
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold text-slate-800 leading-none">Admin</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Super Admin</div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-lg">expand_more</span>
        </div>
      </div>
    </header>
  );
}
