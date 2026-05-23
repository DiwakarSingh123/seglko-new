import { Link } from 'react-router-dom';
import institutionsBg from '../assets/images/seg.jpeg';
import missionImg from '../assets/images/mission-illustration.png';
import visionImg from '../assets/images/vision-illustration.png';
import '../mission-vision.css';

const MissionVision = () => {
  return (
    <div className="mission-vision-page">
      {/* Hero Section - Same as History Page */}
      <section className="mv-hero">
        <div className="mv-hero__inner">
          <div className="mv-hero__content">

            <h1 className="mv-hero__title">
              The Legacy of
              <br />
              Saroj <span className="text-blue">Educational Group</span>
            </h1>
            <div className="mv-hero__accent-line"></div>

            <p className="mv-hero__text">
              A journey marked by dedication, growth, and a commitment to educational excellence that has shaped thousands of lives and continues to lead the way for future leaders.
            </p>
          </div>

          <div className="mv-hero__visual">
            <img src={institutionsBg} alt="Saroj Institute of Technology & Management" className="mv-hero__image" />
          </div>
        </div>

        <div className="mv-stats-bar">
          <div className="mv-stats-bar__item">
            <div className="mv-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 16l2 2 4-4" />
              </svg>
            </div>
            <div className="mv-stats-bar__info">
              <span className="mv-stats-bar__value">27+</span>
              <span className="mv-stats-bar__label">YEARS OF<br />EXCELLENCE</span>
            </div>
          </div>

          <div className="mv-stats-bar__item">
            <div className="mv-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="mv-stats-bar__info">
              <span className="mv-stats-bar__value">25K+</span>
              <span className="mv-stats-bar__label">HAPPY<br />STUDENTS</span>
            </div>
          </div>

          <div className="mv-stats-bar__item">
            <div className="mv-stats-bar__icon">
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
                <line x1="8" y1="18" x2="8.01" y2="18" />
                <line x1="16" y1="18" x2="16.01" y2="18" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="mv-stats-bar__info">
              <span className="mv-stats-bar__value">6+</span>
              <span className="mv-stats-bar__label">INSTITUTIONS<br />ACROSS INDIA</span>
            </div>
          </div>

          <div className="mv-stats-bar__item">
            <div className="mv-stats-bar__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10" />
                <path d="M5 4h14c1 0 2 1 2 2v2c0 3-2 5-4 5H7c-2 0-4-2-4-5V6c0-1 1-2 2-2z" />
                <path d="M12 4v13" />
              </svg>
            </div>
            <div className="mv-stats-bar__info">
              <span className="mv-stats-bar__value">100+</span>
              <span className="mv-stats-bar__label">AWARDS &<br />RECOGNITIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Content Section */}
      <section className="mv-content">
        {/* Section Header - Two Column */}
        <div className="mv-content__header">
          <div className="mv-content__header-left">
            <span className="mv-content__eyebrow">OUR MISSION & VISION</span>
            <div className="mv-content__eyebrow-line"></div>
            <h2 className="mv-content__title">
              Guided by Purpose,<br />Driven by Impact
            </h2>
          </div>
          <div className="mv-content__header-right">
            <p className="mv-content__intro">
              At Saroj Educational Group (SEG), our mission is to impart quality education that fosters innovation, critical thinking, and holistic development. We aim to nurture professionals who are not only industry-ready but also equipped to contribute responsibly to society. By integrating contemporary teaching methodologies with industry standards, we aspire to create leaders who excel in their fields.
            </p>
          </div>
        </div>

        {/* Decorative dots top-right */}
        <div className="mv-content__dots mv-content__dots--top-right"></div>

        {/* Mission Card */}
        <div className="mv-card">
          <div className="mv-card__visual">
            <img src={missionImg} alt="Our Mission" className="mv-card__image" />
          </div>
          <div className="mv-card__body">
            <div className="mv-card__icon-wrap">
              <div className="mv-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
            <h3 className="mv-card__title">Our Mission</h3>
            <div className="mv-card__title-line"></div>
            <p className="mv-card__text">
              At Saroj Educational Group (SEG), our mission is to impart quality education that fosters innovation, critical thinking, and holistic development. We aim to nurture professionals who are not only industry-ready but also equipped to contribute responsibly to society. By integrating contemporary teaching methodologies with industry standards, we aspire to create leaders who excel in their fields.
            </p>
          </div>
          {/* Dot pattern decoration */}
          <div className="mv-card__dots mv-card__dots--right"></div>
        </div>

        {/* Vision Card - Reversed */}
        <div className="mv-card mv-card--reverse">
          <div className="mv-card__body">
            <div className="mv-card__icon-wrap">
              <div className="mv-card__icon mv-card__icon--vision">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <h3 className="mv-card__title">Our Vision</h3>
            <div className="mv-card__title-line"></div>
            <p className="mv-card__text">
              Our vision is to be a globally recognized institution that empowers students with knowledge, skills, and values to become responsible citizens and leaders. We envision a future where our graduates drive innovation, contribute to societal progress, and uphold the highest standards of ethics and professionalism in their respective fields.
            </p>
          </div>
          <div className="mv-card__visual">
            <img src={visionImg} alt="Our Vision" className="mv-card__image" />
          </div>
          {/* Dot pattern decoration */}
          <div className="mv-card__dots mv-card__dots--left"></div>
        </div>
      </section>
    </div>
  );
};

export default MissionVision;
