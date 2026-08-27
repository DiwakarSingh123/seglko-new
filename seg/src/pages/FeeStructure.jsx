import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../FeeStructure.css';
import institutionsBg from '../assets/images/seg.jpeg';

const sitmFees = [
  { sno: 1, course: 'B.Pharma', total: '₹ 1,03,000', tuition: '₹ 60,000' },
  { sno: 2, course: 'D.Pharma', total: '₹ 60,000', tuition: '₹ 60,000' },
  { sno: 3, course: 'Diploma Engg / Lateral Entry', total: '₹ 40,000', tuition: '₹ 30,000' },
  { sno: 4, course: 'BBA', total: '₹ 60,000', tuition: '₹ 30,000' },
  { sno: 5, course: 'BCA', total: '₹ 60,000', tuition: '₹ 30,000' },
  { sno: 6, course: 'B.Tech', total: '₹ 85,000', tuition: '₹ 60,000' },
  { sno: 7, course: 'B.Tech Lateral Entry', total: '₹ 45,000', tuition: '₹ 45,000' },
  { sno: 8, course: 'M.Tech', total: '₹ 60,000', tuition: '₹ 30,000' },
  { sno: 9, course: 'MBA', total: '₹ 60,000', tuition: '₹ 30,000' },
  { sno: 10, course: 'MCA', total: '₹ 60,000', tuition: '₹ 30,000' },
  { sno: 11, course: 'B.Pharma Lateral', total: '₹ 60,000', tuition: '₹ 60,000' },
];

const ssitmFees = [
  { sno: 1, course: 'B.PHARMACY', total: '₹ 1,03,000/-', scholarshipFee: '₹ 35,000/-*', savings: '₹ 68,000/yr', badge: 'High Demand' },
  { sno: 2, course: 'D.PHARMACY', total: '₹ 60,000/-', scholarshipFee: '₹ 30,000/-*', savings: '₹ 30,000/yr', badge: 'PCI Approved' },
  { sno: 3, course: 'DIPLOMA ENGG / LATERAL ENTRY', total: '₹ 40,000/-', scholarshipFee: '₹ 20,000/-*', savings: '₹ 20,000/yr', badge: 'BTE Approved' },
  { sno: 4, course: 'BBA', total: '₹ 60,000/-', scholarshipFee: '₹ 25,000/-*', savings: '₹ 35,000/yr', badge: 'Industry Ready' },
  { sno: 5, course: 'BCA', total: '₹ 60,000/-', scholarshipFee: '₹ 25,000/-*', savings: '₹ 35,000/yr', badge: 'Tech Career' },
  { sno: 6, course: 'B.TECH', total: '₹ 85,000/-', scholarshipFee: '₹ 35,000/-*', savings: '₹ 50,000/yr', badge: 'AKTU Affiliated' },
  { sno: 7, course: 'B.TECH (LATERAL ENTRY)', total: '₹ 45,000/-', scholarshipFee: '₹ 30,000/-*', savings: '₹ 15,000/yr', badge: 'Direct 2nd Yr' },
  { sno: 8, course: 'M.TECH', total: '₹ 60,000/-', scholarshipFee: '₹ 40,000/-*', savings: '₹ 20,000/yr', badge: 'PG Program' },
  { sno: 9, course: 'MBA', total: '₹ 60,000/-', scholarshipFee: '₹ 25,000/-*', savings: '₹ 35,000/yr', badge: 'Placement Focus' },
  { sno: 10, course: 'MCA', total: '₹ 60,000/-', scholarshipFee: '₹ 25,000/-*', savings: '₹ 35,000/yr', badge: 'Software Track' },
  { sno: 11, course: 'B.PHARMACY (LATERAL)', total: '₹ 60,000/-', scholarshipFee: '₹ 35,000/-*', savings: '₹ 25,000/yr', badge: 'Direct 2nd Yr' },
];

