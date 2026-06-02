import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import program1 from '../assets/images/engineerging.webp';
import program2 from '../assets/images/management.jpg';
import program3 from '../assets/images/computer.webp';
import program4 from '../assets/images/diploma.jpg';
import program5 from '../assets/images/pharmacy copy.jpg';
import booksImg from '../assets/images/booksimg.jpeg';

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

const GearIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3 2.9H13.7L14.2 5.1C14.8 5.3 15.3 5.6 15.8 5.9L17.9 5.2L19.6 7.8L18.1 9.4C18.2 9.8 18.3 10.3 18.3 10.8C18.3 11.2 18.2 11.7 18.1 12.1L19.6 13.8L17.9 16.4L15.8 15.7C15.3 16 14.8 16.3 14.2 16.5L13.7 18.7H10.3L9.8 16.5C9.2 16.3 8.7 16 8.2 15.7L6.1 16.4L4.4 13.8L5.9 12.1C5.8 11.7 5.7 11.2 5.7 10.8C5.7 10.3 5.8 9.8 5.9 9.4L4.4 7.8L6.1 5.2L8.2 5.9C8.7 5.6 9.2 5.3 9.8 5.1L10.3 2.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="10.8" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const BagIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 7V5.5C8 4.1 9.1 3 10.5 3H13.5C14.9 3 16 4.1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CodeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 8L5 12L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 8L19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 5L10.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DiplomaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7.5C4 6.7 4.7 6 5.5 6H18.5C19.3 6 20 6.7 20 7.5V14.5C20 15.3 19.3 16 18.5 16H5.5C4.7 16 4 15.3 4 14.5V7.5Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 16L19 21L16.5 20L15 22L13.5 18.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LawIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 8H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 8L4 13H10L7 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M17 8L14 13H20L17 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FlaskIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10.5 3V8L5.7 16.1C4.9 17.5 5.9 19.2 7.5 19.2H16.5C18.1 19.2 19.1 17.5 18.3 16.1L13.5 8V3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8.2 13.5H15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L18.5 5.4V10.9C18.5 15 15.7 18.8 12 20C8.3 18.8 5.5 15 5.5 10.9V5.4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9.6 11.4L11.2 13L14.6 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacultyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 19C5 15.9 8.1 13.5 12 13.5C15.9 13.5 19 15.9 19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GrowthIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 16V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 16V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 16V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 9.5L11.5 6L15 8.5L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MedalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9.5" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9.5 13L8 21L12 18.8L16 21L14.5 13" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const WatermarkEngineering = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 10 L50 90" />
    <path d="M25 90 L50 10 L75 90" />
    <path d="M35 50 L65 50" />
    <path d="M42 30 L58 30" />
    <path d="M20 70 L80 70" />
    <path d="M15 70 L25 90" />
    <path d="M85 70 L75 90" />
    <circle cx="80" cy="40" r="12" />
    <path d="M80 24 L80 28 M80 52 L80 56 M64 40 L68 40 M92 40 L96 40" />
    <path d="M71 31 L74 34 M86 46 L89 49 M71 49 L74 46 M86 34 L89 31" />
  </svg>
);

const WatermarkManagement = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 90 L90 90" />
    <rect x="20" y="60" width="15" height="30" />
    <rect x="45" y="40" width="15" height="50" />
    <rect x="70" y="20" width="15" height="70" />
    <path d="M20 40 L45 20 L70 10 L90 0" />
    <path d="M75 0 L90 0 L90 15" />
  </svg>
);

const WatermarkComputer = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="25" width="70" height="45" rx="2" />
    <path d="M5 70 L95 70" strokeWidth="3" />
    <path d="M40 70 L45 75 L55 75 L60 70" />
    <path d="M35 42 L42 35 M35 42 L42 49" />
    <path d="M65 42 L58 35 M65 42 L58 49" />
    <path d="M48 55 L52 30" />
  </svg>
);

const WatermarkDiploma = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="20" width="70" height="60" />
    <rect x="22" y="27" width="56" height="46" />
    <circle cx="70" cy="70" r="10" fill="none" />
    <path d="M65 78 L60 90 L70 85 L80 90 L75 78" />
    <path d="M30 40 L60 40" />
    <path d="M30 55 L50 55" />
  </svg>
);

const WatermarkPharmacy = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 40 C20 70, 40 85, 50 85 C60 85, 80 70, 80 40 Z" />
    <path d="M15 40 L85 40" />
    <path d="M50 85 L40 95 L60 95 Z" />
    <path d="M70 10 L55 45" strokeWidth="2.5" />
    <path d="M35 55 L55 55 M45 45 L45 65" />
  </svg>
);

const WatermarkLaw = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 15 L50 90" />
    <path d="M30 90 L70 90" />
    <path d="M20 30 L80 30" />
    <path d="M50 15 L45 20 M50 15 L55 20" />
    <path d="M20 30 L10 60 C10 70, 30 70, 30 60 L20 30" />
    <path d="M80 30 L70 60 C70 70, 90 70, 90 60 L80 30" />
  </svg>
);

