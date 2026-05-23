export type AdminProfile = {
  name: string;
  email: string;
  phone: string;
  role: string;
};

export const ADMIN_PROFILE_KEY = "seg_admin_profile";

export const defaultAdminProfile: AdminProfile = {
  name: "Admin User",
  email: "admin@seglko.org",
  phone: "",
  role: "Super Admin",
};

export function getAdminProfile(): AdminProfile {
  if (typeof window === "undefined") return defaultAdminProfile;
  try {
    const saved = localStorage.getItem(ADMIN_PROFILE_KEY);
    if (!saved) return defaultAdminProfile;
    return { ...defaultAdminProfile, ...JSON.parse(saved) };
  } catch {
    return defaultAdminProfile;
  }
}

export function saveAdminProfile(profile: Partial<AdminProfile>): AdminProfile {
  const updated = { ...getAdminProfile(), ...profile };
  localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updated));
  return updated;
}

export function getAdminInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AA";
}
