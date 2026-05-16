"use client";
import { useState, useEffect } from "react";
import GalleryTab from "../components/GalleryTab";

const inquiries = [
  { id: "INQ-001", name: "Ravi Kumar", email: "ravi@gmail.com", phone: "+91 98765 43210", subject: "Admission inquiry for B.Tech", date: "May 10, 2024", status: "New" },
  { id: "INQ-002", name: "Sunita Devi", email: "sunita@gmail.com", phone: "+91 87654 32109", subject: "Fee structure for MBA", date: "May 9, 2024", status: "Replied" },
  { id: "INQ-003", name: "Mohit Sharma", email: "mohit@gmail.com", phone: "+91 76543 21098", subject: "Hostel facility availability", date: "May 8, 2024", status: "New" },
  { id: "INQ-004", name: "Pooja Singh", email: "pooja@gmail.com", phone: "+91 65432 10987", subject: "Scholarship details", date: "May 7, 2024", status: "Closed" },
  { id: "INQ-005", name: "Arjun Patel", email: "arjun@gmail.com", phone: "+91 54321 09876", subject: "Campus visit request", date: "May 6, 2024", status: "Replied" },
];

const statusStyle: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Replied: "bg-emerald-100 text-emerald-700",
  Closed: "bg-slate-100 text-slate-500",
};

export default function ContactPage() {
  type Faq = { q: string; a: string };
  const [tab, setTab] = useState<"inquiries" | "info" | "faq" | "gallery">("inquiries");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editingFaq, setEditingFaq] = useState<(Faq & { index: number }) | null>(null);
  const [filter, setFilter] = useState("All");

  const [contactDetails, setContactDetails] = useState({
    address: "",
    phone: "",
    email: "",
    website: "",
  });

  const [socialLinks, setSocialLinks] = useState<{label: string, icon: string, url: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFaqs(data.faqs || []);
          setContactDetails(data.contactDetails || { address: "", phone: "", email: "", website: "" });
          setSocialLinks(data.socialLinks || []);
        }
        setLoading(false);
      });
  }, []);

  const saveData = async (updatedData: any) => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save changes.');
    }
  };

  const updateContactDetail = (field: keyof typeof contactDetails, value: string) => {
    setContactDetails({ ...contactDetails, [field]: value });
  };

  const updateSocialLink = (label: string, value: string) => {
    setSocialLinks(socialLinks.map((s) => (s.label === label ? { ...s, url: value } : s)));
  };

  const saveContactInfo = () => {
    saveData({ faqs, contactDetails, socialLinks });
  };
  
  const saveSocialLinks = () => {
    saveData({ faqs, contactDetails, socialLinks });
  };

  const saveFaqs = (newFaqs: Faq[]) => {
    saveData({ faqs: newFaqs, contactDetails, socialLinks });
  };

  const handleFaqSave = () => {
    if (editingFaq) {
      const newFaqs = faqs.map((f, i) => i === editingFaq.index ? { q: editingFaq.q, a: editingFaq.a } : f);
      setFaqs(newFaqs);
      saveFaqs(newFaqs);
      setEditingFaq(null);
    }
  };

  const handleAddFaq = () => {
    const newFaqs = [...faqs, { q: "New Question?", a: "Answer here." }];
    setFaqs(newFaqs);
    saveFaqs(newFaqs);
  };

  const handleDeleteFaq = (idx: number) => {
    const newFaqs = faqs.filter((_, i) => i !== idx);
    setFaqs(newFaqs);
    saveFaqs(newFaqs);
  };

  const filtered = inquiries.filter((i) => filter === "All" || i.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Contact Us</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage contact inquiries and contact information</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Inquiries", value: inquiries.length, icon: "mail", color: "bg-indigo-500" },
          { label: "New", value: inquiries.filter(i => i.status === "New").length, icon: "mark_email_unread", color: "bg-blue-500" },
          { label: "Replied", value: inquiries.filter(i => i.status === "Replied").length, icon: "mark_email_read", color: "bg-emerald-500" },
          { label: "Closed", value: inquiries.filter(i => i.status === "Closed").length, icon: "cancel", color: "bg-slate-500" },
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
          { id: "inquiries", label: "Inquiries", icon: "inbox" },
          { id: "info", label: "Contact Info", icon: "contact_phone" },
          { id: "faq", label: "FAQs", icon: "quiz" },
          { id: "gallery", label: "Gallery", icon: "photo_library" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "inquiries" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex gap-2">
            {["All", "New", "Replied", "Closed"].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Name", "Subject", "Phone", "Date", "Status", "Action"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => (
                  <tr key={inq.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-semibold text-slate-800">{inq.name}</div>
                      <div className="text-xs text-slate-400">{inq.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600 max-w-xs truncate">{inq.subject}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{inq.phone}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{inq.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[inq.status]}`}>{inq.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors" title="Reply">
                          <span className="material-symbols-outlined text-sm">reply</span>
                        </button>
                        <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors" title="Delete">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "faq" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {editingFaq && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-slate-800">Edit FAQ</h2>
                  <button onClick={() => setEditingFaq(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                    <span className="material-symbols-outlined text-slate-500">close</span>
                  </button>
                </div>
                <input value={editingFaq.q} onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })} placeholder="Question" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                <textarea value={editingFaq.a} onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })} placeholder="Answer" rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setEditingFaq(null)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                  <button onClick={handleFaqSave} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-800">Frequently Asked Questions</h2>
            <button onClick={handleAddFaq} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
              <span className="material-symbols-outlined text-sm">add</span>Add FAQ
            </button>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-800 mb-1">Q: {faq.q}</div>
                    <div className="text-xs text-slate-500">A: {faq.a}</div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => setEditingFaq({ ...faq, index: i })} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors border border-slate-200">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDeleteFaq(i)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white text-rose-500 hover:bg-rose-50 transition-colors border border-slate-200">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-black text-slate-800">Contact Details</h2>
            {[
              { label: "Address", field: "address", icon: "location_on" },
              { label: "Phone (Call Us)", field: "phone", icon: "phone" },
              { label: "Email", field: "email", icon: "mail" },
              { label: "Website", field: "website", icon: "language" },
            ].map((f) => (
              <div key={f.label}>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1.5">
                  <span className="material-symbols-outlined text-sm text-indigo-500">{f.icon}</span>{f.label}
                </label>
                <input
                  type="text"
                  value={contactDetails[f.field as keyof typeof contactDetails]}
                  onChange={(e) => updateContactDetail(f.field as keyof typeof contactDetails, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
            ))}
            <button onClick={saveContactInfo} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
              Save Contact Info
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-black text-slate-800">Social Media Links</h2>
            {socialLinks.map((s) => (
              <div key={s.label}>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1.5">
                  <span className="material-symbols-outlined text-sm text-indigo-500">{s.icon}</span>{s.label}
                </label>
                <input
                  type="url"
                  value={s.url}
                  onChange={(e) => updateSocialLink(s.label, e.target.value)}
                  placeholder={s.url}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
            ))}
            <button onClick={saveSocialLinks} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
              Save Social Links
            </button>
          </div>
        </div>
      )}
      {tab === "gallery" && <GalleryTab section="Contact" categories={["Campus", "Office", "Events", "General"]} />}
    </div>
  );
}
