"use client";
import { useState, useEffect } from "react";

import GalleryTab from "../components/GalleryTab";

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface VisionMissionContent {
  sectionLabel: string;
  mainHeading: string;
  missionTitle: string;
  missionDescription: string;
  missionImage?: string;
  visionTitle: string;
  visionDescription: string;
  visionImage?: string;
}

interface JoinSectionContent {
  sectionLabel: string;
  heading: string;
  subheading: string;
  description: string;
}

interface JoinFeature {
  id: string;
  title: string;
  description: string;
}

export default function AboutPage() {
  const [tab, setTab] = useState<"history" | "vision" | "join" | "message" | "leadership" | "gallery" | "faculties">("history");
  const [faculties, setFaculties] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFaculties(data.faculties || []);
          setAwards(data.awards || []);
          setStories(data.stories || []);
        }
      });
  }, []);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", year: "1997", title: "Humble Beginnings", description: "The journey began in 1997 with the foundation of the Shivdan Singh Institute of Technology & Management (SSITM) in Algarh. Driven by a vision to provide quality technical education, this marked the inception of SEG's legacy." },
    { id: "2", year: "2001", title: "Expanding Horizons", description: "In 2001, SEG expanded its influence with the establishment of the Saroj Institute of Management (SIMS) in Lucknow. This milestone amplified SEG's impact, attracting students from various regions seeking quality education." },
    { id: "3", year: "2010", title: "Growth & Excellence", description: "Continued expansion and strengthening of academic programs, establishing SEG as a trusted name in technical and management education across Northern India." },
    { id: "4", year: "Present", title: "Leading Into Future", description: "Today, SEG stands as a premier institution with multiple campuses, diverse programs, and a strong commitment to academic excellence and student success." },
  ]);

  const [visionMission, setVisionMission] = useState<VisionMissionContent>({
    sectionLabel: "OUR MISSION & VISION",
    mainHeading: "Guided by Purpose, Driven by Impact",
    missionTitle: "Our Mission",
    missionDescription: "At Saroj Educational Group (SEG), our mission is to impart quality education that fosters innovation, critical thinking, and holistic development. We aim to nurture professionals who are not only industry-ready but also equipped to contribute responsibly to society. By integrating contemporary teaching methodologies with industry standards, we aspire to create leaders who excel in their fields.",
    missionImage: "",
    visionTitle: "Our Vision",
    visionDescription: "To be a globally recognized center of excellence in education, research and innovation, nurturing future leaders and professionals.",
    visionImage: "",
  });

  const [joinSection, setJoinSection] = useState<JoinSectionContent>({
    sectionLabel: "WHY CHOOSE SEG",
    heading: "Why Join Saroj Educational Group (SEG)?",
    subheading: "A Proven Path to Growth and Success",
    description: "SEG offers a unique combination of academic excellence, modern infrastructure, practical exposure, and a supportive campus environment designed to help students succeed in their careers and personal development.",
  });

  const [joinFeatures, setJoinFeatures] = useState<JoinFeature[]>([
    { id: "1", title: "Academic Excellence", description: "SEG prioritizes a robust academic foundation combined with practical application, guided by experienced faculty and current industry standards." },
    { id: "2", title: "State-of-the-Art Infrastructure", description: "Modern classrooms, advanced labs, and a digital library provide the ideal setting for innovation and growth." },
    { id: "3", title: "Holistic Development", description: "Extracurricular activities, clubs, and events help nurture leadership, teamwork and confidence." },
  ]);

  const [historyHeadline, setHistoryHeadline] = useState("The Legacy of Saroj Educational Group");
  const [historyDescription, setHistoryDescription] = useState("A journey marked by dedication, growth, and a commitment to educational excellence that has shaped thousands of lives and continues to lead the way for future leaders.");
  const [chairmanMessage, setChairmanMessage] = useState("Education lays the foundation for building a better tomorrow and shaping ground for future leaders. Since our inception, SEG has remained steadfast in its mission to impart quality education, develop practical skills, and instill a sense of responsibility in our students.\n\nEducation at SEG is not just about obtaining degrees; it is about shaping character, developing critical thinking, and preparing individuals for real-world challenges. Our dedicated faculty, state-of-the-art facilities, and industry-driven curriculum aim to provide a holistic learning experience that prepares students for a successful future.\n\nI firmly believe that education is the key to empowerment, and at SEG, we strive to ignite the spark of curiosity, creativity, and courage in every learner. I invite you to be a part of this remarkable journey of knowledge, growth, and transformation.");
  const [chairmanAuthor, setChairmanAuthor] = useState("Mr. Sunil Singh");
  const [chairmanDesignation, setChairmanDesignation] = useState("Chairman, Saroj Educational Group");
  const [chairmanImage, setChairmanImage] = useState<string>("");

  const [savedHistory, setSavedHistory] = useState({
    headline: historyHeadline,
    description: historyDescription,
    milestones,
  });
  const [savedVisionMission, setSavedVisionMission] = useState(visionMission);
  const [savedJoinSection, setSavedJoinSection] = useState(joinSection);
  const [savedJoinFeatures, setSavedJoinFeatures] = useState(joinFeatures);
  const [savedChairmanMessage, setSavedChairmanMessage] = useState(chairmanMessage);
  const [savedChairmanAuthor, setSavedChairmanAuthor] = useState(chairmanAuthor);
  const [savedChairmanDesignation, setSavedChairmanDesignation] = useState(chairmanDesignation);
  const [savedChairmanImage, setSavedChairmanImage] = useState(chairmanImage);
  const [previewSection, setPreviewSection] = useState<"history" | "vision" | "join" | "message" | "leadership" | "gallery" | "faculties" | null>(null);

  const updateVisionMission = (field: keyof VisionMissionContent, value: string) => {
    setVisionMission({ ...visionMission, [field]: value });
  };

  const updateJoinSection = (field: keyof JoinSectionContent, value: string) => {
    setJoinSection({ ...joinSection, [field]: value });
  };

  const saveAllSections = () => {
    setSavedHistory({
      headline: historyHeadline,
      description: historyDescription,
      milestones,
    });
    setSavedVisionMission(visionMission);
    setSavedJoinSection(joinSection);
    setSavedJoinFeatures(joinFeatures);
    setSavedChairmanMessage(chairmanMessage);
    setSavedChairmanAuthor(chairmanAuthor);
    setSavedChairmanDesignation(chairmanDesignation);
    setSavedChairmanImage(chairmanImage);

    // Save faculty API data
    fetch('/api/faculty', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faculties, awards, stories }),
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          alert('Changes saved successfully!');
        }
      })
      .catch(err => console.error(err));
  };


  const addJoinFeature = () => {
    const newId = (joinFeatures.length + 1).toString();
    setJoinFeatures([...joinFeatures, { id: newId, title: "", description: "" }]);
  };

  const updateJoinFeature = (id: string, field: keyof JoinFeature, value: string) => {
    setJoinFeatures(joinFeatures.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteJoinFeature = (id: string) => {
    setJoinFeatures(joinFeatures.filter((item) => item.id !== id));
  };

  const addMilestone = () => {
    const newId = (milestones.length + 1).toString();
    setMilestones([
      ...milestones,
      {
        id: newId,
        year: "",
        title: "",
        description: "",
        image: "",
      },
    ]);
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Why SEG / About SEG</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage about us content, vision, mission and leadership</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={saveAllSections} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700 shadow-indigo-200">
            <span className="text-lg material-symbols-outlined">save</span>Save Changes
          </button>
          <button onClick={() => setPreviewSection(tab)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors bg-white border border-indigo-200 shadow-sm rounded-xl hover:bg-indigo-50">
            <span className="text-lg material-symbols-outlined">visibility</span>View Saved
          </button>
        </div>
      </div>

      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit overflow-x-auto">
        {[
          { id: "history", label: "History of SEG", icon: "history" },
          { id: "vision", label: "Vision & Mission", icon: "flag" },
          { id: "join", label: "Why Join SEG", icon: "group" },
          { id: "message", label: "Chairman's Message", icon: "chat" },
          { id: "faculties", label: "Top Faculties (Learn from the Best)", icon: "school" },
          { id: "gallery", label: "Gallery", icon: "photo_library" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="text-lg material-symbols-outlined">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "history" && (
        <div className="space-y-5">
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-sm font-black text-slate-800">The Legacy of Saroj Educational Group</h2>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Main Headline</label>
              <input type="text" value={historyHeadline} onChange={(e) => setHistoryHeadline(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Description</label>
              <textarea rows={3} value={historyDescription} onChange={(e) => setHistoryDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none" />
            </div>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-black text-slate-800">Milestones</h2>
              <button onClick={addMilestone} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
                <span className="text-sm material-symbols-outlined">add</span>Add Milestone
              </button>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 border bg-slate-50 rounded-2xl border-slate-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 space-y-2">
                      <input 
                        type="text" 
                        value={milestone.year} 
                        onChange={(e) => updateMilestone(milestone.id, "year", e.target.value)}
                        className="w-16 px-3 py-2 text-sm font-bold text-indigo-600 transition-all bg-white border outline-none border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200" 
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" 
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                        placeholder="Milestone Title"
                        className="w-full px-3 py-2 text-sm font-bold transition-all bg-white border outline-none border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-200" 
                      />
                      <textarea 
                        rows={3} 
                        value={milestone.description}
                        onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                        placeholder="Milestone Description"
                        className="w-full px-3 py-2 text-sm transition-all bg-white border outline-none resize-none border-slate-200 rounded-xl text-slate-600 focus:ring-2 focus:ring-indigo-200" 
                      />
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">Image</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updateMilestone(milestone.id, "image", reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                        </div>
                        {milestone.image && (
                          <div className="relative mt-2">
                            <img src={milestone.image} alt="Milestone" className="object-cover w-full h-32 border rounded-xl border-slate-200" />
                            <button 
                              onClick={() => updateMilestone(milestone.id, "image", "")}
                              className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                            >
                              <span className="text-sm material-symbols-outlined">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteMilestone(milestone.id)}
                      className="flex items-center justify-center w-8 h-8 text-red-600 transition-colors bg-white border rounded-lg hover:bg-red-50 border-slate-200">
                      <span className="text-sm material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "vision" && (
        <div className="space-y-5">
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-sm font-black text-slate-800">Section Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Section Label</label>
                <input 
                  type="text" 
                  value={visionMission.sectionLabel}
                  onChange={(e) => updateVisionMission("sectionLabel", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Main Heading</label>
                <input 
                  type="text" 
                  value={visionMission.mainHeading}
                  onChange={(e) => updateVisionMission("mainHeading", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-sm font-black text-slate-800">Mission</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Mission Title</label>
                <input 
                  type="text" 
                  value={visionMission.missionTitle}
                  onChange={(e) => updateVisionMission("missionTitle", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Mission Description</label>
                <textarea 
                  rows={6}
                  value={visionMission.missionDescription}
                  onChange={(e) => updateVisionMission("missionDescription", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Mission Image</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateVisionMission("missionImage", reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                {visionMission.missionImage && (
                  <div className="relative mt-2">
                    <img src={visionMission.missionImage} alt="Mission" className="object-cover w-full h-40 border rounded-xl border-slate-200" />
                    <button 
                      onClick={() => updateVisionMission("missionImage", "")}
                      className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                    >
                      <span className="text-sm material-symbols-outlined">close</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-sm font-black text-slate-800">Vision</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Vision Title</label>
                <input 
                  type="text" 
                  value={visionMission.visionTitle}
                  onChange={(e) => updateVisionMission("visionTitle", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Vision Description</label>
                <textarea 
                  rows={6}
                  value={visionMission.visionDescription}
                  onChange={(e) => updateVisionMission("visionDescription", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Vision Image</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateVisionMission("visionImage", reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                {visionMission.visionImage && (
                  <div className="relative mt-2">
                    <img src={visionMission.visionImage} alt="Vision" className="object-cover w-full h-40 border rounded-xl border-slate-200" />
                    <button 
                      onClick={() => updateVisionMission("visionImage", "")}
                      className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                    >
                      <span className="text-sm material-symbols-outlined">close</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}


      {tab === "join" && (
        <div className="space-y-5">
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-sm font-black text-slate-800">Why Join SEG</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Section Label</label>
                <input
                  type="text"
                  value={joinSection.sectionLabel}
                  onChange={(e) => updateJoinSection("sectionLabel", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Heading</label>
                <input
                  type="text"
                  value={joinSection.heading}
                  onChange={(e) => updateJoinSection("heading", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Subheading</label>
                <input
                  type="text"
                  value={joinSection.subheading}
                  onChange={(e) => updateJoinSection("subheading", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Description</label>
                <textarea
                  rows={6}
                  value={joinSection.description}
                  onChange={(e) => updateJoinSection("description", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-black text-slate-800">Join Feature Cards</h2>
              <button
                onClick={addJoinFeature}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span className="text-sm material-symbols-outlined">add</span>Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {joinFeatures.map((feature) => (
                <div key={feature.id} className="p-4 border bg-slate-50 rounded-2xl border-slate-200">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-sm font-semibold text-slate-700">Feature {feature.id}</span>
                    <button
                      onClick={() => deleteJoinFeature(feature.id)}
                      className="px-2 py-1 text-xs text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Title</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateJoinFeature(feature.id, "title", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Description</label>
                      <textarea
                        rows={4}
                        value={feature.description}
                        onChange={(e) => updateJoinFeature(feature.id, "description", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "message" && (
        <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
          <h2 className="mb-4 text-sm font-black text-slate-800">Chairman's Message</h2>
          <div className="space-y-4">
            <textarea rows={6} value={chairmanMessage} onChange={(e) => setChairmanMessage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none" />
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Author</label>
              <input type="text" value={chairmanAuthor} onChange={(e) => setChairmanAuthor(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Designation</label>
              <input type="text" value={chairmanDesignation} onChange={(e) => setChairmanDesignation(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Chairman Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setChairmanImage(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              {chairmanImage && (
                <div className="relative mt-2">
                  <img src={chairmanImage} alt="Chairman" className="object-cover w-full h-40 border rounded-xl border-slate-200" />
                  <button
                    onClick={() => setChairmanImage("")}
                    className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                  >
                    <span className="text-sm material-symbols-outlined">close</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "leadership" && (
        <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-800">Leadership Team</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
              <span className="text-sm material-symbols-outlined">add</span>Add Member
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dr. S.K. Saroj", role: "Chairman", dept: "Management", color: "from-indigo-500 to-indigo-700" },
              { name: "Prof. R.K. Singh", role: "Director", dept: "SIET", color: "from-blue-500 to-blue-700" },
              { name: "Dr. A. Sharma", role: "Principal", dept: "SIMS", color: "from-purple-500 to-purple-700" },
            ].map((l) => (
              <div key={l.name} className="flex items-center gap-3 p-4 transition-colors border bg-slate-50 rounded-xl border-slate-100 group hover:border-indigo-200">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0`}>
                  {l.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate text-slate-800">{l.name}</div>
                  <div className="text-xs font-semibold text-indigo-600">{l.role}</div>
                  <div className="text-xs text-slate-400">{l.dept}</div>
                </div>
                <button className="flex items-center justify-center text-indigo-600 transition-colors bg-white border rounded-lg opacity-0 h-7 w-7 hover:bg-indigo-50 border-slate-200 group-hover:opacity-100">
                  <span className="text-sm material-symbols-outlined">edit</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "faculties" && (
        <div className="space-y-6">
          {/* Faculties Section */}
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-black text-slate-800">Top Distinguished Faculties</h2>
                <p className="text-xs text-slate-400 mt-0.5">Faculty members featured in the "Learn from the Best" section</p>
              </div>
              <button
                onClick={() => {
                  setFaculties([...faculties, { id: Date.now(), name: "New Professor", role: "Role/Title", school: "School Name", image: "facultyBg", tone: "cyan" }]);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span className="text-sm material-symbols-outlined">add</span>Add Faculty
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculties.map((f, index) => (
                <div key={f.id} className="p-4 border bg-slate-50 rounded-2xl border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Faculty #{index + 1}</span>
                    <button
                      onClick={() => setFaculties(faculties.filter(x => x.id !== f.id))}
                      className="text-xs text-rose-600 bg-white border border-rose-100 rounded-lg px-2.5 py-1 hover:bg-rose-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => {
                          setFaculties(faculties.map(x => x.id === f.id ? { ...x, name: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Role / Designation</label>
                      <input
                        type="text"
                        value={f.role}
                        onChange={(e) => {
                          setFaculties(faculties.map(x => x.id === f.id ? { ...x, role: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">School / Department</label>
                    <input
                      type="text"
                      value={f.school}
                      onChange={(e) => {
                        setFaculties(faculties.map(x => x.id === f.id ? { ...x, school: e.target.value } : x));
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Card Accent Tone</label>
                      <select
                        value={f.tone}
                        onChange={(e) => {
                          setFaculties(faculties.map(x => x.id === f.id ? { ...x, tone: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      >
                        {["cyan", "gold", "blue", "violet"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Image Key</label>
                      <select
                        value={f.image}
                        onChange={(e) => {
                          setFaculties(faculties.map(x => x.id === f.id ? { ...x, image: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      >
                        {["facultyBg", "aboutBg", "institutionsBg", "campusBg"].map(img => <option key={img} value={img}>{img}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-black text-slate-800">Awards & Achievements</h2>
                <p className="text-xs text-slate-400 mt-0.5">National recognitions and college certifications</p>
              </div>
              <button
                onClick={() => {
                  setAwards([...awards, { id: Date.now(), title: "Award Title", body: "Awarding Body", desc: "Award description here...", tone: "gold" }]);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span className="text-sm material-symbols-outlined">add</span>Add Award
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((aw, index) => (
                <div key={aw.id} className="p-4 border bg-slate-50 rounded-2xl border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Award #{index + 1}</span>
                    <button
                      onClick={() => setAwards(awards.filter(x => x.id !== aw.id))}
                      className="text-xs text-rose-600 bg-white border border-rose-100 rounded-lg px-2.5 py-1 hover:bg-rose-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={aw.title}
                        onChange={(e) => {
                          setAwards(awards.map(x => x.id === aw.id ? { ...x, title: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Awarded By</label>
                      <input
                        type="text"
                        value={aw.body}
                        onChange={(e) => {
                          setAwards(awards.map(x => x.id === aw.id ? { ...x, body: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={aw.desc}
                      onChange={(e) => {
                        setAwards(awards.map(x => x.id === aw.id ? { ...x, desc: e.target.value } : x));
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Card Accent Tone</label>
                    <select
                      value={aw.tone}
                      onChange={(e) => {
                        setAwards(awards.map(x => x.id === aw.id ? { ...x, tone: e.target.value } : x));
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                    >
                      {["cyan", "gold", "blue", "violet"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-black text-slate-800">Student Success Stories</h2>
                <p className="text-xs text-slate-400 mt-0.5">Alumni packages, companies, and batches</p>
              </div>
              <button
                onClick={() => {
                  setStories([...stories, { id: Date.now(), name: "Student Name", batch: "Batch Name", company: "Company Name", role: "Role", package: "Package LPA", image: "facultyBg", tone: "blue" }]);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                <span className="text-sm material-symbols-outlined">add</span>Add Story
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.map((s, index) => (
                <div key={s.id} className="p-4 border bg-slate-50 rounded-2xl border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Story #{index + 1}</span>
                    <button
                      onClick={() => setStories(stories.filter(x => x.id !== s.id))}
                      className="text-xs text-rose-600 bg-white border border-rose-100 rounded-lg px-2.5 py-1 hover:bg-rose-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={s.name}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, name: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Batch</label>
                      <input
                        type="text"
                        value={s.batch}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, batch: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Company</label>
                      <input
                        type="text"
                        value={s.company}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, company: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Package</label>
                      <input
                        type="text"
                        value={s.package}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, package: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Role / Designation</label>
                    <input
                      type="text"
                      value={s.role}
                      onChange={(e) => {
                        setStories(stories.map(x => x.id === s.id ? { ...x, role: e.target.value } : x));
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Card Accent Tone</label>
                      <select
                        value={s.tone}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, tone: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      >
                        {["cyan", "gold", "blue", "violet"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Image Key</label>
                      <select
                        value={s.image}
                        onChange={(e) => {
                          setStories(stories.map(x => x.id === s.id ? { ...x, image: e.target.value } : x));
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                      >
                        {["facultyBg", "aboutBg", "institutionsBg", "campusBg"].map(img => <option key={img} value={img}>{img}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "gallery" && <GalleryTab section="About SEG" categories={["History", "Campus", "Events", "Leadership", "General"]} />}

      {previewSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <div className="w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="flex items-start justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">Preview Saved Section</h3>
                <p className="text-sm text-slate-500">Viewing the saved content for the selected section.</p>
              </div>
              <button onClick={() => setPreviewSection(null)} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {previewSection === "history" && (
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-slate-900">{savedHistory.headline}</h4>
                  <p className="text-slate-600">{savedHistory.description}</p>
                  <div className="space-y-4">
                    {savedHistory.milestones.map((milestone) => (
                      <div key={milestone.id} className="p-4 border rounded-3xl border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">{milestone.year}</span>
                          <span className="text-sm font-semibold text-slate-700">{milestone.title}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewSection === "vision" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">{savedVisionMission.sectionLabel}</p>
                    <h4 className="mt-2 text-2xl font-black text-slate-900">{savedVisionMission.mainHeading}</h4>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="p-5 border rounded-3xl border-slate-200 bg-slate-50">
                      <h5 className="text-lg font-semibold text-slate-900">{savedVisionMission.missionTitle}</h5>
                      <p className="mt-3 text-sm text-slate-600">{savedVisionMission.missionDescription}</p>
                      {savedVisionMission.missionImage && <img src={savedVisionMission.missionImage} alt="Mission" className="object-cover w-full mt-4 rounded-3xl" />}
                    </div>
                    <div className="p-5 border rounded-3xl border-slate-200 bg-slate-50">
                      <h5 className="text-lg font-semibold text-slate-900">{savedVisionMission.visionTitle}</h5>
                      <p className="mt-3 text-sm text-slate-600">{savedVisionMission.visionDescription}</p>
                      {savedVisionMission.visionImage && <img src={savedVisionMission.visionImage} alt="Vision" className="object-cover w-full mt-4 rounded-3xl" />}
                    </div>
                  </div>
                </div>
              )}

              {previewSection === "join" && (
                <div className="space-y-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">{savedJoinSection.sectionLabel}</p>
                  <h4 className="text-2xl font-black text-slate-900">{savedJoinSection.heading}</h4>
                  <p className="text-slate-600">{savedJoinSection.subheading}</p>
                  <p className="text-slate-600">{savedJoinSection.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {savedJoinFeatures.map((feature) => (
                      <div key={feature.id} className="p-5 border rounded-3xl border-slate-200 bg-slate-50">
                        <h5 className="text-lg font-semibold text-slate-900">{feature.title}</h5>
                        <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewSection === "message" && (
                <div className="space-y-5">
                  <h4 className="text-2xl font-black text-slate-900">Chairman's Message</h4>
                  <p className="whitespace-pre-line text-slate-600">{savedChairmanMessage}</p>
                  <div className="p-5 space-y-1 border rounded-3xl border-slate-200 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">{savedChairmanAuthor}</p>
                    <p className="text-sm text-slate-500">{savedChairmanDesignation}</p>
                  </div>
                  {savedChairmanImage && <img src={savedChairmanImage} alt="Chairman" className="object-cover w-full rounded-3xl" />}
                </div>
              )}

              {previewSection === "leadership" && (
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-slate-900">Leadership Team</h4>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { name: "Dr. S.K. Saroj", role: "Chairman", dept: "Management" },
                      { name: "Prof. R.K. Singh", role: "Director", dept: "SIET" },
                      { name: "Dr. A. Sharma", role: "Principal", dept: "SIMS" },
                    ].map((l) => (
                      <div key={l.name} className="p-4 border rounded-3xl border-slate-200 bg-slate-50">
                        <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                        <p className="text-xs text-slate-500">{l.role}</p>
                        <p className="text-xs text-slate-400">{l.dept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
