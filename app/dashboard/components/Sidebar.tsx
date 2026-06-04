"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { clearAuthentication } from "@/lib/auth";

const nav = [
  {
    section: "OVERVIEW",
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
    ],
  },
  {
    section: "WEBSITE CMS",
    items: [
      { label: "About SEG", icon: "info", href: "/dashboard/about" },
      { label: "Faculties", icon: "school", href: "/dashboard/faculties" },
      { label: "Programs", icon: "menu_book", href: "/dashboard/programs" },
      { label: "Admission", icon: "how_to_reg", href: "/dashboard/admission" },
      { label: "R & D", icon: "science", href: "/dashboard/research" },
      { label: "Our Institutions", icon: "account_balance", href: "/dashboard/institutions" },
      { label: "Student Zone", icon: "school", href: "/dashboard/student-zone" },
      { label: "What's Happening", icon: "event_note", href: "/dashboard/happenings" },
      { label: "Events & Announcements", icon: "campaign", href: "/dashboard/events-announcements" },
      { label: "Placements", icon: "work", href: "/dashboard/placements" },
      { label: "Gallery", icon: "photo_library", href: "/dashboard/gallery" },
      { label: "Careers", icon: "work_outline", href: "/dashboard/careers" },
      { label: "Contact Us", icon: "contact_mail", href: "/dashboard/contact" },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      { label: "Applications", icon: "assignment", href: "/dashboard/applications" },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      { label: "Settings", icon: "settings", href: "/dashboard/settings" },
      { label: "Logout", icon: "logout", href: "/login" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const handleLogout = () => {
    clearAuthentication();
    router.push("/login");
  };

  const toggle = (section: string) => {
    setCollapsed((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <aside className="flex flex-col flex-shrink-0 h-full bg-white border-r shadow-sm w-60 border-slate-100">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 overflow-hidden bg-white border shadow-sm rounded-xl border-slate-100">
            <Image
              src="/seg-logo.jpeg"
              alt="SEG Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              onError={(e) => {
                // fallback if image not found
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="text-sm font-black leading-none" style={{ color: "#151869" }}>
              Admin
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5 font-medium">Saroj Educational Group</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto custom-scroll">
        {nav.map((group) => {
          const isCollapsed = collapsed.includes(group.section);
          return (
            <div key={group.section}>
              <button
                onClick={() => toggle(group.section)}
                className="w-full flex items-center justify-between px-3 mb-1.5 group"
              >
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
                  {group.section}
                </p>
                <span className={`material-symbols-outlined text-slate-300 text-sm transition-transform ${isCollapsed ? "-rotate-90" : ""}`}>
                  expand_more
                </span>
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const isLogout = item.label === "Logout";
                    if (isLogout) {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-rose-500 hover:bg-rose-50"
                        >
                          <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "text-white shadow-md"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                        style={active ? { backgroundColor: "#151869" } : {}}
                      >
                        <span className={`material-symbols-outlined text-[20px] flex-shrink-0 ${active ? "fill-icon" : ""}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {active && <div className="ml-auto w-1.5 h-4 rounded-full bg-white/40 flex-shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
