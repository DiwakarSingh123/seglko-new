import React from 'react';
import { Link } from 'react-router-dom';
import '../ManagementQuota.css';
import institutionsBg from '../assets/images/seg.jpeg';

const ManagementQuota = () => {
  return (
    <div className="quota-page">
      {/* Hero Section */}
      <section className="quota-hero">
        <div className="quota-hero__inner">
          <div className="quota-hero__content">

            <h1 className="quota-hero__title">Management <br />Admission Quota</h1>
            <div className="quota-hero__accent-line"></div>
            <p className="quota-hero__text">
              We offer dedicated seats under the Management Quota for students seeking direct admission through a transparent and merit-guided process. Secure your future with personalized guidance.
            </p>
          </div>
          <div className="quota-hero__visual">
            <img src={institutionsBg} alt="Management Quota" className="quota-hero__image" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="quota-stats-bar">
        <div className="quota-stat-item">
          <div className="quota-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div className="quota-stat-info">
            <span className="quota-stat-value">15%</span>
            <span className="quota-stat-label">RESERVED SEATS</span>
          </div>
        </div>
        <div className="quota-stat-item">
          <div className="quota-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z" /></svg>
          </div>
          <div className="quota-stat-info">
            <span className="quota-stat-value">Direct</span>
            <span className="quota-stat-label">ADMISSION</span>
          </div>
        </div>
        <div className="quota-stat-item">
          <div className="quota-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="12" y1="12" x2="16" y2="12" /></svg>
          </div>
          <div className="quota-stat-info">
            <span className="quota-stat-value">Quick</span>
            <span className="quota-stat-label">PROCESSING</span>
          </div>
        </div>
        <div className="quota-stat-item">
          <div className="quota-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>
          <div className="quota-stat-info">
            <span className="quota-stat-value">Verified</span>
            <span className="quota-stat-label">TRANSPARENCY</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="quota-content">
        <div className="quota-grid">
          <div className="quota-info-card">
            <h2 className="quota-info-card__title">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              Admission Guidelines
            </h2>
            <ul className="quota-list">
              <li>Admissions are strictly on merit basis for the reserved seats.</li>
              <li>Candidates must meet the minimum eligibility criteria defined by the University/State Govt.</li>
              <li>Direct application to the college office or online portal is required.</li>
              <li>Original documents verification is mandatory during the final step.</li>
              <li>Counseling sessions are available for choice of branch.</li>
            </ul>
            <div className="quota-cta">
              <h3>Ready to secure your seat?</h3>
              <Link to="/contact-us" className="btn-quota">Contact Admission Cell</Link>
            </div>
          </div>

          <div className="quota-info-card">
            <h2 className="quota-info-card__title">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
              Required Documents
            </h2>
            <ul className="quota-list">
              <li>10th & 12th Marksheets (Original & Photocopies)</li>
              <li>Entrance Exam Scorecard (if applicable)</li>
              <li>Transfer Certificate (TC) & Migration Certificate</li>
              <li>Character Certificate from last attended institution</li>
              <li>Category Certificate (if claiming any reservation)</li>
              <li>Aadhar Card & Passport size photographs</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagementQuota;
