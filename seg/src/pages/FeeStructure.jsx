import React, { useState } from 'react';
import '../FeeStructure.css';
import institutionsBg from '../assets/images/seg.jpeg';

const sitmFees = [
  { course: 'B.Pharma', total: '₹1,03,000', tuition: '₹80,000' },
  { course: 'B.Pharm Lateral', total: '₹60,000', tuition: '₹60,000' },
  { course: 'D.Pharma', total: '₹60,000', tuition: '₹60,000' },
  { course: 'Diploma', total: '₹40,000', tuition: '₹40,000' },
  { course: 'BBA', total: '₹60,000', tuition: '₹45,000' },
  { course: 'BCA', total: '₹60,000', tuition: '₹45,000' },
  { course: 'B.Tech', total: '₹85,000', tuition: '₹60,000' },
  { course: 'B.Tech Lateral', total: '₹85,000', tuition: '₹60,000' },
  { course: 'M.Tech', total: '₹60,000', tuition: '₹40,000' },
  { course: 'MBA', total: '₹60,000', tuition: '₹40,000' },
  { course: 'MCA', total: '₹60,000', tuition: '₹40,000' },
];

const ssitmFees = [
  { course: 'B.Pharma', total: '₹85,000', tuition: '₹60,000' },
  { course: 'B.Pharm Lateral', total: '₹60,000', tuition: '₹60,000' },
  { course: 'D.Pharma', total: '₹75,000', tuition: '₹65,000' },
  { course: 'Diploma', total: '₹35,000', tuition: '₹35,000' },
  { course: 'BBA', total: '₹45,000', tuition: '₹30,000' },
  { course: 'BCA', total: '₹45,000', tuition: '₹30,000' },
  { course: 'B.Tech', total: '₹85,000', tuition: '₹60,000' },
  { course: 'B.Tech Lateral', total: '₹85,000', tuition: '₹60,000' },
  { course: 'M.Tech', total: '₹60,000', tuition: '₹30,000' },
  { course: 'MBA', total: '₹60,000', tuition: '₹30,000' },
  { course: 'MCA', total: '₹60,000', tuition: '₹30,000' },
];

const institutions = {
  SITM: {
    label: 'SITM Fee Structure',
    fullName: 'Saroj Institute of Technology & Management (SITM), Lucknow',
    address: 'Ahimamau P.O. Arjunganj Sultanpur Road Lucknow | Phone: 9555699988',
    session: '2026-2027',
    fees: sitmFees,
    notes: [
      'Fees once deposited are non-refundable.',
      'Examination, form, and enrollment fees are to be paid directly to the university.',
      'Dress and transportation charges are separate (if availed).',
      'Hostel fee is ₹60,000/year, inclusive of mess facility.',
      '10% of the total fee will be charged as a Development Fee.',
    ],
  },
  SSITM: {
    label: 'SSITM Fee Structure',
    fullName: 'Shivdan Singh Institute of Technology & Management (SSITM), Aligarh',
    address: '10th Km Stone, Aligarh-Mathura Road, Aligarh, Uttar Pradesh 202001 | Phone: 9555699988',
    session: '2026-2027',
    fees: ssitmFees,
    notes: [
      'Fees once deposited are non-refundable.',
      'Examination, form, and enrollment fees are to be paid directly to the university.',
      'Dress and transportation charges are separate (if availed).',
      'Hostel fee is ₹60,000/year, inclusive of mess facility.',
      '10% of the total fee will be charged as a Development Fee.',
    ],
  },
};

const FeeStructure = () => {
  const [active, setActive] = useState('SITM');

  const data = active ? institutions[active] : null;

  return (
    <div className="fee-structure-page">
      {/* Hero */}
      <section className="fee-hero">
        <div className="fee-hero__inner">
          <div className="fee-hero__content">
            <h1 className="fee-hero__title">Transparent <br />Fee Structure</h1>
            <div className="fee-hero__accent-line"></div>
            <p className="fee-hero__text">
              We believe in transparency and providing clear information about our academic investments. Select an institution below to view its detailed fee structure.
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Flexible</span>
            <span className="fee-stat-label">PAYMENT OPTIONS</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Merit</span>
            <span className="fee-stat-label">SCHOLARSHIPS</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">Secure</span>
            <span className="fee-stat-label">ONLINE PORTAL</span>
          </div>
        </div>
        <div className="fee-stat-item">
          <div className="fee-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10z" /></svg>
          </div>
          <div className="fee-stat-info">
            <span className="fee-stat-value">No Hidden</span>
            <span className="fee-stat-label">CHARGES</span>
          </div>
        </div>
      </section>

      {/* Institution Selector Buttons */}
      <div className="fee-selector">
        <p className="fee-selector__label">Select Institution to View Fee Structure</p>
        <div className="fee-selector__buttons">
          {Object.keys(institutions).map((key) => (
            <button
              key={key}
              className={`fee-selector__btn${active === key ? ' fee-selector__btn--active' : ''}`}
              onClick={() => setActive(active === key ? null : key)}
            >
              {institutions[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Table */}
      {data && (
        <main className="fee-content">
          <section className="fee-section">
            <div className="fee-institute-header">
              <h2 className="fee-institute-header__name">{data.fullName}</h2>
              <p className="fee-institute-header__session">Fee Structure for Session {data.session}</p>
              <p className="fee-institute-header__address">{data.address}</p>
            </div>

            <div className="fee-table-container">
              <div className="fee-table-title">Quick Overview</div>
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Total Fees</th>
                    <th>Tuition Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {data.fees.map((item, i) => (
                    <tr key={i}>
                      <td><strong>{item.course}</strong></td>
                      <td>{item.total}</td>
                      <td>{item.tuition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="fee-notes">
              {data.notes.map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>
          </section>
        </main>
      )}
    </div>
  );
};

export default FeeStructure;