import aboutBg from '../assets/images/saroj institue.jpeg';
import campusBg from '../assets/images/seg.jpeg';
import heroBg from '../assets/images/ssitm.jpeg';
import institutionsBg from '../assets/images/college of law.avif';
import placementsBg from '../assets/images/pharmacy.jpg';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 14V17M12 14V17M15 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10H16V12H8V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 7H14V9H10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LawIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 8H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 8L4 13H10L7 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M17 8L14 13H20L17 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PharmacyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 4H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 4V8L5.6 15.6C4.8 17 5.8 18.8 7.4 18.8H16.6C18.2 18.8 19.2 17 18.4 15.6L14 8V4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8.4 12.8H15.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GearIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3 2.9H13.7L14.2 5.1C14.8 5.3 15.3 5.6 15.8 5.9L17.9 5.2L19.6 7.8L18.1 9.4C18.2 9.8 18.3 10.3 18.3 10.8C18.3 11.2 18.2 11.7 18.1 12.1L19.6 13.8L17.9 16.4L15.8 15.7C15.3 16 14.8 16.3 14.2 16.5L13.7 18.7H10.3L9.8 16.5C9.2 16.3 8.7 16 8.2 15.7L6.1 16.4L4.4 13.8L5.9 12.1C5.8 11.7 5.7 11.2 5.7 10.8C5.7 10.3 5.8 9.8 5.9 9.4L4.4 7.8L6.1 5.2L8.2 5.9C8.7 5.6 9.2 5.3 9.8 5.1L10.3 2.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="10.8" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 7V5C7 3.9 7.9 3 9 3H15C16.1 3 17 3.9 17 5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 12.4L10.8 14.7L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const institutions = [
  {
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007',
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    image: heroBg,
    icon: <BuildingIcon />,
    url: 'https://ssitm.in/',
  },
  {
    title: 'Saroj Institute of Technology and Management',
    code: '123',
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    image: aboutBg,
    icon: <BuildingIcon />,
    url: 'https://sitmlko.org/',
  },
  {
    title: 'Saroj College of Law',
    code: 'BCI Approved',
    approval: 'Approved by Bar Council of India and affiliated to AKTU, Lucknow.',
    image: institutionsBg,
    icon: <LawIcon />,
    url: 'https://seglko.org/scl/',
  },
  {
    title: 'Saroj College of Pharmacy',
    code: '2031',
    approval: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow.',
    image: placementsBg,
    icon: <PharmacyIcon />,
    url: 'https://seglko.org/scp/',
  },
];

const featuredInstitution = {
  title: 'Saroj College of Engineering and Polytechnic',
  approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
  image: campusBg,
  icon: <GearIcon />,
  url: 'https://seglko.org/scep/',
};

function InstitutionCard({ institution }) {
  return (
    <article className="institutions-showcase__card">
      <img
        src={institution.image}
        alt={institution.title}
        className="institutions-showcase__card-image"
        loading="lazy"
      />
      <div className="institutions-showcase__card-badge">{institution.icon}</div>
      <div className="institutions-showcase__card-body">
        <h3 className="institutions-showcase__card-title">{institution.title}</h3>

        <div className="institutions-showcase__meta">
          <div className="institutions-showcase__meta-row institutions-showcase__meta-row--gold">
            <span className="institutions-showcase__meta-icon">
              <InfoIcon />
            </span>
            <span>College Code: {institution.code}</span>
          </div>
          <div className="institutions-showcase__meta-row institutions-showcase__meta-row--blue">
            <span className="institutions-showcase__meta-icon">
              <CheckIcon />
            </span>
            <span>{institution.approval}</span>
          </div>
        </div>

        <a
          href={institution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="institutions-showcase__link"
        >
          Explore Institute
          <span className="institutions-showcase__link-arrow">
            <ArrowRight />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function FullSections() {
  return (
    <section className="institutions-showcase" id="institutions-showcase">
      <div className="institutions-showcase__shell">
        <div className="institutions-showcase__header">
          <div className="institutions-showcase__intro">
            <div className="institutions-showcase__title-row">
              <span className="institutions-showcase__title-icon">
                <BuildingIcon />
              </span>
              <h2 className="institutions-showcase__title">Our Institutions</h2>
            </div>
            <span className="institutions-showcase__accent" />
            <p className="institutions-showcase__subtitle">
              A legacy of excellence across diverse disciplines, shaping future leaders and innovators.
            </p>
          </div>

        </div>

        <div className="institutions-showcase__grid">
          {institutions.map((institution) => (
            <InstitutionCard key={institution.title} institution={institution} />
          ))}
        </div>

        <article className="institutions-showcase__featured">
          <div className="institutions-showcase__featured-image-wrap">
            <img
              src={featuredInstitution.image}
              alt={featuredInstitution.title}
              className="institutions-showcase__featured-image"
              loading="lazy"
            />
            <span className="institutions-showcase__featured-badge">{featuredInstitution.icon}</span>
          </div>

          <div className="institutions-showcase__featured-content">
            <h3 className="institutions-showcase__featured-title">{featuredInstitution.title}</h3>

            <div className="institutions-showcase__meta-row institutions-showcase__meta-row--gold">
              <span className="institutions-showcase__meta-icon">
                <InfoIcon />
              </span>
              <span>{featuredInstitution.approval}</span>
            </div>

            <a
              href={featuredInstitution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="institutions-showcase__link institutions-showcase__link--featured"
            >
              Explore Institute
              <span className="institutions-showcase__link-arrow">
                <ArrowRight />
              </span>
            </a>
          </div>

          <span className="institutions-showcase__dots" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
