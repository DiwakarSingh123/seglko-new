"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ResearchItem = {
  title: string;
  journal: string;
};

type Faculty = {
  id: string;
  name: string;
  role: string;
  school: string;
  dept?: string;
  edu: string;
  exp: string;
  tags: string[];
  email: string;
  phone: string;
  office: string;
  linkedin: string;
  bio: string;
  teaching: string[];
  research: ResearchItem[];
  achievements: string[];
  image: string;
  tone: string;
};

const toneOptions = ["cyan", "gold", "blue", "violet", "emerald", "rose"];

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unable to read image file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
};

export default function FacultiesPage() {
  const router = useRouter();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const loadFaculties = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faculty");
      if (!res.ok) throw new Error("Failed to load faculty data");
      const data = await res.json();
      const facultiesWithDefaults = Array.isArray(data.faculties)
        ? data.faculties.map((faculty: any) => ({
            ...faculty,
            name: faculty.name || "",
            role: faculty.role || "",
            school: faculty.school || faculty.dept || "",
            edu: faculty.edu || "",
            exp: faculty.exp || "",
            tags: Array.isArray(faculty.tags) ? faculty.tags : [],
            email: faculty.email || "",
            phone: faculty.phone || "",
            office: faculty.office || "",
            linkedin: faculty.linkedin || "",
            bio: faculty.bio || "",
            teaching: Array.isArray(faculty.teaching) ? faculty.teaching : [],
            research: Array.isArray(faculty.research)
              ? faculty.research.map((item: any) => ({
                  title: item?.title || "",
                  journal: item?.journal || "",
                }))
              : [],
            achievements: Array.isArray(faculty.achievements) ? faculty.achievements : [],
            image: faculty.image || "",
            tone: faculty.tone || "cyan",
          }))
        : [];
      setFaculties(facultiesWithDefaults);
      setPage(1);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch faculty data. Check your connection or API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculties();

    const handleFocus = () => loadFaculties();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const addFaculty = async () => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: "",
      role: "",
      school: "",
      edu: "",
      exp: "",
      tags: [],
      email: "",
      phone: "",
      office: "",
      linkedin: "",
      bio: "",
      teaching: [],
      research: [],
      achievements: [],
      image: "",
      tone: "cyan",
    };

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faculty: newFaculty }),
      });

      if (!res.ok) {
        throw new Error("Failed to add new faculty");
      }

      setFaculties((prev) => [newFaculty, ...prev]);
      router.push(`/dashboard/faculties/${newFaculty.id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to add faculty. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateFaculty = (
    id: string,
    field: keyof Faculty,
    value: string | string[] | ResearchItem[]
  ) => {
    setFaculties((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteFaculty = async (id: string) => {
    if (!confirm("Delete this faculty entry?")) return;
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/faculty?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete faculty");
      setFaculties((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
      setMessage("Faculty deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to delete faculty. Please try again.");
    }
  };

  const uploadFacultyImage = async (file: File, id: string) => {
    setError("");
    setMessage("");
    setUploadingId(id);
    try {
      const dataUrl = await readFileAsDataURL(file);
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, folder: "seglko-faculty" }),
      });

      if (!uploadResponse.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const uploadData = await uploadResponse.json();
      updateFaculty(id, "image", uploadData.url || "");
      setMessage("Image uploaded successfully.");
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Please try again.");
    } finally {
      setUploadingId(null);
    }
  };

  const saveAll = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/faculty", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faculties }),
      });

      if (!res.ok) {
        throw new Error("Failed to save faculty data");
      }

      await res.json();
      setMessage("Faculty list saved successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to save faculty data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-800">Faculties</h1>
            <p className="text-sm text-slate-400 mt-1">Review all faculty entries in a row list and edit any profile on its own page.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={addFaculty}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-2xl shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Add Faculty
            </button>
            <button
              onClick={saveAll}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-2xl shadow-sm hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              <span className="material-symbols-outlined">save</span>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {(error || message) && (
        <div className={`rounded-2xl p-4 text-sm ${error ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {error || message}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">Loading faculty data…</div>
      ) : faculties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          No faculty entries found. Click "Add Faculty" to create one.
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[700px]">
              <thead>
                <tr className="text-slate-500 border-b">
                  <th className="py-4 px-4 w-12">#</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Department</th>
                  <th className="py-4 px-4">Experience</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4 w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((faculty, index) => (
                  <tr key={faculty.id} className="align-top border-b last:border-b-0">
                    <td className="py-4 px-4 align-middle">{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="py-4 px-4 align-middle">
                      <div className="font-semibold text-slate-900">{faculty.name || 'Untitled'}</div>
                      <div className="text-xs text-slate-500 mt-1">{faculty.role || '—'}</div>
                    </td>
                    <td className="py-4 px-4 align-middle">{faculty.school || faculty.dept || '—'}</td>
                    <td className="py-4 px-4 align-middle">{faculty.exp || '—'}</td>
                    <td className="py-4 px-4 align-middle">{faculty.email || '—'}</td>
                    <td className="py-4 px-4 align-middle">{faculty.phone || '—'}</td>
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/faculties/${faculty.id}`} className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 whitespace-nowrap">
                          <span className="material-symbols-outlined" style={{fontSize:'16px'}}>edit</span>
                          Edit
                        </Link>
                        <button onClick={() => deleteFaculty(faculty.id)} className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 whitespace-nowrap">
                          <span className="material-symbols-outlined" style={{fontSize:'16px'}}>delete</span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {faculties.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <p className="text-xs text-slate-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, faculties.length)} of {faculties.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>chevron_left</span>
                  Prev
                </button>
                {Array.from({ length: Math.ceil(faculties.length / PAGE_SIZE) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                      p === page
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(Math.ceil(faculties.length / PAGE_SIZE), p + 1))}
                  disabled={page === Math.ceil(faculties.length / PAGE_SIZE)}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Next
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
