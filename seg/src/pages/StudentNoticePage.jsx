import { useState, useEffect } from 'react';

const categoryMap = {
  Exam: { label: 'Examinations', bg: '#ede9fe', color: '#7c3aed', icon: '🎓', iconBg: '#f5f3ff', dot: '#8b5cf6' },
  Scholarship: { label: 'Scholarship', bg: '#dcfce7', color: '#16a34a', icon: '🏅', iconBg: '#f0fdf4', dot: '#22c55e' },
  Event: { label: 'Events', bg: '#fee2e2', color: '#dc2626', icon: '📅', iconBg: '#fff1f2', dot: '#e31e24' },
  General: { label: 'General', bg: '#dbeafe', color: '#1d4ed8', icon: 'ℹ️', iconBg: '#eff6ff', dot: '#1041c6' },
  Placements: { label: 'Placements', bg: '#dcfce7', color: '#16a34a', icon: '💼', iconBg: '#f0fdf4', dot: '#22c55e' },
};

const tabs = ['All Notices', 'Unread', 'Important', 'Latest'];

function NoticeModal({ notice, onClose }) {
  if (!notice) return null;

  const handleDownload = async () => {
    try {
      const res = await fetch(notice.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${notice.title.replace(/[^a-z0-9]/gi, '_')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(notice.image, '_blank');
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', maxWidth: '520px', width: '100%', maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e8eeff' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#162341', lineHeight: 1.4, flex: 1, marginRight: '12px' }}>{notice.title}</span>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #e0e8ff', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#5f6785', flexShrink: 0 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <img src={notice.image} alt={notice.title} style={{ width: '100%', display: 'block' }} />
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid #e8eeff', display: 'flex', gap: '10px' }}>
          <button onClick={handleDownload} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#1041c6', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>⬇ Download Notice</button>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: '1.5px solid #e0e8ff', background: '#fff', color: '#5f6785', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function StudentNoticePage() {
  const [activeTab, setActiveTab] = useState('All Notices');
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [viewNotice, setViewNotice] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch('/api/student-zone')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.notices?.length) return;
        const normalized = data.notices.map(n => {
          const meta = categoryMap[n.category] || categoryMap.General;
          return {
            id: n.id,
            title: n.title,
            category: meta.label,
            dept: n.institution || 'Administration',
            date: n.date || '',
            tag: n.pinned ? '⭐ Important' : null,
            isUnread: false,
            isImportant: !!n.pinned,
            icon: meta.icon,
            iconBg: meta.iconBg,
            dateValue: new Date(n.date || Date.now()),
            image: n.image || `https://placehold.co/800x1100/1041c6/ffffff?text=${encodeURIComponent(n.title)}`,
          };
        });
        setNotices(normalized);
      })
      .catch(() => {});
  }, []);

  const categoryColors = {
    Placements: '#dcfce7', Examinations: '#ede9fe', Events: '#fee2e2',
    General: '#dbeafe', Scholarship: '#dcfce7',
  };
  const categoryTextColors = {
    Placements: '#16a34a', Examinations: '#7c3aed', Events: '#dc2626',
    General: '#1d4ed8', Scholarship: '#16a34a',
  };

  const latestCount = notices.length;

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

  const availableNotices = activeTab === 'Latest'
    ? sortedNotices.slice(0, latestCount)
    : sortedNotices;

  const totalPages = Math.max(1, Math.ceil(availableNotices.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const displayedNotices = availableNotices.slice(startIndex, startIndex + perPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="sn-container">
      <style>{`
        .sn-container { background: #f5f8ff; min-height: 100vh; overflow-x: hidden; }
        .sn-container *, .sn-container *::before, .sn-container *::after { box-sizing: border-box; }

        .sn-hero { background: linear-gradient(135deg, #f0f5ff 0%, #fff 60%); padding: 90px 5% 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid #e8eeff; flex-wrap: wrap; }
        .sn-hero__title { font-size: 2.4rem; font-weight: 800; color: #162341; margin: 0 0 10px; line-height: 1.12; }
        .sn-hero__title span { color: #1041c6; }
        .sn-hero__sub { font-size: 15px; color: #5f6785; line-height: 1.5; margin: 0; max-width: 620px; }
        .sn-hero__img { font-size: 80px; flex-shrink: 0; }

        .sn-main { padding: 32px 5%; }

        /* Filter bar */
        .sn-filters { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .sn-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .sn-tab { min-height: 36px; padding: 8px 18px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; font-size: 13px; font-weight: 600; color: #5f6785; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.15s; white-space: nowrap; }
        .sn-tab--active { background: #1041c6; color: #fff; border-color: #1041c6; }
        .sn-tab:hover:not(.sn-tab--active) { border-color: #1041c6; color: #1041c6; }
        .sn-sort { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5f6785; font-weight: 600; }
        .sn-sort select { border: 1.5px solid #e0e8ff; border-radius: 8px; padding: 7px 12px; font-size: 13px; color: #162341; background: #fff; cursor: pointer; outline: none; min-width: 138px; }

        /* Notice list */
        .sn-list { background: #fff; border-radius: 14px; border: 1px solid #e8eeff; overflow: hidden; box-shadow: 0 4px 16px rgba(20,35,90,0.06); }
        .sn-item { display: flex; align-items: center; gap: 16px; padding: 18px 20px; border-bottom: 1px solid #f0f4ff; transition: background 0.15s; min-width: 0; }
        .sn-item:last-child { border-bottom: none; }
        .sn-item:hover { background: #f8faff; }
        .sn-item__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .sn-item__icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .sn-item__body { flex: 1; min-width: 0; }
        .sn-item__title { font-size: 15px; font-weight: 700; color: #162341; margin-bottom: 6px; line-height: 1.4; word-break: break-word; }
        .sn-item__meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .sn-item__cat { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
        .sn-item__dept { font-size: 12px; color: #8a9bbf; font-weight: 500; }
        .sn-item__date { font-size: 12px; color: #8a9bbf; display: flex; align-items: center; gap: 5px; margin-top: 5px; }
        .sn-item__tag { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 6px; flex-shrink: 0; }
        .sn-item__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .sn-btn { min-height: 32px; display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid #e0e8ff; background: #fff; color: #1041c6; transition: all 0.15s; white-space: nowrap; }
        .sn-btn:hover { background: #eff6ff; border-color: #1041c6; }
        .sn-bookmark { width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #8a9bbf; font-size: 14px; transition: all 0.15s; }
        .sn-bookmark:hover { border-color: #1041c6; color: #1041c6; }

        /* Pagination */
        .sn-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 24px; flex-wrap: wrap; gap: 12px; }
        .sn-pages { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .sn-page { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #e0e8ff; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: #5f6785; cursor: pointer; transition: all 0.15s; }
        .sn-page--active { background: #1041c6; color: #fff; border-color: #1041c6; }
        .sn-page:hover:not(.sn-page--active) { border-color: #1041c6; color: #1041c6; }
        .sn-page--dots { border: none; background: transparent; cursor: default; }
        .sn-page:disabled { opacity: 0.45; cursor: not-allowed; }
        .sn-page:disabled:hover { border-color: #e0e8ff; color: #5f6785; }
        .sn-perpage { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5f6785; font-weight: 600; }
        .sn-perpage select { border: 1.5px solid #e0e8ff; border-radius: 8px; padding: 6px 10px; font-size: 13px; color: #162341; background: #fff; cursor: pointer; outline: none; }

        /* Responsive */
        @media (max-width: 1023px) {
          .sn-hero { padding: 80px 4% 24px !important; }
          .sn-hero__title { font-size: 2rem; }
          .sn-hero__img { font-size: 60px; }
          .sn-main { padding: 20px 4% !important; }
        }
        @media (max-width: 768px) {
          .sn-hero { padding: 70px 16px 20px !important; flex-direction: column; align-items: flex-start; }
          .sn-hero__title { font-size: 1.7rem; }
          .sn-hero__img { display: none; }
          .sn-main { padding: 16px !important; }
          .sn-filters { flex-direction: column; align-items: stretch; gap: 10px; }
          .sn-tabs { width: 100%; }
          .sn-tab { flex: 1 1 auto; }
          .sn-sort { width: 100%; justify-content: space-between; }
          .sn-sort select { flex: 1; min-width: 0; }
          .sn-item { flex-wrap: wrap; gap: 10px; padding: 14px 14px; }
          .sn-item__body { min-width: 0; }
          .sn-item__actions { width: 100%; justify-content: flex-end; }
          .sn-item__tag { order: -1; }
          .sn-pagination { flex-direction: column; align-items: stretch; }
          .sn-pages { justify-content: flex-start; }
          .sn-perpage { justify-content: space-between; }
        }
        @media (max-width: 480px) {
          .sn-hero { padding: 4px 12px 4px !important; }
          .sn-hero__title { font-size: 1.5rem; margin-bottom: 6px; }
          .sn-hero__sub { font-size: 13px; }
          .sn-main { padding: 10px 12px !important; }
          .sn-filters { margin-bottom: 12px; }
          .sn-tabs {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
          }
          .sn-tab {
            width: 100%;
            min-width: 0;
            padding: 7px 8px;
            font-size: 12px;
          }
          .sn-sort {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 8px;
            width: 100%;
          }
          .sn-sort select {
            width: 100%;
            min-width: 0;
          }
          .sn-list { border-radius: 10px; }
          .sn-item {
            display: grid !important;
            grid-template-columns: 8px 36px minmax(0, 1fr);
            align-items: start;
            gap: 10px;
            padding: 12px !important;
          }
          .sn-item__dot { width: 8px; height: 8px; margin-top: 14px; }
          .sn-item__icon { width: 36px; height: 36px; border-radius: 8px; font-size: 17px; }
          .sn-item__title { font-size: 14px; }
          .sn-item__meta { gap: 6px; }
          .sn-item__dept { min-width: 0; overflow-wrap: anywhere; }
          .sn-item__tag {
            order: initial;
            grid-column: 2 / 4;
            justify-self: start;
          }
          .sn-item__actions {
            grid-column: 1 / -1;
            display: grid !important;
            grid-template-columns: 1fr 1fr auto !important;
            width: 100% !important;
            gap: 6px !important;
          }
          .sn-btn {
            padding: 6px 8px !important;
            font-size: 11px !important;
            justify-content: center !important;
          }
          .sn-bookmark {
            width: 30px !important;
            height: 30px !important;
          }
          .sn-pagination { margin-top: 16px; }
          .sn-pages { width: 100%; justify-content: space-between; gap: 4px; }
          .sn-page { width: 32px; height: 32px; font-size: 12px; }
          .sn-perpage { width: 100%; justify-content: space-between; }
        }
        @media (max-width: 375px) {
          .sn-container { margin-top: 14px !important; }
          .sn-hero { padding: 4px 12px 5px !important; }
          .sn-hero__title { font-size: 1.3rem; }
          .sn-hero__sub { font-size: 12px; }
          .sn-main { padding: 8px 12px !important; }
          .sn-item { grid-template-columns: 7px 34px minmax(0, 1fr); padding: 10px !important; }
          .sn-item__icon { width: 34px; height: 34px; font-size: 16px; }
          .sn-item__title { font-size: 13px; }
          .sn-item__cat, .sn-item__tag { font-size: 10px; }
          .sn-item__dept, .sn-item__date { font-size: 11px; }
          .sn-page { width: 30px; height: 30px; }
        }
        @media (max-width: 320px) {
          .sn-container { margin-top: 10px !important; }
          .sn-hero { padding: 3px 10px 4px !important; }
          .sn-hero__title { font-size: 1.15rem !important; }
          .sn-main { padding: 6px 10px !important; }
          .sn-tab { padding: 6px 6px !important; font-size: 10.5px !important; }
          .sn-sort { font-size: 11px; }
          .sn-sort select { padding: 6px 8px; font-size: 11px; }
          .sn-item { grid-template-columns: 6px 32px minmax(0, 1fr); gap: 8px; padding: 9px !important; }
          .sn-item__dot { width: 6px; height: 6px; }
          .sn-item__icon { width: 32px; height: 32px; font-size: 15px; }
          .sn-item__title { font-size: 12px !important; }
          .sn-item__cat { padding: 3px 7px; }
          .sn-item__actions { gap: 5px !important; }
          .sn-btn { padding: 6px 5px !important; font-size: 10px !important; }
          .sn-bookmark { width: 28px !important; height: 28px !important; }
          .sn-page { width: 28px; height: 28px; font-size: 11px; }
          .sn-perpage { font-size: 11px; }
          .sn-perpage select { padding: 5px 8px; font-size: 11px; }
        }
      `}</style>

      <NoticeModal notice={viewNotice} onClose={() => setViewNotice(null)} />

      {/* Hero */}
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
              <button key={tab} className={`sn-tab${activeTab === tab ? ' sn-tab--active' : ''}`} onClick={() => handleTabChange(tab)}>
                {tab === 'Unread' && '○ '}
                {tab === 'Important' && '⭐ '}
                {tab === 'Latest' && '⬇ '}
                {tab}
              </button>
            ))}
          </div>
          <div className="sn-sort">
            <span>↕ Sort by:</span>
            <select value={sortBy} onChange={handleSortChange}>
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
              <div className="sn-item__dot" style={{ background: categoryMap[Object.keys(categoryMap).find(k => categoryMap[k].label === notice.category) || 'General']?.dot || '#1041c6' }} />
              <div className="sn-item__icon" style={{ background: categoryMap[Object.keys(categoryMap).find(k => categoryMap[k].label === notice.category) || 'General']?.iconBg || '#eff6ff' }}>
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
                <button className="sn-btn" onClick={() => setViewNotice(notice)}>👁 View</button>
                <button className="sn-btn" onClick={async () => {
                  try {
                    const res = await fetch(notice.image);
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${notice.title.replace(/[^a-z0-9]/gi, '_')}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch { window.open(notice.image, '_blank'); }
                }}>⬇ Download</button>
               
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="sn-pagination">
          <div className="sn-pages">
            <button className="sn-page" onClick={() => setPage(p => Math.max(1, p-1))}>‹</button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                className={`sn-page${p === currentPage ? ' sn-page--active' : ''}`}
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
            <button className="sn-page" onClick={() => setPage(p => Math.min(6, p+1))}>›</button>
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
  );
}
