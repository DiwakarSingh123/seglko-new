import { useNavigate } from 'react-router-dom';
import placementsBg from '../assets/images/placements-bg.png';
import program1 from '../assets/images/surender pratap.jpeg';
import program2 from '../assets/images/shaloni devi.jpeg';
import program3 from '../assets/images/Pramudit Shukla.jpeg';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PartyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4L20 10L12.5 12.5L10 20L5 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M13 4L14 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M18 5L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M18 9H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 18C4 15.8 6.2 14 9 14C11.8 14 14 15.8 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21V5H19V21" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 9H9.01M15 9H15.01M9 13H9.01M15 13H15.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const GrowthIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 15V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 15V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 15V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 10L11.5 6.5L15.2 8.4L20 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MedalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9.5 13L8 21L12 18.5L16 21L14.5 13" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 7V5.5C8 4.1 9.1 3 10.5 3H13.5C14.9 3 16 4.1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="4" y="7" width="16" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 12H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const successCards = [
  {
    name: 'surender pratap',
    course: 'B.Tech CSE 4th Year',
    packageLabel: '4.00 LPA',
    company: 'Eclat Health Solution India',
    role: 'Software Developer',
    image: program1,
    logo: 'SQUAREIT',
  },
  {
    name: 'Shaloni Devi',
    course: 'B.Pharm 4th Year',
    packageLabel: '18.00 LPA',
    company: 'Max Healthcare',
    role: 'Executive',
    image: program2,
    logo: 'MAX',
  },
  {
    name: 'Pramudit Shukla',
    course: 'Diploma in CSE',
    packageLabel: '12.00 LPA',
    company: 'TechMech',
    role: 'Full Stack Developer',
    image: program3,
    logo: 'TECHMECH',
  },
];

const placementStats = [
  { label: 'Students Placed', value: '1000+', icon: <PeopleIcon />, tone: 'gold' },
  { label: 'Recruiting Partners', value: '250+', icon: <BuildingIcon />, tone: 'blue' },
  { label: 'Placement Rate', value: 'High', icon: <GrowthIcon />, tone: 'green' },
  { label: 'Top Industry Roles', value: 'Top', icon: <MedalIcon />, tone: 'violet' },
];

const CognizantLogo = () => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="110" height="36">
    <circle cx="20" cy="20" r="14" fill="#0033a0" />
    <path d="M20 10 a10 10 0 0 0 0 20" fill="none" stroke="white" strokeWidth="3" />
    <text x="38" y="25" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#0033a0">Cognizant</text>
  </svg>
);

const AccentureLogo = () => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="110" height="36">
    <polygon points="55,6 65,6 60,16" fill="#a100ff" />
    <text x="10" y="30" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#000">accenture</text>
  </svg>
);

const AonLogo = () => (
  <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" width="70" height="36">
    <rect width="80" height="40" fill="#cc0000" rx="4" />
    <text x="50%" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="20" fill="white">Aon</text>
  </svg>
);

const AsianPaintsLogo = () => (
  <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="120" height="36">
    <circle cx="18" cy="20" r="13" fill="#e31e24" />
    <circle cx="18" cy="20" r="7" fill="#f7941d" />
    <circle cx="18" cy="20" r="3" fill="white" />
    <text x="36" y="25" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="#e31e24">Asian Paints</text>
  </svg>
);

const CMCLogo = () => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="110" height="36">
    <rect width="120" height="40" fill="#003087" rx="4" />
    <text x="50%" y="26" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">CMC Limited</text>
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width="100" height="36">
    <text x="0" y="30" fontFamily="Arial" fontWeight="bold" fontSize="26">
      <tspan fill="#4285F4">G</tspan>
      <tspan fill="#EA4335">o</tspan>
      <tspan fill="#FBBC05">o</tspan>
      <tspan fill="#4285F4">g</tspan>
      <tspan fill="#34A853">l</tspan>
      <tspan fill="#EA4335">e</tspan>
    </text>
  </svg>
);

const HDFCLogo = () => (
  <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="120" height="36">
    <rect width="130" height="40" fill="#004C8F" rx="4" />
    <text x="50%" y="26" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white">HDFC BANK</text>
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="120" height="36">
    <rect x="0" y="4" width="14" height="14" fill="#F25022" />
    <rect x="16" y="4" width="14" height="14" fill="#7FBA00" />
    <rect x="0" y="20" width="14" height="14" fill="#00A4EF" />
    <rect x="16" y="20" width="14" height="14" fill="#FFB900" />
    <text x="36" y="26" fontFamily="Arial" fontSize="13" fill="#737373">Microsoft</text>
  </svg>
);

const NIITLogo = () => (
  <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" width="70" height="36">
    <text x="0" y="30" fontFamily="Arial" fontWeight="bold" fontSize="26">
      <tspan fill="#e2001a">N</tspan>
      <tspan fill="#003087">I</tspan>
      <tspan fill="#e2001a">I</tspan>
      <tspan fill="#003087">T</tspan>
    </text>
  </svg>
);

