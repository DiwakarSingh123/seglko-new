import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import aboutBg from '../assets/images/hapen2.jpeg';
import campusBg from '../assets/images/eventImg9.jpeg';
import facultyBg from '../assets/images/hapen1.jpeg';
import heroBg from '../assets/images/HappeningsImage1.jpg';
import event from '../assets/images/sports-meet-10.jpeg';
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

const eventCards = [
  {
    title: 'Enhancing Research Practices: SSHSS Hosts FDP on Data Analysis and AI-Driven Insights',
    description: 'A Faculty Development Program focused on modern data analysis techniques and AI-driven research methodologies.',
    day: '17',
    month: 'Apr',
    year: '2026',
    color: 'coral',
    image: facultyBg,
    slug: 'enhancing-research-practices',
  },
  {
    title: 'Jashn-e-Riwayat: A Heartfelt Farewell Celebration Honoring Tradition and Legacy',
    description: 'A grand farewell event celebrating the journey of outgoing students with cultural performances and memories.',
    day: '17',
    month: 'Apr',
    year: '2026',
    color: 'mint',
    image: aboutBg,
    slug: 'jashn-e-riwayat',
  },
  {
    title: 'INNOVATE BHARAT 2026: National Hackathon for Real-World Innovation',
    description: 'A national-level hackathon inviting students to build innovative solutions for real-world challenges.',
    day: '10',
    month: 'Apr',
    year: '2026',
    color: 'blue',
    image: heroBg,
    slug: 'innovate-bharat-2026',
  },
  {
    title: 'Belliatus Cultura 2026 - 9th Northeast Cultural Fest',
    description: 'The 9th edition of our flagship cultural festival celebrating diversity, art, and student talent.',
    day: '18',
    month: 'Mar',
    year: '2026',
    color: 'gold',
    image: campusBg,
    slug: 'belliatus-cultura-2026',
  },
  {
    title: 'Annual Sports Meet 2026 - Celebrating Excellence in Athletics',
    description: 'A celebration of sportsmanship and athletic excellence with competitions across multiple disciplines.',
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

const AdScriptBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const existing = containerRef.current.querySelector('script[src*="profitableratecpmnetwork"]');
    if (existing) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://pl31584952.profitableratecpmnetwork.com/12/43/ae/1243aead08d0066918f6f86a2f04aace.js';
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ad-banner-slot"
      style={{
        width: '100%',
        minHeight: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

const AdHighRevenueBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    if (bannerRef.current.querySelector('iframe') || bannerRef.current.querySelector('script')) return;

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : 'e93df10eb258c67a460e377aecd5a03d',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://www.highrevenueformat.com/e93df10eb258c67a460e377aecd5a03d/invoke.js';

    bannerRef.current.appendChild(confScript);
    bannerRef.current.appendChild(invokeScript);

    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="ad-high-revenue-slot"
      style={{
        width: '100%',
        minHeight: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default function HappeningsShowcase() {
  const [apiEvents, setApiEvents] = useState([]);
  const [apiAnnouncements, setApiAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHappenings = async () => {
      try {
        const response = await fetch(api('/api/happenings'));
        if (response.ok) {
          const data = await response.json();
          setApiEvents(data.filter(d => d.type === 'whats_happening'));
          setApiAnnouncements(data.filter(d => d.type === 'announcement'));
        }
      } catch (error) {
        console.error('Error fetching happenings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHappenings();
  }, []);

  const displayEvents = apiEvents.length > 0 ? apiEvents.slice(0, 5) : eventCards;

  const processedEvents = displayEvents.map((evt, idx) => {
    if (evt.day && evt.month && evt.year) {
      return {
        title: evt.title,
        day: evt.day,
        month: evt.month,
        year: evt.year,
        color: evt.color,
        image: evt.image,
        description: evt.description || '',
        eventLink: `/events/${evt.slug}`,
        isExternal: false,
      };
    }

    const parsedDate = new Date(evt.date);
    const day = isNaN(parsedDate.getTime()) ? '' : String(parsedDate.getDate()).padStart(2, '0');
    const month = isNaN(parsedDate.getTime()) ? '' : parsedDate.toLocaleString('default', { month: 'short' });
    const year = isNaN(parsedDate.getTime()) ? '' : String(parsedDate.getFullYear());

    const colors = ['coral', 'mint', 'blue', 'gold'];
    const color = colors[idx % colors.length];

    const fallbackImages = [heroBg, campusBg, facultyBg, aboutBg, event];
    const fallbackImage = fallbackImages[idx % fallbackImages.length];

    let eventLink = '#';
    let isExt = false;
    if (evt.url && evt.url !== '#') {
      eventLink = evt.url;
      isExt = evt.url.startsWith('http://') || evt.url.startsWith('https://');
    } else if (evt.title) {
      const slug = evt.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      eventLink = `/events/${slug}`;
    }

    return {
      title: evt.title,
      day,
      month,
      year,
      color,
      image: evt.image || fallbackImage,
      description: evt.description || '',
      eventLink,
      isExternal: isExt,
    };
  });

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
          {processedEvents.map((event, idx) => (
            <article className="happenings-showcase__event-card" key={event.title || idx}>
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
                {event.description && (
                  <p className="happenings-showcase__event-desc">{event.description}</p>
                )}
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
            {(apiAnnouncements.length > 0 ? apiAnnouncements.map((item) => ({
              day: new Date(item.date).getDate().toString().padStart(2, '0'),
              month: new Date(item.date).toLocaleString('default', { month: 'short' }),
              year: new Date(item.date).getFullYear().toString(),
              title: item.title,
              downloadTitle: item.title,
              fileName: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.txt',
              color: 'blue',
              icon: <DocIcon />,
              description: item.description,
            })) : announcements).map((item) => (
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

        <section className="happenings-showcase__cta-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', width: '100%', margin: '2.5rem 0' }}>
          <AdScriptBanner />
          <AdHighRevenueBanner />
        </section>
      </div>
    </section>
  );
}
