"use client";

import { useEffect, useState } from "react";

type Item = {
  _id: string;
  title: string;
  type: "upcoming_event" | "announcement";
  category: string;
  date: string;
  description?: string;
  image?: string;
  url?: string;
};

const emptyForm = {
  title: "",
  description: "",
};

export default function EventsAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming_event" | "announcement">("upcoming_event");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/happenings");
      if (res.ok) setItems(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const reset = () => {
    setForm({ ...emptyForm });
    setError("");
  };

  const handleAdd = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.description.trim()) { setError("Description is required."); return; }
    setUploading(true);
    setError("");
    try {
      const res = await fetch("/api/happenings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          type: activeTab,
          category: "General",
          date: new Date().toISOString().slice(0, 10),
          description: form.description.trim(),
          image: "",
          url: "#",
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      setItems(prev => [saved, ...prev]);
      setShowForm(false);
      reset();
      alert(`${activeTab === 'upcoming_event' ? 'Event' : 'Announcement'} added successfully!`);
    } catch (e) {
      console.error(e);
      setError("Could not save. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/happenings?id=${id}`, { method: "DELETE" });
      if (res.ok) setItems(prev => prev.filter(i => i._id !== id));
    } catch (e) { console.error(e); }
  };

  const tabItems = items.filter(i => i.type === activeTab);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Events & Announcements</h1>
          <p className="text-sm text-slate-400 mt-0.5">Add items that show on the Institutions page sidebar tabs</p>
        </div>
        <button
          onClick={() => { reset(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add {activeTab === "upcoming_event" ? "Event" : "Announcement"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setActiveTab("upcoming_event"); setShowForm(false); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "upcoming_event" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          🔭 Upcoming Events ({items.filter(i => i.type === "upcoming_event").length})
        </button>
        <button
          onClick={() => { setActiveTab("announcement"); setShowForm(false); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "announcement" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          📢 Announcements ({items.filter(i => i.type === "announcement").length})
        </button>

      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-800">
              Add {activeTab === "upcoming_event" ? "Upcoming Event" : "Announcement"}
            </h2>
            <button onClick={() => { setShowForm(false); reset(); }} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Title *</label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder={activeTab === "upcoming_event" ? "e.g. Annual Sports Meet 2026" : "e.g. Exam Schedule Released"}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description *</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Write the full details here..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setShowForm(false); reset(); }} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={uploading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
            >
              {uploading && <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>}
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-slate-400 text-sm p-6">Loading...</p>
        ) : tabItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl block mb-3">
              {activeTab === "upcoming_event" ? "event" : "campaign"}
            </span>
            <p className="font-semibold text-sm">No {activeTab === "upcoming_event" ? "upcoming events" : "announcements"} yet.</p>
            <p className="text-xs mt-1">Click the Add button above to create one.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Title & Description", "Date", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabItems.map(item => (
                <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">{item.title}</p>
                      {item.description && <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{new Date(item.date || item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
