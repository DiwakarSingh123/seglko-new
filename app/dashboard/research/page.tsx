"use client";
import { useState, useEffect } from "react";

type ArticleType = "International" | "National";
type Paper = { id: number; faculty: string; type: ArticleType; title: string; journal: string; year: string; dept: string };

type Project = { id: number; name: string; dept: string };

type Award = { id: number; faculty: string; projects: string[]; dept: string };

type Innovation = { id: number; title: string; faculty: string; dept: string };

const projectDepts = ["Electronics Department", "Electrical Department", "Mechanical Department"];

const initialProjects: Project[] = [
  { id: 1, name: "Automatic Street Lighting system using IoT", dept: "Electronics Department" },
  { id: 2, name: "Smart Building Project using PIR", dept: "Electronics Department" },
  { id: 3, name: "Smart Water Monitoring System using IoT", dept: "Electronics Department" },
  { id: 4, name: "IoT based Weather Monitoring", dept: "Electronics Department" },
  { id: 5, name: "Smart Irrigation System using IoT", dept: "Electronics Department" },
  { id: 6, name: "Health Monitoring Wearable Glove", dept: "Electronics Department" },
  { id: 7, name: "Animatronic Hand", dept: "Electronics Department" },
  { id: 8, name: "Home Automation System", dept: "Electronics Department" },
  { id: 9, name: "GPS & GSM based Tracker", dept: "Electronics Department" },
  { id: 10, name: "IoT using Raspberry Pi", dept: "Electronics Department" },
  { id: 11, name: "Automated Railway Crossing", dept: "Electronics Department" },
  { id: 12, name: "Access Control with RFID", dept: "Electronics Department" },
  { id: 13, name: "Biometric Authentication", dept: "Electronics Department" },
  { id: 14, name: "Persistence of Vision", dept: "Electronics Department" },
  { id: 15, name: "Robotic Arm", dept: "Electronics Department" },
  { id: 16, name: "Smart Lighting System", dept: "Electronics Department" },
  { id: 17, name: "Gesture Based Robotics", dept: "Electronics Department" },
  { id: 18, name: "Mobile Robotics", dept: "Electronics Department" },
  { id: 19, name: "Bluetooth Robotics", dept: "Electronics Department" },
  { id: 20, name: "Swarm Robotics", dept: "Electronics Department" },
  { id: 21, name: "Sensor Guided Robotics", dept: "Electronics Department" },
  { id: 22, name: "Voice Controlled Robot", dept: "Electronics Department" },
  { id: 23, name: "WiFi Controlled robot", dept: "Electronics Department" },
];

const departments = [
  "Computer Science and Engineering (CSE)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Pharmacy",
  "Biotechnology",
];

