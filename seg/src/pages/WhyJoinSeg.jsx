import { Link } from 'react-router-dom';
import institutionsBg from '../assets/images/institutions-bg.png';
import '../why-join-seg.css';

const reasons = [
  {
    id: 'academic-excellence',
    title: 'Academic Excellence',
    icon: 'graduation',
    text: 'At SEG, we prioritize a robust academic foundation that balances theoretical knowledge with practical application. Our experienced faculty members, many of whom are industry experts and researchers, guide students through a comprehensive curriculum designed to meet global standards. Regular workshops, seminars, and industry interactions ensure that students stay updated with the latest advancements.',
  },
  {
    id: 'infrastructure',
    title: 'State-of-the-Art Infrastructure',
    icon: 'institution',
    text: 'SEG is equipped with state-of-the-art infrastructure, including modern classrooms, advanced laboratories, a vast digital library, and high-speed internet access. Our technologically enabled campus creates a conducive environment for learning and research, empowering students to explore and innovate.',
  },
  {
    id: 'holistic-development',
    title: 'Holistic Development',
    icon: 'people',
    text: 'Beyond academics, SEG believes in nurturing well-rounded individuals. We offer a variety of extracurricular activities, clubs, and cultural events that enhance leadership skills, teamwork, and creativity. Our focus on personality development prepares students to face real-world challenges confidently.',
  },
  {
    id: 'industry-connections',
    title: 'Strong Industry Connections',
    icon: 'briefcase',
    text: 'SEG maintains strong ties with reputed industries and organizations, facilitating internships, guest lectures, and placement opportunities. Our dedicated placement cell works tirelessly to connect students with leading companies, ensuring successful career launches.',
  },
  {
    id: 'global-exposure',
    title: 'Global Exposure',
    icon: 'globe',
    text: 'SEG collaborates with international universities, enabling student exchange programs, global internships, and exposure to multicultural environments. These experiences broaden perspectives and prepare students for global opportunities.',
  },
  {
    id: 'alumni-network',
    title: 'Strong Alumni Network',
    icon: 'alumni',
    text: 'Our alumni network spans across the globe, holding significant positions in reputed organizations. They actively participate in mentoring current students, sharing experiences, and guiding them toward successful careers.',
  },
  {
    id: 'safe-campus',
    title: 'Safe and Inclusive Campus',
    icon: 'shield',
    text: 'SEG is committed to creating a safe, inclusive, and diverse environment where every student feels valued and respected. Our anti-ragging policies, counseling services, and dedicated staff ensure the well-being of our students.',
  },
];

const ReasonIcon = ({ type }) => {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'graduation':
      return (
        <svg {...props}>
          <path d="M3 9L12 4L21 9L12 14L3 9Z" />
          <path d="M7 11.5V15.5C7 17.4 9.2 19 12 19C14.8 19 17 17.4 17 15.5V11.5" />
          <path d="M21 9V13.5" />
        </svg>
      );
    case 'institution':
      return (
        <svg {...props}>
          <path d="M3 21H21" />
          <path d="M4 21V10" />
          <path d="M20 21V10" />
          <path d="M2 10L12 3L22 10" />
          <rect x="8" y="14" width="3" height="7" />
          <rect x="13" y="14" width="3" height="7" />
          <path d="M8 10h8" />
        </svg>
      );
    case 'people':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3" />
          <path d="M2 13h20" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3C9 7 9 17 12 21" />
          <path d="M12 3C15 7 15 17 12 21" />
          <path d="M3 12H21" />
          <path d="M4.5 7.5H19.5" />
          <path d="M4.5 16.5H19.5" />
        </svg>
      );
    case 'alumni':
      return (
        <svg {...props}>
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M9 7l1.5 1.5L13 6" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3L19 6V11C19 15.2 16.3 18.9 12 21C7.7 18.9 5 15.2 5 11V6L12 3Z" />
          <path d="M9.5 11.5L11.2 13.2L14.8 9.6" />
        </svg>
      );
    default:
      return null;
  }
};

