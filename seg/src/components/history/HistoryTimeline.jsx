import { useState, useEffect } from 'react';

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20V6H15V20" />
    <path d="M15 20V10H19V20" />
    <path d="M8 9H9" /><path d="M11 9H12" />
    <path d="M8 12H9" /><path d="M11 12H12" />
    <path d="M8 15H9" /><path d="M11 15H12" />
  </svg>
);

const DEFAULT_MILESTONES = [
  { id: '1', year: '1997', title: 'Humble Beginnings', description: 'The journey began in 1997 with the foundation of SSITM in Aligarh.' },
  { id: '2', year: '2001', title: 'Expanding Horizons', description: 'SEG expanded with SITM in Lucknow.' },
  { id: '3', year: '2010', title: 'Growth & Excellence', description: 'Continued expansion and strengthening of academic programs.' },
  { id: '4', year: 'Present', title: 'Leading Into Future', description: 'Today, SEG stands as a premier institution.' },
];

const HistoryTimeline = () => {
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.aboutHistory?.milestones?.length) {
          setMilestones(data.aboutHistory.milestones);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="history-timeline">
      <div className="history-timeline__header">
        <div className="history-timeline__header-left">
          <span className="history-timeline__subtitle">OUR JOURNEY</span>
          <h2 className="history-timeline__title">Milestones That Define Our Legacy</h2>
        </div>
        <div className="history-timeline__header-right">
          <p className="history-timeline__intro-text">
            From a small beginning with a big vision to becoming a trusted name in education, our journey is built on values, innovation, and the unwavering belief in empowering minds.
          </p>
        </div>
      </div>

      <div className="history-timeline__list">
        {milestones.map((item, index) => (
          <div key={item.id || index} className="timeline-item">
            <div className="timeline-item__marker-area">
              <div className="timeline-item__icon-wrap">
                <div className="timeline-item__icon">
                  {index % 2 === 0 ? <CalendarIcon /> : <BuildingIcon />}
                </div>
              </div>
              <div className="timeline-item__year">{item.year}</div>
              {index !== milestones.length - 1 && <div className="timeline-item__line"></div>}
            </div>

            <div className="timeline-item__content-card">
              <div className="timeline-item__caret"></div>
              <div className="timeline-item__body">
                <div className="timeline-item__header-row">
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <span className="timeline-item__tag">{item.year}</span>
                </div>
                <div className="timeline-item__description">
                  <p>{item.description}</p>
                </div>
              </div>
              {item.image && (
                <div className="timeline-item__visual">
                  <img src={item.image} alt={item.title} className="timeline-item__image" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryTimeline;
