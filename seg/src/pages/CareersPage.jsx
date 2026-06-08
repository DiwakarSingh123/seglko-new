import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CareersPage.css';
import { api } from '../api.js';
import careerHeroImg from '../assets/images/seg.jpeg';
import logoImg from '../assets/images/logo.png';

function JobModal({ job, onClose }) {
  if (!job) return null;
  
  const getIcon = (category) => {
    if (category === 'Teaching') return '🎓';
    if (category === 'Technical') return '💻';
    return '👤';
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={e => e.stopPropagation()}>
        <button className="job-modal__close" onClick={onClose}>✕</button>
        <div className="job-modal__header">
          <div className={`job-icon bg-${job.color}`} style={{ width: 56, height: 56, fontSize: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {getIcon(job.category)}
          </div>
          <div>
            <h2 className="job-modal__title">{job.title}</h2>
            <span className={`job-tag tag-${job.color}`}>{job.tag}</span>
          </div>
        </div>
        <div className="job-modal__grid">
          {[['Department', job.dept], ['Location', job.location], ['Experience', job.experience], ['Job Type', job.type], ['Posted On', job.posted], ['Category', job.tag]].map(([label, value]) => (
            <div className="job-modal__item" key={label}>
              <span className="meta-label">{label}</span>
              <span className="meta-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="job-modal__footer">
          <button className={`btn-apply bg-${job.color}`} style={{ width: '100%', justifyContent: 'center' }}>Apply Now →</button>
        </div>
      </div>
    </div>
  );
}

const jobCategories = [
  { id: 'all', label: 'All Openings', count: 0, icon: '💼' },
  { id: 'Administration', label: 'Administration', count: 0, icon: '🏛️' },
  { id: 'Teaching', label: 'Teaching', count: 0, icon: '🎓' },
  { id: 'Technical', label: 'Technical', count: 0, icon: '💻' },
  { id: 'Support Staff', label: 'Support Staff', count: 0, icon: '🎧' },
];

const defaultJobs = [
  {
    _id: 1,
    title: 'Chairman PS',
    category: 'Administration',
    tag: 'Administration',
    dept: 'Secretariat',
    location: 'Lucknow',
    experience: '5-8 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'blue',
  },
  {
    _id: 2,
    title: 'Admission Counsellor',
    category: 'Administration',
    tag: 'Admissions',
    dept: 'Counselling',
    location: 'Lucknow',
    experience: '1-3 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'violet',
  },
  {
    _id: 3,
    title: 'Assistant Professor',
    category: 'Teaching',
    tag: 'Teaching',
    dept: 'Pharmacy',
    location: 'Lucknow',
    experience: '2-5 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'green',
  },
  {
    _id: 4,
    title: 'Field Officers',
    category: 'Administration',
    tag: 'Administration',
    dept: 'Field Officer',
    location: 'Uttar Pradesh',
    experience: '1-4 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'orange',
  },
];

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const urls = [api('/api/jobs')];
      let lastError = '';
      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setJobs(data.length > 0 ? data : defaultJobs);
            setError('');
            return;
          }
          lastError = `Failed to load jobs from ${url}: ${response.status} ${response.statusText}`;
          console.warn(lastError);
        } catch (fetchError) {
          lastError = `Failed to fetch jobs from ${url}: ${fetchError.message}`;
          console.warn(lastError);
        }
      }

      setError(`Unable to load job openings from admin dashboard. Showing local fallback listings. ${lastError}`);
      setJobs(defaultJobs);
    };

    fetchJobs().finally(() => setLoading(false));
  }, []);

  const filteredJobs = activeCategory === 'all'
    ? jobs
    : jobs.filter(job => job.category === activeCategory);

  const updateCategoryCounts = () => {
    return jobCategories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? jobs.length : jobs.filter(j => j.category === cat.id).length,
    }));
  };

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
                <a href="#" className="info-card__link">Watch Our Culture Video <span>▶</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="careers-categories">
        <div className="categories-grid">
          {updateCategoryCounts().map(cat => (
            <button
              key={cat.id}
              className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <div className="category-info">
                <span className="category-label">{cat.label}</span>
                <span className="category-count">{cat.count} Open Positions</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      {loading && (
        <div className="careers-loading">
          <p>Loading job openings from admin dashboard…</p>
        </div>
      )}
      {error && !loading && (
        <div className="careers-error">
          <p>{error}</p>
        </div>
      )}
      <section className="careers-list">
        <div className="list-header">
          <h2>Current Job Openings</h2>
          <span className="open-count">{filteredJobs.length} Open Positions</span>
        </div>

        <div className="jobs-container">
          {filteredJobs.map(job => (
            <div key={job._id} className={`job-card border-${job.color}`}>
              <div className="job-card__main">
                <div className={`job-icon bg-${job.color}`}>
                  {job.category === 'Teaching' ? '🎓' : job.category === 'Technical' ? '💻' : '👤'}
                </div>
                <div className="job-info">
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    <span className={`job-tag tag-${job.color}`}>{job.tag}</span>
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
                <button className="btn-details" onClick={() => setSelectedJob(job)}>View Details</button>
                <button className={`btn-apply bg-${job.color || 'blue'}`} onClick={() => navigate('/careers/apply', { state: { jobTitle: job.title } })}>Apply Now <span>→</span></button>
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
          <button className="btn-submit-resume">
            <span className="icon">📄</span>
            Submit Your Resume
          </button>
          <div className="cta-visual">
            <img src={logoImg} alt="SEG Logo" className="cta-logo" />
          </div>
        </div>
      </section>

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
