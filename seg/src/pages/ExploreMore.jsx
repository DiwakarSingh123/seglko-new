import React, { useState } from 'react';
import '../ExploreMore.css';
import aboutBgImg from '../assets/images/about-bg.png';
import campusBgImg from '../assets/images/campus-bg.png';
import facultyBgImg from '../assets/images/faculty-bg.png';
import exploreHeroImg from '../assets/images/explore-hero.png';
import placementsBgImg from '../assets/images/placements-bg.png';
import institutionsBgImg from '../assets/images/institutions-bg.png';

const filters = [
  { id: 'all', label: 'All Moments', icon: 'grid' },
  { id: 'campus', label: 'Campus Views', icon: 'building' },
  { id: 'library', label: 'Library', icon: 'book' },
  { id: 'students', label: 'Students', icon: 'users' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'facilities', label: 'Facilities', icon: 'monitor' },
];

const galleryItems = [
  {
    id: 1,
    category: 'campus',
    type: 'large',
    label: 'Campus Views',
    title: 'Welcome to SEG',
    description: 'Where dreams take shape',
    image: exploreHeroImg,
  },
  {
    id: 2,
    category: 'campus',
    label: 'Our Campus',
    title: 'Main Academic Block',
    image: campusBgImg,
  },
  {
    id: 3,
    category: 'library',
    label: 'Library Moments',
    title: 'Resource Center',
    image: aboutBgImg,
  },
  {
    id: 4,
    category: 'students',
    label: 'Student Life',
    title: 'Vibrant Community',
    image: placementsBgImg,
  },
  {
    id: 5,
    category: 'students',
    label: 'Learning & Growth',
    title: 'Innovative Labs',
    image: facultyBgImg,
  },
  {
    id: 6,
    category: 'library',
    label: 'Knowledge Hub',
    title: 'Peaceful Study Zone',
    image: institutionsBgImg,
  },
  {
    id: 7,
    category: 'facilities',
    label: 'Computer Labs',
    title: 'High-Tech Infrastructure',
    image: campusBgImg,
  },
  {
    id: 8,
    category: 'facilities',
    label: 'Modern Classroom',
    title: 'Smart Learning Space',
    image: aboutBgImg,
  },
  {
    id: 9,
    category: 'events',
    label: 'Workshop',
    title: 'Skill Development',
    image: facultyBgImg,
  },
  {
    id: 10,
    category: 'campus',
    label: 'Transport',
    title: 'Our Bus Fleet',
    image: institutionsBgImg,
  },
  {
    id: 11,
    category: 'campus',
    label: 'Campus Aerial',
    title: 'Green Surroundings',
    image: placementsBgImg,
  }
];

const stats = [
  { value: '500+', label: 'Moments Captured', icon: 'camera', color: 'blue' },
  { value: '2000+', label: 'Active Students', icon: 'users', color: 'indigo' },
  { value: '15+', label: 'Campus Facilities', icon: 'building', color: 'sky' },
  { value: 'Infinite', label: 'Memories Created', icon: 'heart', color: 'rose' },
];

const Icon = ({ type }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'grid':
      return <svg viewBox="0 0 24 24" {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
    case 'building':
      return <svg viewBox="0 0 24 24" {...common}><path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M9 9h6" /><path d="M9 13h6" /><path d="M9 17h6" /></svg>;
    case 'book':
      return <svg viewBox="0 0 24 24" {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case 'users':
      return <svg viewBox="0 0 24 24" {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case 'calendar':
      return <svg viewBox="0 0 24 24" {...common}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case 'monitor':
      return <svg viewBox="0 0 24 24" {...common}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
    case 'camera':
      return <svg viewBox="0 0 24 24" {...common}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>;
    case 'heart':
      return <svg viewBox="0 0 24 24" {...common}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
    case 'arrow':
      return <svg viewBox="0 0 24 24" {...common}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
    default:
      return null;
  }
};

const ExploreMore = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="explore-more">
      <div className="explore-container">
        {/* Header Section */}
        <header className="explore-header">
          <h1 className="explore-title">
            Life <span>@</span> <span className="seg-text">SEG</span>
          </h1>
          <p className="explore-subtitle">
            Explore our vibrant campus life through these moments
          </p>
        </header>

        {/* Filter Bar */}
        <div className="explore-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <Icon type={filter.icon} />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <main className="explore-gallery">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className={`gallery-item ${item.type || ''}`}
            >
              <img src={item.image} alt={item.title} />
              <div className="gallery-overlay">
                <span className="gallery-label">
                  <Icon type={item.category === 'campus' ? 'building' : item.category === 'library' ? 'book' : item.category === 'students' ? 'users' : item.category === 'events' ? 'calendar' : 'monitor'} />
                  {item.label}
                </span>
                <h3 className="gallery-title">{item.title}</h3>
                {item.type === 'large' && (
                  <>
                    <p className="gallery-desc">{item.description}</p>
                    <button className="gallery-btn">
                      <Icon type="arrow" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </main>

        {/* Stats Bar */}
        <section className="explore-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className={`stat-icon ${stat.color}`}>
                <Icon type={stat.icon} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ExploreMore;
