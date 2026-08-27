import React, { useState, useEffect } from 'react';
import '../ExploreMore.css';
import { api } from '../api.js';

// Category to filter mapping
const CATEGORY_MAP = {
  'campus': 'Campus Views',
  'library': 'Library',
  'students': 'Gallery',
  'events': 'Sports',
  'facilities': 'Computer Labs',
  'transport': 'Transport',
  'recruitment': 'Campus Recruitment',
};

const filters = [
  { id: 'all', label: 'All Moments', icon: 'grid' },
  { id: 'campus', label: 'Campus Views', icon: 'building' },
  { id: 'library', label: 'Library', icon: 'book' },
  { id: 'students', label: 'Gallery', icon: 'users' },
  { id: 'events', label: 'Sports', icon: 'calendar' },
  { id: 'facilities', label: 'Computer Labs', icon: 'monitor' },
  { id: 'transport', label: 'Transport', icon: 'building' },
  { id: 'recruitment', label: 'Campus Recruitment', icon: 'briefcase' },
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
    case 'briefcase':
      return <svg viewBox="0 0 24 24" {...common}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="12" /><path d="M2 12h20" /></svg>;
    case 'arrow':
      return <svg viewBox="0 0 24 24" {...common}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
    default:
      return null;
  }
};

const ExploreMore = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api('/api/gallery'))
      .then(res => res.json())
      .then(data => {
        setGalleryItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Map DB category to filter id
  const getCategoryId = (dbCategory) => {
    const map = {
      'Campus Views': 'campus',
      'Library': 'library',
      'Gallery': 'students',
      'Sports': 'events',
      'Computer Labs': 'facilities',
      'Transport': 'transport',
      'Campus Recruitment': 'recruitment',
    };
    return map[dbCategory] || 'campus';
  };

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => getCategoryId(item.category) === activeFilter);

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
          {loading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#666' }}>Loading gallery...</div>
          ) : filteredItems.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#888' }}>No images found. Add images from admin dashboard.</div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item._id || index}
                className={`gallery-item ${index === 0 && activeFilter === 'all' ? 'large' : ''}`}
              >
                <img src={item.url} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-label">
                    <Icon type={getCategoryId(item.category) === 'campus' ? 'building' : getCategoryId(item.category) === 'library' ? 'book' : getCategoryId(item.category) === 'students' ? 'users' : getCategoryId(item.category) === 'events' ? 'calendar' : 'monitor'} />
                    {item.category}
                  </span>
                  <h3 className="gallery-title">{item.title}</h3>
                  {item.description && (
                    <p className="gallery-desc">{item.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
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
