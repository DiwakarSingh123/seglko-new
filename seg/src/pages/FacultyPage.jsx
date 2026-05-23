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
    <div style={{ background: '#f8faff', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%)', padding: '110px 45px 100px', display: 'grid', gridTemplateColumns: '1fr 560px 240px', gap: '48px', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3.8rem', fontWeight: 700, color: '#162341', lineHeight: 1.2, marginBottom: '16px' }}>
            Explore Programs<br />Designed for<br /><span style={{ color: '#1f63db' }}>Your Future</span>
          </h1>
          <div style={{ width: '44px', height: '4px', background: '#ffbe23', borderRadius: '999px', marginBottom: '18px' }} />
          <p style={{ fontSize: '15px', color: '#5f6785', lineHeight: 1.8, maxWidth: '420px', marginBottom: '28px' }}>
            Choose from industry-focused undergraduate, postgraduate, diploma, and professional programs designed to build future-ready careers.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/contact-us')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 32px', minWidth: '180px', background: '#1041c6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}>
              Talk to Counselor <ArrowRight />
            </button>
            <button onClick={() => navigate('/faculty-new')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#fff', color: '#1041c6', border: '2px solid #1041c6', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              View Faculty <ArrowRight />
            </button>
          </div>
        </div>

        <div style={{ borderRadius: '18px', overflow: 'hidden', height: '480px', boxShadow: '0 20px 50px rgba(20,35,90,0.15)' }}>
          <img src={segImg} alt="SEG Campus" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 4px 14px rgba(20,35,90,0.07)' }}>
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
      <div style={{ background: '#fff', padding: '0 45px', borderBottom: '1px solid #eef2ff' }}>
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {filterTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveFilter(tab)} style={{ padding: '16px 22px', border: 'none', background: 'transparent', fontSize: '14px', fontWeight: 600, color: activeFilter === tab ? '#1041c6' : '#5f6785', borderBottom: activeFilter === tab ? '3px solid #1041c6' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div style={{ background: '#fff', padding: '14px 45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eef2ff' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search programs, specializations..." style={{ width: '360px', padding: '10px 16px', border: '1px solid #e0e8ff', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#162341' }} />
        <div style={{ fontSize: '14px', color: '#5f6785' }}>Sort by: <strong>Popular</strong></div>
      </div>

      {/* ── Programs Grid ── */}
      <div style={{ padding: '36px 45px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#162341', marginBottom: '6px' }}>Our Programs</h2>
        <p style={{ fontSize: '14px', color: '#8a9bbf', marginBottom: '28px' }}>Discover programs crafted to match industry needs and accelerate your career.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
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
          <button onClick={() => navigate('/programs')} style={{ padding: '13px 32px', background: '#fff', color: '#1041c6', border: '2px solid #1041c6', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            View All Programs <ArrowRight />
          </button>
        </div>
      </div>

      {/* ── Top Recruiters ── */}
      <div style={{ background: '#fff', padding: '40px 45px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#162341', marginBottom: '28px' }}>Our Top Recruiters</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {recruiters.map((r, i) => (
            <div key={r} style={{ flexShrink: 0, padding: '12px 24px', borderRadius: '10px', border: '1px solid #eef2ff', background: '#fff', boxShadow: '0 2px 10px rgba(20,35,90,0.06)' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: recruiterColors[i] }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ margin: '0 45px 50px', borderRadius: '20px', background: 'linear-gradient(135deg, #0a275d 0%, #1041c6 100%)', padding: '50px 60px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Start Building Your Future Today!</h2>
          <div style={{ width: '40px', height: '3px', background: '#ffbe23', borderRadius: '999px', marginBottom: '14px' }} />
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: '500px' }}>
            Take the first step towards a successful and rewarding career with industry-focused programs at SEG.
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
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
        <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
          🎓
        </div>
      </div>

    </div>
  );
}
