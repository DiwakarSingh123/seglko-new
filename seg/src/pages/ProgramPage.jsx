import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { programsData } from '../data/programsData';
import '../ProgramPage.css';
import heroImage from '../assets/images/program1.png'; // Fallback
import ctaBg from '../assets/images/about-bg.png'; // Fallback

// Shared Icon component for all program icons
const Icon = ({ name }) => {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'cap':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M4 10L12 6L20 10L12 14L4 10Z" />
          <path d="M7 11.5V16C7 17.5 9 19 12 19C15 19 17 17.5 17 16V11.5" />
        </svg>
      );
    case 'flask':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M9 3H15" />
          <path d="M10 3V8L5 18C4.5 19 5 21 6.5 21H17.5C19 21 19.5 19 19 18L14 8V3" />
          <path d="M6.5 15H17.5" />
        </svg>
      );
    case 'building':
    case 'institution':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M3 9.5L12 4L21 9.5" />
          <path d="M5.5 10.5V19" />
          <path d="M10 10.5V19" />
          <path d="M14 10.5V19" />
          <path d="M18.5 10.5V19" />
          <path d="M3 20H21" />
        </svg>
      );
    case 'handshake':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M8 12L12 16L20 8" />
          <path d="M15 4.5V2.5A1.5 1.5 0 0 0 13.5 1H10.5A1.5 1.5 0 0 0 9 2.5V4.5" />
          <path d="M4 10.5V19.5A1.5 1.5 0 0 0 5.5 21H18.5A1.5 1.5 0 0 0 20 19.5V12" />
        </svg>
      );
    case 'monitor':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="2" y="4" width="20" height="14" rx="2" />
          <path d="M8 22H16" />
          <path d="M12 18V22" />
        </svg>
      );
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 6V4" />
          <path d="M15 6V4" />
          <path d="M9 20V18" />
          <path d="M15 20V18" />
          <path d="M6 9H4" />
          <path d="M6 15H4" />
          <path d="M20 9H18" />
          <path d="M20 15H18" />
        </svg>
      );
    case 'robot':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <path d="M12 4V8" />
          <circle cx="12" cy="3" r="1" />
          <circle cx="9" cy="13" r="1" />
          <circle cx="15" cy="13" r="1" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 3L20 7V11C20 15 17 19 12 21C7 19 4 15 4 11V7L12 3Z" />
          <path d="M12 8V12L14 14" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M4 6C4 4.9 4.9 4 6 4H10C11.1 4 12 4.9 12 6V20C12 18.9 11.1 18 10 18H6C4.9 18 4 18.9 4 20V6Z" />
          <path d="M20 6C20 4.9 19.1 4 18 4H14C12.9 4 12 4.9 12 6V20C12 18.9 12.9 18 14 18H18C19.1 18 20 18.9 20 20V6Z" />
        </svg>
      );
    case 'user-star':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="12" cy="7" r="4" />
          <path d="M18 21H6C5 21 4 20 4 18.5C4 16 6 14 12 14" />
          <path d="M16 19L17.5 15L22 15L18.5 12L19.5 8L16 10.5L12.5 8L13.5 12L10 15L14.5 15L16 19Z" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M7 8L3 12L7 16" />
          <path d="M17 8L21 12L17 16" />
          <path d="M14 4L10 20" />
        </svg>
      );
    case 'server':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="4" y="4" width="16" height="6" rx="1" />
          <rect x="4" y="14" width="16" height="6" rx="1" />
          <path d="M8 7H8.01" />
          <path d="M8 17H8.01" />
        </svg>
      );
    case 'pencil-ruler':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M15 5L19 9" />
          <path d="M12 21L21 12C22.1 10.9 22.1 9.1 21 8L16 3C14.9 1.9 13.1 1.9 12 3L3 12C1.9 13.1 1.9 14.9 3 16L8 21C9.1 22.1 10.9 22.1 12 21Z" />
          <path d="M7 16L12 21" />
          <path d="M5 14L8 17" />
          <path d="M9 10L12 13" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2C14.5 2 16.5 6.5 16.5 12C16.5 17.5 14.5 22 12 22C9.5 22 7.5 17.5 7.5 12C7.5 6.5 9.5 2 12 2Z" />
          <path d="M2 12H22" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M13 2C13 2 18 2 20 4C22 6 22 11 22 11L18 15L15 12L12 15L9 12L5 16C5 16 4 14 4 12C4 10 5 8 5 8L13 2Z" />
          <path d="M9 22L12 19L15 22V16L9 16V22Z" />
        </svg>
      );
    case 'bullhorn':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M3 11V13C3 14.1 3.9 15 5 15H8L13 19V5L8 9H5C3.9 9 3 9.9 3 11Z" />
          <path d="M18 8C19.2 9.1 20 10.5 20 12C20 13.5 19.2 14.9 18 16" />
        </svg>
      );
    case 'chart-line':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M3 3V21H21" />
          <path d="M7 16L11 12L15 14L21 8" />
        </svg>
      );
    case 'people':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="9" cy="7" r="4" />
          <path d="M16 11H18C19.7 11 21 12.3 21 14V17" />
          <path d="M3 21V19C3 16.8 4.8 15 7 15H11C13.2 15 15 16.8 15 19V21" />
          <circle cx="16" cy="5" r="3" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'gear':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15A1.65 1.65 0 0 0 21 16.6V17a2 2 0 0 1-2 2h-1a1.65 1.65 0 0 0-1.6 1.4A8.5 8.5 0 0 1 15 21.4a1.65 1.65 0 0 0-1.4 1.6V24a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-.4a1.65 1.65 0 0 0-1.6-1.4 8.5 8.5 0 0 1-2.4-1 1.65 1.65 0 0 0-1.6-1.4H3a2 2 0 0 1-2-2v-1A2 2 0 0 1 3 16h1a1.65 1.65 0 0 0 1.6-1.4 8.5 8.5 0 0 1 1-2.4A1.65 1.65 0 0 0 5 10.6H4a2 2 0 0 1-2-2V7.6a2 2 0 0 1 2-2h.4A1.65 1.65 0 0 0 6 4.2a8.5 8.5 0 0 1 2.4-1A1.65 1.65 0 0 0 9.8 1.6V1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a1.65 1.65 0 0 0 1.4 1.6 8.5 8.5 0 0 1 2.4 1A1.65 1.65 0 0 0 20 4.2h1A2 2 0 0 1 23 6v1a2 2 0 0 1-2 2h-1a1.65 1.65 0 0 0-1.6 1.4 8.5 8.5 0 0 1-1 2.4c.4.4 1 1 1.6 1.4z" />
        </svg>
      );
    case 'medical':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M12 9V15" />
          <path d="M9 12H15" />
        </svg>
      );
    case 'capsule':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M6 18L18 6C19.6 4.4 21.4 4.4 23 6C24.6 7.6 24.6 9.4 23 11L11 23C9.4 24.6 7.6 24.6 6 23C4.4 21.4 4.4 19.6 6 18Z" />
          <path d="M10 14L16 8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const ProgramPage = () => {
  const { programId } = useParams();
  const data = programsData[programId];

  // Provide a fallback if programId doesn't exist
  if (!data) {
    return (
      <div className="program-page" style={{ padding: '10rem 5%', textAlign: 'center' }}>
        <h2>Program Not Found</h2>
        <p>The program you are looking for does not exist.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: '2rem' }}>Return Home</Link>
      </div>
    );
  }

  const { hero, infoCards, specializations, whyChoose, careers, cta } = data;

  return (
    <main className="program-page">
      {/* Hero Section */}
      <section className="program-hero">
        <div className="program-hero__content">
          <span className="program-hero__category">{hero.category}</span>
          <h1 className="program-hero__title" dangerouslySetInnerHTML={{ __html: hero.title.replace(/\((.*?)\)/g, '<span>($1)</span>') }} />
          <p className="program-hero__desc">{hero.description}</p>
        </div>
        <div className="program-hero__image-wrap">
          <div className="program-hero__image-inner">
            <img src={heroImage} alt={hero.title.replace('\n', ' ')} className="program-hero__image" />
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="program-info">
        <div className="program-info__grid">
          {infoCards.map((card, idx) => (
            <div className="program-info__card" key={idx}>
              <div className={`program-info__icon-wrap color-${card.color}`}>
                <div className="program-info__icon"><Icon name={card.icon} /></div>
              </div>
              <h3 className="program-info__card-title">{card.title}</h3>
              <p className="program-info__card-desc">{card.description}</p>
              <div className={`program-info__card-bar bg-${card.color}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section className="program-specializations">
        <div className="program-spec__header">
          <span className="program-spec__category">Specializations</span>
          <h2 className="program-spec__title">Explore Our Specializations</h2>
          <p className="program-spec__desc">Tailor your expertise with our industry-aligned specializations</p>
        </div>
        <div className="program-spec__grid">
          {specializations.map((spec, idx) => (
            <div className="program-spec__item" key={idx}>
              <div className={`program-spec__item-icon-wrap color-${spec.color}`}>
                <div className="program-spec__item-icon"><Icon name={spec.icon} /></div>
              </div>
              <div className="program-spec__item-content">
                <h4 className="program-spec__item-title">{spec.title}</h4>
                <p className="program-spec__item-desc">{spec.description}</p>
              </div>
              <div className="program-spec__item-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18L15 12L9 6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose SEG */}
      <section className="program-why">
        <h2 className="program-why__title">
          Why Choose <span>SEG</span> for {programId.toUpperCase() === 'MTECH' ? 'M.Tech' : programId.toUpperCase()}?
        </h2>
        <div className="program-why__grid">
          {whyChoose.map((item, idx) => (
            <div className="program-why__item" key={idx}>
              <div className={`program-why__icon-wrap color-${item.color}`}>
                <div className="program-why__icon"><Icon name={item.icon} /></div>
              </div>
              <h3 className="program-why__item-title">{item.title}</h3>
              <p className="program-why__item-desc">{item.description}</p>
              <div className={`program-why__item-bar bg-${item.color}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Careers */}
      <section className="program-careers">
        <h2 className="program-careers__title">Your Future <span>Career</span> Paths</h2>
        <div className="program-careers__grid">
          {careers.map((career, idx) => (
            <div className="program-career-item" key={idx}>
              <div className="program-career-item__icon-wrap">
                <div className="program-career-item__icon"><Icon name={career.icon} /></div>
              </div>
              <span className="program-career-item__title">{career.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="program-cta">
        <img src={ctaBg} alt="" className="program-cta__bg" />
        <div className="program-cta__image-wrap">
          {/* Using a placeholder if a specific cap image isn't available, or the hero image */}
          <img src={heroImage} alt="Graduation Cap" className="program-cta__image" />
        </div>
        <div className="program-cta__content">
          <h2 className="program-cta__title">{cta.title}</h2>
          <p className="program-cta__desc">{cta.description}</p>
          <div className="program-cta__buttons">
            <Link to="/contact-us" className="btn-primary">
              <Icon name="user-star" /> Apply Now
            </Link>
            <Link to="/contact-us" className="btn-outline">
              <Icon name="book" /> Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProgramPage;
