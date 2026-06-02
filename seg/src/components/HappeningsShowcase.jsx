import { Link } from 'react-router-dom';
import aboutBg from '../assets/images/hapen2.jpeg';
import campusBg from '../assets/images/eventImg9.jpeg';
import facultyBg from '../assets/images/hapen1.jpeg';
import heroBg from '../assets/images/HappeningsImage1.jpg';
import event from '../assets/images/sports-meet-10.jpeg';
import logoImg from '../assets/images/logo.png';
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 11V13C4 14.1 4.9 15 6 15H7L9 19H11L9.5 15H12L18 18V6L12 9H6C4.9 9 4 9.9 4 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3H14L18 7V21H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 3V7H18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 11H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 15H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5.5 18C5.5 15.4 8.4 13.5 12 13.5C15.6 13.5 18.5 15.4 18.5 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
    <path d="M8 3.8V7M16 3.8V7M4 9.5H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M8.2 13H8.21M12 13H12.01M15.8 13H15.81M8.2 16.4H8.21M12 16.4H12.01M15.8 16.4H15.81" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const GroupIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4.5 18C4.5 15.9 6.3 14.4 8.6 14.4C9.8 14.4 10.9 14.8 11.7 15.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19.5 18C19.5 15.9 17.7 14.4 15.4 14.4C14.2 14.4 13.1 14.8 12.3 15.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7.8 18C7.8 15.4 9.6 13.7 12 13.7C14.4 13.7 16.2 15.4 16.2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4H16V7.4C16 9.9 14.2 12 12 12C9.8 12 8 9.9 8 7.4V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8 5.5H5C5 8 6 9.8 8.3 10.4M16 5.5H19C19 8 18 9.8 15.7 10.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12V16M9 20H15M9.5 16H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const NotesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3.5" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 8H15.5M8.5 12H15.5M8.5 16H12.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 3.5V6.2M16 3.5V6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CapIcon = () => (
  <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="44" cy="44" r="41" stroke="rgba(255,255,255,0.95)" strokeWidth="4" />
    <path d="M22 38L44 29L66 38L44 47L22 38Z" fill="#FDB515" />
    <path d="M31 42V53.5C31 55 38 59 44 59C50 59 57 55 57 53.5V42" fill="#FDB515" />
    <path d="M63 39V50.5" stroke="#FDB515" strokeWidth="4" strokeLinecap="round" />
    <circle cx="63" cy="54.5" r="4" fill="#FDB515" />
  </svg>
);

const eventCards = [
  {
    title: 'Enhancing Research Practices: SSHSS Hosts FDP on Data Analysis and AI-Driven Insights',
    day: '17',
    month: 'Apr',
    year: '2026',
    color: 'coral',
    image: facultyBg,
    slug: 'enhancing-research-practices',
  },
  {
    title: 'Jashn-e-Riwayat: A Heartfelt Farewell Celebration Honoring Tradition and Legacy',
    day: '17',
    month: 'Apr',
    year: '2026',
    color: 'mint',
    image: aboutBg,
    slug: 'jashn-e-riwayat',
  },
  {
    title: 'INNOVATE BHARAT 2026: National Hackathon for Real-World Innovation',
    day: '10',
    month: 'Apr',
    year: '2026',
    color: 'blue',
    image: heroBg,
    slug: 'innovate-bharat-2026',
  },
  {
    title: 'Belliatus Cultura 2026 - 9th Northeast Cultural Fest',
    day: '18',
    month: 'Mar',
    year: '2026',
    color: 'gold',
    image: campusBg,
    slug: 'belliatus-cultura-2026',
  },
  {
    title: 'Annual Sports Meet 2026 - Celebrating Excellence in Athletics',
    day: '05',
    month: 'Mar',
    year: '2026',
    color: 'coral',
    image: event,
    slug: 'annual-sports-meet-2026',
  },
];

const announcements = [
  {
    day: '04',
    month: 'May',
    year: '2026',
    title: 'Notification no. 24 Regulations for the Award of the Chancellors Gold Medal (Be...',
    downloadTitle: 'Notification no. 24 Regulations for the Award of the Chancellors Gold Medal',
    fileName: 'notification-24-chancellors-gold-medal.txt',
    color: 'coral',
    icon: <DocIcon />,
  },
  {
    day: '04',
    month: 'May',
    year: '2026',
    title: 'OFFICE ORDER No. 29 Appointment of Head of Department of Biotechnology, SSBT- ...',
    downloadTitle: 'OFFICE ORDER No. 29 Appointment of Head of Department of Biotechnology, SSBT',
    fileName: 'office-order-29-biotechnology-head-appointment.txt',
    color: 'mint',
    icon: <DocIcon />,
  },
  {
    day: '02',
    month: 'May',
    year: '2026',
    title: 'Appointment of Chief Vigilance Officer (CVO) - Prof. (Dr.) Shajee Mohan, SSCSE',
    downloadTitle: 'Appointment of Chief Vigilance Officer (CVO) - Prof. (Dr.) Shajee Mohan, SSCSE',
    fileName: 'chief-vigilance-officer-appointment.txt',
    color: 'blue',
    icon: <UserIcon />,
  },
];

const getAnnouncementDownloadHref = (item) => {
  const content = [
    'Saroj Educational Group',
    '',
    item.downloadTitle || item.title,
    `Date: ${item.day} ${item.month} ${item.year}`,
  ].join('\n');

  return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
};

