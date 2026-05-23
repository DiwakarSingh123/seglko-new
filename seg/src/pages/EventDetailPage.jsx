import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetailPage.css';
import heroBg from '../assets/images/hero-bg.png';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19M19 12L12 5M19 12L12 19" /></svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
);

const HexagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><circle cx="12" cy="12" r="3" /></svg>
);

const MentorshipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

const CollaborationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
);

const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
);

const eventsData = {
  'innovate-bharat-2026': {
    title: 'INNOVATE BHARAT 2026: National Hackathon for Real-World Innovation',
    day: '10',
    month: 'APR',
    year: '2026',
    category: 'Innovation & Technology',
    image: heroBg,
    location: 'SEG Campus, Lucknow',
    organizer: 'Saroj Education Group',
    summary: 'INNOVATE BHARAT 2026 is a 24-hour national hackathon that encourages students to build scalable, sustainable, and impactful solutions for real-world problems.',
    features: [
      { icon: <HexagonIcon />, title: 'Real-world Problem Statements' },
      { icon: <MentorshipIcon />, title: 'Expert Mentorship' },
      { icon: <CollaborationIcon />, title: 'Networking & Collaboration' },
      { icon: <GiftIcon />, title: 'Exciting Prizes & Recognition' },
    ],
    content: [
      'The hackathon brought together brilliant minds from across the nation to solve real-world challenges with innovative technology solutions and transform ideas into impact.',
      'The event witnessed enthusiastic participation from students and faculty, making it a memorable occasion for the university community. The inauguration of the TV Studio marks the beginning of a new era of innovation, creativity, and immersive learning for aspiring journalists, filmmakers, content creators, and media professionals at Saroj Education Group.',
      'Speaking on the occasion, Pro Chancellor Sh Y.K Gupta, highlighted that the establishment of the studio marks a major milestone in enhancing practical media education and nurturing future-ready professionals equipped with industry-relevant skills.'
    ]
  }
};

const upcomingEvents = [
  { day: '22', month: 'MAY', year: '2026', title: 'TECHSPARK 2026', subtitle: 'National Tech Conference', location: 'SEG Campus' },
  { day: '05', month: 'JUN', year: '2026', title: 'CULTURA 2026', subtitle: 'Annual Cultural Festival', location: 'SEG Campus' },
  { day: '18', month: 'JUN', year: '2026', title: 'SPORTS MEET 2026', subtitle: 'Annual Sports Championship', location: 'SEG Campus' },
];

const categories = [
  { label: 'Workshops', icon: '🌀', color: '#eef2ff' },
  { label: 'Seminars', icon: '📖', color: '#f0f9ff' },
  { label: 'Cultural', icon: '🏮', color: '#fff1f2' },
  { label: 'Sports', icon: '⚽', color: '#fff7ed' },
  { label: 'Research', icon: '🔬', color: '#f0fdf4' },
  { label: 'Placements', icon: '💼', color: '#eff6ff' },
  { label: 'Innovation', icon: '💡', color: '#f5f3ff' },
  { label: 'All Events', icon: '↔️', color: '#f8fafc' },
];

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = eventsData[slug] || eventsData['innovate-bharat-2026'];

  return (
    <div className="event-detail">
      <div className="event-detail__container">
        <main className="event-detail__main">
          {/* Hero Image Area */}
          <div className="event-hero__image-wrap">
            <img src={event.image} alt={event.title} className="event-hero__image" />
            <div className="event-hero__date-badge">
              <span className="event-hero__date-day">{event.day}</span>
              <span className="event-hero__date-month">{event.month}</span>
              <span className="event-hero__date-year">{event.year}</span>
            </div>
            <div className="event-hero__category">{event.category}</div>
          </div>

          <div className="event-header">
            <h1 className="event-header__title">{event.title}</h1>
            <div className="event-header__meta">
              <div className="event-meta-item"><CalendarIcon /> {event.day} {event.month} {event.year}</div>
              <div className="event-meta-item"><MapPinIcon /> {event.location}</div>
              <div className="event-meta-item"><UserIcon /> Organized by {event.organizer}</div>
              <div className="event-header__share">
                <span className="share-label">Share</span>
                <a href="#" className="share-icon share-icon--fb">f</a>
                <a href="#" className="share-icon share-icon--tw">𝕏</a>
                <a href="#" className="share-icon share-icon--in">in</a>
                <a href="#" className="share-icon share-icon--link"><LinkIcon /></a>
              </div>
            </div>
          </div>

          <div className="event-summary-box">
            <p className="event-summary-box__text">{event.summary}</p>
            <div className="event-features">
              {event.features.map((feat, idx) => (
                <div key={idx} className="event-feature">
                  <div className="event-feature__icon">{feat.icon}</div>
                  <span className="event-feature__title">{feat.title}</span>
                </div>
              ))}
            </div>
          </div>

          <article className="event-article">
            {event.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </article>
        </main>

        <aside className="event-detail__sidebar">
          {/* Upcoming Events */}
          <div className="sidebar-card">
            <div className="sidebar-card__header">
              <h3 className="sidebar-card__title">Upcoming Events</h3>
              <Link to="/events" className="view-all-link">View All</Link>
            </div>
            <div className="upcoming-events-list">
              {upcomingEvents.map((ev, idx) => (
                <div key={idx} className="upcoming-event">
                  <div className="upcoming-event__date">
                    <span className="upcoming-event__day">{ev.day}</span>
                    <span className="upcoming-event__month">{ev.month}</span>
                    <span className="upcoming-event__year">{ev.year}</span>
                  </div>
                  <div className="upcoming-event__info">
                    <h4 className="upcoming-event__title">{ev.title}</h4>
                    <p style={{ fontSize: '12px', color: '#5f6785', marginBottom: '4px' }}>{ev.subtitle}</p>
                    <div className="upcoming-event__location"><MapPinIcon /> {ev.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-card">
            <h3 className="sidebar-card__title" style={{ marginBottom: '24px' }}>Event Categories</h3>
            <div className="category-grid">
              {categories.map((cat, idx) => (
                <Link key={idx} to="#" className="category-item">
                  <div className="category-icon" style={{ background: cat.color }}>{cat.icon}</div>
                  <span className="category-label">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