const institutions = {
  SSITM: {
    label: 'SSITM Aligarh Fee Structure (Session 2026-27)',
    shortName: 'SSITM, Aligarh',
    fullName: 'Shivdan Singh Institute of Technology & Management (SSITM), Aligarh',
    tagline: "Aligarh's Oldest & Most Trusted Institution • ESTD. 1997",
    code: 'AKTU CODE: 007',
    approvals: 'APPROVED BY AICTE, NEW DELHI & PCI, NEW DELHI',
    address: '10th KM Stone, Aligarh - Mathura Road, Aligarh, Uttar Pradesh 202002',
    phone: '+91 9810054878',
    website: 'www.ssitm.in',
    session: '2026-2027',
    isSpecialScholarship: true,
    fees: ssitmFees,
    eligibility: 'Minimum 60% marks required for admission under this fee structure.',
    scholarshipTerms: 'Special scholarship rates up to ₹25,000/- per year valid for the First 25 students only. After limit, fees may increase.',
    notes: [
      'Scholarship Up to ₹25,000/- (25K) per year applicable across all approved courses.',
      'Beti Padhao Beti Bachao: Special fee benefits and concessions for girl students.',
      'Minimum 60% marks required in the qualifying exam for scholarship eligibility.',
      'Academic fees once deposited are strictly non-refundable and non-transferable.',
      'Examination, university enrollment, and form fees are to be paid directly to AKTU / BTE / PCI.',
      'Optional on-campus hostel with mess available at ₹50,000 - ₹60,000/year.',
      'Bus transportation connectivity across Aligarh is available separately.',
    ],
  },
  SITM: {
    label: 'SITM Lucknow Fee Structure (Session 2026-27)',
    shortName: 'SITM, Lucknow',
    fullName: 'Saroj Institute of Technology & Management (SITM), Lucknow',
    tagline: "Premier Technical & Professional Institute • AKTU Code 123",
    code: 'AKTU CODE: 123',
    approvals: 'APPROVED BY AICTE & PCI, NEW DELHI',
    address: 'Ahimamau P.O. Arjunganj Sultanpur Road Lucknow',
    phone: '9555699988',
    website: 'www.sitmlko.org',
    session: '2026-2027',
    isSpecialScholarship: false,
    fees: sitmFees,
    notes: [
      '10% Development Fee applicable.',
      'Scholarships applicable only on Tuition Fees.',
      'Sibling Discount: 15% on Total Fees.',
      'Installment option available (₹2,000 extra).',
      'Hostel & Bus charges separate (if availed).',
      '50% seats eligible for scholarship (50% scholarship seats reserved for girls).',
      'Examination, form, and enrollment fees are to be paid directly to the university.',
      'Fees once deposited are strictly non-refundable.',
    ],
  },
};

