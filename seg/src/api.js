const base = import.meta.env.VITE_API_BASE || 'https://seglko-backend.vercel.app';
export const api = (path) => `${base}${path}`;
