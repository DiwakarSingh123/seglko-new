"use client";
import { useState, useEffect } from "react";
import { getAdminProfile, saveAdminProfile } from "@/lib/admin-profile";

export default function SettingsPage() {
  const [tab, setTab] = useState<"profile" | "password">("profile");

  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@seglko.org", phone: "" });
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    const saved = getAdminProfile();
    setProfile({ name: saved.name, email: saved.email, phone: saved.phone });
  }, []);

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passMsg, setPassMsg] = useState({ text: "", error: false });
  const [passLoading, setPassLoading] = useState(false);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    saveAdminProfile(profile);
    window.dispatchEvent(new Event("admin-profile-updated"));
    setProfileMsg("Profile updated successfully!");
    setTimeout(() => setProfileMsg(""), 3000);
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!passwords.current) {
      setPassMsg({ text: "Please enter your current password.", error: true });
      return;
    }
    if (passwords.newPass.length < 6) {
      setPassMsg({ text: "New password must be at least 6 characters.", error: true });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassMsg({ text: "New passwords do not match.", error: true });
      return;
    }

    setPassLoading(true);
    setPassMsg({ text: "", error: false });

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.newPass,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setPassMsg({ text: data.error || "Failed to change password.", error: true });
        setPassLoading(false);
        return;
      }

      setPasswords({ current: "", newPass: "", confirm: "" });
      setPassMsg({ text: "Password changed successfully! Use the new password on next login.", error: false });
      setTimeout(() => setPassMsg({ text: "", error: false }), 4000);
    } catch {
      setPassMsg({ text: "Failed to change password. Please try again.", error: true });
    }
    setPassLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-800">Settings</h1>
        <p className="text-sm text-slate-400">Manage your account information and password.</p>
      </div>

      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(["profile", "password"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "profile" ? "Profile" : "Change Password"}
          </button>
        ))}
      </div>

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
            <button
              type="submit"
              disabled={passLoading}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
            >
              {passLoading ? "Updating..." : "Update Password"}
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
