import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import facultyBg from '../assets/images/seg.jpeg';
import aboutBg from '../assets/images/about-bg.png';
import institutionsBg from '../assets/images/seg.jpeg';
import campusBg from '../assets/images/seg.jpeg';
import './FacultyNewPage.css';

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const defaultFeaturedFaculty = [
  { id: 1, name: 'Dr. Rajeev Kumar', role: 'Professor & Dean (Academics)', dept: 'Mechanical Engineering', edu: 'PhD, IIT Kanpur', exp: '22+ Years', tags: ['Thermal Engineering', 'Energy Systems'], image: facultyBg },
  { id: 2, name: 'Dr. Neha Sharma', role: 'Associate Professor', dept: 'Computer Science Engineering', edu: 'PhD, IIIT Hyderabad', exp: '12+ Years', tags: ['AI & Machine Learning', 'Data Science'], image: aboutBg },
  { id: 3, name: 'Dr. Amit Verma', role: 'Professor', dept: 'Electrical Engineering', edu: 'PhD, NIT Allahabad', exp: '18+ Years', tags: ['Power Systems', 'Smart Grids'], image: institutionsBg },
  { id: 4, name: 'Dr. Pooja Singh', role: 'Associate Professor', dept: 'Pharmacy', edu: 'PhD, BITS Pilani', exp: '10+ Years', tags: ['Pharmacology', 'Drug Delivery'], image: campusBg },
  { id: 5, name: 'Dr. Vikram Seth', role: 'Professor', dept: 'Management Studies', edu: 'PhD, FMS Delhi', exp: '25+ Years', tags: ['Strategic Management', 'Leadership'], image: aboutBg },
];

