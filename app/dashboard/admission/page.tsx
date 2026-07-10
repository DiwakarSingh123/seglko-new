"use client";
import { useState, useEffect, useMemo } from "react";

type AdmissionCycle = {
  id: number;
  session: string;
  program: string;
  institution: string;
  openDate: string;
  closeDate: string;
  totalSeats: number;
  filled: number;
  status: string;
};

const CURRENT_YEAR = new Date().getFullYear();
const SESSION_LOOKBACK = 10;

const getDefaultSession = () => `${CURRENT_YEAR}-${String(CURRENT_YEAR + 1).slice(-2)}`;

function buildSessionOptions(cycles: AdmissionCycle[]): string[] {
  const recent = Array.from({ length: SESSION_LOOKBACK + 1 }, (_, i) => {
    const start = CURRENT_YEAR - i;
    return `${start}-${String(start + 1).slice(-2)}`;
  });
  const fromCycles = cycles.map((c) => c.session).filter(Boolean);
  return Array.from(new Set([...recent, ...fromCycles])).sort((a, b) => b.localeCompare(a));
}

const emptyCycle = {
  session: getDefaultSession(),
  program: "",
  institution: "SIET",
  openDate: "",
  closeDate: "",
  totalSeats: 0,
  filled: 0,
  status: "Open",
};

type Step = { step: number; title: string; desc: string; icon: string };

const initialSteps: Step[] = [
  { step: 1, title: "Register Yourself", desc: "Create your account using your email address and basic personal information.", icon: "person_add" },
  { step: 2, title: "Verify Email", desc: "Check your email for a verification link to activate your account. If you don't see the email, please check your spam folder.", icon: "mark_email_read" },
  { step: 3, title: "Fill Application Form Online", desc: "Complete the detailed application form with your academic and personal information — Personal Details, Contact Information, Academic History, Document Upload.", icon: "edit_document" },
  { step: 4, title: "Pay Application Fee", desc: "Secure your application by paying the non-refundable processing fee. Payment Options: VISA, Mastercard, PayPal.", icon: "payments" },
  { step: 5, title: "Submit Application", desc: "Review and submit your completed application for processing. You'll receive a confirmation email with your application details.", icon: "send" },
];

const statusStyle: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-700",
  Full: "bg-amber-100 text-amber-700",
  Closed: "bg-slate-100 text-slate-500",
};

type EligibilityCategory = "undergraduate" | "postgraduate" | "diploma";
type EligibilityItem = { title: string; content: string[] };

