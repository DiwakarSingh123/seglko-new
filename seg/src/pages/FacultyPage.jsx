import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import segImg from '../assets/images/seg.jpeg';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const stats = [
  { value: '25K+', label: 'Students', color: '#1f63db' },
  { value: '100+', label: 'Recruiters', color: '#ff8b1a' },
  { value: '20+', label: 'Years of Excellence', color: '#6cbf46' },
  { value: 'Industry Ready', label: 'Curriculum', color: '#9a43f0' },
];

const filterTabs = ['All Programs', 'Engineering', 'Management', 'Pharmacy', 'Diploma', 'Computer Applications'];

const programsData = [
  { slug: 'mtech', category: 'Engineering', badge: 'B.Tech', title: 'AI & Data Science', duration: '4 Years', eligibility: '10+2 (PCM)', desc: 'Learn cutting-edge AI, ML, and Data Science technologies to build intelligent solutions for tomorrow.', tags: ['AI/ML', 'Data Science', 'Python'], placement: '92%', fees: '₹1,45,000', color: '#1f63db' },
  { slug: 'mtech', category: 'Engineering', badge: 'B.Tech', title: 'Mechanical Engineering', duration: '4 Years', eligibility: '10+2 (PCM)', desc: 'Design, innovate and manufacture tomorrow\'s products with advanced mechanical technologies.', tags: ['Design', 'Manufacturing', 'Robotics'], placement: '90%', fees: '₹1,20,000', color: '#ff8b1a' },
  { slug: 'mtech', category: 'Engineering', badge: 'B.Tech', title: 'Civil Engineering', duration: '4 Years', eligibility: '10+2 (PCM)', desc: 'Build the future with innovative solutions in infrastructure and sustainable development.', tags: ['Structure', 'Transport', 'Geotech'], placement: '88%', fees: '₹1,10,000', color: '#6cbf46' },
  { slug: 'mtech', category: 'Engineering', badge: 'B.Tech', title: 'Electrical Engineering', duration: '4 Years', eligibility: '10+2 (PCM)', desc: 'Power the future with expertise in electrical systems, automation and smart technologies.', tags: ['Power Systems', 'Automation', 'IoT'], placement: '91%', fees: '₹1,15,000', color: '#9a43f0' },
  { slug: 'mba', category: 'Management', badge: 'M.B.A', title: 'Master of Business Administration', duration: '2 Years', eligibility: 'Graduation', desc: 'Develop leadership skills and business acumen to excel in dynamic global environments.', tags: ['Finance', 'Marketing', 'HR'], placement: '96%', fees: '₹1,80,000', color: '#1f63db' },
  { slug: 'mca', category: 'Computer Applications', badge: 'M.C.A', title: 'Master of Computer Applications', duration: '2 Years', eligibility: 'Graduation (Any Stream)', desc: 'Advance your computing skills and build innovative solutions with our tech-driven curriculum.', tags: ['Full Stack', 'AI', 'Cloud'], placement: '93%', fees: '₹1,30,000', color: '#ff8b1a' },
  { slug: 'bpharm', category: 'Pharmacy', badge: 'B.Pharm', title: 'Bachelor of Pharmacy', duration: '4 Years', eligibility: '12+2 (PCB/PCM)', desc: 'Explore the science of medicines and research to build a rewarding pharmacy career.', tags: ['Pharmaceutical Chemistry', 'Clinical Research'], placement: '92%', fees: '₹1,00,000', color: '#6cbf46' },
  { slug: 'mtech', category: 'Engineering', badge: 'M.Tech', title: 'Master of Technology', duration: '2 Years', eligibility: 'B.Tech', desc: 'Specialize in advanced technologies and research to become an innovative technology leader.', tags: ['Embedded Systems', 'AI/ML', 'Robotics'], placement: '94%', fees: '₹1,25,000', color: '#9a43f0' },
];

const recruiters = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Capgemini', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'Cognizant'];

const recruiterColors = ['#e31e24', '#0066cc', '#9b1c9b', '#0076c0', '#0070ad', '#006699', '#e31e24', '#a100ff', '#ff9900', '#0033a0'];

