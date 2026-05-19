import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutBg from '../assets/images/about-bg.png';
import facultyBg from '../assets/images/faculty-bg.png';
import institutionsBg from '../assets/images/institutions-bg.png';
import campusBg from '../assets/images/campus-bg.png';

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

const PeopleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 18C4 15.8 6.2 14 9 14C11.8 14 14 15.8 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
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
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5H19V15H8L5 18V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 9H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
  { label: 'Top Faculties', icon: <PeopleIcon /> },
  { label: 'Awards & Achievements', icon: <TrophyIcon /> },
  { label: 'Success Stories', icon: <StoryIcon /> },
];

const facultyCards = [
  { name: 'Prof. (Dr.) Anviti Gupta', role: 'Professor & Dean', school: 'Sharda School of Humanities & Social Sciences', image: facultyBg, tone: 'cyan' },
  { name: 'Prof. Prem Kumar Malhotra', role: 'Professor', school: 'Sharda School of Law', image: aboutBg, tone: 'gold' },
  { name: 'Prof. (Dr.) Debasis Mallik', role: 'Dean', school: 'Sharda School of Business Studies', image: institutionsBg, tone: 'blue' },
  { name: 'Prof. (Dr.) Hrishikesh Dave', role: 'Dean', school: 'Sharda School of Law', image: campusBg, tone: 'violet' },
];

const awardsCards = [
  { title: 'Best University Award 2023', body: 'Ministry of Education, India', desc: 'Recognized for outstanding academic excellence and research contributions across all disciplines.', tone: 'gold' },
  { title: 'NAAC A+ Accreditation', body: 'National Assessment and Accreditation Council', desc: 'Highest grade awarded for quality education, infrastructure and student outcomes.', tone: 'blue' },
  { title: 'Top 100 Universities', body: 'NIRF Rankings 2023', desc: 'Ranked among top 100 universities in India by National Institutional Ranking Framework.', tone: 'cyan' },
  { title: 'Research Excellence Award', body: 'UGC India', desc: 'Awarded for outstanding research output and publications in international journals.', tone: 'violet' },
];

const storiesCards = [
  { name: 'Rahul Sharma', batch: 'B.Tech CSE 2020', company: 'Google', role: 'Software Engineer', package: '32 LPA', image: facultyBg, tone: 'cyan' },
  { name: 'Priya Singh', batch: 'MBA 2021', company: 'McKinsey & Co.', role: 'Business Analyst', package: '28 LPA', image: aboutBg, tone: 'gold' },
  { name: 'Amit Kumar', batch: 'B.Pharm 2019', company: 'Sun Pharma', role: 'Research Scientist', package: '18 LPA', image: institutionsBg, tone: 'blue' },
  { name: 'Neha Gupta', batch: 'LLB 2022', company: 'Cyril Amarchand', role: 'Associate Lawyer', package: '22 LPA', image: campusBg, tone: 'violet' },
];

const toneAccent = { cyan: '#1fb7e2', gold: '#ffbe23', blue: '#1f63db', violet: '#9a43f0' };

export default function FacultyShowcase() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Top Faculties');

  const [faculties, setFaculties] = useState(facultyCards);
  const [awards, setAwards] = useState(awardsCards);
  const [stories, setStories] = useState(storiesCards);

  useEffect(() => {
    fetch('http://localhost:3000/api/faculty')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const imageMap = { facultyBg, aboutBg, institutionsBg, campusBg };
          if (data.faculties && data.faculties.length > 0) {
            setFaculties(data.faculties.map(item => ({
              ...item,
              image: imageMap[item.image] || imageMap.facultyBg
            })));
          }
          if (data.awards && data.awards.length > 0) {
            setAwards(data.awards);
          }
          if (data.stories && data.stories.length > 0) {
            setStories(data.stories.map(item => ({
              ...item,
              image: imageMap[item.image] || imageMap.facultyBg
            })));
          }
        }
      })
      .catch(err => console.error('Error loading faculties:', err));
  }, []);

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
            <button className="btn btn--primary faculty-showcase__cta" onClick={() => navigate('/faculty')}>
              <span className="faculty-showcase__cta-icon"><PeopleIcon /></span>
              View all Faculties
              <span className="btn__arrow"><ArrowRight /></span>
            </button>
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
              {activeTab === 'Top Faculties' && faculties.map((faculty) => (
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
                    <a href="#faculty-showcase" className="faculty-showcase__card-arrow" aria-label={`View ${faculty.name}`}>
                      <ArrowRight />
                    </a>
                  </div>
                </article>
              ))}

              {/* Awards Cards */}
              {activeTab === 'Awards & Achievements' && awards.map((award) => (
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
                      {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                    </div>
                  </div>
                </article>
              ))}

              {/* Success Stories Cards */}
              {activeTab === 'Success Stories' && stories.map((story) => (
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
                    <a href="#faculty-showcase" className="faculty-showcase__card-arrow" aria-label={`View ${story.name}`}>
                      <ArrowRight />
                    </a>
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
