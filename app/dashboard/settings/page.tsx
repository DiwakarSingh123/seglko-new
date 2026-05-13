"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [tab, setTab] = useState<"profile" | "password">("profile");

  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@seglko.org", phone: "" });
  const [profileMsg, setProfileMsg] = useState("");

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passMsg, setPassMsg] = useState({ text: "", error: false });

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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-800">Settings</h1>
        <p className="text-sm text-slate-400">Manage your account profile and password.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(["profile", "password"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "profile" ? "Profile" : "Change Password"}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === "profile" && (
        <form onSubmit={saveProfile} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
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
        <form onSubmit={changePassword} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-4">
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
    </div>
  );
}
