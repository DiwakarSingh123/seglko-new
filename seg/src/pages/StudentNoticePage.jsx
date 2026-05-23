import { useState, useEffect } from 'react';

const categoryColors = {
  'Placements': '#dcfce7',
  'Examinations': '#ede9fe',
  'Events': '#fee2e2',
  'General': '#dbeafe',
  'Exam': '#ede9fe',
  'Scholarship': '#dcfce7',
  'Event': '#fee2e2',
};
const categoryTextColors = {
  'Placements': '#16a34a',
  'Examinations': '#7c3aed',
  'Events': '#dc2626',
  'General': '#1d4ed8',
  'Exam': '#7c3aed',
  'Scholarship': '#16a34a',
  'Event': '#dc2626',
};

const fallbackNotices = [
  {
    id: 1,
    title: "Examination Schedule - Even Semester 2024",
    category: "Exam",
    dept: "SIET",
    date: "May 10, 2024",
    tag: "⭐ Important",
    isUnread: false,
    isImportant: true,
    dot: "#8b5cf6",
    icon: "🎓",
    iconBg: "#f5f3ff",
    dateValue: new Date("May 10, 2024"),
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000"
  },
  {
    id: 2,
    title: "Scholarship Application Form 2024-25",
    category: "Scholarship",
    dept: "All",
    date: "May 8, 2024",
    tag: "⭐ Important",
    isUnread: false,
    isImportant: true,
    dot: "#22c55e",
    icon: "💰",
    iconBg: "#f0fdf4",
    dateValue: new Date("May 8, 2024"),
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000"
  },
  {
    id: 3,
    title: "Annual Sports Meet Registration Open",
    category: "Event",
    dept: "All",
    date: "May 5, 2024",
    tag: null,
    isUnread: false,
    isImportant: false,
    dot: "#e31e24",
    icon: "📅",
    iconBg: "#fff1f2",
    dateValue: new Date("May 5, 2024"),
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000"
  },
  {
    id: 4,
    title: "Library Timing Change Notice",
    category: "General",
    dept: "SIET",
    date: "May 3, 2024",
    tag: null,
    isUnread: false,
    isImportant: false,
    dot: "#1041c6",
    icon: "ℹ️",
    iconBg: "#eff6ff",
    dateValue: new Date("May 3, 2024"),
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000"
  },
  {
    id: 5,
    title: "Industrial Visit to NTPC Lucknow",
    category: "Event",
    dept: "SIET",
    date: "Apr 28, 2024",
    tag: null,
    isUnread: false,
    isImportant: false,
    dot: "#e31e24",
    icon: "📅",
    iconBg: "#fff1f2",
    dateValue: new Date("Apr 28, 2024"),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000"
  }
];

const tabs = ['All Notices', 'Unread', 'Important', 'Latest'];

