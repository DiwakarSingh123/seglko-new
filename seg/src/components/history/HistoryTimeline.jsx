import { useState, useEffect } from 'react';
import aboutBgImg from '../../assets/images/about-bg.png';
import campusBgImg from '../../assets/images/campus-bg.png';

const defaultImages = [aboutBgImg, campusBgImg];

const milestoneIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20V6H15V20" />
    <path d="M15 20V10H19V20" />
    <path d="M8 9H9" />
    <path d="M11 9H12" />
    <path d="M8 12H9" />
    <path d="M11 12H12" />
    <path d="M8 15H9" />
    <path d="M11 15H12" />
  </svg>
];

export default function HistoryTimeline() {
  const [historyData, setHistoryData] = useState({
    headline: "The Legacy of Saroj Educational Group",
    description: "A journey marked by dedication, growth, and a commitment to educational excellence that has shaped thousands of lives and continues to lead the way for future leaders.",
    milestones: [
      { id: "1", year: "1997", title: "Humble Beginnings", description: "The journey began in 1997 with the foundation of the Shivdan Singh Institute of Technology & Management (SSITM) in Aligarh. Driven by a vision to provide quality technical education, this marked the inception of SEG's legacy." },
      { id: "2", year: "2001", title: "Expanding Horizons", description: "In 2001, SEG expanded its influence with the establishment of the Saroj Institute of Technology & Management (SITM) in Lucknow. This milestone amplified SEG's impact, attracting students from various regions seeking quality education." },
      { id: "3", year: "2010", title: "Growth & Excellence", description: "Continued expansion and strengthening of academic programs, establishing SEG as a trusted name in technical and management education across Northern India." },
      { id: "4", year: "Present", title: "Leading Into Future", description: "Today, SEG stands as a premier institution with multiple campuses, diverse programs, and a strong commitment to academic excellence and student success." }
    ]
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/settings')
      .then(res => res.json())
      .then(settings => {
        if (settings && settings.aboutHistory) {
          setHistoryData(settings.aboutHistory);
        }
      })
      .catch(err => console.error("Error loading history timeline:", err));
  }, []);

  return (
    <section className="history-timeline">
      <div className="history-timeline__header">
        <div className="history-timeline__header-left">
          <span className="history-timeline__subtitle">OUR JOURNEY</span>
          <h2 className="history-timeline__title">{historyData.headline}</h2>
        </div>
        <div className="history-timeline__header-right">
          <p className="history-timeline__intro-text">
            {historyData.description}
          </p>
        </div>
      </div>

      <div className="history-timeline__list">
        {historyData.milestones.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-item__marker-area">
              <div className="timeline-item__icon-wrap">
                <div className="timeline-item__icon">
                  {milestoneIcons[index % milestoneIcons.length]}
                </div>
              </div>
              <div className="timeline-item__year">{item.year}</div>
              {index !== historyData.milestones.length - 1 && (
                <div className="timeline-item__line"></div>
              )}
            </div>

            <div className="timeline-item__content-card">
              <div className="timeline-item__caret"></div>
              <div className="timeline-item__body">
                <div className="timeline-item__header-row">
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <span className="timeline-item__tag">{index % 2 === 0 ? 'THE BEGINNING' : 'A NEW CHAPTER'}</span>
                </div>
                <div className="timeline-item__description">
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="timeline-item__visual">
                <img src={item.image && item.image.trim() !== '' ? item.image : defaultImages[index % defaultImages.length]} alt={item.title} className="timeline-item__image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
