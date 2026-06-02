import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../EligibilityCriteria.css';

const eligibilityContent = {
  undergraduate: {
    academic: [
      'Must have passed 10+2 examination with Physics and Mathematics as compulsory subjects.',
      'Minimum aggregate marks of 45% (40% for reserved category) in the qualifying examination.',
    ],
    age: [
      'Candidates must be at least 17 years of age on or before 31st December of the admission year.',
    ],
    additional: [
      'All candidates must submit original documents for verification',
      'International students must have equivalent qualifications',
      '5% relaxation in marks for reserved category candidates',
      'Admission subject to availability of seats',
    ],
  },
  postgraduate: {
    academic: [
      'Must have completed a bachelor degree in the relevant discipline from a recognized university.',
      'Minimum aggregate marks of 50% (45% for reserved category) in the qualifying degree.',
      'Entrance test or interview may be required for selected postgraduate programs.',
    ],
    age: [
      'There is no upper age limit for most postgraduate programs unless specified by the regulatory body.',
    ],
    additional: [
      'Final year graduation students may apply subject to submission of final mark sheets',
      'Work experience may be preferred for selected professional programs',
      'Reserved category relaxation will be applied as per applicable norms',
      'Admission subject to document verification and availability of seats',
    ],
  },
  diploma: {
    academic: [
      'Must have passed Class 10 or equivalent examination from a recognized board.',
      'Science and Mathematics are required for engineering and polytechnic diploma programs.',
      'Minimum marks will be considered as per program and regulatory requirements.',
    ],
    age: [
      'Candidates should meet the age criteria prescribed by the relevant board or regulatory authority.',
    ],
    additional: [
      'Original Class 10 marksheet and certificates are required for verification',
      'Lateral entry candidates must meet the required intermediate or ITI qualification',
      'Reserved category relaxation will be applied as per applicable norms',
      'Admission subject to eligibility verification and availability of seats',
    ],
  },
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const EligibilityCriteria = () => {
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [openAccordion, setOpenAccordion] = useState('additional');
  const currentEligibility = eligibilityContent[activeTab];

  const toggleAccordion = (id) => {
    if (openAccordion === id) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(id);
    }
  };

  return (
    <div className="eligibility-page">
      {/* HERO SECTION */}
      <section className="eligibility-hero">
        <div className="eligibility-hero__bg"></div>
        <div className="eligibility-hero__content">
          <h1 className="eligibility-hero__title">Eligibility Criteria</h1>
          <div className="eligibility-hero__line"></div>
          <p className="eligibility-hero__subtitle">
            Check the eligibility requirements for your desired program<br />
            and take the first step toward your future.
          </p>
        </div>
      </section>



      {/* MAIN CONTENT SECTION */}
      <section className="eligibility-main">
        <div className="eligibility-container">
          <div className="eligibility-layout">

            {/* LEFT SIDEBAR */}
            <aside className="eligibility-sidebar">
              <div className="eligibility-card">
                <h3 className="eligibility-card__title">Start Your Journey</h3>
                <div className="eligibility-card__line"></div>
                <div className="eligibility-card__icon-wrapper">
                  <div className="eligibility-card__icon-ring">
                    <div className="eligibility-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="white" />
                        <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="eligibility-card__text">
                  Ensure you meet the eligibility criteria before applying.
                  For any queries, feel free to contact our admission team.
                </p>
                <Link to="/contact-us" className="eligibility-card__btn">
                  <span className="eligibility-card__btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </span>
                  <div className="eligibility-card__btn-text">
                    <strong>Need Help?</strong>
                    <span>Contact Us</span>
                  </div>
                  <span className="eligibility-card__btn-arrow">&gt;</span>
                </Link>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <div className="eligibility-content">
              <h2 className="eligibility-content__title">Admission Eligibility Criteria</h2>

              {/* TABS */}
              <div className="eligibility-tabs">
                <button
                  className={`eligibility-tab ${activeTab === 'undergraduate' ? 'active' : ''}`}
                  onClick={() => setActiveTab('undergraduate')}
                  aria-pressed={activeTab === 'undergraduate'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  Undergraduate
                </button>
                <button
                  className={`eligibility-tab ${activeTab === 'postgraduate' ? 'active' : ''}`}
                  onClick={() => setActiveTab('postgraduate')}
                  aria-pressed={activeTab === 'postgraduate'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Postgraduate
                </button>
                <button
                  className={`eligibility-tab ${activeTab === 'diploma' ? 'active' : ''}`}
                  onClick={() => setActiveTab('diploma')}
                  aria-pressed={activeTab === 'diploma'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Diploma
                </button>
              </div>

              {/* ACCORDION */}
              <div className="eligibility-accordion">
                {/* Item 1 */}
                <div className={`eligibility-accordion-item ${openAccordion === 'academic' ? 'open' : ''}`}>
                  <button className="eligibility-accordion-header" onClick={() => toggleAccordion('academic')}>
                    <div className="eligibility-accordion-header-left">
                      <div className="eligibility-accordion-icon eligibility-accordion-icon--blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      </div>
                      <span className="eligibility-accordion-title">Academic Requirements</span>
                    </div>
                    <span className="eligibility-accordion-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  {openAccordion === 'academic' && (
                    <div className="eligibility-accordion-body">
                      <div className="eligibility-checklist">
                        {currentEligibility.academic.map((item) => (
                          <div className="eligibility-check-item" key={item}>
                            <span className="eligibility-check-icon"><CheckIcon /></span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Item 2 */}
                <div className={`eligibility-accordion-item ${openAccordion === 'age' ? 'open' : ''}`}>
                  <button className="eligibility-accordion-header" onClick={() => toggleAccordion('age')}>
                    <div className="eligibility-accordion-header-left">
                      <div className="eligibility-accordion-icon eligibility-accordion-icon--orange">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <span className="eligibility-accordion-title">Age Limit</span>
                    </div>
                    <span className="eligibility-accordion-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  {openAccordion === 'age' && (
                    <div className="eligibility-accordion-body">
                      <div className="eligibility-checklist">
                        {currentEligibility.age.map((item) => (
                          <div className="eligibility-check-item" key={item}>
                            <span className="eligibility-check-icon"><CheckIcon /></span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Item 3 */}
                <div className={`eligibility-accordion-item ${openAccordion === 'additional' ? 'open' : ''}`}>
                  <button className="eligibility-accordion-header" onClick={() => toggleAccordion('additional')}>
                    <div className="eligibility-accordion-header-left">
                      <div className="eligibility-accordion-icon eligibility-accordion-icon--purple">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <span className="eligibility-accordion-title">Additional Information</span>
                    </div>
                    <span className="eligibility-accordion-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {openAccordion === 'additional' ? (
                          <polyline points="18 15 12 9 6 15"></polyline>
                        ) : (
                          <polyline points="6 9 12 15 18 9"></polyline>
                        )}
                      </svg>
                    </span>
                  </button>
                  {openAccordion === 'additional' && (
                    <div className="eligibility-accordion-body eligibility-accordion-body--purple">
                      <div className="eligibility-checklist">
                        {currentEligibility.additional.map((item, index) => (
                          <React.Fragment key={item}>
                            <div className="eligibility-check-item">
                              <span className="eligibility-check-icon">
                                <CheckIcon />
                              </span>
                              {item}
                            </div>
                            {index < currentEligibility.additional.length - 1 && <div className="eligibility-check-line"></div>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER FEATURES */}
      <section className="eligibility-features-section">
        <div className="eligibility-features">
          <div className="eligibility-feature">
            <div className="eligibility-feature__icon eligibility-feature__icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="eligibility-feature__content">
              <h4>Transparent Process</h4>
              <p>Clear and simple eligibility requirements.</p>
            </div>
          </div>

          <div className="eligibility-feature">
            <div className="eligibility-feature__icon eligibility-feature__icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <div className="eligibility-feature__content">
              <h4>Fair Evaluation</h4>
              <p>Merit-based selection process.</p>
            </div>
          </div>

          <div className="eligibility-feature">
            <div className="eligibility-feature__icon eligibility-feature__icon--orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="eligibility-feature__content">
              <h4>Equal Opportunity</h4>
              <p>Inclusive and accessible for all.</p>
            </div>
          </div>

          <div className="eligibility-feature">
            <div className="eligibility-feature__icon eligibility-feature__icon--purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <div className="eligibility-feature__content">
              <h4>Quality Education</h4>
              <p>Learn from experienced faculty and industry experts.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EligibilityCriteria;
