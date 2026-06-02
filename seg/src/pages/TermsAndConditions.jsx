import '../terms-and-conditions.css';

/* ─── Inline SVG Icons ─── */
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const CheckCircleIcon = ({ color = '#2563eb' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);


const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#475569" strokeWidth="2"/><path d="M8 11V7a4 4 0 118 0v4" stroke="#475569" strokeWidth="2" strokeLinecap="round"/></svg>
);

const LockSmallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="6" y="11" width="12" height="9" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M9 11V8a3 3 0 116 0v3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.37 1.61.7 2.38a2 2 0 01-.45 2.11L8.09 9.5a16 16 0 006.41 6.41l1.27-1.27a2 2 0 012.11-.45c.77.33 1.57.57 2.38.7A2 2 0 0122 16.92z" stroke="#2563eb" strokeWidth="2"/></svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#475569" strokeWidth="2"/><path d="M3 7l9 6 9-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z" stroke="#475569" strokeWidth="2"/><circle cx="12" cy="10" r="2.5" stroke="#475569" strokeWidth="2"/></svg>
);


/* ─── Data ─── */
const services = [
  'Online courses and classes',
  'Educational resources and materials',
  'Workshops and webinars',
  'Personalized academic support',
];

const responsibilities = [
  { req: 'Account Information', detail: 'Provide accurate registration details' },
  { req: 'Security', detail: 'Maintain account confidentiality' },
  { req: 'Legal Compliance', detail: 'Follow all applicable laws' },
  { req: 'Proper Use', detail: 'No disruption of services' },
  { req: 'Intellectual Property', detail: 'Respect copyrights' },
];

const paymentPoints = [
  'Fees must be paid in full at registration',
  'We accept major credit cards and online payments',
  'Receipts are issued for all transactions',
];

const refundPoints = [
  '7-day refund window from enrollment date',
  'No refunds after accessing course materials',
  'Group programs may have special conditions',
];


