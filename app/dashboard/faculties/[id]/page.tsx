"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ResearchItem = {
  title: string;
  journal: string;
};

type Faculty = {
  id: string;
  name: string;
  role: string;
  school: string;
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

export default function FacultyEditPage() {
  const params = useParams();
  const router = useRouter();
  const facultyId = params?.id;

  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFaculty = async () => {
      if (!facultyId) return;
      setLoading(true);
      try {
        const response = await fetch("/api/faculty");
        if (!response.ok) throw new Error("Failed to load faculty data");
        const data = await response.json();
        const found = Array.isArray(data.faculties)
          ? data.faculties.find((item: any) => item?.id?.toString() === facultyId.toString())
          : null;
        const src = found || {};
        setFaculty({
          id: (src as any).id || facultyId,
          name: (src as any).name || "",
          role: (src as any).role || "",
          school: (src as any).school || (src as any).dept || "",
          edu: (src as any).edu || "",
          exp: (src as any).exp || "",
          tags: Array.isArray((src as any).tags) ? (src as any).tags : [],
          email: (src as any).email || "",
          phone: (src as any).phone || "",
          office: (src as any).office || "",
          linkedin: (src as any).linkedin || "",
          bio: (src as any).bio || "",
          teaching: Array.isArray((src as any).teaching) ? (src as any).teaching : [],
          research: Array.isArray((src as any).research)
            ? (src as any).research.map((item: any) => ({ title: item.title || "", journal: item.journal || "" }))
            : [],
          achievements: Array.isArray((src as any).achievements) ? (src as any).achievements : [],
          image: (src as any).image || "",
          tone: (src as any).tone || "cyan",
        });
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load faculty data.");
      } finally {
        setLoading(false);
      }
    };

    loadFaculty();
  }, [facultyId]);

  const updateField = (field: keyof Faculty, value: string | string[] | ResearchItem[]) => {
    setFaculty((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const uploadImage = async (file: File) => {
    if (!faculty) return;
    setUploading(true);
    setMessage("");
    setError("");
    try {
      const dataUrl = await readFileAsDataURL(file);
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, folder: "seglko-faculty" }),
      });
      if (!uploadResponse.ok) throw new Error("Image upload failed");
      const uploadData = await uploadResponse.json();
      updateField("image", uploadData.url || "");
      setMessage("Image uploaded successfully.");
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const saveFaculty = async () => {
    if (!faculty) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faculty }),
      });
      if (!res.ok) throw new Error("Failed to save faculty");
      await res.json();
      router.refresh();
      router.push("/dashboard/faculties");
    } catch (err) {
      console.error(err);
      setError("Unable to save faculty. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-800">Edit Faculty</h1>
            <p className="text-sm text-slate-400 mt-1">Update the selected faculty profile and save it back to the dashboard database.</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/faculties")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Back to list
          </button>
        </div>
      </div>

      {(error || message) && (
        <div className={`rounded-2xl p-4 text-sm ${error ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {error || message}
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500">Loading faculty profile…</div>
      ) : !faculty ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          Faculty not found. Return to the list and try again.
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Name</label>
                <input
                  type="text"
                  value={faculty.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Professor name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Role / Title</label>
                <input
                  type="text"
                  value={faculty.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Professor, Dean, etc."
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">School / Department</label>
                <input
                  type="text"
                  value={faculty.school}
                  onChange={(e) => updateField("school", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Sharda School of ..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Education</label>
                  <input
                    type="text"
                    value={faculty.edu}
                    onChange={(e) => updateField("edu", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="PhD, IIT Kanpur"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Experience</label>
                  <input
                    type="text"
                    value={faculty.exp}
                    onChange={(e) => updateField("exp", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="10+ Years"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
                  <input
                    type="email"
                    value={faculty.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</label>
                  <input
                    type="text"
                    value={faculty.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="+91-98765-43210"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Office</label>
                  <input
                    type="text"
                    value={faculty.office}
                    onChange={(e) => updateField("office", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Block A, Room 201"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">LinkedIn</label>
                  <input
                    type="text"
                    value={faculty.linkedin}
                    onChange={(e) => updateField("linkedin", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Research Areas</label>
                <input
                  type="text"
                  value={faculty.tags.join(", ")}
                  onChange={(e) => updateField("tags", e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="AI, Machine Learning, Data Science"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Bio</label>
                <textarea
                  value={faculty.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Short biography for the faculty profile"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Teaching Subjects</label>
                <input
                  type="text"
                  value={faculty.teaching.join(", ")}
                  onChange={(e) => updateField("teaching", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Thermodynamics, Fluid Mechanics"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Achievements</label>
                <textarea
                  value={faculty.achievements.join("\n")}
                  onChange={(e) => updateField("achievements", e.target.value.split("\n").map((item) => item.trim()).filter(Boolean))}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="One achievement per line"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Research Publications</label>
                <textarea
                  value={faculty.research.map((item) => `${item.title} | ${item.journal}`).join("\n")}
                  onChange={(e) => updateField(
                    "research",
                    e.target.value
                      .split("\n")
                      .map((line) => {
                        const [title, journal] = line.split("|");
                        return {
                          title: title?.trim() || "",
                          journal: journal?.trim() || "",
                        };
                      })
                      .filter((item) => item.title || item.journal)
                  )}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Title | Journal"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Theme Tone</label>
                <select
                  value={faculty.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                >
                  {[
                    "cyan",
                    "gold",
                    "blue",
                    "violet",
                    "emerald",
                    "rose",
                  ].map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Faculty Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) await uploadImage(file);
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                />
                {uploading && <p className="mt-2 text-xs text-slate-500">Uploading image…</p>}
              </div>

              {faculty.image ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Image preview</p>
                  <div className="mt-3 h-64 overflow-hidden rounded-3xl bg-white shadow-sm">
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

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-sm font-semibold text-slate-800">Quick summary</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div><span className="font-semibold text-slate-800">Department:</span> {faculty.school || "N/A"}</div>
                  <div><span className="font-semibold text-slate-800">Experience:</span> {faculty.exp || "N/A"}</div>
                  <div><span className="font-semibold text-slate-800">Email:</span> {faculty.email || "N/A"}</div>
                  <div><span className="font-semibold text-slate-800">Phone:</span> {faculty.phone || "N/A"}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={saveFaculty}
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Faculty"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
