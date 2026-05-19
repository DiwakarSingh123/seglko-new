"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [tab, setTab] = useState<"profile" | "password" | "site-content">("profile");

  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@seglko.org", phone: "" });
  const [profileMsg, setProfileMsg] = useState("");

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passMsg, setPassMsg] = useState({ text: "", error: false });

  // Site Content Customizer States
  const [settings, setSettings] = useState<any>({
    general: { tollFree: "", hrEmail: "", contactEmail: "", contactPhone: "", marqueeNews: "" },
    admissionProcess: { heroTitle: "", heroSubtitle: "", phone: "", email: "", steps: [] },
    eligibilityCriteria: { undergraduate: { academic: [], age: [], additional: [] }, postgraduate: { academic: [], age: [], additional: [] }, diploma: { academic: [], age: [], additional: [] } },
    whyJoinSeg: { heroTitle: "", heroSubtitle: "", reasons: [] },
    payFee: { features: [] },
    careers: { jobs: [] },
    managementQuota: { heroTitle: "", heroSubtitle: "", contactPhone: "", contactEmail: "", guidelines: [], documents: [] }
  });

  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  useEffect(() => {
    if (tab === "site-content") {
      setSettingsLoading(true);
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setSettings(data);
          }
          setSettingsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setSettingsLoading(false);
        });
    }
  }, [tab]);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg("Profile updated successfully!");
    setTimeout(() => setProfileMsg(""), 3000);
  }

  function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.newPass.length < 6) {
      setPassMsg({ text: "Password must be at least 6 characters.", error: true });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassMsg({ text: "New passwords do not match.", error: true });
      return;
    }
    setPasswords({ current: "", newPass: "", confirm: "" });
    setPassMsg({ text: "Password changed successfully!", error: false });
    setTimeout(() => setPassMsg({ text: "", error: false }), 3000);
  }

  function saveSiteSettings() {
    setSettingsMsg("Saving...");
    fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettingsMsg("Saved successfully!");
          setTimeout(() => setSettingsMsg(""), 3000);
        } else {
          setSettingsMsg("Failed to save: " + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setSettingsMsg("Error saving settings");
      });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Settings</h1>
          <p className="text-sm text-slate-400">Manage account information and dynamic page contents.</p>
        </div>
        {tab === "site-content" && (
          <button
            onClick={saveSiteSettings}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-100 transition-all"
          >
            <span className="text-lg material-symbols-outlined">save</span>
            Save Page Content
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(["profile", "password", "site-content"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "profile"
              ? "Profile"
              : t === "password"
              ? "Change Password"
              : "Page Content Customizer"}
          </button>
        ))}
      </div>

      {settingsMsg && (
        <div className={`p-4 rounded-xl text-sm font-bold shadow-sm ${settingsMsg.includes("Error") || settingsMsg.includes("Failed") ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
          {settingsMsg}
        </div>
      )}

      {/* Profile Tab */}
      {tab === "profile" && (
        <form onSubmit={saveProfile} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-black text-slate-800">Profile Information</h2>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
            {profileMsg && <span className="text-sm font-medium text-green-600">{profileMsg}</span>}
          </div>
        </form>
      )}

      {/* Password Tab */}
      {tab === "password" && (
        <form onSubmit={changePassword} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-black text-slate-800">Change Password</h2>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">New Password</label>
            <input
              type="password"
              value={passwords.newPass}
              onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Confirm New Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
              Update Password
            </button>
            {passMsg.text && (
              <span className={`text-sm font-medium ${passMsg.error ? "text-red-500" : "text-green-600"}`}>
                {passMsg.text}
              </span>
            )}
          </div>
        </form>
      )}

      {/* Site Content Customizer Tab */}
      {tab === "site-content" && (
        <div className="space-y-6">
          {settingsLoading && (
            <div className="p-12 text-center text-sm font-semibold text-slate-400 bg-white border rounded-2xl">
              Loading dynamic website configurations...
            </div>
          )}

          {!settingsLoading && (
            <>
              {/* General Site Branding */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
                <h2 className="text-sm font-black text-slate-800">1. Global Header, Footer & Contact Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Admission Toll Free No</label>
                    <input
                      type="text"
                      value={settings.general.tollFree}
                      onChange={(e) => setSettings({ ...settings, general: { ...settings.general, tollFree: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Admissions Contact Phone</label>
                    <input
                      type="text"
                      value={settings.general.contactPhone}
                      onChange={(e) => setSettings({ ...settings, general: { ...settings.general, contactPhone: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Admissions Email Address</label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => setSettings({ ...settings, general: { ...settings.general, contactEmail: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">HR Jobs Email</label>
                    <input
                      type="email"
                      value={settings.general.hrEmail}
                      onChange={(e) => setSettings({ ...settings, general: { ...settings.general, hrEmail: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Header Announcement Marquee Alert</label>
                  <textarea
                    rows={2}
                    value={settings.general.marqueeNews}
                    onChange={(e) => setSettings({ ...settings, general: { ...settings.general, marqueeNews: e.target.value } })}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                  />
                </div>
              </div>

              {/* Admission Steps */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-800">2. Admission Process Steps</h2>
                  <button
                    onClick={() => {
                      const nextNum = (settings.admissionProcess.steps.length + 1).toString().padStart(2, "0");
                      setSettings({
                        ...settings,
                        admissionProcess: {
                          ...settings.admissionProcess,
                          steps: [...settings.admissionProcess.steps, { number: nextNum, title: "New Step", text: "Description of the step." }]
                        }
                      });
                    }}
                    className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-all"
                  >
                    + Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {settings.admissionProcess.steps.map((st: any, idx: number) => (
                    <div key={idx} className="p-4 border bg-slate-50 border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Step {st.number}</span>
                        <button
                          onClick={() => {
                            setSettings({
                              ...settings,
                              admissionProcess: {
                                ...settings.admissionProcess,
                                steps: settings.admissionProcess.steps.filter((_: any, i: number) => i !== idx)
                              }
                            });
                          }}
                          className="text-[10px] text-rose-600 bg-white border border-rose-100 px-2 py-0.5 rounded hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="text"
                          placeholder="01"
                          value={st.number}
                          onChange={(e) => {
                            const newSteps = [...settings.admissionProcess.steps];
                            newSteps[idx].number = e.target.value;
                            setSettings({ ...settings, admissionProcess: { ...settings.admissionProcess, steps: newSteps } });
                          }}
                          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={st.title}
                          onChange={(e) => {
                            const newSteps = [...settings.admissionProcess.steps];
                            newSteps[idx].title = e.target.value;
                            setSettings({ ...settings, admissionProcess: { ...settings.admissionProcess, steps: newSteps } });
                          }}
                          className="col-span-3 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description of the step"
                        value={st.text}
                        onChange={(e) => {
                          const newSteps = [...settings.admissionProcess.steps];
                          newSteps[idx].text = e.target.value;
                          setSettings({ ...settings, admissionProcess: { ...settings.admissionProcess, steps: newSteps } });
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* why join reasons */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-800">3. Why Join SEG Key Highlights</h2>
                  <button
                    onClick={() => {
                      setSettings({
                        ...settings,
                        whyJoinSeg: {
                          ...settings.whyJoinSeg,
                          reasons: [...settings.whyJoinSeg.reasons, { id: "reason-" + Date.now(), title: "Title", icon: "graduation", text: "Highlight description..." }]
                        }
                      });
                    }}
                    className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-all"
                  >
                    + Add Highlight
                  </button>
                </div>
                <div className="space-y-3">
                  {settings.whyJoinSeg.reasons.map((re: any, idx: number) => (
                    <div key={re.id} className="p-4 border bg-slate-50 border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Highlight Card #{idx + 1}</span>
                        <button
                          onClick={() => {
                            setSettings({
                              ...settings,
                              whyJoinSeg: {
                                ...settings.whyJoinSeg,
                                reasons: settings.whyJoinSeg.reasons.filter((x: any) => x.id !== re.id)
                              }
                            });
                          }}
                          className="text-[10px] text-rose-600 bg-white border border-rose-100 px-2 py-0.5 rounded hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Title"
                          value={re.title}
                          onChange={(e) => {
                            const newReasons = [...settings.whyJoinSeg.reasons];
                            newReasons[idx].title = e.target.value;
                            setSettings({ ...settings, whyJoinSeg: { ...settings.whyJoinSeg, reasons: newReasons } });
                          }}
                          className="col-span-2 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                        />
                        <select
                          value={re.icon}
                          onChange={(e) => {
                            const newReasons = [...settings.whyJoinSeg.reasons];
                            newReasons[idx].icon = e.target.value;
                            setSettings({ ...settings, whyJoinSeg: { ...settings.whyJoinSeg, reasons: newReasons } });
                          }}
                          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                        >
                          {["graduation", "institution", "people", "briefcase", "globe", "alumni", "shield"].map(ic => <option key={ic} value={ic}>{ic}</option>)}
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Highlight details text..."
                        value={re.text}
                        onChange={(e) => {
                          const newReasons = [...settings.whyJoinSeg.reasons];
                          newReasons[idx].text = e.target.value;
                          setSettings({ ...settings, whyJoinSeg: { ...settings.whyJoinSeg, reasons: newReasons } });
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Careers Open Jobs */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-800">4. Careers Page Job Openings</h2>
                  <button
                    onClick={() => {
                      setSettings({
                        ...settings,
                        careers: {
                          ...settings.careers,
                          jobs: [
                            ...settings.careers.jobs,
                            {
                              id: Date.now(),
                              title: "Professor/Staff",
                              category: "teaching",
                              tag: "Teaching",
                              dept: "Department",
                              location: "Lucknow",
                              experience: "2-5 Years",
                              type: "Full Time",
                              posted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
                              color: "blue"
                            }
                          ]
                        }
                      });
                    }}
                    className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-all"
                  >
                    + Add New Job Opening
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {settings.careers.jobs.map((jb: any, idx: number) => (
                    <div key={jb.id} className="p-4 border bg-slate-50 border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Job #{idx + 1}</span>
                        <button
                          onClick={() => {
                            setSettings({
                              ...settings,
                              careers: {
                                ...settings.careers,
                                jobs: settings.careers.jobs.filter((x: any) => x.id !== jb.id)
                              }
                            });
                          }}
                          className="text-[10px] text-rose-600 bg-white border border-rose-100 px-2 py-0.5 rounded hover:bg-rose-50"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Job Title</label>
                          <input
                            type="text"
                            value={jb.title}
                            onChange={(e) => {
                              const newJobs = [...settings.careers.jobs];
                              newJobs[idx].title = e.target.value;
                              setSettings({ ...settings, careers: { ...settings.careers, jobs: newJobs } });
                            }}
                            className="w-full px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Department</label>
                          <input
                            type="text"
                            value={jb.dept}
                            onChange={(e) => {
                              const newJobs = [...settings.careers.jobs];
                              newJobs[idx].dept = e.target.value;
                              setSettings({ ...settings, careers: { ...settings.careers, jobs: newJobs } });
                            }}
                            className="w-full px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Category</label>
                          <select
                            value={jb.category}
                            onChange={(e) => {
                              const newJobs = [...settings.careers.jobs];
                              newJobs[idx].category = e.target.value;
                              setSettings({ ...settings, careers: { ...settings.careers, jobs: newJobs } });
                            }}
                            className="w-full px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                          >
                            <option value="teaching">Teaching</option>
                            <option value="administration">Administration</option>
                            <option value="technical">Technical</option>
                            <option value="support">Support Staff</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Accent Color</label>
                          <select
                            value={jb.color}
                            onChange={(e) => {
                              const newJobs = [...settings.careers.jobs];
                              newJobs[idx].color = e.target.value;
                              setSettings({ ...settings, careers: { ...settings.careers, jobs: newJobs } });
                            }}
                            className="w-full px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                          >
                            {["blue", "green", "violet", "orange"].map(col => <option key={col} value={col}>{col}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Experience</label>
                          <input
                            type="text"
                            value={jb.experience}
                            onChange={(e) => {
                              const newJobs = [...settings.careers.jobs];
                              newJobs[idx].experience = e.target.value;
                              setSettings({ ...settings, careers: { ...settings.careers, jobs: newJobs } });
                            }}
                            className="w-full px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Management Quota Guidelines */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-800">5. Management Quota Guidelines</h2>
                  <button
                    onClick={() => {
                      setSettings({
                        ...settings,
                        managementQuota: {
                          ...settings.managementQuota,
                          guidelines: [...settings.managementQuota.guidelines, "New Guideline Rule"]
                        }
                      });
                    }}
                    className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-all"
                  >
                    + Add Rule
                  </button>
                </div>
                <div className="space-y-2">
                  {settings.managementQuota.guidelines.map((gl: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={gl}
                        onChange={(e) => {
                          const newGL = [...settings.managementQuota.guidelines];
                          newGL[idx] = e.target.value;
                          setSettings({ ...settings, managementQuota: { ...settings.managementQuota, guidelines: newGL } });
                        }}
                        className="flex-1 px-3 py-2 text-xs border rounded-xl border-slate-200 outline-none"
                      />
                      <button
                        onClick={() => {
                          setSettings({
                            ...settings,
                            managementQuota: {
                              ...settings.managementQuota,
                              guidelines: settings.managementQuota.guidelines.filter((_: any, i: number) => i !== idx)
                            }
                          });
                        }}
                        className="text-xs text-rose-500 hover:text-rose-700 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