/* ─── Component ─── */
export default function TermsAndConditions() {
  return (
    <div className="tnc-page">
      {/* ── Hero ── */}
      <section className="tnc-hero">
        <div className="tnc-hero__inner">
          <h1 className="tnc-hero__title">Terms and Conditions</h1>
          <span className="tnc-hero__badge">Latest Updated</span>
        </div>
      </section>

      <div className="tnc-body">
        {/* ── Important Notice ── */}
        <div className="tnc-notice">
          <div className="tnc-notice__bar" />
          <div className="tnc-notice__content">
            <p className="tnc-notice__label">Important Notice</p>
            <p className="tnc-notice__text">
              By using our services, you agree to these Terms and Conditions. Please read them carefully before accessing our educational resources.
            </p>
          </div>
        </div>

        {/* ── 1. Acceptance ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">1.</span> Acceptance of Terms
          </h2>
          <div className="tnc-card tnc-card--check">
            <span className="tnc-card__icon"><CheckIcon /></span>
            <p>
              Your access to and use of Saroj Educational Group's services constitutes acceptance of these Terms. If you disagree with any part, you must discontinue use immediately.
            </p>
          </div>
        </section>

        {/* ── 2. Services Overview ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">2.</span> Services Overview
          </h2>
          <div className="tnc-services-grid">
            {services.map((s) => (
              <div className="tnc-service-chip" key={s}>
                <CheckCircleIcon />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <p className="tnc-muted">
            We reserve the right to modify or discontinue any service without notice.
          </p>
        </section>

        {/* ── 3. User Responsibilities ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">3.</span> User Responsibilities
          </h2>
          <div className="tnc-table-wrap">
            <table className="tnc-table">
              <thead>
                <tr>
                  <th>REQUIREMENT</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {responsibilities.map((r) => (
                  <tr key={r.req}>
                    <td className="tnc-table__req">{r.req}</td>
                    <td>{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 4. Payment and Refunds ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">4.</span> Payment and Refunds
          </h2>
          <div className="tnc-dual-cards">
            <div className="tnc-policy-card">
              <h3 className="tnc-policy-card__title">
                <ClockIcon /> Payment Policy
              </h3>
              <ul>
                {paymentPoints.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div className="tnc-policy-card">
              <h3 className="tnc-policy-card__title">
                <LockSmallIcon /> Refund Policy
              </h3>
              <ul>
                {refundPoints.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 5. Intellectual Property ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">5.</span> Intellectual Property
          </h2>
          <div className="tnc-callout tnc-callout--amber">
            <div className="tnc-callout__bar" />
            <div className="tnc-callout__content">
              <p className="tnc-callout__label">Copyright Notice</p>
              <p className="tnc-callout__text">
                All content is protected under copyright law. Unauthorized use, reproduction, or distribution is strictly prohibited.
              </p>
            </div>
          </div>
          <div className="tnc-card tnc-card--bolt">
            <span className="tnc-card__icon"><BoltIcon /></span>
            <p>
              Course materials are licensed for individual use only. Commercial use requires written permission from Saroj Educational Group.
            </p>
          </div>
        </section>

        {/* ── 6. Privacy Commitment ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">6.</span> Privacy Commitment
          </h2>
          <div className="tnc-card tnc-card--check">
            <span className="tnc-card__icon"><LockIcon /></span>
            <p>
              We protect your personal information according to our Privacy Policy. By using our services, you consent to our data practices as described therein.
            </p>
          </div>
        </section>

        {/* ── 7. Liability Disclaimer ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">7.</span> Liability Disclaimer
          </h2>
          <div className="tnc-callout tnc-callout--red">
            <div className="tnc-callout__bar" />
            <div className="tnc-callout__content">
              <p className="tnc-callout__label">Important Limitation</p>
              <p className="tnc-callout__text">
                Our liability is limited to the amount you paid for the service. We are not responsible for indirect or consequential damages.
              </p>
            </div>
          </div>
          <p className="tnc-muted" style={{ marginTop: '1rem' }}>
            Educational outcomes may vary based on individual effort and circumstances. We make no guarantees regarding specific academic results.
          </p>
        </section>

        {/* ── 8. Terms Modifications ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">8.</span> Terms Modifications
          </h2>
          <div className="tnc-card tnc-card--check">
            <span className="tnc-card__icon"><InfoIcon /></span>
            <p>
              We may update these Terms periodically. Continued use after changes constitutes acceptance of the modified Terms. Check this page regularly for updates.
            </p>
          </div>
        </section>

        {/* ── 9. Governing Law ── */}
        <section className="tnc-section">
          <h2 className="tnc-section__heading">
            <span className="tnc-section__number">9.</span> Governing Law
          </h2>
          <div className="tnc-card tnc-card--check">
            <span className="tnc-card__icon"><ShieldCheckIcon /></span>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Delhi.
            </p>
          </div>
        </section>

        {/* ── Contact Us ── */}
        <section className="tnc-section tnc-contact-section">
          <h2 className="tnc-section__heading tnc-section__heading--contact">Contact Us</h2>
          <div className="tnc-contact-card">
            <div className="tnc-contact-card__header">
              <PhoneIcon />
              <span>Saroj Educational Group</span>
            </div>
            <div className="tnc-contact-card__body">
              <div className="tnc-contact-card__col">
                <p className="tnc-contact-card__label">CONTACT METHODS</p>
                <p className="tnc-contact-card__item">
                  <MailIcon />
                  <span>admission.cell@seglko.org</span>
                </p>
                <p className="tnc-contact-card__item">
                  <PhoneIcon />
                  <span>09555699988, 09810054878</span>
                </p>
              </div>
              <div className="tnc-contact-card__col">
                <p className="tnc-contact-card__label">PHYSICAL ADDRESS</p>
                <p className="tnc-contact-card__item">
                  <MapPinIcon />
                  <span>L-5, First Floor, Lajpat Nagar - II,<br />Delhi, India, 110024</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
