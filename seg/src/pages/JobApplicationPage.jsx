import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './JobApplicationPage.css';
import logoImg from '../assets/images/logo.png';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const perks = [
  'Competitive Salary Package',
  'Career Growth Opportunities',
  'Collaborative Work Culture',
  'Work-Life Balance',
  'Learning & Development',
  'Health & Wellness Benefits',
];

export default function JobApplicationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.jobTitle || 'Job Position';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', jobProfile: jobTitle,
    qualification: '', expectedSalary: '', lastOrg: '',
    lastSalary: '', experience: '', address: '',
    photo: null, resume: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="jap-page">
        <div className="jap-success-wrap">
          <div className="jap-success">
            <div className="jap-success__circle">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L9 17L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Application Submitted!</h2>
            <p>Thank you for applying for <strong>{form.jobProfile}</strong>.<br/>We'll review your application and get back to you soon.</p>
            <button className="jap-btn-back" onClick={() => navigate('/careers')}>← Back to Careers</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jap-page">
      <div className="jap-layout">

        {/* ── Left Sidebar ── */}
        <aside className="jap-sidebar">
          <div className="jap-sidebar__sticky">
         

            <div className="jap-sidebar__divider" />

            <span className="jap-sidebar__eyebrow">You're applying for</span>
            <h2 className="jap-sidebar__job">{jobTitle}</h2>

            <div className="jap-sidebar__badge">
              <span className="jap-badge-dot" />
              Full Time · Lucknow
            </div>

            <div className="jap-sidebar__divider" />

            <p className="jap-sidebar__section-title">Why Join SEG?</p>
            <ul className="jap-sidebar__perks">
              {perks.map((p, i) => (
                <li key={i}>
                  <span className="jap-perk-icon"><CheckIcon /></span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="jap-sidebar__divider" />

            <div className="jap-sidebar__tagline">
              <span>🎓</span>
              <p>Saroj Educational Group<br /><small>Shaping Futures Since 2000</small></p>
            </div>
          </div>
        </aside>

        {/* ── Main Form ── */}
        <main className="jap-main">

         

          <div className="jap-card">
            {/* Card Header */}
            <div className="jap-card__header">
              <div className="jap-card__header-text">
                <h1>Job Application Form</h1>
                <p>Complete all required fields marked with <span className="req">*</span></p>
              </div>
              <div className="jap-card__header-badge">
                <span>📋</span>
              </div>
            </div>

            <form className="jap-form" onSubmit={handleSubmit}>

              {/* Section: Personal Info */}
              <div className="jap-section">
                <div className="jap-section__label">
                  <span className="jap-section__num">01</span>
                  Personal Information
                </div>
                <div className="jap-grid-2">
                  <div className="jap-field">
                    <label>Your Name <span className="req">*</span></label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Enter your full name" required />
                  </div>
                  <div className="jap-field">
                    <label>Email Address <span className="req">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="Enter your email address" required />
                  </div>
                  <div className="jap-field">
                    <label>Contact Number <span className="req">*</span></label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="Enter your contact number" required />
                  </div>
                  <div className="jap-field">
                    <label>Address</label>
                    <input name="address" value={form.address} onChange={handle} placeholder="Your city / address" />
                  </div>
                </div>
              </div>

              {/* Section: Job Details */}
              <div className="jap-section">
                <div className="jap-section__label">
                  <span className="jap-section__num">02</span>
                  Job Details
                </div>
                <div className="jap-grid-2">
                  <div className="jap-field">
                    <label>Job Profile <span className="req">*</span></label>
                    <input name="jobProfile" value={form.jobProfile} onChange={handle} placeholder="Job profile" required />
                  </div>
                  <div className="jap-field">
                    <label>Experience (in years)</label>
                    <input name="experience" value={form.experience} onChange={handle} placeholder="e.g. 3 years" />
                  </div>
                  <div className="jap-field">
                    <label>Expected Salary</label>
                    <input name="expectedSalary" value={form.expectedSalary} onChange={handle} placeholder="e.g. ₹5,00,000 per annum" />
                  </div>
                  <div className="jap-field">
                    <label>Your Qualification <span className="req">*</span></label>
                    <input name="qualification" value={form.qualification} onChange={handle} placeholder="e.g. B.Tech, MBA" required />
                  </div>
                </div>
              </div>

              {/* Section: Previous Employment */}
              <div className="jap-section">
                <div className="jap-section__label">
                  <span className="jap-section__num">03</span>
                  Previous Employment
                </div>
                <div className="jap-grid-2">
                  <div className="jap-field">
                    <label>Last Organization</label>
                    <input name="lastOrg" value={form.lastOrg} onChange={handle} placeholder="Your last company name" />
                  </div>
                  <div className="jap-field">
                    <label>Last Salary <span className="req">*</span></label>
                    <input name="lastSalary" value={form.lastSalary} onChange={handle} placeholder="e.g. ₹3,50,000 per annum" required />
                  </div>
                </div>
              </div>

              {/* Section: Documents */}
              <div className="jap-section">
                <div className="jap-section__label">
                  <span className="jap-section__num">04</span>
                  Upload Documents
                </div>
                <div className="jap-grid-2">
                  <div className="jap-field">
                    <label>Profile Photo</label>
                    <label className="jap-upload-box">
                      <div className="jap-upload-icon">📷</div>
                      <div className="jap-upload-text">
                        <span>{form.photo ? form.photo.name : 'Click to upload photo'}</span>
                        <small>JPG, PNG up to 5MB</small>
                      </div>
                      <input name="photo" type="file" accept="image/*" onChange={handle} hidden />
                    </label>
                  </div>
                  <div className="jap-field">
                    <label>Resume <span className="req">*</span> <small className="jap-hint">PDF only</small></label>
                    <label className="jap-upload-box">
                      <div className="jap-upload-icon">📄</div>
                      <div className="jap-upload-text">
                        <span>{form.resume ? form.resume.name : 'Click to upload resume'}</span>
                        <small>PDF up to 10MB</small>
                      </div>
                      <input name="resume" type="file" accept=".pdf" onChange={handle} hidden required />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="jap-form-footer">
                <button type="button" className="jap-btn-cancel" onClick={() => navigate('/careers')}>
                  ← Back to Careers
                </button>
                <button type="submit" className="jap-btn-submit">
                  Submit Application
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
