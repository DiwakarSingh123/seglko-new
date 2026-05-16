import { Link } from 'react-router-dom';
import institutionsBg from '../../assets/images/seg.jpeg';

const HistoryHero = () => {
  return (
    <section className="history-hero">
      <div className="history-hero__inner">
        <div className="history-hero__content">
          <div className="history-hero__breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">&gt;</span>
            <span>About SEG</span>
            <span className="separator">&gt;</span>
            <span className="current">History of SEG</span>
          </div>

          <h1 className="history-hero__title">
            The Legacy of
            <br />
            Saroj <span className="text-blue">Educational Group</span>
          </h1>
          <div className="history-hero__accent-line"></div>

          <p className="history-hero__text">
            A journey marked by dedication, growth, and a commitment to educational excellence that has shaped thousands of lives and continues to lead the way for future leaders.
          </p>
        </div>

        <div className="history-hero__visual">
          <img src={institutionsBg} alt="Saroj Institute of Technology & Management" className="history-hero__image" />
        </div>
      </div>

      <div className="history-stats-bar">
        <div className="history-stats-bar__item">
          <div className="history-stats-bar__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M9 16l2 2 4-4" />
            </svg>
          </div>
          <div className="history-stats-bar__info">
            <span className="history-stats-bar__value">27+</span>
            <span className="history-stats-bar__label">YEARS OF<br />EXCELLENCE</span>
          </div>
        </div>

        <div className="history-stats-bar__item">
          <div className="history-stats-bar__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="history-stats-bar__info">
            <span className="history-stats-bar__value">25K+</span>
            <span className="history-stats-bar__label">HAPPY<br />STUDENTS</span>
          </div>
        </div>

        <div className="history-stats-bar__item">
          <div className="history-stats-bar__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <line x1="9" y1="22" x2="15" y2="22" />
              <line x1="8" y1="6" x2="8.01" y2="6" />
              <line x1="16" y1="6" x2="16.01" y2="6" />
              <line x1="12" y1="6" x2="12.01" y2="6" />
              <line x1="8" y1="10" x2="8.01" y2="10" />
              <line x1="16" y1="10" x2="16.01" y2="10" />
              <line x1="12" y1="10" x2="12.01" y2="10" />
              <line x1="8" y1="14" x2="8.01" y2="14" />
              <line x1="16" y1="14" x2="16.01" y2="14" />
              <line x1="12" y1="14" x2="12.01" y2="14" />
              <line x1="8" y1="18" x2="8.01" y2="18" />
              <line x1="16" y1="18" x2="16.01" y2="18" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <div className="history-stats-bar__info">
            <span className="history-stats-bar__value">6+</span>
            <span className="history-stats-bar__label">INSTITUTIONS<br />ACROSS INDIA</span>
          </div>
        </div>

        <div className="history-stats-bar__item">
          <div className="history-stats-bar__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 21h8" />
              <path d="M12 17v4" />
              <path d="M7 4h10" />
              <path d="M5 4h14c1 0 2 1 2 2v2c0 3-2 5-4 5H7c-2 0-4-2-4-5V6c0-1 1-2 2-2z" />
              <path d="M12 4v13" />
            </svg>
          </div>
          <div className="history-stats-bar__info">
            <span className="history-stats-bar__value">100+</span>
            <span className="history-stats-bar__label">AWARDS &<br />RECOGNITIONS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryHero;