export default function AdmissionPage() {
  const [tab, setTab] = useState<"cycles" | "process" | "eligibility" | "applications">("applications");
  const [session, setSession] = useState("All");
  const [cycles, setCycles] = useState<AdmissionCycle[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isAppsLoading, setIsAppsLoading] = useState(false);
  const [viewingApp, setViewingApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCycle, setEditingCycle] = useState<AdmissionCycle | null>(null);
  const [form, setForm] = useState(emptyCycle);
  const [formError, setFormError] = useState("");
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [eligibilityCategory, setEligibilityCategory] = useState<EligibilityCategory>("undergraduate");
  const [eligibilityData, setEligibilityData] = useState<Record<EligibilityCategory, EligibilityItem[]>>({
    undergraduate: [
      { title: "Academic Requirements", content: ["10+2 or equivalent with minimum 45% marks", "PCM for Engineering programs", "Any stream for Management programs"] },
      { title: "Age Limit", content: ["Minimum 17 years as on 31st December of admission year", "No upper age limit"] },
      { title: "Additional Information", content: ["All candidates must submit original documents for verification", "International students must have equivalent qualifications", "5% relaxation in marks for reserved category candidates", "Admission subject to availability of seats"] },
    ],
    postgraduate: [
      { title: "Academic Requirements", content: ["Bachelor's degree in relevant field with minimum 50% marks", "Valid entrance exam score (CAT/MAT/GATE/CMAT)", "Work experience preferred for MBA programs"] },
      { title: "Age Limit", content: ["No age limit for postgraduate programs"] },
      { title: "Additional Information", content: ["All candidates must submit original documents for verification", "International students must have equivalent qualifications", "5% relaxation in marks for reserved category candidates", "Admission subject to availability of seats"] },
    ],
    diploma: [
      { title: "Academic Requirements", content: ["10th pass with minimum 40% marks", "Any stream eligible", "ITI certificate holders can apply for lateral entry"] },
      { title: "Age Limit", content: ["Minimum 15 years as on 31st December of admission year", "No upper age limit"] },
      { title: "Additional Information", content: ["All candidates must submit original documents for verification", "International students must have equivalent qualifications", "5% relaxation in marks for reserved category candidates", "Admission subject to availability of seats"] },
    ],
  });

  const [editingEligibility, setEditingEligibility] = useState<{ idx: number; item: EligibilityItem } | null>(null);

  useEffect(() => {
    fetchCycles();
    fetchApplications();
  }, []);

  const fetchCycles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admission");
      if (res.ok) setCycles(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const fetchApplications = async () => {
    setIsAppsLoading(true);
    try {
      const res = await fetch("/api/student-applications");
      if (res.ok) setApplications(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsAppsLoading(false);
  };

  const resetForm = () => setForm({ ...emptyCycle, session: getDefaultSession() });

  const handleSaveNew = async () => {
    if (!form.program.trim() || !form.session.trim()) {
      setFormError("Session and program are required.");
      return;
    }
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const saved = await res.json();
        setCycles((prev) => [...prev, saved]);
        setFormError("");
        setShowAddForm(false);
        resetForm();
        setSession(saved.session);
        alert(`Added "${saved.program}" cycle successfully!`);
      }
    } catch (e) {
      console.error(e);
      setFormError("Failed to save cycle.");
    }
  };

  const handleEditSave = async () => {
    if (!editingCycle) return;
    try {
      const res = await fetch("/api/admission", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCycle),
      });
      if (res.ok) {
        const saved = await res.json();
        setCycles((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
        setEditingCycle(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admission cycle?")) return;
    try {
      const res = await fetch(`/api/admission?id=${id}`, { method: "DELETE" });
      if (res.ok) setCycles((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Load steps from settings on mount
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.admissionProcess?.steps) {
          setSteps(data.admissionProcess.steps.map((s: any, i: number) => ({
            step: i + 1,
            title: s.title,
            desc: s.text,
            icon: initialSteps[i]?.icon || 'person_add'
          })));
        }
        if (data?.eligibilityCriteria) {
          const ec = data.eligibilityCriteria;
          const toItems = (obj: Record<string, string[]>): EligibilityItem[] => [
            { title: 'Academic Requirements', content: obj.academic || [] },
            { title: 'Age Limit', content: obj.age || [] },
            { title: 'Additional Information', content: obj.additional || [] },
          ].filter(i => i.content.length > 0);
          setEligibilityData({
            undergraduate: toItems(ec.undergraduate || {}),
            postgraduate: toItems(ec.postgraduate || {}),
            diploma: toItems(ec.diploma || {}),
          });
        }
      })
      .catch(() => {});
  }, []);

  const saveSteps = () => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(current => {
        const updated = {
          ...current,
          admissionProcess: {
            ...(current.admissionProcess || {}),
            steps: steps.map((s, i) => ({
              number: String(i + 1).padStart(2, '0'),
              title: s.title,
              text: s.desc
            }))
          }
        };
        return fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      })
      .then(res => res.json())
      .then(res => { if (res.success) alert('Steps saved successfully!'); })
      .catch(() => alert('Failed to save'));
  };

  const updateEligibility = (cat: EligibilityCategory, items: EligibilityItem[]) =>
    setEligibilityData((prev) => ({ ...prev, [cat]: items }));

  const saveEligibility = () => {
    // Convert dashboard format to frontend format
    const toFrontend = (items: EligibilityItem[]) => {
      const result: Record<string, string[]> = {};
      items.forEach(item => {
        const key = item.title.toLowerCase().includes('academic') ? 'academic'
          : item.title.toLowerCase().includes('age') ? 'age'
          : 'additional';
        result[key] = item.content;
      });
      return result;
    };

    fetch('/api/settings')
      .then(res => res.json())
      .then(current => {
        const updated = {
          ...current,
          eligibilityCriteria: {
            undergraduate: toFrontend(eligibilityData.undergraduate),
            postgraduate: toFrontend(eligibilityData.postgraduate),
            diploma: toFrontend(eligibilityData.diploma),
          }
        };
        return fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
      })
      .then(res => res.json())
      .then(res => { if (res.success) alert('Eligibility criteria saved!'); })
      .catch(() => alert('Failed to save'));
  };

  const sessionOptions = useMemo(() => buildSessionOptions(cycles), [cycles]);
  const filtered = cycles.filter((a) => session === "All" || a.session === session);

  const totalSeats = cycles.reduce((a, c) => a + c.totalSeats, 0);
  const totalFilled = cycles.reduce((a, c) => a + c.filled, 0);

  return (
    <div className="space-y-5">
      {editingEligibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Section</h2>
              <button onClick={() => setEditingEligibility(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <input
              value={editingEligibility.item.title}
              onChange={(e) => setEditingEligibility({ ...editingEligibility, item: { ...editingEligibility.item, title: e.target.value } })}
              placeholder="Section title"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <textarea
              value={editingEligibility.item.content.join("\n")}
              onChange={(e) => setEditingEligibility({ ...editingEligibility, item: { ...editingEligibility.item, content: e.target.value.split("\n").filter(Boolean) } })}
              placeholder="One point per line"
              rows={5}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
            <p className="text-xs text-slate-400">Enter each point on a new line</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingEligibility(null)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={() => {
                const updated = [...eligibilityData[eligibilityCategory]];
                updated[editingEligibility.idx] = editingEligibility.item;
                updateEligibility(eligibilityCategory, updated);
                setEditingEligibility(null);
              }} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {editingCycle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Admission Cycle</h2>
              <button onClick={() => setEditingCycle(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Session</label>
                <select value={editingCycle.session} onChange={(e) => setEditingCycle({ ...editingCycle, session: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                  {buildSessionOptions(cycles).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Program</label>
                <input value={editingCycle.program} onChange={(e) => setEditingCycle({ ...editingCycle, program: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Institution</label>
                <input value={editingCycle.institution} onChange={(e) => setEditingCycle({ ...editingCycle, institution: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Status</label>
                <select value={editingCycle.status} onChange={(e) => setEditingCycle({ ...editingCycle, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                  {["Open", "Full", "Closed"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Open Date</label>
                <input value={editingCycle.openDate} onChange={(e) => setEditingCycle({ ...editingCycle, openDate: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Close Date</label>
                <input value={editingCycle.closeDate} onChange={(e) => setEditingCycle({ ...editingCycle, closeDate: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Total Seats</label>
                <input type="number" value={editingCycle.totalSeats} onChange={(e) => setEditingCycle({ ...editingCycle, totalSeats: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Filled</label>
                <input type="number" value={editingCycle.filled} onChange={(e) => setEditingCycle({ ...editingCycle, filled: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingCycle(null)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleEditSave} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {editingStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Step</h2>
              <button onClick={() => setEditingStep(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <input value={editingStep.title} onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })} placeholder="Step title" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <textarea value={editingStep.desc} onChange={(e) => setEditingStep({ ...editingStep, desc: e.target.value })} placeholder="Description" rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingStep(null)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={() => { setSteps((prev) => prev.map((s) => s.step === editingStep.step ? editingStep : s)); setEditingStep(null); }} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">Admission</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage admission cycles and process content</p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setFormError(""); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 w-full sm:w-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>New Cycle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Cycles", value: cycles.filter(a => a.status === "Open").length, icon: "how_to_reg", color: "bg-emerald-500" },
          { label: "Total Seats", value: totalSeats, icon: "chair", color: "bg-indigo-500" },
          { label: "Seats Filled", value: totalFilled, icon: "group", color: "bg-blue-500" },
          { label: "Fill Rate", value: totalSeats ? Math.round((totalFilled / totalSeats) * 100) + "%" : "0%", icon: "percent", color: "bg-purple-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{isLoading ? "..." : s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit max-w-full overflow-x-auto whitespace-nowrap flex-shrink-0">
        {[
          { id: "applications", label: "Applications", icon: "description" },
          { id: "cycles", label: "Admission Cycles", icon: "calendar_month" },
          { id: "process", label: "Admission Process", icon: "account_tree" },
          { id: "eligibility", label: "Eligibility Criteria", icon: "verified" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "cycles" && (
        <div className="space-y-4">
          {showAddForm && (
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-slate-800">New Admission Cycle</h2>
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetForm(); }} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                  <span className="material-symbols-outlined text-slate-500">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Session</label>
                  <select value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    {sessionOptions.map((s) => (
                      <option key={s} value={s}>{s}{s === getDefaultSession() ? " (Current)" : ""}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Program</label>
                  <input value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} placeholder="e.g. B.Tech CSE" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Institution</label>
                  <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    {["Open", "Full", "Closed"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Open Date</label>
                  <input value={form.openDate} onChange={(e) => setForm({ ...form, openDate: e.target.value })} placeholder="e.g. Mar 1, 2025" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Close Date</label>
                  <input value={form.closeDate} onChange={(e) => setForm({ ...form, closeDate: e.target.value })} placeholder="e.g. Jul 31, 2025" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Total Seats</label>
                  <input type="number" value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Filled</label>
                  <input type="number" value={form.filled} onChange={(e) => setForm({ ...form, filled: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              {formError && <p className="text-sm text-rose-600">{formError}</p>}
              <div className="flex justify-end gap-3">
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetForm(); }} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSaveNew} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Cycle</button>
              </div>
            </div>
          )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg">calendar_month</span>
              <label className="text-xs font-bold text-slate-500">Search Cycle Year</label>
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 min-w-[180px]"
              >
                <option value="All">All Sessions</option>
                {sessionOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}{s === getDefaultSession() ? " (Current)" : ""}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-400">
                {filtered.length} cycle{filtered.length !== 1 ? "s" : ""} shown
              </span>
            </div>
          </div>
          {isLoading ? (
            <p className="p-5 text-slate-500 text-sm">Loading admission cycles...</p>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Session", "Program", "Institution", "Open Date", "Close Date", "Seats", "Filled", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{a.session}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{a.program}</td>
                    <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.institution}</span></td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{a.openDate}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{a.closeDate}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{a.totalSeats}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(a.filled / a.totalSeats) * 100}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{a.filled}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status}</span></td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => setEditingCycle(a)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onClick={() => handleDelete(a.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
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
        </div>
      )}

      {tab === "eligibility" && (
        <div className="space-y-4">
          <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit max-w-full overflow-x-auto whitespace-nowrap flex-shrink-0">
            {[
              { id: "undergraduate", label: "Undergraduate", icon: "school" },
              { id: "postgraduate", label: "Postgraduate", icon: "workspace_premium" },
              { id: "diploma", label: "Diploma", icon: "card_membership" },
            ].map((cat) => (
              <button key={cat.id} onClick={() => setEligibilityCategory(cat.id as EligibilityCategory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${eligibilityCategory === cat.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
                <span className="material-symbols-outlined text-lg">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={saveEligibility}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors">
              <span className="material-symbols-outlined text-sm">save</span>Save Criteria
            </button>
            <button
              onClick={() => updateEligibility(eligibilityCategory, [...eligibilityData[eligibilityCategory], { title: "New Section", content: ["Add point here"] }])}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
              <span className="material-symbols-outlined text-sm">add</span>Add Section
            </button>
          </div>

          <div className="space-y-3">
            {eligibilityData[eligibilityCategory].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 group hover:border-indigo-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-indigo-600 text-lg">
                        {item.title.includes("Academic") ? "school" : item.title.includes("Age") ? "calendar_today" : "info"}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-800">{item.title}</h3>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingEligibility({ idx, item: { ...item, content: [...item.content] } })} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => updateEligibility(eligibilityCategory, eligibilityData[eligibilityCategory].filter((_, i) => i !== idx))} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <ul className="space-y-2">
                  {item.content.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-indigo-500 text-base mt-0.5">check_circle</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "process" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-800">Admission Process Steps</h2>
            <div className="flex gap-2">
              <button onClick={saveSteps} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors">
                <span className="material-symbols-outlined text-sm">save</span>Save Steps
              </button>
              <button onClick={() => setSteps(prev => [...prev, { step: prev.length + 1, title: "New Step", desc: "Step description here.", icon: "person_add" }])} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>Add Step
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md shadow-indigo-200">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-800">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingStep(s)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors border border-slate-200">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => setSteps((prev) => prev.filter((x) => x.step !== s.step))} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-rose-500 hover:bg-rose-50 transition-colors border border-slate-200">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "applications" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600 text-xl">description</span>
              <h2 className="text-base font-black text-slate-800">Student Applications</h2>
            </div>
            <button onClick={fetchApplications} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-sm">refresh</span>
            </button>
          </div>
          {isAppsLoading ? (
            <p className="p-5 text-slate-500 text-sm">Loading applications...</p>
          ) : applications.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-3xl text-slate-300">inbox</span>
              </div>
              <p className="text-sm font-bold text-slate-600">No applications yet</p>
              <p className="text-xs text-slate-400 mt-1">Applications submitted by students will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {["App ID", "Student", "Course & Inst.", "Payment", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{app.applicationId}</span>
                        <div className="text-[10px] text-slate-400 mt-1">{new Date(app.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-bold text-slate-800">{app.firstName} {app.lastName}</div>
                        <div className="text-xs text-slate-500">{app.email}</div>
                        <div className="text-[10px] text-slate-400">{app.phone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-semibold text-slate-700">{app.desiredCourse}</div>
                        <div className="text-xs text-slate-500">{app.desiredInstitution}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${app.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <select 
                          value={app.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            await fetch('/api/student-applications', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ _id: app._id, status: newStatus })
                            });
                            fetchApplications();
                          }}
                          className={`px-2 py-1 rounded-full text-[10px] font-bold outline-none cursor-pointer border-none ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}
                        >
                          <option>Pending</option>
                          <option>Under Review</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => setViewingApp(app)} className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {viewingApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-black text-slate-800">Application Details</h2>
                <p className="text-xs font-bold text-indigo-600 mt-0.5">{viewingApp.applicationId}</p>
              </div>
              <button onClick={() => setViewingApp(null)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Student Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex"><span className="w-24 text-slate-500">Name:</span><span className="font-semibold text-slate-800">{viewingApp.firstName} {viewingApp.lastName}</span></div>
                    <div className="flex"><span className="w-24 text-slate-500">Email:</span><span className="font-semibold text-slate-800">{viewingApp.email}</span></div>
                    <div className="flex"><span className="w-24 text-slate-500">Phone:</span><span className="font-semibold text-slate-800">{viewingApp.phone}</span></div>
                    <div className="flex"><span className="w-24 text-slate-500">DOB:</span><span className="font-semibold text-slate-800">{viewingApp.dob}</span></div>
                    <div className="flex"><span className="w-24 text-slate-500">Gender:</span><span className="font-semibold text-slate-800">{viewingApp.gender}</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Course Preference</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex"><span className="w-24 text-slate-500">Course:</span><span className="font-semibold text-slate-800">{viewingApp.desiredCourse}</span></div>
                    <div className="flex"><span className="w-24 text-slate-500">Institution:</span><span className="font-semibold text-slate-800">{viewingApp.desiredInstitution}</span></div>
                    <div className="flex mt-3 pt-3 border-t border-slate-100"><span className="w-24 text-slate-500">Status:</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${viewingApp.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{viewingApp.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Family Information</h3>
                <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Father</p>
                    <p className="font-semibold text-slate-800">{viewingApp.fatherName}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{viewingApp.fatherPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Mother</p>
                    <p className="font-semibold text-slate-800">{viewingApp.motherName}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{viewingApp.motherPhone}</p>
                  </div>
                  <div className="md:col-span-2 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Address</p>
                    <p className="font-semibold text-slate-800">{viewingApp.address}, {viewingApp.city}, {viewingApp.state} - {viewingApp.pincode}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Records</h3>
                <div className="space-y-3">
                  <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Class 10th - {viewingApp.class10Board}</h4>
                      <p className="text-xs text-slate-500 mt-1">{viewingApp.class10School} ({viewingApp.class10Year}) • <span className="font-bold text-indigo-600">{viewingApp.class10Percent}%</span></p>
                    </div>
                    {viewingApp.class10Marksheet && (
                      <a href={viewingApp.class10Marksheet} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors">
                        View Marksheet
                      </a>
                    )}
                  </div>
                  
                  <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Class 12th - {viewingApp.class12Board}</h4>
                      <p className="text-xs text-slate-500 mt-1">{viewingApp.class12School} ({viewingApp.class12Year}) • {viewingApp.class12Stream} • <span className="font-bold text-indigo-600">{viewingApp.class12Percent}%</span></p>
                    </div>
                    {viewingApp.class12Marksheet && (
                      <a href={viewingApp.class12Marksheet} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors">
                        View Marksheet
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <button onClick={() => setViewingApp(null)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
