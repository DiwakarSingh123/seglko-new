"use client";
import { useState, useEffect } from "react";

const catColors: Record<string, string> = {
  Exam: "bg-rose-100 text-rose-700",
  Scholarship: "bg-emerald-100 text-emerald-700",
  Event: "bg-blue-100 text-blue-700",
  General: "bg-slate-100 text-slate-600",
};

const emptyNotice = { title: "", category: "General", institution: "All", image: "" };

export default function StudentZonePage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [form, setForm] = useState(emptyNotice);
  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/student-zone")
      .then((res) => res.json())
      .then((data) => {
        if (data) setNoticeList(data.notices || []);
        setLoading(false);
      });
  }, []);

  const saveNotices = async (notices: any[]) => {
    try {
      const res = await fetch("/api/student-zone");
      const data = res.ok ? await res.json() : {};
      await fetch("/api/student-zone", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, notices }),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    let newList;
    if (editingNoticeId !== null) {
      newList = noticeList.map((n) => (n.id === editingNoticeId ? { ...n, ...form } : n));
    } else {
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      newList = [{ id: Date.now(), ...form, date: today }, ...noticeList];
    }
    setNoticeList(newList);
    saveNotices(newList);
    setForm(emptyNotice);
    setEditingNoticeId(null);
    setShowDrawer(false);
  };

  const handleDeleteNotice = (id: number) => {
    const newList = noticeList.filter((n) => n.id !== id);
    setNoticeList(newList);
    saveNotices(newList);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
    setForm(emptyNotice);
    setEditingNoticeId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">Student Zone</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage student notices and announcements</p>
        </div>
        <button
          type="button"
          onClick={() => setShowDrawer(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-semibold transition-colors shadow-md w-full sm:w-auto"
          style={{ backgroundColor: "#151869" }}
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Notice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Notices", value: noticeList.length, icon: "campaign", color: "bg-indigo-500" },
          { label: "Exams", value: noticeList.filter((n) => n.category === "Exam").length, icon: "quiz", color: "bg-rose-500" },
          { label: "Events", value: noticeList.filter((n) => n.category === "Event").length, icon: "event", color: "bg-blue-500" },
          { label: "Scholarships", value: noticeList.filter((n) => n.category === "Scholarship").length, icon: "school", color: "bg-emerald-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? "..." : s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-slate-500 p-6 text-sm">Loading notices...</p>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100">
                {["Title", "Category", "Institution", "Date", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {noticeList.map((n) => (
                <tr key={n.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${catColors[n.category] || catColors.General}`}>
                      {n.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{n.institution}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{n.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          setForm({
                            title: n.title,
                            category: n.category,
                            institution: n.institution,
                            image: n.image || "",
                          });
                          setEditingNoticeId(n.id);
                          setShowDrawer(true);
                        }}
                        className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${showDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-800">{editingNoticeId !== null ? "Edit Notice" : "Add New Notice"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{editingNoticeId !== null ? "Make changes to the notice" : "Fill in the details below"}</p>
          </div>
          <button onClick={closeDrawer} className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Notice Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter notice title"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {["General", "Exam", "Scholarship", "Event"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Institution</label>
            <select
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {["All", "SIET", "SIPS", "SIEM"].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description</label>
            <textarea
              rows={4}
              placeholder="Write notice description..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Notice Image</label>
            <label
              className="flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors cursor-pointer"
              style={{ minHeight: 90 }}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setForm({ ...form, image: ev.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }}
              />
              {form.image ? (
                <div className="w-full p-2 flex flex-col items-center gap-2">
                  <img src={form.image} alt="Notice preview" className="max-h-32 max-w-full object-contain rounded-lg" />
                  <span className="text-[11px] text-indigo-500 font-semibold">Click to change image</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 py-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">add_photo_alternate</span>
                  <span className="text-xs font-semibold text-slate-500">Click to upload image</span>
                  <span className="text-[11px] text-slate-400">PNG, JPG, WEBP supported</span>
                </div>
              )}
            </label>
            {form.image && (
              <button
                type="button"
                onClick={() => setForm({ ...form, image: "" })}
                className="mt-1.5 text-[11px] text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Remove image
              </button>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            type="button"
            onClick={closeDrawer}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#151869" }}
          >
            {editingNoticeId !== null ? "Save Changes" : "Add Notice"}
          </button>
        </div>
      </div>

      {showDrawer && <div onClick={closeDrawer} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />}
    </div>
  );
}
