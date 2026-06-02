import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutBg from '../assets/images/about-bg.png';
import faculty1 from '../assets/images/1776318734242.jpg';
import faculty2 from '../assets/images/M_1722920383.jpg';
import faculty3 from '../assets/images/1568080358490.jpg';
import faculty4 from '../assets/images/Dr.-Hrishikesh-Pai.png';
import faculty5 from '../assets/images/images (39).jpg';


import placement1 from '../assets/images/surender pratap.jpeg';
import placement2 from '../assets/images/mansi sahu.jpeg';
import placement3 from '../assets/images/Harsh dixit.jpeg';
import placement4 from '../assets/images/surender pratap.jpeg';
import institutionsBg from '../assets/images/institutions-bg.png';
import campusBg from '../assets/images/campus-bg.png';
import facultyBg from '../assets/images/faculty-bg.png';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserStarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m14 11 1.7 3.5 3.8.6-2.7 2.6.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.6 3.8-.6Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4H16V7C16 9.2 14.2 11 12 11C9.8 11 8 9.2 8 7V4Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 11V14C10 15.1 9.1 16 8 16H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 11V14C14 15.1 14.9 16 16 16H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 20H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 16V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const UserBadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5.5 18C5.5 15.4 8.4 13.5 12 13.5C15.6 13.5 18.5 15.4 18.5 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ProfessorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L20 8.5L12 13L4 8.5L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 10.2V14.4C7 15.5 9.2 17.3 12 17.3C14.8 17.3 17 15.5 17 14.4V10.2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M20 8.5V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 20V6.8C5 6.1 5.6 5.5 6.3 5.5H17.7C18.4 5.5 19 6.1 19 6.8V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 9H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 9H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 13H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 13H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 20V16.5C11 15.9 11.4 15.5 12 15.5C12.6 15.5 13 15.9 13 16.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffbe23" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const tabs = [
  { label: 'Top Faculties', icon: <UserStarIcon /> },
  { label: 'Awards & Achievements', icon: <TrophyIcon /> },
  { label: 'Success Stories', icon: <StoryIcon /> },
];

const facultyCards = [
  { id: 1, name: 'Prof. (Dr.) Anviti Gupta', role: 'Professor & Dean', school: 'Shivdan Singh Institute of Technology and Management', image: faculty1, tone: 'cyan' },
  { id: 2, name: 'Prof. Prem Kumar Malhotra', role: 'Professor', school: 'Saroj Institute of Technology and Management', image: faculty2, tone: 'gold' },
  { id: 3, name: 'Prof. (Dr.) Debasis Mallik', role: 'Dean', school: 'Saroj College of Law', image: faculty3, tone: 'blue' },
  { id: 4, name: 'Prof. (Dr.) Hrishikesh Dave', role: 'Dean', school: 'Saroj College of Law', image: faculty4, tone: 'violet' },
  { id: 5, name: 'Prof. (Dr.) Rajeev Kumar', role: 'Professor & Dean', school: 'Saroj College of Pharmacy', image: faculty5, tone: 'cyan' },
];

const awardsCards = [
  { title: 'Best University Award 2023', body: 'Ministry of Education, India', desc: 'Recognized for outstanding academic excellence and research contributions across all disciplines.', tone: 'gold' },
  { title: 'NAAC A+ Accreditation', body: 'National Assessment and Accreditation Council', desc: 'Highest grade awarded for quality education, infrastructure and student outcomes.', tone: 'blue' },
  { title: 'Top 100 Universities', body: 'NIRF Rankings 2023', desc: 'Ranked among top 100 universities in India by National Institutional Ranking Framework.', tone: 'cyan' },
  { title: 'Research Excellence Award', body: 'UGC India', desc: 'Awarded for outstanding research output and publications in international journals.', tone: 'violet' },
  { title: 'Innovation Leadership Award', body: 'Academic Excellence Forum', desc: 'Honored for nurturing entrepreneurship, practical learning and student-led innovation initiatives.', tone: 'gold' },
];

