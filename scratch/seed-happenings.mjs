// Run with: node scratch/seed-happenings.mjs
// Make sure the Next.js server is running on http://localhost:3000

const BASE = "http://localhost:3000";

const whatsHappening = [
  {
    title: "Enhancing Research Practices: SSHSS Hosts FDP on Data Analysis and AI-Driven Insights",
    type: "whats_happening",
    category: "Engineering",
    date: "2026-04-17",
    description: "A Faculty Development Program was organized by SSHSS focusing on modern data analysis techniques and AI-driven insights to enhance research quality.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    url: "#",
  },
  {
    title: "Jashn-e-Riwayat: A Heartfelt Farewell Celebration Honoring Tradition and Legacy",
    type: "whats_happening",
    category: "Engineering",
    date: "2026-04-17",
    description: "Students and faculty gathered for a cultural farewell event celebrating the rich traditions and legacy of the institution.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    url: "#",
  },
  {
    title: "INNOVATE BHARAT 2026: National Hackathon for Real-World Innovation",
    type: "whats_happening",
    category: "Engineering",
    date: "2026-04-10",
    description: "Teams from across India competed in a 36-hour hackathon aimed at solving real-world problems with innovative technology solutions.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    url: "#",
  },
  {
    title: "Belliatus Cultura 2026 — 9th Northeast Cultural Fest",
    type: "whats_happening",
    category: "Engineering",
    date: "2026-03-18",
    description: "The annual cultural fest brought together students for performances, competitions, and celebrations of art, music, and dance.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    url: "#",
  },
  {
    title: "Annual Sports Meet 2026 — Celebrating Excellence in Athletics",
    type: "whats_happening",
    category: "Engineering",
    date: "2026-03-05",
    description: "Students showcased their athletic talents across various sports including cricket, football, badminton, and track events.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    url: "#",
  },
  {
    title: "Pharmacy Week 2026: Industry Experts Panel Discussion",
    type: "whats_happening",
    category: "Pharmacy",
    date: "2026-04-08",
    description: "Industry professionals shared insights on latest pharma trends and career opportunities with B.Pharm and M.Pharm students.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    url: "#",
  },
  {
    title: "Moot Court Competition — Saroj College of Law",
    type: "whats_happening",
    category: "Law",
    date: "2026-03-22",
    description: "Law students participated in a regional moot court competition, honing their argumentation and legal research skills.",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80",
    url: "#",
  },
  {
    title: "Polytechnic Workshop: Advanced CNC Machining Techniques",
    type: "whats_happening",
    category: "Polytechnic",
    date: "2026-04-05",
    description: "A hands-on workshop was conducted for polytechnic students on advanced CNC programming and machining operations.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    url: "#",
  },
];

const announcements = [
  {
    title: "Notification no. 24 — Regulations for the Award of the Chancellor's Gold Medal",
    type: "announcement",
    category: "General",
    date: "2026-05-04",
    description: "Detailed regulations governing the eligibility criteria, nomination process, and award of the prestigious Chancellor's Gold Medal to deserving students.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    url: "#",
  },
  {
    title: "OFFICE ORDER No. 29 — Appointment of Head of Department of Biotechnology, SSBT",
    type: "announcement",
    category: "General",
    date: "2026-05-04",
    description: "Dr. Rajendra Prasad Sharma has been appointed as the new Head of Department for Biotechnology at SSBT effective from 1st May 2026.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    url: "#",
  },
  {
    title: "Appointment of Chief Vigilance Officer (CVO) — Prof. (Dr.) Shajee Mohan, SSCSE",
    type: "announcement",
    category: "General",
    date: "2026-05-02",
    description: "Prof. (Dr.) Shajee Mohan has been appointed as the Chief Vigilance Officer (CVO) at Saroj College of Science and Engineering.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    url: "#",
  },
  {
    title: "End Semester Examination Schedule — Even Semester 2026",
    type: "announcement",
    category: "General",
    date: "2026-04-28",
    description: "The end semester examination schedule for all programmes (Even Semester 2025-26) has been released. Students are advised to check their respective timetables.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    url: "#",
  },
  {
    title: "Scholarship Application Window Open — Merit-Cum-Means 2026-27",
    type: "announcement",
    category: "General",
    date: "2026-04-20",
    description: "Applications are invited from eligible students for Merit-Cum-Means scholarships for the academic year 2026-27. Last date to apply is 31st May 2026.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    url: "#",
  },
  {
    title: "Hostel Allotment Notice — First Year Students Batch 2026",
    type: "announcement",
    category: "General",
    date: "2026-04-15",
    description: "Hostel room allotments for first-year students joining in July 2026 are now open. Students must register through the student portal.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    url: "#",
  },
];

const allItems = [...whatsHappening, ...announcements];

let success = 0;
let failed = 0;

for (const item of allItems) {
  try {
    const res = await fetch(`${BASE}/api/happenings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) {
      success++;
      console.log(`✅ Added: ${item.title.slice(0, 60)}`);
    } else {
      failed++;
      const err = await res.text();
      console.log(`❌ Failed: ${item.title.slice(0, 60)} — ${err}`);
    }
  } catch (e) {
    failed++;
    console.log(`❌ Error: ${item.title.slice(0, 60)} — ${e.message}`);
  }
}

console.log(`\nDone. ${success} added, ${failed} failed.`);
