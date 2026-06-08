"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { resolveInstitutionName, type InstitutionRecord } from "@/lib/institution-utils";

const SEG = "#151869";

type Application = {
  id: string;
  student: string;
  email: string;
  university: string;
  course: string;
  date: string;
  status: string;
  fee: string;
  color: string;
};

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
};

const STATUS_OPTIONS = ["Pending", "Accepted", "Rejected", "In Review"];
const PAGE_SIZE = 5;

function parseAppDate(dateStr: string): number {
  const parsed = new Date(dateStr).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function sortApplications(apps: Application[]): Application[] {
  return [...apps].sort((a, b) => parseAppDate(b.date) - parseAppDate(a.date));
}

export default function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Application | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchApplications = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/applications", { cache: "no-store" }).then((res) => res.json()),
      fetch("/api/institutions", { cache: "no-store" }).then((res) => res.json()),
    ])
      .then(([apps, insts]) => {
        if (Array.isArray(apps)) setApplications(sortApplications(apps));
        if (Array.isArray(insts)) setInstitutions(insts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const getInstitutionLabel = (university: string) =>
    resolveInstitutionName(university, institutions);

  useEffect(() => {
    fetchApplications();
  }, []);

  const sortedApps = applications;
  const visibleApps = sortedApps.slice(0, visibleCount);
  const hasMore = visibleCount < sortedApps.length;

  const openDetail = (app: Application) => {
    setSelected(app);
    setEditStatus(app.status);
  };

  const closeDetail = () => {
    setSelected(null);
    setEditStatus("");
  };

  const handleSaveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    const updated = { ...selected, status: editStatus };
    const newList = applications.map((a) => (a.id === selected.id ? updated : a));
    try {
      const res = await fetch("/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, status: editStatus }),
      });
      if (res.ok) {
        const sorted = sortApplications(newList);
        setApplications(sorted);
        setSelected(updated);
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Application Details</h2>
              <button
                type="button"
                onClick={closeDetail}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {selected.student
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800">{selected.student}</p>
                  <p className="text-xs text-slate-400">{selected.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{selected.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Date</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{selected.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Course</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{selected.course}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Fee</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{selected.fee}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Institution</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{getInstitutionLabel(selected.university)}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Update Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <Link
                href="/dashboard/applications"
                className="flex-1 text-center px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View All
              </Link>
              <button
                type="button"
                onClick={handleSaveStatus}
                disabled={saving || editStatus === selected.status}
                className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: SEG }}
              >
                {saving ? "Saving..." : "Save Status"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-800">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-xs font-bold hover:underline" style={{ color: SEG }}>
            See all
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="px-6 py-8 text-sm text-slate-500">Loading applications...</p>
          ) : visibleApps.length === 0 ? (
            <p className="px-6 py-8 text-sm text-slate-500">No applications yet.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  {["Student", "Course", "Institution", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleApps.map((app) => (
                  <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-8 w-8 rounded-full bg-gradient-to-br ${app.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}
                        >
                          {app.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{app.student}</div>
                          <div className="text-[10px] text-slate-400">{app.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="px-2 py-1 text-[10px] font-bold rounded-lg"
                        style={{ backgroundColor: "#eef0fb", color: SEG }}
                      >
                        {app.course}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 max-w-[200px]">
                      <span className="line-clamp-2">{getInstitutionLabel(app.university)}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[app.status] || statusStyle.Pending}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <button
                        type="button"
                        onClick={() => openDetail(app)}
                        className="h-7 w-7 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                        style={{ backgroundColor: SEG }}
                        aria-label={`View ${app.student} application`}
                      >
                        <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!loading && sortedApps.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Showing {visibleApps.length} of {sortedApps.length} applications
            </span>
            <div className="flex items-center gap-2">
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, sortedApps.length))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  Show more
                </button>
              )}
              <Link
                href="/dashboard/applications"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                View all
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
