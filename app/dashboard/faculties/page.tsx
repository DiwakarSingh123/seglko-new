"use client";

import { useEffect, useState } from "react";

type Faculty = {
  id: string;
  name: string;
  role: string;
  school: string;
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
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadFaculties = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/faculty");
        if (!res.ok) throw new Error("Failed to load faculty data");
        const data = await res.json();
        setFaculties(Array.isArray(data.faculties) ? data.faculties : []);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch faculty data. Check your connection or API.");
      } finally {
        setLoading(false);
      }
    };
    loadFaculties();
  }, []);

  const addFaculty = () => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: "",
      role: "",
      school: "",
      image: "",
      tone: "cyan",
    };
    setFaculties((prev) => [newFaculty, ...prev]);
  };

  const updateFaculty = (id: string, field: keyof Faculty, value: string) => {
    setFaculties((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteFaculty = (id: string) => {
    if (!confirm("Delete this faculty entry?")) return;
    setFaculties((prev) => prev.filter((item) => item.id !== id));
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
            <p className="text-sm text-slate-400 mt-1">Manage faculty cards, upload profile images to Cloudinary, and store all data in the database.</p>
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
        <div className="grid gap-6">
          {faculties.map((faculty, index) => (
            <div key={faculty.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-800">Faculty #{index + 1}</h2>
                      <p className="text-xs text-slate-400">Use the form below to update this entry.</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteFaculty(faculty.id)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                >
                  <span className="material-symbols-outlined">delete</span>
                  Delete
                </button>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Name</label>
                    <input
                      type="text"
                      value={faculty.name}
                      onChange={(e) => updateFaculty(faculty.id, "name", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Professor name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Role / Title</label>
                    <input
                      type="text"
                      value={faculty.role}
                      onChange={(e) => updateFaculty(faculty.id, "role", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Professor, Dean, etc."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">School / Department</label>
                    <input
                      type="text"
                      value={faculty.school}
                      onChange={(e) => updateFaculty(faculty.id, "school", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Sharda School of ..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Theme Tone</label>
                    <select
                      value={faculty.tone}
                      onChange={(e) => updateFaculty(faculty.id, "tone", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    >
                      {toneOptions.map((tone) => (
                        <option key={tone} value={tone}>{tone}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Faculty Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) await uploadFacultyImage(file, faculty.id);
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                    />
                    {uploadingId === faculty.id && <p className="mt-2 text-xs text-slate-500">Uploading image…</p>}
                  </div>
                  {faculty.image ? (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Image preview</p>
                      <div className="mt-3 h-40 overflow-hidden rounded-3xl bg-white shadow-sm">
                        <img
                          src={faculty.image}
                          alt={faculty.name || "Faculty image"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-400">
                      No image set yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