const programCards = [
  {
    title: 'Engineering Programs',
    description: 'B.Tech programs with modern specializations and hands-on learning.',
    image: program1,
    color: 'blue',
    accentColor: '#1f63db',
    slug: 'mtech',
    icon: <GearIcon />,
    watermark: <WatermarkEngineering />,
  },
  {
    title: 'Management Programs',
    description: 'MBA & BBA programs to nurture future business leaders.',
    image: program2,
    color: 'green',
    accentColor: '#6cbf46',
    slug: 'mba',
    icon: <BagIcon />,
    watermark: <WatermarkManagement />,
  },
  {
    title: 'Computer Applications',
    description: 'BCA, MCA & innovative programs in computer applications.',
    image: program3,
    color: 'violet',
    accentColor: '#6a32df',
    slug: 'bca',
    icon: <CodeIcon />,
    watermark: <WatermarkComputer />,
  },
  {
    title: 'Diploma Programs',
    description: 'Industry-focused diploma programs for skill enhancement.',
    image: program4,
    color: 'orange',
    accentColor: '#ff8b1a',
    slug: 'diploma',
    icon: <DiplomaIcon />,
    watermark: <WatermarkDiploma />,
  },
  {
    title: 'Pharmacy Programs',
    description: 'D.Pharm & B.Pharm programs for a bright career in healthcare.',
    image: program5,
    color: 'cyan',
    accentColor: '#27c6d8',
    slug: 'bpharm',
    icon: <FlaskIcon />,
    watermark: <WatermarkPharmacy />,
  },
  {
    title: 'Law Programs',
    description: 'LLB programs to build legal expertise and professional excellence.',
    image: program3,
    color: 'rose',
    accentColor: '#e11d48',
    slug: 'law',
    icon: <LawIcon />,
    watermark: <WatermarkLaw />,
  },
];

const programBenefits = [
  {
    title: 'Industry Aligned',
    description: 'Curriculum designed with industry collaboration.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Expert Faculty',
    description: 'Learn from experienced educators and professionals.',
    icon: <FacultyIcon />,
  },
  {
    title: 'Career Focused',
    description: 'Building the skills you need for a successful career.',
    icon: <GrowthIcon />,
  },
  {
    title: 'Future Ready',
    description: 'Innovative programs for the challenges of tomorrow.',
    icon: <MedalIcon />,
  },
];

export default function ProgramsSpotlight() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollCards = (direction) => {
    if (!carouselRef.current) {
      return;
    }

    const firstCard = carouselRef.current.querySelector('.programs-spotlight__card');
    const cardGap = 12;
    const scrollAmount = firstCard ? firstCard.getBoundingClientRect().width + cardGap : carouselRef.current.clientWidth;

    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="programs-spotlight" id="programs-spotlight" style={{ background: '#ffffff' }}>
      <div className="programs-spotlight__shell">
        <div className="programs-spotlight__hero">
          <div className="programs-spotlight__intro">

            <span className="programs-spotlight__accent-line" />
            <h2 className="programs-spotlight__title">
              <span className="programs-spotlight__title-line programs-spotlight__title-line--lead">
                Programs Designed for
              </span>
              <span className="programs-spotlight__title-line">
                a <span className="programs-spotlight__title-highlight">Successful Future</span>
              </span>
            </h2>
            <p className="programs-spotlight__description">
              Industry-focused programs crafted to equip you with the skills, knowledge and
              experience to lead tomorrow.
            </p>
          </div>

          <div className="programs-spotlight__actions">
            <button
              className="btn btn--primary programs-spotlight__cta"
              onClick={() => navigate('/all-programs')}
            >
              View All Programs
              <span className="btn__arrow"><ArrowRight /></span>
            </button>
          </div>

          <div className="programs-spotlight__art" aria-hidden="true">
            <span className="programs-spotlight__orb programs-spotlight__orb--gold" />
            <img src={booksImg} alt="Academic Books" className="programs-spotlight__art-img" />
          </div>
        </div>

        <div className="programs-spotlight__carousel">
          <button
            type="button"
            className="programs-spotlight__carousel-button programs-spotlight__carousel-button--prev"
            onClick={() => scrollCards(-1)}
            aria-label="Show previous programs"
          >
            <ArrowLeft />
          </button>

          <div className="programs-spotlight__card-viewport" ref={carouselRef}>
            <div className="programs-spotlight__card-grid">
              {programCards.map((card) => (
                <article
                  className={`programs-spotlight__card programs-spotlight__card--${card.color}`}
                  key={card.title}
                  onClick={() => navigate(`/programs/${card.slug}`)}
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                >
                  <div className="programs-spotlight__card-watermark">{card.watermark}</div>
                  <div className="programs-spotlight__card-icon">{card.icon}</div>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="programs-spotlight__card-image"
                    loading="lazy"
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                  <h3 className="programs-spotlight__card-title" style={{ position: 'relative', zIndex: 1 }}>{card.title}</h3>
                  <span className="programs-spotlight__card-line" style={{ position: 'relative', zIndex: 1 }} />
                  <p className="programs-spotlight__card-description" style={{ position: 'relative', zIndex: 1 }}>{card.description}</p>
                  <span className="programs-spotlight__card-link" style={{ position: 'relative', zIndex: 1 }}>
                    Explore
                    <span className="programs-spotlight__card-link-arrow">
                      <ArrowRight />
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="programs-spotlight__carousel-button programs-spotlight__carousel-button--next"
            onClick={() => scrollCards(1)}
            aria-label="Show next programs"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="programs-spotlight__benefits">
          {programBenefits.map((benefit) => (
            <div className="programs-spotlight__benefit" key={benefit.title}>
              <div className="programs-spotlight__benefit-icon">{benefit.icon}</div>
              <div className="programs-spotlight__benefit-copy">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
