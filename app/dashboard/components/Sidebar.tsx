"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
      { label: "Student Zone", icon: "person", href: "/dashboard/student-zone" },
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

export default function Sidebar({ collapsed, onClose }: { collapsed?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthentication();
    router.push("/login");
  };

  const handleNav = () => {
    // Only close on mobile
    if (window.innerWidth < 768) onClose?.();
  };

  return (
    <aside className={`flex flex-col h-full bg-white border-r border-slate-100 shadow-sm transition-all duration-300 ease-in-out overflow-hidden ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className={`flex items-center border-b border-slate-100 flex-shrink-0 ${collapsed ? "justify-center px-0 py-4" : "px-4 py-4 gap-3"}`}>
        <Link href="/dashboard" onClick={handleNav} className="flex items-center justify-center flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white border shadow-sm rounded-xl border-slate-100">
            <Image src="/seg-logo.png" alt="SEG" width={40} height={40} className="object-contain w-full h-full" />
          </div>
        </Link>
        {!collapsed && (
          <div>
            <div className="text-sm font-black leading-none" style={{ color: "#151869" }}>Admin</div>
            <div className="text-[9px] text-slate-400 mt-0.5 font-medium">Saroj Educational Group</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden custom-scroll">
        {nav.map((group) => (
          <div key={group.section} className="mb-3">
            {/* Section label — only when expanded */}
            {!collapsed && (
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-5 mb-1.5">
                {group.section}
              </p>
            )}
            {collapsed && <div className="mx-3 border-t border-slate-100 mb-2" />}

            <div className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const active = pathname === item.href;
                const isLogout = item.label === "Logout";

                const cls = `flex items-center rounded-xl text-sm font-medium transition-all
                  ${collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5 w-full"}
                  ${active ? "text-white shadow-md" : isLogout ? "text-rose-500 hover:bg-rose-50" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`;

                if (isLogout) {
                  return (
                    <button key={item.href} type="button" onClick={() => { handleLogout(); handleNav(); }}
                      className={cls}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="material-symbols-outlined text-[20px] flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                }

                return (
                  <Link key={item.href} href={item.href} onClick={handleNav}
                    className={cls}
                    style={active ? { backgroundColor: "#151869" } : {}}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="material-symbols-outlined text-[20px] flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && active && <div className="ml-auto w-1.5 h-4 rounded-full bg-white/40 flex-shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
