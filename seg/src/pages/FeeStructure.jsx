import React from 'react';
import { Link } from 'react-router-dom';
import '../FeeStructure.css';
import institutionsBg from '../assets/images/institutions-bg.png';

const btechFees = [
  { branch: 'Computer Science & Engineering', duration: '4 Years', firstYear: '₹ 85,000', secondYear: '₹ 85,000', total: '₹ 3,40,000' },
  { branch: 'Electronics & Communication', duration: '4 Years', firstYear: '₹ 75,000', secondYear: '₹ 75,000', total: '₹ 3,00,000' },
  { branch: 'Mechanical Engineering', duration: '4 Years', firstYear: '₹ 75,000', secondYear: '₹ 75,000', total: '₹ 3,00,000' },
  { branch: 'Information Technology', duration: '4 Years', firstYear: '₹ 80,000', secondYear: '₹ 80,000', total: '₹ 3,20,000' },
  { branch: 'Civil Engineering', duration: '4 Years', firstYear: '₹ 75,000', secondYear: '₹ 75,000', total: '₹ 3,00,000' },
];

const diplomaFees = [
  { course: 'Polytechnic Diploma', duration: '3 Years', perYear: '₹ 35,000', total: '₹ 1,05,000' },
  { course: 'Pharmacy (D.Pharm)', duration: '2 Years', perYear: '₹ 90,000', total: '₹ 1,80,000' },
];

const FeeStructure = () => {
  return (
    <div className="fee-structure-page">
      {/* Hero Section */}
      <section className="fee-hero">
        <div className="fee-hero__inner">
          <div className="fee-hero__content">
            <div className="fee-hero__breadcrumbs">
              <Link to="/">Home</Link>
              <span className="separator">&gt;</span>
              <span>Admission</span>
              <span className="separator">&gt;</span>
              <span className="current">Fee Structure</span>
            </div>
            <h1 className="fee-hero__title">Transparent <br />Fee Structure</h1>
            <div className="fee-hero__accent-line"></div>
            <p className="fee-hero__text">
              We believe in transparency and providing clear information about our academic investments. Explore our detailed fee structure across various programs and institutions.
            </p>
          </div>
          <div className="fee-hero__visual">
            <img src={institutionsBg} alt="Fee Structure" className="fee-hero__image" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="fee-stats-bar">
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Flexible</span>
            <span className="fee-stat-label">PAYMENT OPTIONS</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Merit</span>
            <span className="fee-stat-label">SCHOLARSHIPS</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Secure</span>
            <span className="fee-stat-label">ONLINE PORTAL</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">No Hidden</span>
            <span className="fee-stat-label">CHARGES</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="fee-content">
        {/* Engineering Fees */}
        <section className="fee-section">
          <div className="fee-section__header">
            <h2 className="fee-section__title">B.Tech Programs</h2>
            <p className="fee-section__desc">Academic investment details for our undergraduate engineering programs.</p>
          </div>
          <div className="fee-table-container">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Branch Name</th>
                  <th>Duration</th>
                  <th>1st Year Fee</th>
                  <th>Subsequent Years</th>
                  <th>Total Investment</th>
                </tr>
              </thead>
              <tbody>
                {btechFees.map((item, i) => (
                  <tr key={i}>
                    <td><strong>{item.branch}</strong></td>
                    <td><span className="fee-badge fee-badge--blue">{item.duration}</span></td>
                    <td>{item.firstYear}</td>
                    <td>{item.secondYear}</td>
                    <td><strong>{item.total}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Diploma & Others */}
        <section className="fee-section">
          <div className="fee-section__header">
            <h2 className="fee-section__title">Diploma & Pharmacy</h2>
            <p className="fee-section__desc">Fee details for our vocational and pharmaceutical science courses.</p>
          </div>
          <div className="fee-table-container">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Annual Fee</th>
                  <th>Total Investment</th>
                </tr>
              </thead>
              <tbody>
                {diplomaFees.map((item, i) => (
                  <tr key={i}>
                    <td><strong>{item.course}</strong></td>
                    <td><span className="fee-badge fee-badge--green">{item.duration}</span></td>
                    <td>{item.perYear}</td>
                    <td><strong>{item.total}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeeStructure;