const WhyJoinSeg = () => {
  return (
    <div className="wjs-page">
      {/* Hero Section — identical to History page */}
      <section className="wjs-hero">
        <div className="wjs-hero__inner">
          <div className="wjs-hero__content">
            <div className="wjs-hero__breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">&gt;</span>
              <span>About SEG</span>
              <span className="separator">&gt;</span>
              <span className="current">Why Join SEG</span>
            </div>

            <h1 className="wjs-hero__title">
              The Legacy of
              <br />
              Saroj <span className="text-blue">Educational Group</span>
            </h1>
            <div className="wjs-hero__accent-line"></div>

            <p className="wjs-hero__text">
              A journey marked by dedication, growth, and a commitment to educational excellence that has shaped thousands of lives and continues to lead the way for future leaders.
            </p>
          </div>

          <div className="wjs-hero__visual">
            <img
              src={institutionsBg}
              alt="Saroj Institute of Technology & Management"
              className="wjs-hero__image"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="wjs-stats-bar">
          <div className="wjs-stats-bar__item">
            <div className="wjs-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 16l2 2 4-4" />
              </svg>
            </div>
            <div className="wjs-stats-bar__info">
              <span className="wjs-stats-bar__value">27+</span>
              <span className="wjs-stats-bar__label">YEARS OF<br />EXCELLENCE</span>
            </div>
          </div>

          <div className="wjs-stats-bar__item">
            <div className="wjs-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="wjs-stats-bar__info">
              <span className="wjs-stats-bar__value">25K+</span>
              <span className="wjs-stats-bar__label">HAPPY<br />STUDENTS</span>
            </div>
          </div>

          <div className="wjs-stats-bar__item">
            <div className="wjs-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="9" y1="22" x2="15" y2="22" />
                <line x1="8" y1="6" x2="8.01" y2="6" />
                <line x1="16" y1="6" x2="16.01" y2="6" />
                <line x1="12" y1="6" x2="12.01" y2="6" />
                <line x1="8" y1="10" x2="8.01" y2="10" />
                <line x1="16" y1="10" x2="16.01" y2="10" />
                <line x1="12" y1="10" x2="12.01" y2="10" />
                <line x1="8" y1="14" x2="8.01" y2="14" />
                <line x1="16" y1="14" x2="16.01" y2="14" />
                <line x1="12" y1="14" x2="12.01" y2="14" />
              </svg>
            </div>
            <div className="wjs-stats-bar__info">
              <span className="wjs-stats-bar__value">6+</span>
              <span className="wjs-stats-bar__label">INSTITUTIONS<br />ACROSS INDIA</span>
            </div>
          </div>

          <div className="wjs-stats-bar__item">
            <div className="wjs-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10" />
                <path d="M5 4h14c1 0 2 1 2 2v2c0 3-2 5-4 5H7c-2 0-4-2-4-5V6c0-1 1-2 2-2z" />
                <path d="M12 4v13" />
              </svg>
            </div>
            <div className="wjs-stats-bar__info">
              <span className="wjs-stats-bar__value">100+</span>
              <span className="wjs-stats-bar__label">AWARDS &amp;<br />RECOGNITIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wjs-content">
        {/* Section Heading */}
        <div className="wjs-content__heading">
          <span className="wjs-content__eyebrow">WHY CHOOSE SEG</span>
          <div className="wjs-content__eyebrow-line"></div>
          <h2 className="wjs-content__title">
            Why Join Saroj Educational<br />
            Group <span className="text-seg-blue">(SEG)?</span>
          </h2>
        </div>

        {/* Reason Cards */}
        <div className="wjs-list">
          {reasons.map((reason) => (
            <div className="wjs-card" key={reason.id} id={reason.id}>
              {/* Blue gradient icon box */}
              <div className="wjs-card__icon-box">
                <div className="wjs-card__icon-circle">
                  <ReasonIcon type={reason.icon} />
                </div>
              </div>

              {/* Content */}
              <div className="wjs-card__body">
                <h3 className="wjs-card__title">{reason.title}</h3>
                <div className="wjs-card__accent-line"></div>
                <p className="wjs-card__text">{reason.text}</p>
              </div>

              {/* Dot pattern decoration */}
              <div className="wjs-card__dots" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyJoinSeg;
