"use client";
import { useState, useEffect } from "react";
import GalleryTab from "../components/GalleryTab";

const notices = [
  { id: 1, title: "Examination Schedule - Even Semester 2024", category: "Exam", date: "May 10, 2024", institution: "SIET", pinned: true },
  { id: 2, title: "Scholarship Application Form 2024-25", category: "Scholarship", date: "May 8, 2024", institution: "All", pinned: true },
  { id: 3, title: "Annual Sports Meet Registration Open", category: "Event", date: "May 5, 2024", institution: "All", pinned: false },
  { id: 4, title: "Library Timing Change Notice", category: "General", date: "May 3, 2024", institution: "SIET", pinned: false },
  { id: 5, title: "Industrial Visit to NTPC Lucknow", category: "Event", date: "Apr 28, 2024", institution: "SIET", pinned: false },
];

const resources = [
  { name: "Student Handbook 2024-25", type: "PDF", size: "2.4 MB", downloads: 1240 },
  { name: "Academic Calendar 2024-25", type: "PDF", size: "1.1 MB", downloads: 980 },
  { name: "Hostel Rules & Regulations", type: "PDF", size: "0.8 MB", downloads: 650 },
  { name: "Anti-Ragging Policy", type: "PDF", size: "0.5 MB", downloads: 420 },
];

const catColors: Record<string, string> = {
  Exam: "bg-rose-100 text-rose-700",
  Scholarship: "bg-emerald-100 text-emerald-700",
  Event: "bg-blue-100 text-blue-700",
  General: "bg-slate-100 text-slate-600",
};

const emptyNotice = { title: "", category: "General", institution: "All", pinned: false };

type LifeCategory = "Campus Views" | "Library" | "Students" | "Events" | "Facilities";
type LifeItem = { id: number; title: string; desc: string; category: LifeCategory };

const lifeCategories: LifeCategory[] = ["Campus Views", "Library", "Students", "Events", "Facilities"];

const initialLifeItems: LifeItem[] = [
  { id: 1, title: "Welcome to SEG", desc: "Where dreams take shape", category: "Campus Views" },
  { id: 2, title: "Our Campus", desc: "Explore our beautiful campus", category: "Campus Views" },
  { id: 3, title: "Library Moments", desc: "Knowledge at your fingertips", category: "Library" },
  { id: 4, title: "Knowledge Hub", desc: "Our state-of-the-art library", category: "Library" },
  { id: 5, title: "Student Life", desc: "Vibrant student community", category: "Students" },
  { id: 6, title: "Learning & Growth", desc: "Students in action", category: "Students" },
  { id: 7, title: "Annual Fest", desc: "Celebrating talent and culture", category: "Events" },
  { id: 8, title: "Computer Labs", desc: "Modern computing facilities", category: "Facilities" },
];