const TCSLogo = () => (
  <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" width="70" height="36">
    <text x="0" y="30" fontFamily="Arial" fontWeight="bold" fontSize="24" fill="#f15a22">TCS</text>
    <line x1="0" y1="33" x2="52" y2="33" stroke="#002b5c" strokeWidth="2" />
  </svg>
);

const hiringPartners = [
  { name: 'Cognizant', LogoComponent: CognizantLogo },
  { name: 'Accenture', LogoComponent: AccentureLogo },
  { name: 'AON', LogoComponent: AonLogo },
  { name: 'Asian Paints', LogoComponent: AsianPaintsLogo },
  { name: 'CMC Limited', LogoComponent: CMCLogo },
  { name: 'Google', LogoComponent: GoogleLogo },
  { name: 'HDFC Bank', LogoComponent: HDFCLogo },
  { name: 'Microsoft', LogoComponent: MicrosoftLogo },
  { name: 'NIIT', LogoComponent: NIITLogo },
  { name: 'TCS', LogoComponent: TCSLogo },
];

function PlacementCard({ card }) {
  return (
    <article className="placements-showcase__card">
      <div className="placements-showcase__photo-wrap">
        <img src={card.image} alt={card.name} className="placements-showcase__photo" loading="lazy" />
      </div>

      <div className="placements-showcase__card-body">
        <div className="placements-showcase__card-head">
          <span className="placements-showcase__celebrate">
            <PartyIcon />
          </span>
          <div>
            <h3>Congratulations!</h3>
            <p className="placements-showcase__student-name">{card.name}</p>
          </div>
        </div>

        <p className="placements-showcase__card-copy">
          We feel immensely proud to announce that our student, <strong>{card.name}</strong>, from the <strong>{card.course} batch</strong>,
          has been successfully placed at <strong className="text-blue">{card.company}</strong> as a <strong className="text-blue">{card.role}</strong>!
        </p>

        <div className="placements-showcase__package-row">
          <div className="placements-showcase__package">{card.packageLabel}</div>
          <div className="placements-showcase__company-pill">{card.logo}</div>
        </div>

        <div className="placements-showcase__signoff">
          <span>Best Wishes,</span>
          <strong>Saroj Educational Group</strong>
        </div>
      </div>
    </article>
  );
}

export default function PlacementsShowcase() {
  const navigate = useNavigate();
  return (
    <section className="placements-showcase" id="placements-showcase">
      <div className="placements-showcase__shell">
        <div className="placements-showcase__header">
          <div className="placements-showcase__intro">
            <h2 className="placements-showcase__title">
              Recent <span>Placements</span>
            </h2>
            <span className="placements-showcase__accent" />
            <p className="placements-showcase__subtitle">
              Celebrating the success of our students who are building great careers with top companies.
            </p>
          </div>

          <button className="btn btn--primary placements-showcase__cta" onClick={() => { navigate('/placements'); window.scrollTo(0, 0); }}>
            View More Success Stories
            <span className="btn__arrow">
              <ArrowRight />
            </span>
          </button>
        </div>

        <div className="placements-showcase__grid">
          <PlacementCard card={successCards[0]} />
          <PlacementCard card={successCards[1]} />
          <PlacementCard card={successCards[2]} />

          <section className="placements-showcase__stats-card">
            <div
              className="placements-showcase__stats-hero"
              style={{ backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.9)))` }}
            >
              <div className="placements-showcase__stats-copy">
                <h3>
                  Building Careers.
                  <br />
                  <span>Creating Futures.</span>
                </h3>
                <span className="placements-showcase__accent placements-showcase__accent--small" />
                <p>
                  Our strong industry connections and placement support help students turn their potential into successful careers.
                </p>
              </div>

              <div className="placements-showcase__stats-grid">
                {placementStats.map((stat) => (
                  <div className="placements-showcase__stat" key={stat.label}>
                    <div className={`placements-showcase__stat-icon placements-showcase__stat-icon--${stat.tone}`}>
                      {stat.icon}
                    </div>
                    <div className="placements-showcase__stat-copy">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="placements-showcase__partners">
          <div className="placements-showcase__partners-label">
            <span className="placements-showcase__partners-icon">
              <BriefcaseIcon />
            </span>
            <div className="placements-showcase__partners-copy">
              <strong>Placement &amp;</strong>
              <strong>Hiring Partners</strong>
            </div>
          </div>

          <div className="placements-showcase__partners-rail">
            <div className="placements-showcase__partners-track">
              {[...hiringPartners, ...hiringPartners].map((partner, index) => (
                <div className="placements-showcase__partner-item" key={`${partner.name}-${index}`}>
                  <partner.LogoComponent />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
