import React, { useState, useEffect, useMemo } from 'react';
import '../ExploreMore.css';

const filters = [
  { id: 'all', label: 'All Moments', icon: 'grid' },
  { id: 'campus', label: 'Campus Views', icon: 'building' },
  { id: 'library', label: 'Library', icon: 'book' },
  { id: 'transport', label: 'Transport', icon: 'bus' },
  { id: 'sports', label: 'Sports', icon: 'sports' },
  { id: 'gallery', label: 'Gallery', icon: 'camera' },
  { id: 'computer-labs', label: 'Computer Labs', icon: 'monitor' },
];

const CATEGORY_TO_ID = {
  'Campus Views': 'campus',
  Library: 'library',
  Transport: 'transport',
  Sports: 'sports',
  Gallery: 'gallery',
  'Computer Labs': 'computer-labs',
};

const categoryIcon = {
  campus: 'building',
  library: 'book',
  transport: 'bus',
  sports: 'sports',
  gallery: 'camera',
  'computer-labs': 'monitor',
};

function mapGalleryItem(item, index, showLargeFirst) {
  const category = CATEGORY_TO_ID[item.category] || 'campus';
  return {
    id: item.id,
    category,
    type: showLargeFirst && index === 0 ? 'large' : '',
    label: item.category,
    title: item.title,
    description: item.description || '',
    image: item.url,
  };
}

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
    case 'bus':
      return <svg viewBox="0 0 24 24" {...common}><path d="M8 6v6" /><path d="M15 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2L21 10H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1" /><circle cx="7" cy="18" r="2" /><path d="M9 18h5" /><circle cx="16" cy="18" r="2" /></svg>;
    case 'sports':
      return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>;
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
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setGalleryItems(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load gallery:', err);
        setLoading(false);
      });
  }, []);

  const mappedItems = useMemo(
    () => galleryItems.map((item, index) => mapGalleryItem(item, index, activeFilter === 'all')),
    [galleryItems, activeFilter]
  );

  const filteredItems = useMemo(
    () =>
      activeFilter === 'all'
        ? mappedItems
        : mappedItems.filter((item) => item.category === activeFilter),
    [mappedItems, activeFilter]
  );

  const stats = useMemo(() => {
    const countBy = (category) => galleryItems.filter((i) => i.category === category).length;
    return [
      { value: `${galleryItems.length || 0}+`, label: 'Moments Captured', icon: 'camera', color: 'blue' },
      { value: `${countBy('Sports') || 0}+`, label: 'Sports Moments', icon: 'sports', color: 'indigo' },
      { value: `${countBy('Computer Labs') || 0}+`, label: 'Computer Labs', icon: 'monitor', color: 'sky' },
      { value: `${countBy('Transport') || 0}+`, label: 'Transport', icon: 'bus', color: 'rose' },
    ];
  }, [galleryItems]);

  return (
    <div className="explore-more">
      <div className="explore-container">
        <header className="explore-header">
          <h1 className="explore-title">
            Life <span>@</span> <span className="seg-text">SEG</span>
          </h1>
          <p className="explore-subtitle">
            Explore our vibrant campus life through these moments
          </p>
        </header>

        <div className="explore-filters">
          {filters.map((filter) => (
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

        <main className="explore-gallery">
          {loading && (
            <p className="explore-gallery-status">Loading gallery...</p>
          )}
          {!loading && filteredItems.length === 0 && (
            <p className="explore-gallery-status">
              No images in this category yet. Add images from the admin Gallery page.
            </p>
          )}
          {!loading &&
            filteredItems.map((item) => (
              <div key={item.id} className={`gallery-item ${item.type || ''}`}>
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <span className="gallery-label">
                    <Icon type={categoryIcon[item.category] || 'grid'} />
                    {item.label}
                  </span>
                  <h3 className="gallery-title">{item.title}</h3>
                  {item.type === 'large' && item.description && (
                    <>
                      <p className="gallery-desc">{item.description}</p>
                      <button type="button" className="gallery-btn" aria-label="View">
                        <Icon type="arrow" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </main>

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
