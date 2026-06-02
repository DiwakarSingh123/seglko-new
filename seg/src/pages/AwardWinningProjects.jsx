import { useState } from 'react';
import trophyImg from '../assets/images/trophy for awards.jpeg';
import '../award-winning-projects.css';

const AwardWinningProjects = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Dr. D.N. Mishra expanded by default

  const facultyData = [
    {
      id: 0,
      name: 'Prof. (Dr.) S.N. Pandeya',
      projects: ['Potential anti HIV Agent-Man rich', 'Fubeceh Agentc Anti Technology']
    },
    {
      id: 1,
      name: 'Dr. D.N. Mishra',
      projects: [
        'Community Based Distribution Project',
        'Update Primary Health Care services in Mohanlal Ganj Block',
        'Study of NHRM (National Rural Health Mission) Asha in Gosaiganj Block'
      ]
    },
    {
      id: 2,
      name: 'Er. D. K. Singh',
      projects: ['Advanced IoT Framework for Smart Cities', 'Blockchain in Supply Chain Management']
    },
    {
      id: 3,
      name: 'Dr. Pramod Kr. Pandey',
      projects: ['Sustainable Energy Solutions', 'AI in Predictive Healthcare']
    }
  ];

  return (
    <div className="award-projects-page">
      {/* Hero Section */}
      <section className="aw-hero">
        <div className="aw-hero__container">
          <div className="aw-hero__content">
            <h1 className="aw-hero__title">Award-Winning Projects</h1>
            <div className="aw-hero__line"></div>
            <p className="aw-hero__text">
              At Saroj Educational Group (SEG), our researchers have successfully undertaken numerous prestigious projects.
            </p>
          </div>

          <div className="aw-hero__center-visual">
            <img src={trophyImg} alt="Awards Trophy" className="aw-hero__trophy" />
          </div>

          <div className="aw-hero__card">
            <div className="aw-card--impact">
              <h3 className="aw-card__title">Our Research Impact</h3>
              <div className="aw-metrics">
                <div className="aw-metric">
                  <div className="aw-metric__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <span className="aw-metric__value">50+</span>
                  <span className="aw-metric__label">Research Projects</span>
                </div>
                <div className="aw-metric">
                  <div className="aw-metric__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <span className="aw-metric__value">30+</span>
                  <span className="aw-metric__label">Expert Researchers</span>
                </div>
                <div className="aw-metric">
                  <div className="aw-metric__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  </div>
                  <span className="aw-metric__value">15+</span>
                  <span className="aw-metric__label">Awards Won</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="aw-main">
        <div className="aw-main__container">
          {/* Left Column - Accordion */}
          <div className="aw-accordion">
            {facultyData.map((faculty) => (
              <div 
                key={faculty.id} 
                className={`aw-accordion__item ${activeIndex === faculty.id ? 'active' : ''}`}
              >
                <div 
                  className="aw-accordion__header"
                  onClick={() => setActiveIndex(activeIndex === faculty.id ? null : faculty.id)}
                >
                  <div className="aw-accordion__header-left">
                    <div className="aw-accordion__icon">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <span className="aw-accordion__name">{faculty.name}</span>
                  </div>
                  <div className="aw-accordion__chevron">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                
                <div className="aw-accordion__content">
                  <div className="aw-projects-list">
                    <span className="aw-projects-list__title">Projects under investigation:</span>
                    {faculty.projects.map((project, pIdx) => (
                      <div key={pIdx} className="aw-project-row">
                        <div className="aw-project-row__check">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Sidebar */}
          <aside className="aw-sidebar">
            <div className="aw-card--funding">
              <div className="aw-funding__header">
                <div className="aw-funding__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2M10 20v2M14 2v2M14 20v2M2 10h2M20 10h2M2 14h2M20 14h2M6 22h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/></svg>
                </div>
                <h3 className="aw-funding__title">Research Funding & Collaborations</h3>
              </div>
              <p className="aw-funding__text">
                Projects funded by Department of Biotechnology, DST (FIST), INSPIRE, SERB, DRDO, Council of Science & Technology UP, and Ministry of AYUSH, Government of India.
              </p>
              <div className="aw-collab">
                <div className="aw-collab__icon">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <p className="aw-collab__text">
                  Global collaborations include Indo-Russian, Indo-Dutch, and DAAD-RISE initiatives.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Bar */}
      <div className="aw-footer-bar">
        <div className="aw-footer-bar__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </div>
        <div className="aw-footer-bar__info">
          <span className="aw-footer-bar__title">Innovation drives progress. Research creates impact.</span>
          <span className="aw-footer-bar__desc">Together, we build a better tomorrow.</span>
        </div>
        <div className="aw-footer-bar__visual">
           <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M10 30Q30 10 50 30T90 10" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4"/>
             <path d="M90 10L82 12M90 10L88 18" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
           </svg>
        </div>
      </div>
    </div>
  );
};

export default AwardWinningProjects;