export default function StudentNoticePage() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleCloseNotice = () => {
    setSelectedNotice(null);
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All Notices');
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3000/api/student-zone')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data && data.notices) {
          const mappedNotices = data.notices.map(n => ({
            id: n.id,
            title: n.title,
            category: n.category,
            dept: n.institution || 'Administration',
            date: n.date,
            tag: n.pinned ? '⭐ Important' : null,
            isUnread: false,
            isImportant: n.pinned,
            dot: n.category === 'Exam' ? '#8b5cf6' : n.category === 'Scholarship' ? '#22c55e' : n.category === 'Event' ? '#e31e24' : '#1041c6',
            icon: n.category === 'Exam' ? '🎓' : n.category === 'Scholarship' ? '💰' : n.category === 'Event' ? '📅' : 'ℹ️',
            iconBg: n.category === 'Exam' ? '#f5f3ff' : n.category === 'Scholarship' ? '#f0fdf4' : n.category === 'Event' ? '#fff1f2' : '#eff6ff',
            dateValue: new Date(n.date),
            image: n.image || ''
          }));
          setNotices(mappedNotices);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend connection failed, using fallback notices:', err);
        setNotices(fallbackNotices);
        setLoading(false);
      });
  }, []);

  const latestCount = 5;

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '100px', textAlign: 'center' }}>Error: {error}</div>;

  const filteredNotices = notices.filter(notice => {
    switch (activeTab) {
      case 'Unread':
        return notice.isUnread;
      case 'Important':
        return notice.isImportant;
      case 'Latest':
        return true;
      default:
        return true;
    }
  });

  const sortedNotices = filteredNotices.slice().sort((a, b) => {
    if (sortBy === 'oldest') {
      return a.dateValue - b.dateValue;
    }
    if (sortBy === 'important') {
      return (b.isImportant === true) - (a.isImportant === true) || b.dateValue - a.dateValue;
    }
    return b.dateValue - a.dateValue;
  });

  const displayedNotices = activeTab === 'Latest'
    ? sortedNotices.slice(0, latestCount)
    : sortedNotices;

  return (
    <div style={{ background: '#f5f8ff', minHeight: '100vh' }}>
      <style>{`
        .sn-page-wrap { padding-top: 56px; }
        .sn-hero { background: linear-gradient(135deg, #f0f5ff 0%, #fff 60%); padding: 40px 5% 36px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid #e8eeff; }
        .sn-hero__title { font-size: 2.4rem; font-weight: 800; color: #162341; margin-bottom: 10px; }
        .sn-hero__title span { color: #1041c6; }
        .sn-hero__sub { font-size: 15px; color: #5f6785; }
        .sn-hero__img { font-size: 80px; flex-shrink: 0; }

        .sn-main { padding: 32px 5%; }

        /* Filter bar */
        .sn-filters { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .sn-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .sn-tab { padding: 8px 18px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; font-size: 13px; font-weight: 600; color: #5f6785; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.15s; }
        .sn-tab--active { background: #1041c6; color: #fff; border-color: #1041c6; }
        .sn-tab:hover:not(.sn-tab--active) { border-color: #1041c6; color: #1041c6; }
        .sn-sort { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5f6785; font-weight: 600; }
        .sn-sort select { border: 1.5px solid #e0e8ff; border-radius: 8px; padding: 7px 12px; font-size: 13px; color: #162341; background: #fff; cursor: pointer; outline: none; }

        /* Notice list */
        .sn-list { background: #fff; border-radius: 14px; border: 1px solid #e8eeff; overflow: hidden; box-shadow: 0 4px 16px rgba(20,35,90,0.06); }
        .sn-item { display: flex; align-items: center; gap: 16px; padding: 18px 20px; border-bottom: 1px solid #f0f4ff; transition: background 0.15s; }
        .sn-item:last-child { border-bottom: none; }
        .sn-item:hover { background: #f8faff; }
        .sn-item__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .sn-item__icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .sn-item__body { flex: 1; min-width: 0; }
        .sn-item__title { font-size: 15px; font-weight: 700; color: #162341; margin-bottom: 6px; line-height: 1.4; }
        .sn-item__meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .sn-item__cat { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
        .sn-item__dept { font-size: 12px; color: #8a9bbf; font-weight: 500; }
        .sn-item__date { font-size: 12px; color: #8a9bbf; display: flex; align-items: center; gap: 5px; margin-top: 5px; }
        .sn-item__tag { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 6px; flex-shrink: 0; }
        .sn-item__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .sn-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid #e0e8ff; background: #fff; color: #1041c6; transition: all 0.15s; white-space: nowrap; }
        .sn-btn:hover { background: #eff6ff; border-color: #1041c6; }
        .sn-bookmark { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #8a9bbf; font-size: 14px; transition: all 0.15s; }
        .sn-bookmark:hover { border-color: #1041c6; color: #1041c6; }

        /* Pagination */
        .sn-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 24px; flex-wrap: wrap; gap: 12px; }
        .sn-pages { display: flex; align-items: center; gap: 6px; }
        .sn-page { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #5f6785; cursor: pointer; transition: all 0.15s; }
        .sn-page--active { background: #1041c6; color: #fff; border-color: #1041c6; }
        .sn-page:hover:not(.sn-page--active) { border-color: #1041c6; color: #1041c6; }
        .sn-page--dots { border: none; background: transparent; cursor: default; }
        .sn-perpage { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5f6785; font-weight: 600; }
        .sn-perpage select { border: 1.5px solid #e0e8ff; border-radius: 8px; padding: 6px 10px; font-size: 13px; color: #162341; background: #fff; cursor: pointer; outline: none; }

        /* Responsive */
        @media (max-width: 1023px) {
          .sn-page-wrap { padding-top: 44px; }
          .sn-hero { padding: 32px 5% 28px; }
          .sn-hero__title { font-size: 2rem; }
          .sn-hero__img { font-size: 60px; }
          .sn-main { padding: 24px 5%; }
        }
        @media (max-width: 767px) {
          .sn-page-wrap { padding-top: 32px; }
          .sn-hero { padding: 28px 16px 24px; flex-direction: column; align-items: flex-start; }
          .sn-hero__title { font-size: 1.7rem; }
          .sn-hero__img { display: none; }
          .sn-main { padding: 20px 16px; }
          .sn-filters { flex-direction: column; align-items: flex-start; }
          .sn-item { flex-wrap: wrap; gap: 12px; padding: 14px 16px; }
          .sn-item__actions { width: 100%; justify-content: flex-end; }
          .sn-item__tag { order: -1; }
          .sn-pagination { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .sn-hero__title { font-size: 1.5rem; }
          .sn-item__title { font-size: 14px; }
          .sn-tabs { gap: 6px; }
          .sn-tab { padding: 7px 12px; font-size: 12px; }
        }
        @media (max-width: 375px) {
          .sn-page-wrap { padding-top: 24px; }
          .sn-hero { padding: 22px 12px 20px; }
          .sn-hero__title { font-size: 1.3rem; }
          .sn-main { padding: 16px 12px; }
          .sn-item { padding: 12px; }
          .sn-item__title { font-size: 13px; }
        }
        /* Modal Overlay */
        .sn-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          animation: fadeIn 0.25s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Modal Container */
        .sn-modal-content {
          background: #ffffff;
          border-radius: 20px;
          width: 90%;
          max-width: 650px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
          overflow: hidden;
          position: relative;
          transform: scale(0.95);
          animation: scaleIn 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Modal Header */
        .sn-modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .sn-modal-header-info {
          flex: 1;
        }

        .sn-modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .sn-modal-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Modal Close Button */
        .sn-modal-close {
          background: #f1f5f9;
          border: none;
          color: #64748b;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .sn-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: rotate(90deg);
        }

        /* Modal Body */
        .sn-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          min-height: 300px;
        }

        /* Centered Image Frame */
        .sn-modal-img-container {
          width: 100%;
          background: #ffffff;
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          max-height: 400px;
        }

        .sn-modal-img {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .sn-modal-img:hover {
          transform: scale(1.02);
        }

        /* Modal Footer */
        .sn-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          background: #ffffff;
        }

        .sn-modal-btn {
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .sn-modal-btn-primary {
          background: #1041c6;
          color: #ffffff;
          border: none;
        }

        .sn-modal-btn-primary:hover {
          background: #0d339e;
          box-shadow: 0 4px 12px rgba(16, 65, 198, 0.2);
        }

        .sn-modal-btn-secondary {
          background: #ffffff;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
        }

        .sn-modal-btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }

        /* Animations */
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          to { transform: scale(1); }
        }

        @media (max-width: 767px) {
          .sn-modal-content {
            width: 95%;
            margin: 10px;
          }
          .sn-modal-body {
            padding: 16px;
            min-height: 250px;
          }
          .sn-modal-img-container {
            max-height: 300px;
          }
          .sn-modal-img {
            max-height: 280px;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="sn-page-wrap">
        <div className="sn-hero">
          <div>
            <h1 className="sn-hero__title">Student <span>Notices</span></h1>
            <p className="sn-hero__sub">Stay updated with important announcements, circulars & notifications.</p>
          </div>
          <div className="sn-hero__img">📢</div>
        </div>

        {/* Main */}
        <div className="sn-main">

          {/* Filters */}
          <div className="sn-filters">
            <div className="sn-tabs">
              {tabs.map(tab => (
                <button key={tab} className={`sn-tab${activeTab === tab ? ' sn-tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab === 'Unread' && '○ '}
                  {tab === 'Important' && '⭐ '}
                  {tab === 'Latest' && '⬇ '}
                  {tab}
                </button>
              ))}
            </div>
            <div className="sn-sort">
              <span>↕ Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="important">Important First</option>
              </select>
            </div>
          </div>

          {/* Notice List */}
          <div className="sn-list">
            {displayedNotices.map(notice => (
              <div key={notice.id} className="sn-item">
                <div className="sn-item__dot" style={{ background: notice.dot }} />
                <div className="sn-item__icon" style={{ background: notice.iconBg }}>
                  {notice.icon}
                </div>
                <div className="sn-item__body">
                  <div className="sn-item__title">{notice.title}</div>
                  <div className="sn-item__meta">
                    <span className="sn-item__cat" style={{ background: categoryColors[notice.category], color: categoryTextColors[notice.category] }}>
                      {notice.category}
                    </span>
                    <span style={{ color: '#8a9bbf', fontSize: 12 }}>•</span>
                    <span className="sn-item__dept">{notice.dept}</span>
                  </div>
                  <div className="sn-item__date">
                    📅 {notice.date}
                  </div>
                </div>

                {notice.tag && (
                  <span className="sn-item__tag" style={{
                    background: notice.tag === 'New' ? '#eff6ff' : '#fffbeb',
                    color: notice.tag === 'New' ? '#1041c6' : '#f59e0b',
                    border: `1px solid ${notice.tag === 'New' ? '#bfdbfe' : '#fde68a'}`
                  }}>
                    {notice.tag}
                  </span>
                )}

                <div className="sn-item__actions">
                  <button className="sn-btn" onClick={() => setSelectedNotice(notice)}>👁 View</button>
                  <button
                    className="sn-btn"
                    onClick={() => {
                      if (!notice.image) return;
                      const a = document.createElement('a');
                      a.href = notice.image;
                      a.download = `${notice.title.replace(/[^a-z0-9]/gi, '_')}.jpg`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                    style={{ opacity: notice.image ? 1 : 0.4, cursor: notice.image ? 'pointer' : 'not-allowed' }}
                    title={notice.image ? 'Download notice image' : 'No image available'}
                  >⬇ Download</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="sn-pagination">
            <div className="sn-pages">
              <button className="sn-page" onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
              {[1, 2, 3, '...', 6].map((p, i) => (
                <button key={i} className={`sn-page${p === page ? ' sn-page--active' : ''}${p === '...' ? ' sn-page--dots' : ''}`}
                  onClick={() => typeof p === 'number' && setPage(p)}>
                  {p}
                </button>
              ))}
              <button className="sn-page" onClick={() => setPage(p => Math.min(6, p + 1))}>›</button>
            </div>
            <div className="sn-perpage">
              <span>Show</span>
              <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>per page</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Notice Modal */}
      {selectedNotice && (
        <div className="sn-modal-overlay" onClick={handleCloseNotice}>
          <div className="sn-modal-content" onClick={e => e.stopPropagation()}>
            <div className="sn-modal-header">
              <div className="sn-modal-header-info">
                <h3 className="sn-modal-title">{selectedNotice.title}</h3>
                <div className="sn-modal-meta">
                  <span className="sn-item__cat" style={{ background: categoryColors[selectedNotice.category] || '#dbeafe', color: categoryTextColors[selectedNotice.category] || '#1d4ed8', margin: 0, display: 'inline-block' }}>
                    {selectedNotice.category}
                  </span>
                  <span style={{ color: '#cbd5e1', fontSize: 12 }}>•</span>
                  <span className="sn-item__dept" style={{ color: '#64748b', fontSize: 12 }}>{selectedNotice.dept}</span>
                  <span style={{ color: '#cbd5e1', fontSize: 12 }}>•</span>
                  <span className="sn-item__date" style={{ color: '#64748b', fontSize: 12, margin: 0, display: 'inline-flex', alignItems: 'center' }}>📅 {selectedNotice.date}</span>
                </div>
              </div>
              <button className="sn-modal-close" onClick={handleCloseNotice}>&times;</button>
            </div>

            <div className="sn-modal-body">
              <div className="sn-modal-img-container">
                {selectedNotice.image ? (
                  <img src={selectedNotice.image} alt={selectedNotice.title} className="sn-modal-img" />
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
                    <p style={{ fontWeight: 600 }}>Notice Document</p>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>Official document file is not available.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="sn-modal-footer">
              <button className="sn-modal-btn sn-modal-btn-secondary" onClick={handleCloseNotice}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