export default function FacultyNewPage() {
  const navigate = useNavigate();
  const [featuredFaculty, setFeaturedFaculty] = useState(defaultFeaturedFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedExperience, setSelectedExperience] = useState('All Experience');
  const [selectedResearchArea, setSelectedResearchArea] = useState('All Research Areas');
  const [viewMode, setViewMode] = useState('grid');

  const imageFallbacks = {
    facultyBg,
    aboutBg,
    institutionsBg,
    campusBg,
  };

  const normalizeFacultyData = (faculty, index) => ({
    id: faculty.id?.toString() || `${index}`,
    name: faculty.name || `Faculty ${index + 1}`,
    role: faculty.role || 'Faculty Member',
    dept: faculty.school || faculty.dept || 'SEG',
    edu: faculty.edu || '',
    exp: faculty.exp || '',
    tags: Array.isArray(faculty.tags) ? faculty.tags : [],
    image: imageFallbacks[faculty.image] || faculty.image || facultyBg,
  });

  useEffect(() => {
    const fetchFeaturedFaculty = async () => {
      try {
        const res = await fetch(api('/api/faculty'));
        if (!res.ok) throw new Error('Failed to fetch faculty data');
        const data = await res.json();
        if (Array.isArray(data.faculties) && data.faculties.length > 0) {
          setFeaturedFaculty(data.faculties.map(normalizeFacultyData));
        }
      } catch (error) {
        console.error('Unable to load featured faculty:', error);
      }
    };

    fetchFeaturedFaculty();
  }, []);

  const departments = Array.from(new Set(featuredFaculty.map((f) => f.dept).filter(Boolean))).sort();
  const designations = Array.from(new Set(featuredFaculty.map((f) => f.role).filter(Boolean))).sort();
  const experiences = Array.from(new Set(featuredFaculty.map((f) => f.exp).filter(Boolean))).sort();
  const researchAreas = Array.from(new Set(featuredFaculty.flatMap((f) => f.tags || []).filter(Boolean))).sort();

  const stats = {
    total: featuredFaculty.length,
    phd: featuredFaculty.filter((f) => f.edu?.toLowerCase().includes('phd')).length,
    depts: Array.from(new Set(featuredFaculty.map((f) => f.dept).filter(Boolean))).length,
    industry: featuredFaculty.filter((f) =>
      f.role?.toLowerCase().includes('industry') ||
      f.tags?.some((t) => t.toLowerCase().includes('industry'))
    ).length,
  };

  const filteredFaculty = featuredFaculty.filter((faculty) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      const haystack = [
        faculty.name,
        faculty.role,
        faculty.dept,
        faculty.school,
        faculty.edu,
        faculty.exp,
        faculty.tags?.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    if (selectedDepartment !== 'All Departments' && faculty.dept !== selectedDepartment) {
      return false;
    }

    if (selectedDesignation !== 'All Designations' && faculty.role !== selectedDesignation) {
      return false;
    }

    if (selectedExperience !== 'All Experience' && faculty.exp !== selectedExperience) {
      return false;
    }

    if (
      selectedResearchArea !== 'All Research Areas' &&
      !faculty.tags?.some((tag) => tag.toLowerCase() === selectedResearchArea.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const visibleFaculty = filteredFaculty.slice(0, 8);

  return (
    <div style={{ background: '#fcfdfe', minHeight: '100vh' }}>
      {/* ── Hero Section ── */}
      <section className="fnp-hero">
        <div className="fnp-hero__content">

          <span className="fnp-hero__tag">Faculty Directory</span>
          <h1 className="fnp-hero__title">
            Meet Our<br />
            <span style={{ color: '#2563eb' }}>Expert Faculty</span>
          </h1>
          <p className="fnp-hero__desc">
            Learn from experienced academicians, researchers, and industry professionals dedicated to shaping future leaders.
          </p>
        </div>

        <div className="fnp-hero__visual">
          <div className="fnp-hero__bg-shape" />
          <div className="fnp-hero__dots fnp-hero__dots--top" />
          <div className="fnp-hero__dots fnp-hero__dots--bottom" />
          <div className="fnp-hero__img-main">
            <img src={facultyBg} alt="Faculty member" />
          </div>
          <div className="fnp-hero__img-sub1">
            <img src={institutionsBg} alt="Research" />
          </div>
          <div className="fnp-hero__img-sub2">
            <img src={campusBg} alt="Students" />
          </div>
          <div className="fnp-hero__swirl">
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none"><path d="M5 20C5 20 15 5 25 5C35 5 45 35 55 35C65 35 75 20 75 20" stroke="#ffbe23" strokeWidth="4" strokeLinecap="round" /></svg>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="fnp-stats">
        <div className="fnp-stat-card">
          <div className="fnp-stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div>
            <div className="fnp-stat-card__val">{stats.total}+</div>
            <div className="fnp-stat-card__label">Faculty Members</div>
          </div>
        </div>
        <div className="fnp-stat-card">
          <div className="fnp-stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
          </div>
          <div>
            <div className="fnp-stat-card__val">{stats.phd}+</div>
            <div className="fnp-stat-card__label">PhD Holders</div>
          </div>
        </div>
        <div className="fnp-stat-card">
          <div className="fnp-stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
          </div>
          <div>
            <div className="fnp-stat-card__val">{stats.depts}+</div>
            <div className="fnp-stat-card__label">Departments</div>
          </div>
        </div>
        <div className="fnp-stat-card">
          <div className="fnp-stat-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
          </div>
          <div>
            <div className="fnp-stat-card__val">{stats.industry}+</div>
            <div className="fnp-stat-card__label">Industry Experts</div>
          </div>
        </div>
      </div>

      {/* ── Filters Section ── */}
      <div className="fnp-filters">
        <div className="fnp-filters__grid">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search faculty by name, specialization..."
              className="fnp-filter__input"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ position: 'absolute', right: '16px', top: '14px' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="fnp-filter__select">
            <option>All Departments</option>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
          <select value={selectedDesignation} onChange={(e) => setSelectedDesignation(e.target.value)} className="fnp-filter__select">
            <option>All Designations</option>
            {designations.map((designation) => (
              <option key={designation}>{designation}</option>
            ))}
          </select>
          <select value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)} className="fnp-filter__select">
            <option>All Experience</option>
            {experiences.map((experience) => (
              <option key={experience}>{experience}</option>
            ))}
          </select>
          <select value={selectedResearchArea} onChange={(e) => setSelectedResearchArea(e.target.value)} className="fnp-filter__select">
            <option>All Research Areas</option>
            {researchAreas.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="fnp-filters__footer">
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('All Departments');
              setSelectedDesignation('All Designations');
              setSelectedExperience('All Experience');
              setSelectedResearchArea('All Research Areas');
            }}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
            Clear Filters
          </button>
          
        </div>
      </div>

      {/* ── Featured Faculty ── */}
      <section className="fnp-section">
        <div className="fnp-section__header">
          <h2 className="fnp-section__title">Featured Faculty</h2>
         
        </div>
        <div className={`fnp-grid${viewMode === 'list' ? ' fnp-grid--list' : ''}`}>
          {visibleFaculty.length > 0 ? visibleFaculty.map((f) => (
            <article className="fnp-card" key={f.id}>
              <div className="fnp-card__img-wrap">
                <img src={f.image} alt={f.name} />
                <div className="fnp-card__socials">
                  <span className="fnp-card__social-btn"><LinkedInIcon /></span>
                  <span className="fnp-card__social-btn"><MailIcon /></span>
                </div>
              </div>
              <div className="fnp-card__body">
                <h3 className="fnp-card__name">{f.name}</h3>
                <div className="fnp-card__role">{f.role}</div>
                <div className="fnp-card__dept">{f.dept}</div>
                <div className="fnp-card__edu">
                  <span>P</span> {f.edu} &nbsp; • &nbsp; {f.exp}
                </div>
                <div className="fnp-card__tags">
                  {f.tags.map((t) => <span className="fnp-card__tag" key={t}>{t}</span>)}
                </div>
                <button className="fnp-card__btn" onClick={() => navigate(`/faculty/${f.id}`)}>View Profile <ArrowRight /></button>
              </div>
            </article>
          )) : (
            <div className="fnp-no-results" style={{ gridColumn: '1 / -1', padding: '36px 24px', borderRadius: '20px', background: '#f8fafc', color: '#475569' }}>
              No faculty match your current filters.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
