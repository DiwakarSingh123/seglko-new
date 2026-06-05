// node scratch/reset-happenings.mjs
const BASE = "http://localhost:3000";

const res = await fetch(`${BASE}/api/happenings`);
const items = await res.json();

for (const item of items) {
  await fetch(`${BASE}/api/happenings?id=${item._id}`, { method: "DELETE" });
  console.log(`🗑 Deleted: ${item.title.slice(0, 60)}`);
}
console.log(`\nDeleted ${items.length} items.`);
