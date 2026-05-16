import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../research-publications.css';

const ResearchPublications = () => {
  const [activeTab, setActiveTab] = useState('CSE');
  const [publicationData, setPublicationData] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'CSE', label: 'Computer Science and Engineering (CSE)' },
    { id: 'EE', label: 'Electrical Engineering (EE)' },
    { id: 'ME', label: 'Mechanical Engineering (ME)' },
    { id: 'Pharmacy', label: 'Pharmacy' },
    { id: 'Biotechnology', label: 'Biotechnology' }
  ];

  useEffect(() => {
    fetch('http://localhost:3000/api/research')
      .then(res => res.json())
      .then(data => {
        if (data && data.papers) {
          const grouped = {
            CSE: [],
            EE: [],
            ME: [],
            Pharmacy: [],
            Biotechnology: []
          };
          data.papers.forEach(p => {
            if (p.dept.includes('(CSE)')) grouped.CSE.push(p);
            else if (p.dept.includes('(EE)')) grouped.EE.push(p);
            else if (p.dept.includes('(ME)')) grouped.ME.push(p);
            else if (p.dept.includes('Pharmacy')) grouped.Pharmacy.push(p);
            else if (p.dept.includes('Biotechnology')) grouped.Biotechnology.push(p);
          });
          setPublicationData(grouped);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching research papers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  const renderDots = () => (
    <div className="rp-section__dots">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rp-section__dot"></div>
      ))}
    </div>
  );

  return (
    <div className="rp-page">
      {/* Hero Section */}
      <section className="rp-hero">
        <div className="rp-hero__container">
          <div className="rp-hero__content">
            <h1 className="rp-hero__title">Research Publications</h1>
            <p className="rp-hero__subtitle">
              Explore high-quality research contributions and scholarly publications by our faculty members.
            </p>
          </div>
          <div className="rp-hero__visual">
             <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Book Base */}
               <path d="M200 180C140 160 40 160 20 180V60C40 40 140 40 200 60V180Z" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2"/>
               <path d="M200 180C260 160 360 160 380 180V60C360 40 260 40 200 60V180Z" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2"/>
               {/* Pages */}
               <path d="M200 170C150 155 60 155 40 170V50C60 35 150 35 200 50" stroke="#2563eb" strokeWidth="1.5"/>
               <path d="M200 170C250 155 340 155 360 170V50C340 35 250 35 200 50" stroke="#2563eb" strokeWidth="1.5"/>
               {/* Lines */}
               <line x1="60" y1="70" x2="160" y2="70" stroke="#2563eb" strokeWidth="1" opacity="0.3"/>
               <line x1="60" y1="90" x2="140" y2="90" stroke="#2563eb" strokeWidth="1" opacity="0.3"/>
               <line x1="60" y1="110" x2="150" y2="110" stroke="#2563eb" strokeWidth="1" opacity="0.3"/>
               <line x1="240" y1="70" x2="340" y2="70" stroke="#2563eb" strokeWidth="1" opacity="0.3"/>
               <line x1="240" y1="90" x2="320" y2="90" stroke="#2563eb" strokeWidth="1" opacity="0.3"/>
               {/* Icons */}
               <circle cx="100" cy="40" r="15" stroke="#ffbe23" strokeWidth="1" strokeDasharray="2 2"/>
               <path d="M95 40L105 40M100 35L100 45" stroke="#ffbe23" strokeWidth="1.5"/>
               <circle cx="300" cy="40" r="10" stroke="#2563eb" strokeWidth="1" opacity="0.4"/>
               <path d="M350 100L370 120" stroke="#2563eb" strokeWidth="2" opacity="0.2"/>
               <circle cx="340" cy="90" r="15" stroke="#2563eb" strokeWidth="1.5" opacity="0.2"/>
             </svg>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="rp-breadcrumbs-bar">
        <div className="rp-breadcrumbs">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
           <Link to="/">Home</Link>
           <span>&gt;</span>
           <span>Research</span>
           <span>&gt;</span>
           <span className="current">Research Publications</span>
        </div>
      </div>

      {/* Table Section */}
      <section className="rp-section">
        <div className="rp-section__header">
          {renderDots()}
          <h2 className="rp-section__title">Faculty Research Papers by Department</h2>
          {renderDots()}
        </div>

        <div className="rp-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`rp-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <button className="rp-tab rp-tab--more">
            More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>

        <div className="rp-table-container">
          <table className="rp-table">
            <thead>
              <tr>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Faculty Name
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Article Type
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  Article Title
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Journal / Conference
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {publicationData[activeTab].map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="rp-table__faculty">
                      <div className="rp-table__faculty-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      {item.faculty}
                    </div>
                  </td>
                  <td>
                    <span className={`rp-table__tag ${item.type === 'International' ? 'tag--int' : 'tag--nat'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.journal}</td>
                  <td>
                    <span className="rp-table__year-tag">{item.year}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ResearchPublications;