export default function StudentZonePage() {
  const [tab, setTab] = useState<"notices" | "resources" | "grievance" | "life" | "gallery">("notices");
  const [showDrawer, setShowDrawer] = useState(false);
  const [form, setForm] = useState(emptyNotice);
  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [resourcesList, setResourcesList] = useState<any[]>([]);
  const [lifeItems, setLifeItems] = useState<LifeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<LifeCategory>("Campus Views");
  const [editingLife, setEditingLife] = useState<LifeItem | null>(null);
  const [showAddLife, setShowAddLife] = useState(false);
  const [lifeForm, setLifeForm] = useState({ title: "", desc: "", category: "Campus Views" as LifeCategory });
  const [loading, setLoading] = useState(true);
  const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null);


  // Fetch initial data
  useEffect(() => {
    fetch('/api/student-zone')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setNoticeList(data.notices || []);
          setResourcesList(data.resources || []);
          setLifeItems(data.lifeItems || []);
        }
        setLoading(false);
      });
  }, []);

  const saveData = async (updatedData: any) => {
    try {
      await fetch('/api/student-zone', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    let newList;
    if (editingNoticeId !== null) {
      newList = noticeList.map(n => n.id === editingNoticeId ? { ...n, ...form } : n);
    } else {
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      newList = [{ id: Date.now(), ...form, date: today }, ...noticeList];
    }
    setNoticeList(newList);
    saveData({ notices: newList, resources: resourcesList, lifeItems });
    setForm(emptyNotice);
    setEditingNoticeId(null);
    setShowDrawer(false);
  };

  const handleDeleteNotice = (id: number) => {
    const newList = noticeList.filter(n => n.id !== id);
    setNoticeList(newList);
    saveData({ notices: newList, resources: resourcesList, lifeItems });
  };

  const handleAddLife = () => {
    if (!lifeForm.title.trim()) return;
    const newList = [...lifeItems, { id: Date.now(), ...lifeForm }];
    setLifeItems(newList);
    saveData({ notices: noticeList, resources: resourcesList, lifeItems: newList });
    setLifeForm({ title: "", desc: "", category: "Campus Views" });
    setShowAddLife(false);
  };

  const handleEditLife = () => {
    if (!editingLife) return;
    const newList = lifeItems.map((x) => x.id === editingLife.id ? editingLife : x);
    setLifeItems(newList);
    saveData({ notices: noticeList, resources: resourcesList, lifeItems: newList });
    setEditingLife(null);
  };

  const handleDeleteLife = (id: number) => {
    const newList = lifeItems.filter((x) => x.id !== id);
    setLifeItems(newList);
    saveData({ notices: noticeList, resources: resourcesList, lifeItems: newList });
  };

  const closeDrawer = () => { setShowDrawer(false); setForm(emptyNotice); setEditingNoticeId(null); };


  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Student Zone</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage notices, resources and student grievances</p>
        </div>
        <button type="button" onClick={() => setShowDrawer(true)} className="flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-semibold transition-colors shadow-md" style={{ backgroundColor: "#151869" }}>
          <span className="material-symbols-outlined text-lg">add</span>Add Notice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Notices", value: noticeList.length, icon: "campaign", color: "bg-indigo-500" },
          { label: "Pinned", value: noticeList.filter(n => n.pinned).length, icon: "push_pin", color: "bg-amber-500" },
          { label: "Resources", value: resourcesList.length, icon: "folder", color: "bg-blue-500" },
          { label: "Grievances", value: "3", icon: "report_problem", color: "bg-rose-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { id: "notices", label: "Notices", icon: "campaign" },
          { id: "resources", label: "Resources", icon: "folder" },
          { id: "grievance", label: "Grievances", icon: "report_problem" },
          { id: "life", label: "Life @ SEG", icon: "photo_library" },
          { id: "gallery", label: "Gallery", icon: "collections" },
        ].map((t) => (
          <button type="button" key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
            style={tab === t.id ? { backgroundColor: "#151869" } : {}}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "notices" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Title", "Category", "Institution", "Date", "Pinned", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {noticeList.map((n) => (
                <tr key={n.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {n.pinned && <span className="material-symbols-outlined text-amber-500 text-sm fill-icon">push_pin</span>}
                      <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${catColors[n.category]}`}>{n.category}</span></td>
                  <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{n.institution}</span></td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{n.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${n.pinned ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"}`}>{n.pinned ? "Yes" : "No"}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => {
                        setForm({ title: n.title, category: n.category, institution: n.institution, pinned: n.pinned });
                        setEditingNoticeId(n.id);
                        setShowDrawer(true);
                      }} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>

                      <button onClick={() => handleDeleteNotice(n.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
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

      {tab === "resources" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800">Student Resources</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-white rounded-xl text-xs font-semibold transition-colors" style={{ backgroundColor: "#151869" }}>
              <span className="material-symbols-outlined text-sm">upload</span>Upload
            </button>
          </div>
          <div className="p-5 space-y-3">
            {resourcesList.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-rose-600 text-lg">picture_as_pdf</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.type} · {r.size} · {r.downloads} downloads</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors border border-slate-200">
                    <span className="material-symbols-outlined text-sm">download</span>
                  </button>
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-rose-500 hover:bg-rose-50 transition-colors border border-slate-200">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "grievance" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="space-y-3">
            {[
              { id: "GR-001", student: "Rahul Sharma", subject: "Exam result discrepancy", date: "May 9, 2024", status: "Pending" },
              { id: "GR-002", student: "Priya Singh", subject: "Hostel facility issue", date: "May 7, 2024", status: "In Progress" },
              { id: "GR-003", student: "Amit Patel", subject: "Library book not available", date: "May 5, 2024", status: "Resolved" },
            ].map((g) => (
              <div key={g.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="text-sm font-bold text-slate-800">{g.subject}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{g.id} · {g.student} · {g.date}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${g.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : g.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "life" && (
        <div className="space-y-4">
          {/* Edit Modal */}
          {editingLife && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-slate-800">Edit Item</h2>
                  <button onClick={() => setEditingLife(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                    <span className="material-symbols-outlined text-slate-500">close</span>
                  </button>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
                  <select value={editingLife.category} onChange={(e) => setEditingLife({ ...editingLife, category: e.target.value as LifeCategory })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    {lifeCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <input value={editingLife.title} onChange={(e) => setEditingLife({ ...editingLife, title: e.target.value })} placeholder="Title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                <input value={editingLife.desc} onChange={(e) => setEditingLife({ ...editingLife, desc: e.target.value })} placeholder="Description" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setEditingLife(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleEditLife} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#151869" }}>Save</button>
                </div>
              </div>
            </div>
          )}

          {/* Add Modal */}
          {showAddLife && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-slate-800">Add New Item</h2>
                  <button onClick={() => setShowAddLife(false)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                    <span className="material-symbols-outlined text-slate-500">close</span>
                  </button>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
                  <select value={lifeForm.category} onChange={(e) => setLifeForm({ ...lifeForm, category: e.target.value as LifeCategory })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    {lifeCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <input value={lifeForm.title} onChange={(e) => setLifeForm({ ...lifeForm, title: e.target.value })} placeholder="Title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                <input value={lifeForm.desc} onChange={(e) => setLifeForm({ ...lifeForm, desc: e.target.value })} placeholder="Description" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowAddLife(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleAddLife} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#151869" }}>Add</button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Select Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as LifeCategory)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
                >
                  {lifeCategories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={() => setShowAddLife(true)} className="flex items-center gap-1.5 px-3 py-2 text-white rounded-xl text-xs font-semibold" style={{ backgroundColor: "#151869" }}>
                <span className="material-symbols-outlined text-sm">add</span>Add Item
              </button>
            </div>

            <div className="space-y-2">
              {lifeItems.filter((x) => x.category === selectedCategory).length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">No items in this category. Click "Add Item" to add.</div>
              ) : (
                lifeItems.filter((x) => x.category === selectedCategory).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                    <div>
                      <div className="text-sm font-bold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => setEditingLife(item)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => handleDeleteLife(item.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "gallery" && <GalleryTab section="Student Zone" categories={["Campus Views", "Library", "Students", "Events", "Facilities"]} />}

      {/* Right Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${showDrawer ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-800">{editingNoticeId !== null ? "Edit Notice" : "Add New Notice"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{editingNoticeId !== null ? "Make changes to the notice" : "Fill in the details below"}</p>
          </div>
          <button onClick={closeDrawer} className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>

        {/* Form Body */}
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
              {["General", "Exam", "Scholarship", "Event"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Institution</label>
            <select
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {["All", "SIET", "SIPS", "SIEM"].map((i) => <option key={i}>{i}</option>)}
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

          <label className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl cursor-pointer hover:border-amber-300 transition-colors">
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
              className="w-4 h-4 accent-amber-500"
            />
            <div>
              <div className="text-sm font-bold text-slate-700">Pin this notice</div>
              <div className="text-xs text-slate-400">Pinned notices appear at the top</div>
            </div>
            <span className="material-symbols-outlined text-amber-500 ml-auto text-lg">push_pin</span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button type="button" onClick={closeDrawer} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleAdd} className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors" style={{ backgroundColor: "#151869" }}>
            {editingNoticeId !== null ? "Save Changes" : "Add Notice"}
          </button>
        </div>

      </div>

      {/* Backdrop */}
      {showDrawer && <div onClick={closeDrawer} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />}
    </div>
  );
}
