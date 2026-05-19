import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../AdmissionProcess.css';
import logoImg from '../assets/images/logo.png';
import heroBg from '../assets/images/programsimg.jpeg';

export default function AdmissionProcess() {
  const [data, setData] = useState({
    heroTitle: "ADMISSION PROCESS",
    heroSubtitle: "Your Journey to a Bright Future Starts Here",
    phone: "+91 9555699988",
    email: "admission.cell@seglko.org",
    steps: [
      {
        number: "01",
        title: "Register Yourself",
        text: "Create your account using your email address and basic personal information."
      },
      {
        number: "02",
        title: "Verify Email",
        text: "Check your email for a verification link to activate your account."
      },
      {
        number: "03",
        title: "Fill Application Form Online",
        text: "Complete the detailed application form with your academic and personal information."
      },
      {
        number: "04",
        title: "Pay Application Fee",
        text: "Secure your application by paying the non-refundable processing fee."
      },
      {
        number: "05",
        title: "Submit Application",
        text: "Review and submit your completed application for processing."
      }
    ]
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/settings')
      .then(res => res.json())
      .then(settings => {
        if (settings && settings.admissionProcess) {
          setData(settings.admissionProcess);
        }
      })
      .catch(err => console.error("Error loading admission process:", err));
  }, []);

  const illustrations = [
    // Step 1
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="80" height="60" rx="8" fill="#eef2ff" />
      <rect x="20" y="20" width="80" height="15" rx="8" fill="#1d4ed8" />
      <circle cx="30" cy="27.5" r="2.5" fill="white" />
      <circle cx="40" cy="27.5" r="2.5" fill="white" />
      <circle cx="50" cy="27.5" r="2.5" fill="white" />
      <circle cx="40" cy="55" r="8" fill="#93c5fd" />
      <rect x="60" y="50" width="30" height="4" rx="2" fill="#93c5fd" />
      <rect x="60" y="58" width="20" height="4" rx="2" fill="#93c5fd" />
      <circle cx="90" cy="80" r="12" fill="#1d4ed8" />
      <path d="M85 80l4 4 6-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Step 2
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40 L60 70 L100 40 L100 80 C100 85 95 90 90 90 L30 90 C25 90 20 85 20 80 Z" fill="#f59e0b" />
      <path d="M20 40 L60 70 L100 40 L90 20 L30 20 Z" fill="#fbbf24" />
      <rect x="35" y="15" width="50" height="40" rx="4" fill="white" />
      <rect x="45" y="25" width="30" height="3" fill="#cbd5e1" />
      <rect x="45" y="32" width="20" height="3" fill="#cbd5e1" />
      <circle cx="90" cy="80" r="12" fill="#1d4ed8" />
      <path d="M85 80l4 4 6-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Step 3
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="15" width="50" height="70" rx="4" fill="#22c55e" />
      <rect x="35" y="25" width="40" height="55" rx="2" fill="white" />
      <rect x="45" y="10" width="20" height="10" rx="2" fill="#166534" />
      <path d="M42 35l4 4 8-8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="58" y="32" width="12" height="3" fill="#cbd5e1" />
      <path d="M42 50l4 4 8-8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="58" y="47" width="12" height="3" fill="#cbd5e1" />
      <path d="M42 65l4 4 8-8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="58" y="62" width="12" height="3" fill="#cbd5e1" />
      <path d="M75 80 l15 -15 l5 5 l-15 15 Z" fill="#22c55e" />
      <path d="M75 80 l-5 5 l5 -1 Z" fill="#15803d" />
    </svg>,
    // Step 4
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="60" height="40" rx="6" fill="#312e81" />
      <rect x="25" y="40" width="60" height="10" fill="#1e1b4b" />
      <rect x="35" y="60" width="15" height="4" rx="2" fill="#6366f1" />
      <path d="M75 50 v30 c0 10 -15 15 -15 15 c0 0 -15 -5 -15 -15 v-30 l15 -5 l15 5 Z" fill="#6366f1" opacity="0.9" />
      <path d="M55 70l4 4 8-8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Step 5
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 L60 80 L100 50 L100 90 C100 95 95 100 90 100 L30 100 C25 100 20 95 20 90 Z" fill="#60a5fa" />
      <rect x="35" y="30" width="50" height="40" rx="4" fill="white" />
      <rect x="45" y="40" width="30" height="3" fill="#cbd5e1" />
      <rect x="45" y="47" width="20" height="3" fill="#cbd5e1" />
      <path d="M60 10 L100 30 L80 40 Z" fill="#1d4ed8" />
      <path d="M60 10 L80 40 L50 30 Z" fill="#2563eb" />
      <path d="M50 30 c-10 -5 -20 10 -30 0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <circle cx="90" cy="80" r="12" fill="#10b981" />
      <path d="M85 80l4 4 6-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ];

  const icons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  ];

  const colors = ["blue", "orange", "green", "purple", "blue-light"];

  return (
    <div className="admission-process">
      {/* HERO SECTION */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <img src={heroBg} alt="Admission Background" />
        </div>

        <div className="ap-hero__content">
          <h1 className="ap-hero__title" dangerouslySetInnerHTML={{ __html: data.heroTitle.replace("PROCESS", "<span>PROCESS</span>") }} />
          <p className="ap-hero__subtitle">{data.heroSubtitle}</p>
          <div className="ap-hero__line"></div>
        </div>

        <div className="ap-hero__floating-card">
          <h3>Hassle - Free<br />Registration</h3>
          <div className="ap-hero__card-line"></div>
        </div>
      </section>

      {/* PROCEDURE SECTION */}
      <section className="ap-procedure">
        <div className="ap-procedure__header">
          <h2>Our {data.steps.length}-Step Admission Procedure</h2>
          <p>Follow these simple steps to complete your application</p>
        </div>

        <div className="ap-timeline">
          {data.steps.map((st, idx) => {
            const stepColor = colors[idx % colors.length];
            return (
              <div className="ap-step" key={idx}>
                <div className="ap-step__number">{st.number}</div>
                <div className="ap-step__card">
                  <div className={`ap-step__icon ap-step__icon--${stepColor}`}>
                    {icons[idx % icons.length]}
                  </div>
                  <div className="ap-step__content">
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                    {idx === 0 && (
                      <button className="ap-btn ap-btn--blue">
                        Start Registration <span className="ap-btn__arrow">→</span>
                      </button>
                    )}
                    {idx === 1 && (
                      <div className="ap-alert">
                        <span className="ap-alert__icon">⚠</span>
                        If you don't see the email, please check your spam folder.
                      </div>
                    )}
                    {idx === 3 && (
                      <button className="ap-btn ap-btn--purple">
                        Proceed to Payment <span className="ap-btn__arrow">→</span>
                      </button>
                    )}
                    {idx === 4 && (
                      <button className="ap-btn ap-btn--blue">
                        Submit Application <span className="ap-btn__arrow">→</span>
                      </button>
                    )}
                  </div>
                  <div className={`ap-step__illustration ap-step__illustration--${idx + 1}`}>
                    {illustrations[idx % illustrations.length]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER BANNER */}
      <section className="ap-help">
        <div className="ap-help__left">
          <h2>Need Help?</h2>
          <p>Get in touch with our team anytime you need.</p>
        </div>
        <div className="ap-help__right">
          <div className="ap-contact-item">
            <div className="ap-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="ap-contact-text">
              <strong>{data.phone}</strong>
              <span>Mon - Sat (9:00 AM - 6:00 PM)</span>
            </div>
          </div>
          <div className="ap-contact-divider"></div>
          <div className="ap-contact-item">
            <div className="ap-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="ap-contact-text">
              <strong>{data.email}</strong>
              <span>We'll get back to you soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