const initialPapers: Paper[] = [
  { id: 1, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Digital Signal Processors (DSP) for 3G Mobile Communication Systems", journal: "International Journal on Emerging Technologies", year: "2010", dept: "Computer Science and Engineering (CSE)" },
  { id: 2, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Survey Paper on Reversible CPU Based on Logic Gate Structure", journal: "International Journal of Innovative Research in Computer and Communication Engineering", year: "2016", dept: "Computer Science and Engineering (CSE)" },
  { id: 3, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "An Enhanced Clustering Based Technique for Congestion Control in VANET", journal: "International Journal of Innovative Research in Science, Engineering and Technology", year: "2016", dept: "Computer Science and Engineering (CSE)" },
  { id: 4, faculty: "Dr. Shivi Chaturvedi", type: "National", title: "Waste to Energy Conversion", journal: "National Journal of Engineering Science and Management", year: "2011", dept: "Computer Science and Engineering (CSE)" },
  { id: 5, faculty: "Dr. Shivi Chaturvedi", type: "National", title: "Use of Independent Component Analysis in Wireless Communication System", journal: "National Journal of Engineering Science and Management", year: "2011", dept: "Computer Science and Engineering (CSE)" },
  { id: 6, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Clinical Prediction on ML based Internet of Things for E-Health", journal: "International Journal of Data Informatics and Intelligent Computing (IJDIC)", year: "2023", dept: "Computer Science and Engineering (CSE)" },
  { id: 7, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Implementing and Analyzing Machine Learning Models for Early Diabetes Detection: A Methodological Approach using Survey-based Data", journal: "International Conference on Energy Systems, Drives and Automations", year: "2024", dept: "Computer Science and Engineering (CSE)" },
  { id: 8, faculty: "Mr. Deepanshu Kumar", type: "International", title: "E-VOTING WEBSITE", journal: "International Journal of Novel Research and Development", year: "2024", dept: "Computer Science and Engineering (CSE)" },
];

const initialAwards: Award[] = [
  { id: 1, faculty: "Prof. (Dr) S.N. Pandeya", projects: [], dept: "Computer Science and Engineering (CSE)" },
  { id: 2, faculty: "Dr. D.N. Mishra", projects: ["Community Based Distribution Project", "Update Primary Health Care services in Mohanlal Ganj Block", "Study of NRHM (National Rural Health Mission) Asha in Gosaipur Block"], dept: "Computer Science and Engineering (CSE)" },
  { id: 3, faculty: "Er. D. K. Singh", projects: [], dept: "Electrical Engineering (EE)" },
  { id: 4, faculty: "Dr. Pramod Kr. Pandey", projects: [], dept: "Mechanical Engineering (ME)" },
];

const initialInnovations: Innovation[] = [
  { id: 1, title: "Generation of Concrete Surfaces with GUI", faculty: "Dr. Suraj Singh", dept: "Mathematics" },
  { id: 2, title: "Graphs Theoretic Algorithms for Equations", faculty: "Dr. Suraj Singh", dept: "Mathematics" },
  { id: 3, title: "Energy Efficient Design of a Milk Processing Plant", faculty: "Dr. Dhruwala Thakuri", dept: "Mechanical" },
  { id: 4, title: "R & D impact Design concept of 3 - wheeler Vikram", faculty: "Dr. D. P. Tiwari", dept: "Mechanical" },
  { id: 5, title: "Fumarate Agorts Anti Technology", faculty: "Prof. (Dr) S.N. Pandeya", dept: "Pharmacy" },
  { id: 6, title: "Potential and HIV Agent Non rich", faculty: "Prof. (Dr) S.N. Pandeya", dept: "Pharmacy" },
  { id: 7, title: "Laser displacement transducer for accurate displacement measurements", faculty: "Prof. M.U. Khan", dept: "Electrical Engineering" },
];

const typeColors: Record<ArticleType, string> = {
  International: "bg-blue-100 text-blue-700",
  National: "bg-emerald-100 text-emerald-700",
};

export default function ResearchPage() {
  const [tab, setTab] = useState<"publications" | "session" | "awards" | "innovation">("publications");
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [selectedSessionDept, setSelectedSessionDept] = useState(projectDepts[0]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetch('/api/research')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPapers(data.papers || []);
          setProjects(data.projects || []);
          setAwards(data.awards || []);
          setInnovations(data.innovations || []);
        }
        setLoading(false);
      });
  }, []);

  const saveData = async (updatedData: any) => {
    try {
      await fetch('/api/research', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const [showAdd, setShowAdd] = useState(false);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [editingInnovation, setEditingInnovation] = useState<Innovation | null>(null);
  const [expandedAward, setExpandedAward] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Paper, "id">>({ faculty: "", type: "International", title: "", journal: "", year: "", dept: departments[0] });

  const filtered = papers.filter((p) => p.dept === selectedDept);
  const sessionProjects = projects.filter((p) => p.dept === selectedSessionDept);

  const handleAdd = () => {
    if (!form.faculty || !form.title) return;
    const newList = [...papers, { id: Date.now(), ...form }];
    setPapers(newList);
    saveData({ papers: newList, projects, awards, innovations });
    setForm({ faculty: "", type: "International", title: "", journal: "", year: "", dept: departments[0] });
    setShowAdd(false);
  };

  const handleEditSave = () => {
    if (!editingPaper) return;
    const newList = papers.map((p) => p.id === editingPaper.id ? editingPaper : p);
    setPapers(newList);
    saveData({ papers: newList, projects, awards, innovations });
    setEditingPaper(null);
  };

  const handlePaperDelete = (id: number) => {
    const newList = papers.filter((p) => p.id !== id);
    setPapers(newList);
    saveData({ papers: newList, projects, awards, innovations });
  };

  const handleProjectSave = () => {
    if (!editingProject) return;
    const newList = projects.map((project) => project.id === editingProject.id ? editingProject : project);
    setProjects(newList);
    saveData({ papers, projects: newList, awards, innovations });
    setEditingProject(null);
  };

  const handleProjectDelete = (id: number) => {
    const newList = projects.filter((p) => p.id !== id);
    setProjects(newList);
    saveData({ papers, projects: newList, awards, innovations });
  };

  const handleAwardSave = () => {
    if (!editingAward) return;
    const newList = awards.map((award) => award.id === editingAward.id ? editingAward : award);
    setAwards(newList);
    saveData({ papers, projects, awards: newList, innovations });
    setEditingAward(null);
  };

  const handleAwardDelete = (id: number) => {
    const newList = awards.filter((a) => a.id !== id);
    setAwards(newList);
    saveData({ papers, projects, awards: newList, innovations });
  };

  const handleInnovationSave = () => {
    if (!editingInnovation) return;
    const newList = innovations.map((innovation) => innovation.id === editingInnovation.id ? editingInnovation : innovation);
    setInnovations(newList);
    saveData({ papers, projects, awards, innovations: newList });
    setEditingInnovation(null);
  };

  const handleInnovationDelete = (id: number) => {
    const newList = innovations.filter((i) => i.id !== id);
    setInnovations(newList);
    saveData({ papers, projects, awards, innovations: newList });
  };

  return (
    <div className="space-y-5">
      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Add Research Paper</h2>
              <button onClick={() => setShowAdd(false)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department</label>
              <select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <input value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })} placeholder="Faculty Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Article Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ArticleType })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option>International</option>
                <option>National</option>
              </select>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article Title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <input value={form.journal} onChange={(e) => setForm({ ...form, journal: e.target.value })} placeholder="Journal / Conference" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="Year" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Research Paper</h2>
              <button onClick={() => setEditingPaper(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department</label>
              <select value={editingPaper.dept} onChange={(e) => setEditingPaper({ ...editingPaper, dept: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <input value={editingPaper.faculty} onChange={(e) => setEditingPaper({ ...editingPaper, faculty: e.target.value })} placeholder="Faculty Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Article Type</label>
              <select value={editingPaper.type} onChange={(e) => setEditingPaper({ ...editingPaper, type: e.target.value as ArticleType })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                <option>International</option>
                <option>National</option>
              </select>
            </div>
            <input value={editingPaper.title} onChange={(e) => setEditingPaper({ ...editingPaper, title: e.target.value })} placeholder="Article Title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <input value={editingPaper.journal} onChange={(e) => setEditingPaper({ ...editingPaper, journal: e.target.value })} placeholder="Journal / Conference" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <input value={editingPaper.year} onChange={(e) => setEditingPaper({ ...editingPaper, year: e.target.value })} placeholder="Year" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingPaper(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleEditSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Session Project</h2>
              <button onClick={() => setEditingProject(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department</label>
              <select value={editingProject.dept} onChange={(e) => setEditingProject({ ...editingProject, dept: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {projectDepts.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <input value={editingProject.name} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} placeholder="Project Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingProject(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleProjectSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Research & Development</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage research publications by department</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Paper
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Papers", value: papers.length, icon: "article", color: "bg-indigo-500" },
          { label: "International", value: papers.filter(p => p.type === "International").length, icon: "public", color: "bg-blue-500" },
          { label: "National", value: papers.filter(p => p.type === "National").length, icon: "flag", color: "bg-emerald-500" },
          { label: "Departments", value: departments.length, icon: "account_balance", color: "bg-purple-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { id: "publications", label: "Research Publications", icon: "menu_book" },
          { id: "session", label: "Research", icon: "event" },
          { id: "awards", label: "Award-Winning", icon: "emoji_events" },
          { id: "innovation", label: "Innovation & Technology", icon: "lightbulb" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {editingAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Award-Winning Faculty</h2>
              <button onClick={() => setEditingAward(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <input value={editingAward.faculty} onChange={(e) => setEditingAward({ ...editingAward, faculty: e.target.value })} placeholder="Faculty Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department</label>
              <select value={editingAward.dept} onChange={(e) => setEditingAward({ ...editingAward, dept: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingAward(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleAwardSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {editingInnovation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Innovation</h2>
              <button onClick={() => setEditingInnovation(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <input value={editingInnovation.title} onChange={(e) => setEditingInnovation({ ...editingInnovation, title: e.target.value })} placeholder="Technology Title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <input value={editingInnovation.faculty} onChange={(e) => setEditingInnovation({ ...editingInnovation, faculty: e.target.value })} placeholder="Faculty Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Department</label>
              <select value={editingInnovation.dept} onChange={(e) => setEditingInnovation({ ...editingInnovation, dept: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingInnovation(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleInnovationSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {tab === "innovation" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 space-y-4 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-800">Innovation & Technology Transfer</h2>
            <p className="text-sm text-slate-600">Technology plays a transformative role in shaping economies, enhancing global connectivity, and improving quality of life. However, it also presents challenges such as environmental impact, resource depletion, and ethical considerations, particularly in areas like efficiency and biometrics.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Driving Innovation", desc: "Creating impact through ideas", icon: "lightbulb" },
                { label: "Research Excellence", desc: "Pushing boundaries of knowledge", icon: "science" },
                { label: "Tech for Society", desc: "Solving real-world challenges", icon: "public" },
                { label: "Global Impact", desc: "Building a better tomorrow", icon: "language" },
              ].map((feature) => (
                <div key={feature.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
                    <span className="material-symbols-outlined text-lg">{feature.icon}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{feature.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600">
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Sr. No</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Technology Transfer Details</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Faculty Name</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Department</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white"></th>
                </tr>
              </thead>
              <tbody>
                {innovations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">No innovations added yet.</td>
                  </tr>
                ) : (
                  innovations.map((innovation, idx) => (
                    <tr key={innovation.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{idx + 1}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-700 max-w-xs">{innovation.title}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-indigo-600 text-sm">person</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{innovation.faculty}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-600">{innovation.dept}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5">
                          <button onClick={() => setEditingInnovation(innovation)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleInnovationDelete(innovation.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "awards" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-black text-slate-800">Award-Winning Projects</h2>
            <p className="text-sm text-slate-600">At Saroj Educational Group (SEG), our researchers have successfully undertaken numerous prestigious projects.</p>
            <div className="space-y-3">
              {awards.map((award) => (
                <div key={award.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div 
                      onClick={() => setExpandedAward(expandedAward === award.id ? null : award.id)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <span className="material-symbols-outlined text-indigo-600 text-xl">person</span>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-slate-800">{award.faculty}</div>
                        <div className="text-xs text-slate-500">{award.dept}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined transition-transform ${expandedAward === award.id ? "rotate-180" : ""}`}>expand_more</span>
                      <button
                        onClick={() => setEditingAward(award)}
                        className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors grid place-items-center"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => handleAwardDelete(award.id)}
                        className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors grid place-items-center"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  {expandedAward === award.id && award.projects.length > 0 && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-2">
                      <p className="text-xs font-bold text-slate-600 mb-2">Projects under investigation:</p>
                      {award.projects.map((project, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-indigo-600 text-sm flex-shrink-0 mt-0.5">radio_button_checked</span>
                          <span className="text-sm text-slate-700">{project}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Research Projects", value: "150+", icon: "science" },
              { label: "Expert Researchers", value: "30+", icon: "school" },
              { label: "Awards Won", value: "15+", icon: "emoji_events" },
              { label: "Collaborations", value: "25+", icon: "public" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
                  <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                </div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "session" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex flex-wrap gap-2">
              {projectDepts.map((d) => (
                <button key={d} onClick={() => setSelectedSessionDept(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedSessionDept === d ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessionProjects.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-400">No projects found for this department.</div>
            ) : (
              sessionProjects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 text-indigo-600 grid place-items-center">
                      <span className="material-symbols-outlined text-xl">science</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-900">{project.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{project.dept}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProject(project)} className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors grid place-items-center">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => handleProjectDelete(project.id)} className="h-9 w-9 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors grid place-items-center">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Research Projects", value: "150+", icon: "science" },
              { label: "Student Researchers", value: "300+", icon: "school" },
              { label: "Faculty Involved", value: "50+", icon: "supervisor_account" },
              { label: "Awards & Recognition", value: "25+", icon: "emoji_events" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "publications" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Department Tabs */}
          <div className="p-4 border-b border-slate-100 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {departments.map((d) => (
                <button key={d} onClick={() => setSelectedDept(d)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedDept === d ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {d} ({papers.filter(p => p.dept === d).length})
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600">
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Faculty Name</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Article Type</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Article Title</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Journal / Conference</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white">Year</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-white"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">No papers in this department. Click "Add Paper" to add.</td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-indigo-600 text-sm">person</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{p.faculty}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${typeColors[p.type]}`}>{p.type}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-700 max-w-xs">{p.title}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 max-w-xs">{p.journal}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">{p.year}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5">
                          <button onClick={() => setEditingPaper(p)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handlePaperDelete(p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">{filtered.length} paper{filtered.length !== 1 ? "s" : ""} in {selectedDept}</span>
          </div>
        </div>
      )}
    </div>
  );
}