export default function FacultyPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Programs');
  const [search, setSearch] = useState('');

  const filtered = programsData.filter(p => {
    const matchFilter = activeFilter === 'All Programs' || p.category === activeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="fp-container">
      <style>{`
        .fp-container {
          background: #f8faff;
          min-height: 100vh;
          margin-top: 48px;
          overflow-x: hidden;
        }
        .fp-container *, .fp-container *::before, .fp-container *::after {
          box-sizing: border-box;
        }

        .fp-hero {
          background: linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%);
          padding: 64px 45px 88px;
          display: grid;
          grid-template-columns: 1fr 560px 240px;
          gap: 48px;
          align-items: center;
        }
        .fp-hero__title {
          font-size: 3.8rem;
          font-weight: 700;
          color: #162341;
          line-height: 1.2;
          margin: 0 0 16px;
        }
        .fp-hero__title span {
          color: #1f63db;
        }
        .fp-hero__sub {
          font-size: 15px;
          color: #5f6785;
          line-height: 1.8;
          max-width: 420px;
          margin: 0 0 28px;
        }
        .fp-hero__actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .fp-hero__visual {
          border-radius: 18px;
          overflow: hidden;
          height: 480px;
          box-shadow: 0 20px 50px rgba(20,35,90,0.15);
        }
        .fp-hero__visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fp-hero__stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fp-stat-card {
          background: #fff;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 14px rgba(20,35,90,0.07);
        }

        .fp-filter-bar {
          background: #fff;
          padding: 0 45px;
          border-bottom: 1px solid #eef2ff;
        }
        .fp-filter-list {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .fp-filter-list::-webkit-scrollbar {
          display: none;
        }
        .fp-filter-btn {
          padding: 16px 22px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          color: #5f6785;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .fp-filter-btn--active {
          color: #1041c6;
          border-bottom: 3px solid #1041c6;
        }

        .fp-search-bar {
          background: #fff;
          padding: 14px 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eef2ff;
        }
        .fp-search-input {
          width: 360px;
          padding: 10px 16px;
          border: 1px solid #e0e8ff;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          color: #162341;
        }
        .fp-search-sort {
          font-size: 14px;
          color: #5f6785;
        }

        .fp-programs {
          padding: 36px 45px;
        }
        .fp-programs__title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #162341;
          margin: 0 0 6px;
        }
        .fp-programs__sub {
          font-size: 14px;
          color: #8a9bbf;
          margin: 0 0 28px;
        }
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 22px;
        }

        .fp-recruiters {
          background: #fff;
          padding: 40px 45px;
        }
        .fp-recruiters__title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #162341;
          margin: 0 0 28px;
        }
        .fp-recruiters-slider {
          display: flex;
          align-items: center;
          gap: 32px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .fp-recruiters-slider::-webkit-scrollbar {
          display: none;
        }
        .fp-recruiter-card {
          flex-shrink: 0;
          padding: 12px 24px;
          border-radius: 10px;
          border: 1px solid #eef2ff;
          background: #fff;
          box-shadow: 0 2px 10px rgba(20,35,90,0.06);
        }

        .fp-cta {
          margin: 0 45px 50px;
          border-radius: 20px;
          background: linear-gradient(135deg, #0a275d 0%, #1041c6 100%);
          padding: 50px 60px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
        }
        .fp-cta__title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px;
        }
        .fp-cta__sub {
          font-size: 15px;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          max-width: 500px;
          margin: 0;
        }
        .fp-cta__actions {
          display: flex;
          gap: 14px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .fp-cta__visual {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
        }

        /* ── RESPONSIVE MEDIA QUERIES ── */
        @media (max-width: 1200px) {
          .fp-hero {
            grid-template-columns: 1fr 1fr;
            padding: 56px 32px 56px;
            gap: 32px;
          }
          .fp-hero__visual {
            height: 380px;
          }
          .fp-hero__stats {
            grid-column: 1 / -1;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .fp-stat-card {
            flex: 1 1 200px;
          }
        }

        @media (max-width: 1024px) {
          .fp-container {
            margin-top: 60px !important;
          }
          .fp-hero {
            padding: 60px 24px 40px !important;
          }
          .fp-hero__title {
            font-size: 2.8rem !important;
          }
          .fp-filter-bar {
            padding: 0 24px !important;
          }
          .fp-search-bar {
            padding: 14px 24px !important;
          }
          .fp-programs {
            padding: 30px 24px !important;
          }
          .fp-recruiters {
            padding: 30px 24px !important;
          }
          .fp-cta {
            margin: 0 24px 40px !important;
            padding: 40px 30px !important;
          }
        }

        @media (max-width: 768px) {
          .fp-container {
            margin-top: 20px !important;
          }
          .fp-hero {
            grid-template-columns: 1fr !important;
            padding: 20px 20px 30px !important;
            gap: 24px !important;
            text-align: center;
          }
          .fp-hero__title {
            font-size: 2.3rem !important;
          }
          .fp-hero__sub {
            margin: 0 auto 20px !important;
          }
          .fp-hero__actions {
            justify-content: center !important;
          }
          .fp-hero__visual {
            height: 300px !important;
            max-width: 500px !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          .fp-hero__stats {
            grid-column: span 1 !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 12px !important;
          }
          .fp-stat-card {
            flex: 1 1 160px !important;
            max-width: 240px !important;
            padding: 10px 14px !important;
          }
          .fp-filter-bar {
            padding: 0 16px !important;
          }
          .fp-search-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            padding: 14px 16px !important;
          }
          .fp-search-input {
            width: 100% !important;
          }
          .fp-search-sort {
            text-align: right !important;
          }
          .fp-programs {
            padding: 24px 16px !important;
          }
          .fp-recruiters {
            padding: 24px 16px !important;
          }
          .fp-cta {
            margin: 0 16px 30px !important;
            padding: 30px 20px !important;
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center;
          }
          .fp-cta__visual {
            display: none !important;
          }
          .fp-cta__actions {
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .fp-container {
            margin-top: 5px !important;
          }
          .fp-hero {
            padding-top: 5px !important;
            padding-bottom: 20px !important;
          }
          .fp-hero__title {
            font-size: 1.8rem !important;
          }
          .fp-hero__actions button {
            width: 100% !important;
            justify-content: center !important;
          }
          .fp-hero__visual {
            height: 200px !important;
          }
          .fp-stat-card {
            flex: 1 1 100% !important;
            max-width: 100% !important;
          }
          .fp-grid {
            grid-template-columns: 1fr !important;
          }
          .fp-cta__actions button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="fp-hero">
        <div>
          <h1 className="fp-hero__title">
            Explore Programs<br />Designed for<br /><span>Your Future</span>
          </h1>
          <div style={{ width: '44px', height: '4px', background: '#ffbe23', borderRadius: '999px', marginBottom: '18px' }} />
          <p className="fp-hero__sub">
            Choose from industry-focused undergraduate, postgraduate, diploma, and professional programs designed to build future-ready careers.
          </p>
          <div className="fp-hero__actions">
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#fff', color: '#1041c6', border: '2px solid #1041c6', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Talk to Counselor
            </button>
            <button onClick={() => navigate('/faculty-new')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#fff', color: '#1041c6', border: '2px solid #1041c6', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              View Faculty <ArrowRight />
            </button>
          </div>
        </div>

        <div className="fp-hero__visual">
          <img src={segImg} alt="SEG Campus" />
        </div>

        <div className="fp-hero__stats">
          {stats.map((s) => (
            <div key={s.label} className="fp-stat-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: s.color }}>{s.value.charAt(0)}</span>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#162341', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#8a9bbf', marginTop: '3px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="fp-filter-bar">
        <div className="fp-filter-list">
          {filterTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveFilter(tab)} className={`fp-filter-btn ${activeFilter === tab ? 'fp-filter-btn--active' : ''}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="fp-search-bar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search programs, specializations..." className="fp-search-input" />
        <div className="fp-search-sort">Sort by: <strong>Popular</strong></div>
      </div>

      {/* ── Programs Grid ── */}
      <div className="fp-programs">
        <h2 className="fp-programs__title">Our Programs</h2>
        <p className="fp-programs__sub">Discover programs crafted to match industry needs and accelerate your career.</p>

        <div className="fp-grid">
          {filtered.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '22px', boxShadow: '0 4px 18px rgba(20,35,90,0.07)', border: '1px solid #eef2ff', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, fontSize: '20px', fontWeight: 800 }}>
                  {p.badge.charAt(0)}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: p.color, background: `${p.color}12`, padding: '4px 10px', borderRadius: '999px' }}>{p.badge}</span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#162341', marginBottom: '10px', lineHeight: 1.3 }}>{p.title}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: '#5f6785' }}>• Duration &nbsp; {p.duration}</span>
                <span style={{ fontSize: '13px', color: '#5f6785' }}>• Eligibility &nbsp; {p.eligibility}</span>
              </div>

              <p style={{ fontSize: '13px', color: '#8a9bbf', lineHeight: 1.65, marginBottom: '14px' }}>{p.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: `${p.color}12`, color: p.color }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '14px', borderTop: '1px solid #f0f4ff', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#8a9bbf', marginBottom: '2px' }}>Placement</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#6cbf46' }}>{p.placement} ↑</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#8a9bbf', marginBottom: '2px' }}>Fees (Per Year)</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#162341' }}>{p.fees}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => navigate(`/programs/${p.slug}`)} style={{ padding: '10px', background: '#fff', color: '#1041c6', border: '2px solid #1041c6', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  View Details
                </button>
                <button style={{ padding: '10px', background: '#1041c6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>

        </div>
      </div>

      {/* ── Top Recruiters ── */}
      <div className="fp-recruiters">
        <h2 className="fp-recruiters__title">Our Top Recruiters</h2>
        <div className="fp-recruiters-slider">
          {recruiters.map((r, i) => (
            <div key={r} className="fp-recruiter-card">
              <span style={{ fontSize: '18px', fontWeight: 800, color: recruiterColors[i] }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="fp-cta">
        <div>
          <h2 className="fp-cta__title">Start Building Your Future Today!</h2>
          <div style={{ width: '40px', height: '3px', background: '#ffbe23', borderRadius: '999px', marginBottom: '14px' }} />
          <p className="fp-cta__sub">
            Take the first step towards a successful and rewarding career with industry-focused programs at SEG.
          </p>
          <div className="fp-cta__actions">
            <button style={{ padding: '13px 28px', background: '#fff', color: '#1041c6', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Apply Now <ArrowRight />
            </button>
            <button style={{ padding: '13px 28px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Download Brochure
            </button>
            <button style={{ padding: '13px 28px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Contact Admissions
            </button>
          </div>
        </div>
        <div className="fp-cta__visual">
          🎓
        </div>
      </div>

    </div>
  );
}