const storiesCards = [
  { name: 'surender pratap', batch: 'B.Tech CSE 2020', company: 'Black Apple Technologies', role: 'Software Engineer', package: '6 LPA', image: placement1, tone: 'cyan' },
  { name: 'Mansi Sahu', batch: 'MBA 2021', company: 'McKinsey & Co.', role: 'Business Analyst', package: '28 LPA', image: placement2, tone: 'gold' },
  { name: 'Harsh Dixit', batch: 'B.Pharm 2019', company: 'Sun Pharma', role: 'Research Scientist', package: '18 LPA', image: placement3, tone: 'blue' },
  { name: 'Surender pratap', batch: 'LLB 2022', company: 'Cyril Amarchand', role: 'Associate Lawyer', package: '22 LPA', image: placement4, tone: 'violet' },
  { name: 'Pramudit Shukla', batch: 'Diploma CSE 2022', company: 'TechMech', role: 'Full Stack Developer', package: '12 LPA', image: facultyBg, tone: 'cyan' },
];

const toneAccent = { cyan: '#1fb7e2', gold: '#ffbe23', blue: '#1f63db', violet: '#9a43f0' };

export default function FacultyShowcase() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Top Faculties');

  const scrollCards = (direction) => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('.faculty-showcase__card');
    const cardTrack = carouselRef.current.querySelector('.faculty-showcase__grid');
    const cardGap = cardTrack ? Number.parseFloat(window.getComputedStyle(cardTrack).gap || '0') : 0;
    const scrollAmount = firstCard ? firstCard.getBoundingClientRect().width + cardGap : carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const tabTitles = {
    'Top Faculties': { heading: 'Learn from the', highlight: 'Best', sub: 'Our distinguished faculty members bring knowledge, experience and inspiration to shape future leaders.' },
    'Awards & Achievements': { heading: 'Our', highlight: 'Awards & Achievements', sub: 'Celebrating excellence in education, research and student outcomes recognized nationally.' },
    'Success Stories': { heading: 'Student', highlight: 'Success Stories', sub: 'Our students are building great careers at top companies across the world.' },
  };

  const currentCards = activeTab === 'Top Faculties' ? facultyCards : activeTab === 'Awards & Achievements' ? awardsCards : storiesCards;
  const { heading, highlight, sub } = tabTitles[activeTab];

  return (
    <section className="faculty-showcase" id="faculty-showcase">
      <div className="faculty-showcase__shell">

        {/* Tabs */}
        <div className="faculty-showcase__tabs">
          {tabs.map((tab) => (
            <div
              className={`faculty-showcase__tab${activeTab === tab.label ? ' faculty-showcase__tab--active' : ''}`}
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{ cursor: 'pointer' }}
            >
              <span className="faculty-showcase__tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="faculty-showcase__header">
          <div className="faculty-showcase__intro">
            <h2 className="faculty-showcase__title">
              {heading} <span>{highlight}</span>
            </h2>
            <span className="faculty-showcase__accent" />
            <p className="faculty-showcase__subtitle">{sub}</p>
          </div>
          <div className="faculty-showcase__actions">
            <span className="faculty-showcase__dots" aria-hidden="true" />
            {activeTab === 'Top Faculties' && (
              <button className="btn btn--primary faculty-showcase__cta" onClick={() => navigate('/faculty-new')}>
                <span className="faculty-showcase__cta-icon"><UsersIcon /></span>
                View all Faculties
                <ArrowRight />
              </button>
            )}
            {activeTab === 'Success Stories' && (
              <button className="btn btn--primary faculty-showcase__cta" onClick={() => { navigate('/placements'); window.scrollTo(0, 0); }}>
                View More Success Stories
                <ArrowRight />
              </button>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="faculty-showcase__carousel">
          <button type="button" className="faculty-showcase__carousel-button faculty-showcase__carousel-button--prev" onClick={() => scrollCards(-1)} aria-label="Previous">
            <ArrowLeft />
          </button>

          <div className="faculty-showcase__viewport" ref={carouselRef}>
            <div className="faculty-showcase__grid">

              {/* Top Faculties Cards */}
              {activeTab === 'Top Faculties' && facultyCards.map((faculty) => (
                <article className={`faculty-showcase__card faculty-showcase__card--${faculty.tone}`} key={faculty.name}>
                  <div className="faculty-showcase__portrait-wrap">
                    <img src={faculty.image} alt={faculty.name} className="faculty-showcase__portrait" loading="lazy" />
                  </div>
                  <span className="faculty-showcase__badge"><ProfessorIcon /></span>
                  <h3 className="faculty-showcase__name">{faculty.name}</h3>
                  <span className="faculty-showcase__line" />
                  <div className={`faculty-showcase__info faculty-showcase__info--${faculty.tone}`}>
                    <div className="faculty-showcase__info-row">
                      <span className="faculty-showcase__info-icon"><UserBadgeIcon /></span>
                      <div><strong>{faculty.role}</strong></div>
                    </div>
                    <div className="faculty-showcase__info-row">
                      <span className="faculty-showcase__info-icon"><BuildingIcon /></span>
                      <div><span>{faculty.school}</span></div>
                    </div>
                  </div>
                  <div className="faculty-showcase__card-footer">
                    <span className="faculty-showcase__card-arrow" style={{ cursor: 'pointer' }} onClick={() => navigate(`/faculty/${faculty.id}`)}>
                      <ArrowRight />
                    </span>
                  </div>
                </article>
              ))}

              {/* Awards Cards */}
              {activeTab === 'Awards & Achievements' && awardsCards.map((award) => (
                <article className={`faculty-showcase__card faculty-showcase__card--${award.tone}`} key={award.title}>
                  <div className="faculty-showcase__portrait-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${toneAccent[award.tone]}15` }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: `${toneAccent[award.tone]}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: toneAccent[award.tone] }}>
                      <TrophyIcon />
                    </div>
                  </div>
                  <span className="faculty-showcase__badge"><TrophyIcon /></span>
                  <h3 className="faculty-showcase__name" style={{ fontSize: '15px' }}>{award.title}</h3>
                  <span className="faculty-showcase__line" />
                  <div className={`faculty-showcase__info faculty-showcase__info--${award.tone}`}>
                    <div className="faculty-showcase__info-row">
                      <span className="faculty-showcase__info-icon"><BuildingIcon /></span>
                      <div><strong style={{ fontSize: '12px' }}>{award.body}</strong></div>
                    </div>
                    <div className="faculty-showcase__info-row" style={{ marginTop: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#5f6785', lineHeight: 1.6 }}>{award.desc}</span>
                    </div>
                  </div>
                  <div className="faculty-showcase__card-footer">
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} />)}
                    </div>
                  </div>
                </article>
              ))}

              {/* Success Stories Cards */}
              {activeTab === 'Success Stories' && storiesCards.map((story) => (
                <article className={`faculty-showcase__card faculty-showcase__card--${story.tone}`} key={story.name}>
                  <div className="faculty-showcase__portrait-wrap">
                    <img src={story.image} alt={story.name} className="faculty-showcase__portrait" loading="lazy" />
                  </div>
                  <span className="faculty-showcase__badge"><UserBadgeIcon /></span>
                  <h3 className="faculty-showcase__name">{story.name}</h3>
                  <span className="faculty-showcase__line" />
                  <div className={`faculty-showcase__info faculty-showcase__info--${story.tone}`}>
                    <div className="faculty-showcase__info-row">
                      <span className="faculty-showcase__info-icon"><BuildingIcon /></span>
                      <div>
                        <strong>{story.company}</strong>
                        <span style={{ display: 'block', marginTop: '2px' }}>{story.role}</span>
                      </div>
                    </div>
                    <div className="faculty-showcase__info-row" style={{ marginTop: '8px' }}>
                      <span className="faculty-showcase__info-icon"><UserBadgeIcon /></span>
                      <div><span>{story.batch}</span></div>
                    </div>
                  </div>
                  <div className="faculty-showcase__card-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '16px', color: toneAccent[story.tone] }}>{story.package}</span>
                  </div>
                </article>
              ))}

            </div>
          </div>

          <button type="button" className="faculty-showcase__carousel-button faculty-showcase__carousel-button--next" onClick={() => scrollCards(1)} aria-label="Next">
            <ArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}
