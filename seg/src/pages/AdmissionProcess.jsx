import React from 'react';
import { Link } from 'react-router-dom';
import '../AdmissionProcess.css';
import logoImg from '../assets/images/logo.png';

// Using campus image for the right side of the hero section
import heroBg from '../assets/images/programsimg.jpeg';

const AdmissionProcess = () => {
  return (
    <div className="admission-process">
      {/* HERO SECTION */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <img src={heroBg} alt="Admission Background" />
        </div>

        <div className="ap-hero__content">
          <h1 className="ap-hero__title">
            ADMISSION <span>PROCESS</span>
          </h1>
          <p className="ap-hero__subtitle">Your Journey to a Bright Future Starts Here</p>
          <div className="ap-hero__line"></div>
        </div>

        <div className="ap-hero__floating-card">
          <h3>Hassle - Free<br />Registration</h3>
          <div className="ap-hero__card-line"></div>
        </div>

        <div className="ap-hero__character">
          <div className="ap-character-placeholder"></div>
        </div>
      </section>

      {/* PROCEDURE SECTION */}
      <section className="ap-procedure">
        <div className="ap-procedure__header">
          <h2>Our 5-Step Admission Procedure</h2>
          <p>Follow these simple steps to complete your application</p>
        </div>

        <div className="ap-timeline">
          {/* STEP 1 */}
          <div className="ap-step">
            <div className="ap-step__number">01</div>
            <div className="ap-step__card">
              <div className="ap-step__icon ap-step__icon--blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div className="ap-step__content">
                <h3>Register Yourself</h3>
                <p>Create your account using your email address and basic personal information.</p>
                <button className="ap-btn ap-btn--blue">
                  Start Registration <span className="ap-btn__arrow">→</span>
                </button>
              </div>
              <div className="ap-step__illustration ap-step__illustration--1">
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
                </svg>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="ap-step">
            <div className="ap-step__number">02</div>
            <div className="ap-step__card">
              <div className="ap-step__icon ap-step__icon--orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="ap-step__content">
                <h3>Verify Email</h3>
                <p>Check your email for a verification link to activate your account.</p>
                <div className="ap-alert">
                  <span className="ap-alert__icon">⚠</span>
                  If you don't see the email, please check your spam folder.
                </div>
              </div>
              <div className="ap-step__illustration ap-step__illustration--2">
                <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 40 L60 70 L100 40 L100 80 C100 85 95 90 90 90 L30 90 C25 90 20 85 20 80 Z" fill="#f59e0b" />
                  <path d="M20 40 L60 70 L100 40 L90 20 L30 20 Z" fill="#fbbf24" />
                  <rect x="35" y="15" width="50" height="40" rx="4" fill="white" />
                  <rect x="45" y="25" width="30" height="3" fill="#cbd5e1" />
                  <rect x="45" y="32" width="20" height="3" fill="#cbd5e1" />
                  <circle cx="90" cy="80" r="12" fill="#1d4ed8" />
                  <path d="M85 80l4 4 6-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="ap-step">
            <div className="ap-step__number">03</div>
            <div className="ap-step__card">
              <div className="ap-step__icon ap-step__icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="ap-step__content">
                <h3>Fill Application Form Online</h3>
                <p>Complete the detailed application form with your academic and personal information.</p>
                <div className="ap-checks">
                  <div className="ap-check">
                    <span className="ap-check__icon">✓</span> Personal Details
                  </div>
                  <div className="ap-check">
                    <span className="ap-check__icon">✓</span> Academic History
                  </div>
                  <div className="ap-check">
                    <span className="ap-check__icon">✓</span> Contact Information
                  </div>
                  <div className="ap-check">
                    <span className="ap-check__icon">✓</span> Document Upload
                  </div>
                </div>
              </div>
              <div className="ap-step__illustration ap-step__illustration--3">
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
                </svg>
              </div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="ap-step">
            <div className="ap-step__number">04</div>
            <div className="ap-step__card">
              <div className="ap-step__icon ap-step__icon--purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="ap-step__content">
                <h3>Pay Application Fee</h3>
                <p>Secure your application by paying the non-refundable processing fee.</p>
                <div className="ap-payment-options">
                  <span className="ap-payment-label">Payment Options:</span>
                  <div className="ap-payment-icons">
                    <span className="ap-pay-icon ap-pay-icon--visa">VISA</span>
                    <span className="ap-pay-icon ap-pay-icon--mastercard">
                      <div className="mc-circle-1"></div>
                      <div className="mc-circle-2"></div>
                    </span>
                    <span className="ap-pay-icon ap-pay-icon--paypal">PayPal</span>
                  </div>
                </div>
                <button className="ap-btn ap-btn--purple">
                  Proceed to Payment <span className="ap-btn__arrow">→</span>
                </button>
              </div>
              <div className="ap-step__illustration ap-step__illustration--4">
                <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="30" width="60" height="40" rx="6" fill="#312e81" />
                  <rect x="25" y="40" width="60" height="10" fill="#1e1b4b" />
                  <rect x="35" y="60" width="15" height="4" rx="2" fill="#6366f1" />
                  <path d="M75 50 v30 c0 10 -15 15 -15 15 c0 0 -15 -5 -15 -15 v-30 l15 -5 l15 5 Z" fill="#6366f1" opacity="0.9" />
                  <path d="M55 70l4 4 8-8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="ap-step">
            <div className="ap-step__number">05</div>
            <div className="ap-step__card">
              <div className="ap-step__icon ap-step__icon--blue-light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
              <div className="ap-step__content">
                <h3>Submit Application</h3>
                <p>Review and submit your completed application for processing.</p>
                <button className="ap-btn ap-btn--blue">
                  Submit Application <span className="ap-btn__arrow">→</span>
                </button>
                <p className="ap-step__subtext">You'll receive a confirmation email with your application details</p>
              </div>
              <div className="ap-step__illustration ap-step__illustration--5">
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
              </div>
            </div>
          </div>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="ap-contact-text">
              <strong>+91 1234567890</strong>
              <span>Mon - Sat (9:00 AM - 6:00 PM)</span>
            </div>
          </div>
          <div className="ap-contact-divider"></div>
          <div className="ap-contact-item">
            <div className="ap-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="ap-contact-text">
              <strong>info@example.com</strong>
              <span>We'll get back to you soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionProcess;
