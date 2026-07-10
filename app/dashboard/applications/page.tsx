"use client";
import { useState, useEffect } from "react";
import { resolveInstitutionName, type InstitutionRecord } from "@/lib/institution-utils";

function JobDetailModal({ app, onClose, onStatusChange, onDelete }: { app: any; onClose: () => void; onStatusChange: (id: string, status: string) => void; onDelete: (id: string) => void }) {
  const [status, setStatus] = useState(app.status || 'pending');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch('/api/job-applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: app._id, status }),
      });
      onStatusChange(app._id, status);
      onClose();
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/job-applications?id=${app._id}`, { method: 'DELETE' });
      onDelete(app._id);
      onClose();
    } catch (e) { console.error(e); }
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between p-6 gap-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {app.photo
              ? <img src={app.photo} alt={app.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
              : <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-black flex-shrink-0">
                  {(app.name || '').split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
            }
            <div>
              <h2 className="text-lg font-black text-slate-900">{app.name}</h2>
              <p className="text-sm text-slate-500">{app.position}</p>
              <p className="text-xs text-slate-400">{app.email} · {app.phone}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 sm:static h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 flex-shrink-0">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Phone', value: app.phone },
            { label: 'Address', value: app.address },
            { label: 'Qualification', value: app.qualification },
            { label: 'Experience', value: app.experience },
            { label: 'Expected Salary', value: app.expectedSalary },
            { label: 'Last Organization', value: app.lastOrganization },
            { label: 'Last Salary', value: app.lastSalary },
            { label: 'Applied On', value: app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-2xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-semibold text-slate-800">{value || '—'}</p>
            </div>
          ))}
        </div>

        {/* Resume */}
        {app.resume && (() => {
          const isCloudinary = app.resume.includes('cloudinary.com');
          const viewUrl = isCloudinary
            ? `/api/resume-proxy?url=${encodeURIComponent(app.resume)}`
            : app.resume;
          const downloadUrl = isCloudinary
            ? `/api/resume-proxy?url=${encodeURIComponent(app.resume)}&download=1`
            : app.resume;
          return (
            <div className="px-6 pb-4">
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 hover:bg-indigo-100 transition-colors"
              >
                <span className="material-symbols-outlined text-indigo-600 text-2xl">picture_as_pdf</span>
                <div>
                  <p className="text-sm font-bold text-indigo-700">View Resume / CV</p>
                  <p className="text-xs text-indigo-400">Click to open PDF in new tab</p>
                </div>
                <span className="material-symbols-outlined text-indigo-400 ml-auto">open_in_new</span>
              </a>
              <a
                href={downloadUrl}
                download="resume.pdf"
                className="mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 px-4"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download Resume
              </a>
            </div>
          );
        })()}

        {/* Status Update */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {confirmDelete ? (
            <>
              <span className="text-sm text-rose-600 font-semibold flex-1">Are you sure you want to delete?</span>
              <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 disabled:opacity-50 transition-colors">
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setConfirmDelete(true)} className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm font-semibold hover:bg-rose-100 transition-colors">
                <span className="material-symbols-outlined text-sm align-text-bottom mr-1">delete</span>
                Delete
              </button>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-200">
                <option value="pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="In Review">In Review</option>
              </select>
              <button onClick={save} disabled={saving}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                {saving ? 'Saving...' : 'Update Status'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
  "in review": "bg-blue-100 text-blue-700",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [applicationType, setApplicationType] = useState("student"); // "student", "admission" or "job"
  const [admissionApps, setAdmissionApps] = useState<any[]>([]);
  const [jobApps, setJobApps] = useState<any[]>([]);
  const [studentApps, setStudentApps] = useState<any[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, jobAppsRes, instsRes, studentAppsRes] = await Promise.all([
          fetch("/api/applications"),
          fetch("/api/job-applications"),
          fetch("/api/institutions"),
          fetch("/api/student-applications"),
        ]);
        const apps = await appsRes.json();
        const jobAppsData = await jobAppsRes.json();
        const insts = await instsRes.json();
        const studentAppsData = await studentAppsRes.json();
        
        if (Array.isArray(apps)) setAdmissionApps(apps);
        if (Array.isArray(jobAppsData)) setJobApps(jobAppsData);
        if (Array.isArray(insts)) setInstitutions(insts);
        if (Array.isArray(studentAppsData)) setStudentApps(studentAppsData);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Auto-refresh every 3 seconds to see new applications
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getInstitutionLabel = (university: string) =>
    resolveInstitutionName(university, institutions);

  const applications = applicationType === "admission" ? admissionApps : applicationType === "job" ? jobApps : studentApps;

  const filtered = applications.filter((a) => {
    if (applicationType === "student") {
      const s = (`${a.firstName} ${a.lastName}` || "").toLowerCase().includes(search.toLowerCase()) ||
        (a.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (a.desiredCourse || "").toLowerCase().includes(search.toLowerCase());
      const f = filter === "All" || a.status === filter;
      return s && f;
    } else if (applicationType === "admission") {
      const institutionLabel = getInstitutionLabel(a.university || "").toLowerCase();
      const s =
        (a.student || "").toLowerCase().includes(search.toLowerCase()) ||
        institutionLabel.includes(search.toLowerCase());
      const f = filter === "All" || a.status === filter;
      return s && f;
    } else {
      const s =
        (a.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (a.position || "").toLowerCase().includes(search.toLowerCase());
      const f = filter === "All" || (a.status || "pending") === filter.toLowerCase();
      return s && f;
    }
  });

  const renderAdmissionRow = (a: any) => (
    <tr key={a.id || a._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
            {(a.student || "").split(" ").map((n: string) => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{a.student}</div>
            <div className="text-[10px] text-slate-400">{a.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500 max-w-[220px]">
        <span className="line-clamp-2">{getInstitutionLabel(a.university)}</span>
      </td>
      <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.course}</span></td>
      <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status}</span></td>
      <td className="px-5 py-3.5 text-sm text-slate-400">{a.date}</td>
      <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{a.fee}</td>
      <td className="px-5 py-3.5">
        <button className="h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
          <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
        </button>
      </td>
    </tr>
  );

  const handleJobDelete = (id: string) => {
    setJobApps(prev => prev.filter(a => a._id !== id));
  };

  const handleJobStatusChange = (id: string, status: string) => {
    setJobApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
  };

  const renderJobRow = (a: any) => (
    <tr key={a._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          {a.photo
            ? <img src={a.photo} alt={a.name} className="h-8 w-8 rounded-full object-cover border border-slate-200 flex-shrink-0" />
            : <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {(a.name || "").split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
              </div>
          }
          <div>
            <div className="text-sm font-semibold text-slate-800">{a.name}</div>
            <div className="text-[10px] text-slate-400">{a.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500">{a.position}</td>
      <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.qualification}</span></td>
      <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status] || 'bg-amber-100 text-amber-700'}`}>{a.status || "pending"}</span></td>
      <td className="px-5 py-3.5 text-sm text-slate-400">{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
      <td className="px-5 py-3.5 text-sm text-slate-600">{a.experience || "—"}</td>
      <td className="px-5 py-3.5">
        <button onClick={() => setSelectedJob(a)} className="h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
          <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-5">
      {selectedJob && (
        <JobDetailModal
          app={selectedJob}
          onClose={() => setSelectedJob(null)}
          onStatusChange={handleJobStatusChange}
          onDelete={handleJobDelete}
        />
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Applications</h1>
          <p className="text-sm text-slate-400 mt-0.5">Track and manage all {applicationType === "admission" ? "student" : "job"} applications</p>
        </div>
      </div>

      {/* Application Type Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setApplicationType("student"); setFilter("All"); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${applicationType === "student" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          <span className="material-symbols-outlined inline mr-2 text-base align-text-bottom">how_to_reg</span>
          Student Admissions ({studentApps.length})
        </button>
        <button
          onClick={() => { setApplicationType("job"); setFilter("All"); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${applicationType === "job" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          <span className="material-symbols-outlined inline mr-2 text-base align-text-bottom">work_outline</span>
          Job Applications ({jobApps.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder={applicationType === "admission" ? "Search student or institution..." : "Search applicant or position..."}
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(applicationType === "student"
              ? ["All", "Pending", "Accepted", "Rejected", "In Review"]
              : applicationType === "admission"
              ? ["All", "Pending", "Accepted", "Rejected", "In Review"]
              : ["All", "pending", "Accepted", "Rejected"]
            ).map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-100">
                {applicationType === "student" ? (
                  ["Student", "Contact", "Course", "Institution", "App ID", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))
                ) : applicationType === "admission" ? (
                  ["Student", "Institution", "Course", "Status", "Date", "Fee", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))
                ) : (
                  ["Applicant", "Position", "Qualification", "Status", "Date", "Experience", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {applicationType === "student" ? filtered.map((a: any) => (
                <tr key={a._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {`${a.firstName?.[0] || ''}${a.lastName?.[0] || ''}`}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{a.firstName} {a.lastName}</div>
                        <div className="text-[10px] text-slate-400">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{a.phone}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.desiredCourse}</span></td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 max-w-[180px] truncate">{a.desiredInstitution}</td>
                  <td className="px-5 py-3.5 text-xs font-bold text-indigo-600">{a.applicationId}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status] || 'bg-amber-100 text-amber-700'}`}>{a.status || 'Pending'}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                </tr>
              )) : applicationType === "admission" ? filtered.map((a: any) => renderAdmissionRow(a)) : filtered.map((a: any) => renderJobRow(a))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
              No {applicationType} applications found
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {applications.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">Previous</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