const announcementStats = [
  {
    value: '25+',
    label: 'Events Organized',
    sublabel: 'This Month',
    color: 'blue',
    icon: <CalendarIcon />,
  },
  {
    value: '1200+',
    label: 'Students',
    sublabel: 'Participated',
    color: 'gold',
    icon: <GroupIcon />,
  },
  {
    value: '15+',
    label: 'Achievements &',
    sublabel: 'Recognitions',
    color: 'mint',
    icon: <TrophyIcon />,
  },
  {
    value: '30+',
    label: 'Announcements',
    sublabel: 'This Month',
    color: 'violet',
    icon: <NotesIcon />,
  },
];

export default function HappeningsShowcase() {
  return (
    <section className="happenings-showcase" id="happenings-showcase">
      <div className="happenings-showcase__shell">
        <div className="happenings-showcase__header">
          <div className="happenings-showcase__intro">
            <span className="happenings-showcase__spark" aria-hidden="true" />
            <h2 className="happenings-showcase__title">
              WHAT&apos;S HAPPENING
              <br />
              <span>IN SAROJ</span>
            </h2>
            <span className="happenings-showcase__accent" />
          </div>

          <Link to="/institutions" className="btn btn--primary happenings-showcase__cta" id="happenings-showcase-btn">
            View more
            <span className="btn__arrow">
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="happenings-showcase__events">
          {eventCards.map((event) => (
            <article className="happenings-showcase__event-card" key={event.title}>
              <div className="happenings-showcase__event-media">
                <img src={event.image} alt={event.title} className="happenings-showcase__event-image" loading="lazy" />
                <div className={`happenings-showcase__date happenings-showcase__date--${event.color}`}>
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                  <span>{event.year}</span>
                </div>
              </div>

              <div className="happenings-showcase__event-body">
                <h3 className="happenings-showcase__event-title">{event.title}</h3>
                <Link to={`/events/${event.slug}`} className="happenings-showcase__event-link" aria-label={event.title}>
                  <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="happenings-showcase__announcements">
          <div className="happenings-showcase__announcements-head">
            <div className="happenings-showcase__announcements-title-wrap">
              <span className="happenings-showcase__announcements-icon">
                <MegaphoneIcon />
              </span>
              <div className="happenings-showcase__announcements-title-block">
                <h3 className="happenings-showcase__announcements-title">ANNOUNCEMENTS</h3>
                <span className="happenings-showcase__announcements-accent" />
              </div>
            </div>

           
          </div>

          <div className="happenings-showcase__announcement-list">
            {announcements.map((item) => (
              <article className="happenings-showcase__announcement" key={`${item.day}-${item.title}`}>
                <div className={`happenings-showcase__announcement-date happenings-showcase__announcement-date--${item.color}`}>
                  <strong>{item.day}</strong>
                  <span>{item.month}</span>
                  <span>{item.year}</span>
                </div>

                <span className={`happenings-showcase__announcement-icon-card happenings-showcase__announcement-icon-card--${item.color}`}>
                  {item.icon}
                </span>

                <p className="happenings-showcase__announcement-text">{item.title}</p>

                <a
                  href={getAnnouncementDownloadHref(item)}
                  download={item.fileName}
                  className="happenings-showcase__announcement-arrow"
                  aria-label={`Download ${item.downloadTitle || item.title}`}
                >
                  <ArrowRight />
                </a>
              </article>
            ))}
          </div>

          <div className="happenings-showcase__stats-strip">
            {announcementStats.map((item) => (
              <article className="happenings-showcase__stat" key={`${item.value}-${item.label}`}>
                <span className={`happenings-showcase__stat-icon happenings-showcase__stat-icon--${item.color}`}>
                  {item.icon}
                </span>
                <div className="happenings-showcase__stat-copy">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <span>{item.sublabel}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="happenings-showcase__cta-section">
          <article className="happenings-showcase__cta-panel">
            <span className="happenings-showcase__cta-rail happenings-showcase__cta-rail--left" aria-hidden="true" />
            <span className="happenings-showcase__cta-rail happenings-showcase__cta-rail--right" aria-hidden="true" />
            <span className="happenings-showcase__cta-dots happenings-showcase__cta-dots--left" aria-hidden="true" />
            <span className="happenings-showcase__cta-dots happenings-showcase__cta-dots--right" aria-hidden="true" />

            <div className="happenings-showcase__cta-visual">
              <div className="happenings-showcase__cta-orbit">
                <CapIcon />
              </div>
            </div>

            <div className="happenings-showcase__cta-content">
              <h3 className="happenings-showcase__cta-title">
                <span className="happenings-showcase__cta-title-line">Start Your Journey with</span>
                <span className="happenings-showcase__cta-title-highlight">Saroj Education Group</span>
              </h3>

              <div className="happenings-showcase__cta-actions">
                <a href="https://ssitm.in/" target="_blank" rel="noopener noreferrer" className="btn btn--primary happenings-showcase__cta-button">
                  Apply now
                  <span className="btn__arrow">
                    <ArrowRight />
                  </span>
                </a>

                <a href="#happenings-showcase" className="btn btn--secondary happenings-showcase__cta-button happenings-showcase__cta-button--light">
                  Speak with Expert
                  <span className="btn__arrow">
                    <ArrowRight />
                  </span>
                </a>
              </div>
            </div>

            <div className="happenings-showcase__cta-building" aria-hidden="true">
              <span className="happenings-showcase__building-block happenings-showcase__building-block--left" />
              <span className="happenings-showcase__building-block happenings-showcase__building-block--center" />
              <span className="happenings-showcase__building-block happenings-showcase__building-block--right" />
            </div>

            <div className="happenings-showcase__cta-badge">
              <span className="happenings-showcase__cta-badge-text">Admission<br />open</span>
              <img src={logoImg} alt="SEG Logo" className="happenings-showcase__cta-badge-logo" />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
