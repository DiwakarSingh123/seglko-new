export const AUTH_STORAGE_KEY = "seg_admin_auth";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated(): void {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAuthentication(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
