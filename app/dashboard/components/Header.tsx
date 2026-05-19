"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  
  const [showNotif, setShowNotif] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  const [readInqs, setReadInqs] = useState<string[]>([]);
  const [readApps, setReadApps] = useState<string[]>([]);

  // Fetch notifications data
  const fetchHeaderData = () => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data && data.inquiries) setInquiries(data.inquiries);
      })
      .catch(err => console.error("Error fetching header inquiries:", err));

    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data) setApplications(data);
      })
      .catch(err => console.error("Error fetching header applications:", err));
  };

  useEffect(() => {
    fetchHeaderData();
    // Poll for new data every 10 seconds for real-time responsiveness
    const interval = setInterval(fetchHeaderData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Load read states from local storage
  useEffect(() => {
    const savedInqs = localStorage.getItem("read_inquiries");
    const savedApps = localStorage.getItem("read_applications");
    if (savedInqs) setReadInqs(JSON.parse(savedInqs));
    if (savedApps) setReadApps(JSON.parse(savedApps));
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".header-dropdown-container")) {
        setShowNotif(false);
        setShowMessages(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Filter unread items
  const unreadInquiries = inquiries.filter(i => i.status === "New" && !readInqs.includes(i.id));
  const unreadApplications = applications.filter(a => a.status === "Pending" && !readApps.includes(a.id));
  
  const totalNotifications = unreadInquiries.length + unreadApplications.length;

  const markAllAsRead = () => {
    const allInqIds = inquiries.map(i => i.id);
    const allAppIds = applications.map(a => a.id);
    
    setReadInqs(allInqIds);
    setReadApps(allAppIds);
    
    localStorage.setItem("read_inquiries", JSON.stringify(allInqIds));
    localStorage.setItem("read_applications", JSON.stringify(allAppIds));
  };

  const handleInqClick = (id: string) => {
    if (!readInqs.includes(id)) {
      const updated = [...readInqs, id];
      setReadInqs(updated);
      localStorage.setItem("read_inquiries", JSON.stringify(updated));
    }
    setShowNotif(false);
    setShowMessages(false);
    router.push("/dashboard/contact");
  };

  const handleAppClick = (id: string) => {
    if (!readApps.includes(id)) {
      const updated = [...readApps, id];
      setReadApps(updated);
      localStorage.setItem("read_applications", JSON.stringify(updated));
    }
    setShowNotif(false);
    router.push("/dashboard/applications");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0 z-40">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="Search applications, students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-[#151869]"
          />
        </div>
      </div>

      {/* Header Buttons Container */}
      <div className="flex items-center gap-2.5 ml-4 header-dropdown-container relative">
        {/* Notification Bell Icon */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotif(!showNotif); setShowMessages(false); }}
            className={`relative h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
              showNotif 
                ? "bg-indigo-50 border-indigo-200 text-[#151869]" 
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotif && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-black text-slate-800">Notifications ({totalNotifications})</span>
                {totalNotifications > 0 && (
                  <button 
                    onClick={markAllAsRead} 
                    className="text-[10px] font-bold text-[#151869] hover:underline transition-all"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 custom-scroll">
                {unreadInquiries.length === 0 && unreadApplications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-slate-400">
                    <span className="material-symbols-outlined text-3xl mb-1.5 block text-slate-300">notifications_off</span>
                    No new notifications
                  </div>
                ) : (
                  <>
                    {unreadInquiries.map(inq => (
                      <div 
                        key={inq.id} 
                        onClick={() => handleInqClick(inq.id)} 
                        className="px-4 py-3 hover:bg-indigo-50/30 cursor-pointer transition-colors flex gap-2.5 items-start"
                      >
                        <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-base">chat</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 truncate">New Inquiry from {inq.name}</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{inq.subject}</div>
                          <div className="text-[9px] text-slate-400 mt-1">{inq.date}</div>
                        </div>
                      </div>
                    ))}
                    {unreadApplications.map(app => (
                      <div 
                        key={app.id} 
                        onClick={() => handleAppClick(app.id)} 
                        className="px-4 py-3 hover:bg-indigo-50/30 cursor-pointer transition-colors flex gap-2.5 items-start"
                      >
                        <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-base">assignment</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800 truncate">Pending Application from {app.student}</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{app.course} · {app.university}</div>
                          <div className="text-[9px] text-slate-400 mt-1">{app.date}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message Inquiry (Mail Icon) Button */}
        <div className="relative">
          <button 
            onClick={() => { setShowMessages(!showMessages); setShowNotif(false); }}
            className={`relative h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
              showMessages 
                ? "bg-indigo-50 border-indigo-200 text-[#151869]" 
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined text-xl">mail</span>
            {unreadInquiries.length > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full border border-white" />
            )}
          </button>

          {/* Message Dropdown */}
          {showMessages && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-black text-slate-800">Message Inquiries ({unreadInquiries.length})</span>
                <button 
                  onClick={() => { setShowMessages(false); router.push("/dashboard/contact"); }}
                  className="text-[10px] font-bold text-[#151869] hover:underline"
                >
                  View inquiries
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 custom-scroll">
                {inquiries.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-slate-400">
                    <span className="material-symbols-outlined text-3xl mb-1.5 block text-slate-300">mail_outline</span>
                    No inquiries found
                  </div>
                ) : (
                  inquiries.slice(0, 4).map(inq => {
                    const isUnread = !readInqs.includes(inq.id) && inq.status === "New";
                    return (
                      <div 
                        key={inq.id} 
                        onClick={() => handleInqClick(inq.id)} 
                        className={`px-4 py-3 hover:bg-indigo-50/30 cursor-pointer transition-colors flex gap-2.5 items-start ${
                          isUnread ? 'bg-indigo-50/10' : ''
                        }`}
                      >
                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isUnread ? 'bg-indigo-50 text-[#151869]' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <span className="material-symbols-outlined text-base">
                            {isUnread ? 'mark_email_unread' : 'drafts'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <div className="text-xs font-bold text-slate-800 truncate">{inq.name}</div>
                            {isUnread && <span className="h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{inq.subject}</div>
                          <div className="text-[9px] text-slate-400 mt-1">{inq.date}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {inquiries.length > 4 && (
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => { setShowMessages(false); router.push("/dashboard/contact"); }} 
                    className="text-[10px] font-bold text-slate-500 hover:text-[#151869] transition-all"
                  >
                    View all {inquiries.length} inquiries
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Account Info */}
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
