import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CareersPage.css';
import careerHeroImg from '../assets/images/faculty-bg.png';
import logoImg from '../assets/images/logo.png';

const jobCategories = [
  { id: 'all', label: 'All Openings', icon: '💼' },
  { id: 'teaching', label: 'Teaching', icon: '🎓' },
  { id: 'administration', label: 'Administration', icon: '🏛️' },
  { id: 'technical', label: 'Technical', icon: '💻' },
  { id: 'support', label: 'Support Staff', icon: '🎧' },
];

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [jobs, setJobs] = useState<any[]>([
    {
      id: 1,
      title: 'Chairman PS',
      category: 'administration',
      tag: 'Administration',
      dept: 'Secretariat',
      location: 'Lucknow',
      experience: '5-8 Years',
      type: 'Full Time',
      posted: '05 June 2025',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Admission Counsellor',
      category: 'administration',
      tag: 'Admissions',
      dept: 'Counselling',
      location: 'Lucknow',
      experience: '1-3 Years',
      type: 'Full Time',
      posted: '05 June 2025',
      color: 'violet',
    },
    {
      id: 3,
      title: 'Assistant Professor',
      category: 'teaching',
      tag: 'Teaching',
      dept: 'Pharmacy',
      location: 'Lucknow',
      experience: '2-5 Years',
      type: 'Full Time',
      posted: '05 June 2025',
      color: 'green',
    },
  ]);

  useEffect(() => {
    fetch('http://localhost:3000/api/settings')
      .then(res => res.json())
      .then(settings => {
        if (settings && settings.careers && settings.careers.jobs) {
          setJobs(settings.careers.jobs);
        }
      })
      .catch(err => console.error("Error loading career jobs settings:", err));
  }, []);

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return jobs.length;
    return jobs.filter(job => job.category === catId).length;
  };

  const filteredJobs = activeCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero__overlay"></div>
        <div className="careers-hero__content">
          <div className="careers-hero__text">
            <span className="careers-hero__eyebrow">Shape the Future</span>
            <h1 className="careers-hero__title">
              Build Your Career<br />
              with <span className="text-highlight">SEG</span>
            </h1>
            <p className="careers-hero__desc">
              Join a dynamic team of educators, innovators, and professionals working together to empower the next generation.
            </p>
          </div>
          
          <div className="careers-hero__image-wrap">
            <img src={careerHeroImg} alt="Join SEG" className="careers-hero__image" />
            <div className="careers-hero__info-card">
              <div className="info-card__icon">💡</div>
              <div className="info-card__body">
                <h4>Why Join SEG?</h4>
                <p>Be part of an institution that values excellence, innovation and integrity.</p>
                <a href="#" className="info-card__link" onClick={(e) => { e.preventDefault(); alert("Culture video is a placeholder."); }}>Watch Our Culture Video <span>▶</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="careers-categories">
        <div className="categories-grid">
          {jobCategories.map(cat => (
            <button 
              key={cat.id} 
              className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <div className="category-info">
                <span className="category-label">{cat.label}</span>
                <span className="category-count">{getCategoryCount(cat.id)} Open Positions</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section className="careers-list">
        <div className="list-header">
          <h2>Current Job Openings</h2>
          <span className="open-count">{filteredJobs.length} Open Positions</span>
        </div>

        <div className="jobs-container">
          {filteredJobs.map(job => (
            <div key={job.id} className={`job-card border-${job.color || 'blue'}`}>
              <div className="job-card__main">
                <div className={`job-icon bg-${job.color || 'blue'}`}>
                  {job.category === 'teaching' ? '🎓' : job.category === 'technical' ? '💻' : '👤'}
                </div>
                <div className="job-info">
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    <span className={`job-tag tag-${job.color || 'blue'}`}>{job.tag || job.category}</span>
                  </div>
                  <div className="job-meta">
                    <div className="meta-item">
                      <span className="meta-label">Department</span>
                      <span className="meta-value">{job.dept}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Location</span>
                      <span className="meta-value">{job.location}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Experience</span>
                      <span className="meta-value">{job.experience}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Job Type</span>
                      <span className="meta-value">{job.type}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Posted On</span>
                      <span className="meta-value">{job.posted}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-actions">
                <button className="btn-details" onClick={() => alert(`Details for position: ${job.title}`)}>View Details</button>
                <button className={`btn-apply bg-${job.color || 'blue'}`} onClick={() => alert(`Apply form for ${job.title} has been initialized.`)}>Apply Now <span>→</span></button>
                <button className="btn-bookmark" onClick={() => alert("Position bookmarked.")}>🔖</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="cta-content">
          <div className="cta-text">
            <h3>Don&apos;t see the right role?</h3>
            <p>We are always looking for passionate people. Send us your resume and we&apos;ll keep you in mind.</p>
          </div>
          <button className="btn-submit-resume" onClick={() => alert("Resume submission is active.")}>
            <span className="icon">📄</span>
            Submit Your Resume
          </button>
          <div className="cta-visual">
            <img src={logoImg} alt="SEG Logo" className="cta-logo" />
          </div>
        </div>
      </section>
    </div>
  );
}
