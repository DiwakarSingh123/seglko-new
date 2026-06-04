"use client";

import { useState, useEffect } from "react";

type JobOpening = {
  _id: string;
  title: string;
  category: string;
  tag: string;
  dept: string;
  location: string;
  experience: string;
  type: string;
  posted: string;
  color: string;
  description?: string;
};

const categoryOptions = ["Administration", "Teaching", "Technical", "Support Staff"];
const colorOptions = ["blue", "violet", "green", "orange", "red", "purple"];

const defaultJobs: JobOpening[] = [
  {
    _id: "1",
    title: "Chairman PS",
    category: "Administration",
    tag: "Administration",
    dept: "Secretariat",
    location: "Lucknow",
    experience: "5-8 Years",
    type: "Full Time",
    posted: "05 June 2025",
    color: "blue",
    description: "Provide leadership and administrative oversight for the institution. Manage strategic initiatives and institutional governance."
  },
  {
    _id: "2",
    title: "Admission Counsellor",
    category: "Administration",
    tag: "Admissions",
    dept: "Counselling",
    location: "Lucknow",
    experience: "1-3 Years",
    type: "Full Time",
    posted: "05 June 2025",
    color: "violet",
    description: "Guide prospective students through the admissions process, answer queries, and support application review."
  },
  {
    _id: "3",
    title: "Assistant Professor",
    category: "Teaching",
    tag: "Teaching",
    dept: "Pharmacy",
    location: "Lucknow",
    experience: "2-5 Years",
    type: "Full Time",
    posted: "05 June 2025",
    color: "green",
    description: "Teach pharmacy courses, mentor students, and contribute to academic and research activities."
  },
  {
    _id: "4",
    title: "Field Officers",
    category: "Administration",
    tag: "Administration",
    dept: "Field Officer",
    location: "Uttar Pradesh",
    experience: "1-4 Years",
    type: "Full Time",
    posted: "05 June 2025",
    color: "orange",
    description: "Conduct field operations, coordinate outreach activities, and support institutional programs on the ground."
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>(defaultJobs);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [newJob, setNewJob] = useState({
    title: "",
    category: "Administration",
    tag: "",
    dept: "",
    location: "",
    experience: "",
    type: "Full Time",
    posted: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
    color: "blue",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.length > 0 ? data : defaultJobs);
      } else {
        setJobs(defaultJobs);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load job openings");
      setJobs(defaultJobs);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setNewJob({
      title: "",
      category: "Administration",
      tag: "",
      dept: "",
      location: "",
      experience: "",
      type: "Full Time",
      posted: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
      color: "blue",
      description: "",
    });
    setEditingJob(null);
    setError("");
  };

  const openEdit = (job: JobOpening) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      category: job.category,
      tag: job.tag,
      dept: job.dept,
      location: job.location,
      experience: job.experience,
      type: job.type,
      posted: job.posted,
      color: job.color,
      description: job.description || "",
    });
    setShowForm(true);
  };

  const saveJob = async () => {
    if (!newJob.title.trim() || !newJob.dept.trim()) {
      setError("Title and department are required");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = editingJob ? { _id: editingJob._id, ...newJob } : newJob;
      const res = await fetch("/api/jobs", {
        method: editingJob ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      const saved = await res.json();
      if (editingJob) {
        setJobs(prev => prev.map(j => (j._id === saved._id ? saved : j)));
        setMessage("Job opening updated successfully");
      } else {
        setJobs(prev => [saved, ...prev]);
        setMessage("Job opening created successfully");
      }

      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save job opening");
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    try {
      const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j._id !== id));
        setMessage("Job opening deleted successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-800">Career Openings</h1>
            <p className="text-sm text-slate-400 mt-1">Manage job openings and career opportunities</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-2xl shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            Add Job Opening
          </button>
        </div>
      </div>

      {(error || message) && (
        <div className={`rounded-2xl p-4 text-sm ${error ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryOptions.map((cat) => (
          <div key={cat} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="h-9 w-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white mb-3 shadow-md">
              <span className="material-symbols-outlined text-lg">work_outline</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? "..." : jobs.filter(j => j.category === cat).length}</div>
            <div className="text-xs text-slate-400 mt-0.5">{cat}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-800">{editingJob ? "Edit Job Opening" : "Add New Job Opening"}</h2>
            <button
              onClick={() => setShowForm(false)}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Job Title *</label>
              <input
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Assistant Professor, Admission Counsellor"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select
                value={newJob.category}
                onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Tag / Label</label>
              <input
                value={newJob.tag}
                onChange={(e) => setNewJob({ ...newJob, tag: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. TEACHING, ADMINISTRATION"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department *</label>
              <input
                value={newJob.dept}
                onChange={(e) => setNewJob({ ...newJob, dept: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Pharmacy, Counselling"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Location</label>
              <input
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. Lucknow, Uttar Pradesh"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Experience Required</label>
              <input
                value={newJob.experience}
                onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. 2-5 Years"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Job Type</label>
              <select
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Color</label>
              <select
                value={newJob.color}
                onChange={(e) => setNewJob({ ...newJob, color: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {colorOptions.map((color) => (
                  <option key={color}>{color}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Posted Date</label>
              <input
                value={newJob.posted}
                onChange={(e) => setNewJob({ ...newJob, posted: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g. 05 June 2025"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none h-24"
                placeholder="Job description and requirements..."
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={saveJob}
              disabled={saving}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Job Opening"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">Loading job openings…</div>
      ) : jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          No job openings yet. Click "Add Job Opening" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{job.category}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{job.dept}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{job.location}</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{job.experience}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(job)}
                    className="px-3 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="px-3 py-2 text-sm font-semibold text-rose-700 bg-rose-50 rounded-xl hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
