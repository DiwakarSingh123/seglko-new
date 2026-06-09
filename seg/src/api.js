const base = import.meta.env.VITE_API_BASE || 'https://seglko-new-ilmq.vercel.app';
export const api = (path) => `${base}${path}`;
