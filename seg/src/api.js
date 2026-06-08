const base = import.meta.env.VITE_API_BASE || '';
export const api = (path) => `${base}${path}`;
