import { useState } from 'react';
import { Link } from 'react-router-dom';
import campusBg from '../assets/images/seg.jpeg';
import contactImg from '../assets/images/contact-support.png';
import heroBg from '../assets/images/contactusimg.jpeg';
import logoImg from '../assets/images/logo.png';
import '../contact-us.css';

const faqs = [
  { q: 'How long does it take to get a response?', a: 'We typically respond within 24 hours on business days.', color: 'blue', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
  { q: 'Do you provide scholarship assistance?', a: 'Yes, SEG offers various scholarship programs based on merit and need.', color: 'orange', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  { q: 'How can I apply for admission?', a: 'You can apply online through our admissions portal or visit our campus directly.', color: 'blue', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> },
  { q: 'How can I track my application?', a: 'Log in to the admissions portal with your registered email to track your application status.', color: 'green', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg> },
  { q: 'Can I visit the campus before admission?', a: 'Absolutely! We welcome campus visits. Book a campus visit through our website or call admissions.', color: 'green', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg> },
  { q: 'Who can I contact for admission support?', a: 'Call 09555699988 or email admission.cell@seglko.org for any admission-related queries.', color: 'purple', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg> },
];

export default function ContactUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', inquiry: '', message: '' });

  const handleSubmit = (e) => { e.preventDefault(); alert('Message sent!'); };

  return (
    <div className="cu-page">

      {/* ── Hero ── */}
      <section className="cu-hero">
        <div className="cu-hero__bg">
          <img src={heroBg} alt="Contact Background" />
        </div>


        <div className="cu-hero__container">
          <div className="cu-hero__left">
            <h1 className="cu-hero__title">Let's Connect<br />With <span>SEG</span></h1>
            <p className="cu-hero__sub">Have questions or need guidance? Our team is here to help you every step of the way.</p>
            <div className="cu-hero__actions">
              <a href="tel:09555699988" className="cu-btn cu-btn--solid">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>
                Call Admissions
              </a>
              <a href="#contact-form" className="cu-btn cu-btn--outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Book Campus Visit
              </a>
            </div>
            <p className="cu-hero__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3L19 6V11C19 15.2 16.3 18.9 12 21C7.7 18.9 5 15.2 5 11V6L12 3Z" /><path d="M9.5 11.5L11.2 13.2L14.8 9.6" /></svg>
              Your information is secure and confidential.
            </p>
          </div>

          <div className="cu-hero__right">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>, title: '24/7 Support', desc: "We're here to help you anytime" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>, title: 'Admissions Help', desc: 'Get guidance for courses & process' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, title: 'Campus Assistance', desc: 'Visit, explore & connect with us' },
            ].map((f) => (
              <div className="cu-feature-card" key={f.title}>
                <div className="cu-feature-card__icon">{f.icon}</div>
                <div>
                  <div className="cu-feature-card__title">{f.title}</div>
                  <div className="cu-feature-card__desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Contact Bar ── */}
      <section className="cu-quickbar-section">
        <div className="cu-quickbar">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>, label: 'Call Us', detail: '09555699988, 09810054878', href: 'tel:09555699988', color: '#1d4ed8' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, label: 'Email Support', detail: 'admission.cell@seglko.org', href: 'mailto:admission.cell@seglko.org', color: '#1d4ed8' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, label: 'Visit Campus', detail: 'L-5, Lajpat Nagar-II, Delhi, 110024', href: '#map', color: '#f59e0b' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>, label: 'WhatsApp Us', detail: '+91 95556 99988', href: 'https://wa.me/919555699988', color: '#10b981' },
          ].map((c) => (
            <a className="cu-quickbar__item" href={c.href} key={c.label}>
              <span className="cu-quickbar__icon" style={{ background: c.color }}>{c.icon}</span>
              <div className="cu-quickbar__info">
                <div className="cu-quickbar__label">{c.label}</div>
                <div className="cu-quickbar__detail">{c.detail}</div>
              </div>
              <span className="cu-quickbar__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Form + Campus ── */}
      <section className="cu-main" id="contact-form">
        <div className="cu-main__container">
          {/* Form */}
          <div className="cu-form-card">
            <h2>Send Us a Message</h2>
            <div className="cu-form-card__line"></div>
            <form onSubmit={handleSubmit} className="cu-form">
              <div className="cu-form__row">
                <div className="cu-input">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="cu-input">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" /></svg>
                  <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="cu-form__row">
                <div className="cu-input">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>
                  <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="cu-input">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                  <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                    <option value="">Course Interest</option>
                    <option>B.Tech</option><option>M.Tech</option><option>MBA</option>
                    <option>BCA</option><option>MCA</option><option>B.Pharm</option>
                  </select>
                </div>
              </div>
              <div className="cu-input cu-input--full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                <select value={form.inquiry} onChange={e => setForm({ ...form, inquiry: e.target.value })}>
                  <option value="">Inquiry Type</option>
                  <option>Admissions</option><option>Fees</option><option>Scholarships</option><option>Campus Visit</option><option>Other</option>
                </select>
              </div>
              <div className="cu-input cu-input--full cu-input--textarea">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                <textarea placeholder="How can we help you?" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="cu-submit">
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
              <p className="cu-form__privacy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                We respect your privacy. Your data is safe with us.
              </p>
            </form>
          </div>

          {/* Campus Info */}
          <div className="cu-campus">
            <div className="cu-campus__top">
              <img src={campusBg} alt="Our Campus" className="cu-campus__image" />
              <div className="cu-campus__header">
                <div className="cu-campus__header-title">Our Campus</div>
                <div className="cu-campus__header-line"></div>
              </div>

              <div className="cu-campus__floating-card">
                <div className="cu-campus__office">
                  <span className="cu-campus__office-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 21V5H19V21"></path><path d="M9 9H9.01M15 9H15.01M9 13H9.01M15 13H15.01"></path></svg>
                  </span>
                  <div>
                    <div className="cu-campus__office-title">Delhi Head Office</div>
                    <div className="cu-campus__office-addr">L-5, First Floor, Lajpat Nagar - II,<br />Delhi, Delhi, India, 110024</div>
                  </div>
                </div>
                <div className="cu-campus__details">
                  <div className="cu-campus__detail">
                    <div className="cu-campus__detail-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                    </div>
                    <div>
                      <div className="cu-campus__detail-label">Working Hours</div>
                      <div className="cu-campus__detail-val">Mon - Sat : 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                  <div className="cu-campus__detail">
                    <div className="cu-campus__detail-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>
                    </div>
                    <div>
                      <div className="cu-campus__detail-label">Admission Helpline</div>
                      <div className="cu-campus__detail-val">1800-180-7686</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cu-map" id="map">
              <a href="https://maps.google.com/?q=Saroj+Educational+Group+Lajpat+Nagar+Delhi" target="_blank" rel="noreferrer" className="cu-map__open">Open in Maps <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
              <iframe
                title="SEG Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.2369!3d28.5620!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26f7b5b21ab%3A0x47ff44bbf5ceac1b!2sSaroj%20Educational%20Group!5e0!3m2!1sen!2sin!4v1"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="cu-faq-section">
        <div className="cu-faq-container">
          <h2 className="cu-faq__title">Frequently Asked Questions</h2>
          <div className="cu-faq__line"></div>

          <div className="cu-faq__grid">
            {faqs.map((f, i) => (
              <div className={`cu-faq__card ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="cu-faq__card-header">
                  <div className={`cu-faq__card-icon cu-faq__card-icon--${f.color}`}>
                    {f.icon}
                  </div>
                  <span className="cu-faq__card-q">{f.q}</span>
                  <span className="cu-faq__card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
                {openFaq === i && <div className="cu-faq__card-body">{f.a}</div>}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="cu-trust-bar">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>, title: 'Fast Response', desc: 'We respond to all queries within 24 hours.', color: 'blue' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>, title: 'Expert Guidance', desc: 'Get advice from admission experts.', color: 'green' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>, title: 'Secure Communication', desc: 'Your information is safe and confidential.', color: 'orange' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>, title: 'Multiple Campuses', desc: 'Choose from our wide range of colleges across locations.', color: 'purple' },
            ].map((t) => (
              <div className="cu-trust-item" key={t.title}>
                <div className={`cu-trust-icon cu-trust-icon--${t.color}`}>{t.icon}</div>
                <div>
                  <div className="cu-trust-title">{t.title}</div>
                  <div className="cu-trust-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="cu-cta-banner">
            <div className="cu-cta-banner__left">
              <div className="cu-cta-banner__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              </div>
              <div>
                <h3 className="cu-cta-banner__title">Need Immediate Help?</h3>
                <p className="cu-cta-banner__desc">Talk to our admission counselor now.</p>
              </div>
            </div>
            <div className="cu-cta-banner__actions">
              <a href="tel:09555699988" className="cu-btn cu-btn--solid">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>
                Call Now
              </a>
              <button className="cu-btn cu-btn--outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                Chat with Counselor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
