"use client";
import { useState } from "react";
import GalleryTab from "../components/GalleryTab";

const admissionCycles = [
  { id: 1, session: "2024-25", program: "B.Tech CSE", institution: "SIET", openDate: "Mar 1, 2024", closeDate: "Jul 31, 2024", totalSeats: 120, filled: 98, status: "Open" },
  { id: 2, session: "2024-25", program: "MBA", institution: "SIMS", openDate: "Mar 1, 2024", closeDate: "Jul 31, 2024", totalSeats: 60, filled: 55, status: "Open" },
  { id: 3, session: "2024-25", program: "B.Pharm", institution: "SCP", openDate: "Mar 1, 2024", closeDate: "Jul 31, 2024", totalSeats: 60, filled: 60, status: "Full" },
  { id: 4, session: "2024-25", program: "B.Ed", institution: "SCOE", openDate: "Apr 1, 2024", closeDate: "Aug 31, 2024", totalSeats: 100, filled: 42, status: "Open" },
  { id: 5, session: "2023-24", program: "B.Tech ECE", institution: "SIET", openDate: "Mar 1, 2023", closeDate: "Jul 31, 2023", totalSeats: 60, filled: 60, status: "Closed" },
  { id: 6, session: "2023-24", program: "MCA", institution: "SIET", openDate: "Mar 1, 2023", closeDate: "Jul 31, 2023", totalSeats: 60, filled: 58, status: "Closed" },
];

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
  const [tab, setTab] = useState<"cycles" | "process" | "eligibility" | "gallery">("cycles");
  const [session, setSession] = useState("All");
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

  const updateEligibility = (cat: EligibilityCategory, items: EligibilityItem[]) =>
    setEligibilityData((prev) => ({ ...prev, [cat]: items }));

  const sessions = ["All", ...Array.from(new Set(admissionCycles.map((a) => a.session)))];
  const filtered = admissionCycles.filter((a) => session === "All" || a.session === session);

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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Admission</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage admission cycles and process content</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>New Cycle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Cycles", value: admissionCycles.filter(a => a.status === "Open").length, icon: "how_to_reg", color: "bg-emerald-500" },
          { label: "Total Seats", value: admissionCycles.reduce((a, c) => a + c.totalSeats, 0), icon: "chair", color: "bg-indigo-500" },
          { label: "Seats Filled", value: admissionCycles.reduce((a, c) => a + c.filled, 0), icon: "group", color: "bg-blue-500" },
          { label: "Fill Rate", value: Math.round(admissionCycles.reduce((a, c) => a + c.filled, 0) / admissionCycles.reduce((a, c) => a + c.totalSeats, 0) * 100) + "%", icon: "percent", color: "bg-purple-500" },
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
          { id: "cycles", label: "Admission Cycles", icon: "calendar_month" },
          { id: "process", label: "Admission Process", icon: "account_tree" },
          { id: "eligibility", label: "Eligibility Criteria", icon: "verified" },
          { id: "gallery", label: "Gallery", icon: "photo_library" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "cycles" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex gap-2">
            {sessions.map((s) => (
              <button key={s} onClick={() => setSession(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${session === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
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
                      <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "eligibility" && (
        <div className="space-y-4">
          <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
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

          <div className="flex justify-end">
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
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
              <span className="material-symbols-outlined text-sm">add</span>Add Step
            </button>
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
      {tab === "gallery" && <GalleryTab section="Admission" categories={["Campus Tour", "Orientation", "Registration", "General"]} />}
    </div>
  );
}