const FeeStructure = () => {
  const location = useLocation();
  const [active, setActive] = useState('SSITM');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const instParam = params.get('institution') || params.get('inst');
    if (instParam && institutions[instParam.toUpperCase()]) {
      setActive(instParam.toUpperCase());
    } else if (location.hash === '#ssitm') {
      setActive('SSITM');
    } else if (location.hash === '#sitm') {
      setActive('SITM');
    }
  }, [location]);

  const data = institutions[active] || institutions.SSITM;

  return (
    <div className="fee-structure-page">
      {/* Hero */}
      <section className="fee-hero">
        <div className="fee-hero__inner">
          <div className="fee-hero__content">
            <h1 className="fee-hero__title">Transparent <br />Fee Structure</h1>
            <div className="fee-hero__accent-line"></div>
            <p className="fee-hero__text">
              We believe in transparency and providing clear information about our academic investments and scholarship schemes. Select an institution below to view its approved 2026-27 fee schedule.
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
            <span className="fee-stat-value">Up to ₹25K</span>
            <span className="fee-stat-label">SCHOLARSHIP / YR</span>
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
        <p className="fee-selector__label">Select Institution to View Approved Fee Structure</p>
        <div className="fee-selector__buttons">
          <button
            className={`fee-selector__btn${active === 'SSITM' ? ' fee-selector__btn--active' : ''}`}
            onClick={() => setActive('SSITM')}
          >
            SSITM, Aligarh (AKTU 007)
          </button>
          <button
            className={`fee-selector__btn${active === 'SITM' ? ' fee-selector__btn--active' : ''}`}
            onClick={() => setActive('SITM')}
          >
            SITM, Lucknow (AKTU 123)
          </button>
        </div>
      </div>

      {/* Fee Table & Detailed Content */}
      {data && (
        <main className="fee-content">
          <section className="fee-section">
            
            {/* Institute Header Box */}
            <div className="fee-institute-header">
              <div className="fee-badge-row">
                <span className="fee-tag-badge">{data.code}</span>
                <span className="fee-tag-badge fee-tag-badge--gold">{data.approvals}</span>
              </div>
              <h2 className="fee-institute-header__name">{data.fullName}</h2>
              <p className="fee-institute-header__session">Approved Fee Structure for Session {data.session}</p>
              <p className="fee-institute-header__address">{data.address} | Phone: <strong>{data.phone}</strong></p>
            </div>

            {/* Special Highlights for SSITM */}
            {data.isSpecialScholarship && (
              <div className="fee-highlight-grid">
                
                {/* Beti Padhao Card */}
                <div className="fee-highlight-card fee-highlight-card--pink">
                  <div className="fee-highlight-tag fee-highlight-tag--pink">Special Initiative</div>
                  <h3 className="fee-highlight-title">Empowering Future Women Professionals</h3>
                  <div className="fee-highlight-subtag fee-highlight-subtag--pink">Beti Padhao Beti Bachao</div>
                  <p className="fee-highlight-desc">
                    Special fee concessions and dedicated scholarship benefits for girl students across all courses.
                  </p>
                </div>

                {/* Scholarship Card */}
                <div className="fee-highlight-card fee-highlight-card--orange">
                  <div className="fee-highlight-tag fee-highlight-tag--orange">Scholarship Scheme</div>
                  <div className="fee-highlight-value">SCHOLARSHIP UP TO ₹25K</div>
                  <div className="fee-highlight-subtag">Per Year For Any Course</div>
                  <p className="fee-highlight-desc">
                    First 25 students only. Minimum 60% marks required for eligibility.
                  </p>
                </div>

                {/* Healthcare & Helpline Card */}
                <div className="fee-highlight-card fee-highlight-card--blue">
                  <div className="fee-highlight-tag fee-highlight-tag--blue">Admissions 2026-27</div>
                  <h3 className="fee-highlight-title">Build Your Career in Healthcare & Tech</h3>
                  <div className="fee-highlight-desc" style={{ marginTop: '8px' }}>
                    Helpline / Admission Enquiry:
                  </div>
                  <a href={`tel:${data.phone}`} className="fee-highlight-phone">
                    📞 {data.phone}
                  </a>
                </div>

              </div>
            )}

            {/* Fee Table */}
            <div className="fee-table-container">
              <div className="fee-table-title flex-between">
                <span>{data.shortName} — Approved Course Fee Table (Session {data.session})</span>
                {data.isSpecialScholarship && (
                  <span className="fee-badge fee-badge--green">
                    *Special Scholarship Fee (First 25 Students)
                  </span>
                )}
              </div>

              <table className="fee-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                    <th>Course</th>
                    <th style={{ textAlign: 'right' }}>Total Fees Per Year</th>
                    <th style={{ textAlign: 'right', color: data.isSpecialScholarship ? '#c2410c' : '#1e293b', background: data.isSpecialScholarship ? '#fff7ed' : '#f8fafc' }}>
                      {data.isSpecialScholarship ? 'Fees After Scholarship* (Per Year)' : 'Tuition Fees / Year'}
                    </th>
                    {data.isSpecialScholarship && <th style={{ textAlign: 'center' }}>Annual Saving</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.fees.map((item, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>
                        {item.sno || i + 1}
                      </td>
                      <td>
                        <strong>{item.course}</strong>
                        {item.badge && (
                          <span className="fee-course-badge">{item.badge}</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '600', color: '#334155' }}>
                        {item.total}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '800', fontSize: '16px', color: data.isSpecialScholarship ? '#c2410c' : '#1e293b', background: data.isSpecialScholarship ? '#fff7ed' : 'transparent' }}>
                        {item.scholarshipFee || item.tuition}
                      </td>
                      {data.isSpecialScholarship && (
                        <td style={{ textAlign: 'center' }}>
                          <span className="fee-badge fee-badge--green">
                            Save {item.savings}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Terms & Important Notes */}
            <div className="fee-notes-box">
              <h3 className="fee-notes-title">Important Notes & Policies</h3>
              <ul className="fee-notes-list">
                {data.notes.map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>

            {/* Contact & Helpline Bar */}
            <div className="fee-cta-box">
              <div>
                <h3 className="fee-cta-title">Need Guidance on Fees & Scholarships?</h3>
                <p className="fee-cta-desc">Speak directly with our expert academic admission counselors.</p>
              </div>
              <div className="fee-cta-actions">
                <a href={`tel:${data.phone}`} className="fee-cta-btn fee-cta-btn--primary">
                  📞 Call {data.phone}
                </a>
                {data.website && (
                  <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="fee-cta-btn fee-cta-btn--secondary">
                    Visit {data.website}
                  </a>
                )}
              </div>
            </div>

          </section>
        </main>
      )}
    </div>
  );
};

export default FeeStructure;
