import '../privacy-policy.css';

const CheckCircleIcon = ({ color = '#2563eb' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const MonitorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M8 20h8M12 16v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M8 11V7a4 4 0 118 0v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);
const CookieIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="2"/><circle cx="8" cy="10" r="1.2" fill="#2563eb"/><circle cx="14" cy="8" r="1.2" fill="#2563eb"/><circle cx="10" cy="15" r="1.2" fill="#2563eb"/><circle cx="15" cy="14" r="1.2" fill="#2563eb"/></svg>
);
const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="2"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" stroke="#2563eb" strokeWidth="2"/></svg>
);
const ChildIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="#2563eb" strokeWidth="2"/><path d="M5.5 21c0-3.5 2.9-6.5 6.5-6.5s6.5 3 6.5 6.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
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

const tocItems = [
  'Information We Collect','How We Use Your Information','Information Sharing and Disclosure',
  'Data Security','Your Privacy Rights','Cookies and Tracking Technologies',
  'Third-Party Services',"Children's Privacy",'Changes to This Policy','Contact Us',
];
const personalInfo = [
  'Full name and contact details (email, phone number, address)',
  'Demographic information (age, gender, educational background)',
  'Payment and billing information',
  'Government identification numbers when required',
  'Academic records and qualifications',
];
const nonPersonalInfo = [
  'Browser type and version','IP address and approximate location',
  'Device information (type, operating system)','Usage data (pages visited, time spent)',
  'Cookies and tracking data',
];
const collectMethods = [
  { icon: '📋', title: 'Directly from you', desc: 'Through forms, registrations, and communications' },
  { icon: '🌐', title: 'Automatically', desc: 'Via cookies and tracking technologies' },
  { icon: '🤝', title: 'Third parties', desc: 'Partners, affiliates, and service providers' },
];
const usageItems = [
  { title: 'Service Provision', desc: 'To process enrollments, provide educational services, and maintain your account.', full: true },
  { title: 'Communication', desc: "To contact you about your account, services, updates, and promotional offers. This includes communications via email, SMS, WhatsApp, or phone calls, regardless of DND/NDNC registration status when you've provided consent.", full: true },
  { title: 'To improve our services based on user feedback and analytics' },
  { title: 'To personalize your experience and content recommendations' },
  { title: 'To process payments and prevent fraudulent transactions' },
  { title: 'To comply with legal obligations and enforce our policies' },
  { title: 'To conduct research and analysis for educational improvement' },
];
const legalBasis = [
  { title: 'Contractual Necessity', desc: 'We process your data when necessary to fulfill our contractual obligations to you.' },
  { title: 'Legitimate Interests', desc: 'We process data when necessary for our legitimate interests, balanced against your rights.' },
  { title: 'Consent', desc: 'Where required by law, we obtain your consent for specific processing activities.' },
  { title: 'Legal Compliance', desc: 'We may process data to comply with applicable laws and regulations.' },
];
const sharingTable = [
  { whom: 'Service Providers', purpose: 'To facilitate our services (payment processors, hosting, analytics)', data: 'Necessary personal and usage data' },
  { whom: 'Educational Partners', purpose: 'For certification, accreditation, and academic purposes', data: 'Academic records, identification' },
  { whom: 'Legal Authorities', purpose: 'When required by law or to protect our rights', data: 'As specifically requested' },
  { whom: 'Business Transfers', purpose: 'In case of merger, acquisition, or asset sale', data: 'All relevant information' },
  { whom: 'Marketing Partners', purpose: 'With your consent for promotional offers', data: 'Contact information, preferences' },
];
const securityMeasures = [
  'SSL/TLS encryption for data in transit','Encrypted storage for sensitive data at rest',
  'Regular security audits and vulnerability assessments','Access controls and authentication protocols',
  'Employee training on data protection practices','Incident response and breach notification procedures',
];
const privacyRights = [
  { title: 'Right to Access', desc: 'Request a copy of the personal data we hold about you.' },
  { title: 'Right to Rectification', desc: 'Request correction of inaccurate or incomplete data.' },
  { title: 'Right to Erasure', desc: 'Request deletion of your personal data, subject to legal obligations.' },
  { title: 'Right to Restriction', desc: 'Request limitation of processing in certain circumstances.' },
  { title: 'Right to Portability', desc: 'Receive your data in a structured, machine-readable format.' },
  { title: 'Right to Object', desc: 'Object to processing based on legitimate interests or direct marketing.' },
];
const cookieTypes = [
  { type: 'Essential Cookies', purpose: 'Required for basic site functionality', duration: 'Session' },
  { type: 'Analytics Cookies', purpose: 'Help us understand how visitors use our site', duration: '2 years' },
  { type: 'Functional Cookies', purpose: 'Remember your preferences and settings', duration: '1 year' },
  { type: 'Marketing Cookies', purpose: 'Used to deliver relevant advertisements', duration: '90 days' },
];

export default function PrivacyPolicy() {
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="pp-page">
      <section className="pp-hero"><div className="pp-hero__inner"><h1 className="pp-hero__title">Privacy Policy</h1></div></section>

      <div className="pp-body">
        {/* Introduction */}
        <section className="pp-section">
          <h2 className="pp-section__heading pp-section__heading--no-border">Introduction</h2>
          <p className="pp-body-text">At Saroj Educational Group, we are committed to protecting your privacy and ensuring a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with our website, courses, and services.</p>
          <div className="pp-callout pp-callout--blue"><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Important Notice</p><p className="pp-callout__text">By using our services, you consent to our collection, use, and sharing of your personal information as described in this Privacy Policy. Please read this policy carefully.</p><p className="pp-callout__text" style={{ marginTop: '0.6rem' }}>This policy applies to all visitors, users, and others who access our services ("Users"). By accessing or using our services, you agree to this Privacy Policy.</p></div></div>
          <div className="pp-callout pp-callout--amber"><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">DND/NDNC Compliance Notice</p><p className="pp-callout__text">When you voluntarily send us electronic mail or fill up a form on our site, we will keep a record of this information so that we can respond to you. We only collect information from you when you register on our site or fill out a form.</p><p className="pp-callout__text" style={{ marginTop: '0.6rem' }}>By filling out our enquiry or registration forms, you authorize <strong>Saroj Educational Group</strong> &amp; its representatives to contact you with updates and notifications via Email, SMS, WhatsApp, or Call. This will override DND/NDNC.</p><p className="pp-callout__text" style={{ marginTop: '0.6rem' }}>We maintain records of your consent for compliance purposes, and we may contact you about our products and offers even if your number has DND activated.</p></div></div>
        </section>

        {/* TOC */}
        <div className="pp-toc">
          <h3 className="pp-toc__title">Table of Contents</h3>
          <ol className="pp-toc__list">{tocItems.map((item, i) => (<li key={item}><button className="pp-toc__link" onClick={() => scrollTo(`pp-s-${i+1}`)}>{item}</button></li>))}</ol>
        </div>

        {/* 1 */}
        <section className="pp-section" id="pp-s-1">
          <h2 className="pp-section__heading"><span className="pp-section__number">1.</span> Information We Collect</h2>
          <p className="pp-body-text">We collect several types of information from and about users of our services:</p>
          <div className="pp-dual-cards">
            <div className="pp-info-card"><h3 className="pp-info-card__title"><UserIcon /> Personal Information</h3><ul>{personalInfo.map(p => <li key={p}>{p}</li>)}</ul></div>
            <div className="pp-info-card"><h3 className="pp-info-card__title"><MonitorIcon /> Non-Personal Information</h3><ul>{nonPersonalInfo.map(p => <li key={p}>{p}</li>)}</ul></div>
          </div>
          <p className="pp-sub-label">How We Collect Information</p>
          <div className="pp-collect-grid">{collectMethods.map(m => (<div className="pp-collect-card" key={m.title}><span className="pp-collect-card__icon">{m.icon}</span><h4>{m.title}</h4><p>{m.desc}</p></div>))}</div>
        </section>

        {/* 2 */}
        <section className="pp-section" id="pp-s-2">
          <h2 className="pp-section__heading"><span className="pp-section__number">2.</span> How We Use Your Information</h2>
          <div className="pp-usage-list">{usageItems.map(item => (<div className="pp-usage-item" key={item.title}><span className="pp-usage-item__icon"><CheckCircleIcon color="#16a34a" /></span><div><p className="pp-usage-item__title">{item.title}</p>{item.full && <p className="pp-usage-item__desc">{item.desc}</p>}</div></div>))}</div>
          <div className="pp-legal-basis"><h3 className="pp-legal-basis__title">Legal Basis for Processing</h3><div className="pp-legal-basis__grid">{legalBasis.map(b => (<div className="pp-legal-basis__item" key={b.title}><p className="pp-legal-basis__item-title">{b.title}</p><p className="pp-legal-basis__item-desc">{b.desc}</p></div>))}</div></div>
        </section>

        {/* 3 */}
        <section className="pp-section" id="pp-s-3">
          <h2 className="pp-section__heading"><span className="pp-section__number">3.</span> Information Sharing and Disclosure</h2>
          <p className="pp-body-text">We may share your information in the following circumstances:</p>
          <div className="pp-table-wrap"><table className="pp-table"><thead><tr><th>WITH WHOM</th><th>PURPOSE</th><th>DATA SHARED</th></tr></thead><tbody>{sharingTable.map(r => (<tr key={r.whom}><td className="pp-table__bold">{r.whom}</td><td>{r.purpose}</td><td>{r.data}</td></tr>))}</tbody></table></div>
          <div className="pp-callout pp-callout--purple" style={{ marginTop: '1.5rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">International Data Transfers</p><p className="pp-callout__text">Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. We ensure appropriate safeguards are in place.</p></div></div>
        </section>

        {/* 4 */}
        <section className="pp-section" id="pp-s-4">
          <h2 className="pp-section__heading"><span className="pp-section__number">4.</span> Data Security</h2>
          <p className="pp-body-text">We implement appropriate technical and organizational measures to protect your personal data:</p>
          <div className="pp-security-icon-grid">
            <div className="pp-sec-card"><span className="pp-sec-card__icon">🔒</span><h4>Encryption</h4><p>Data in transit and at rest using industry-standard protocols</p></div>
            <div className="pp-sec-card"><span className="pp-sec-card__icon">🛡️</span><h4>Access Controls</h4><p>Strict access limitations to authorized personnel only</p></div>
            <div className="pp-sec-card"><span className="pp-sec-card__icon">🔍</span><h4>Auditing</h4><p>Regular security assessments and vulnerability testing</p></div>
            <div className="pp-sec-card"><span className="pp-sec-card__icon">📋</span><h4>Policies</h4><p>Comprehensive information security policies and training</p></div>
            <div className="pp-sec-card"><span className="pp-sec-card__icon">🔄</span><h4>Backups</h4><p>Regular data backups and disaster recovery plans</p></div>
            <div className="pp-sec-card"><span className="pp-sec-card__icon">🤝</span><h4>Vendor Security</h4><p>Due diligence for third-party service providers</p></div>
          </div>
          <div className="pp-callout pp-callout--red" style={{ marginTop: '1.2rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Data Breach Notification</p><p className="pp-callout__text">In the event of a data breach that affects your personal information, we will notify you and the appropriate authorities as required by applicable law.</p></div></div>
        </section>

        {/* 5 */}
        <section className="pp-section" id="pp-s-5">
          <h2 className="pp-section__heading"><span className="pp-section__number">5.</span> Your Privacy Rights</h2>
          <p className="pp-body-text">Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
          <div className="pp-rights-grid2">
            <div className="pp-rights-card2"><h4>Access</h4><p>Request a copy of your personal data we hold</p></div>
            <div className="pp-rights-card2"><h4>Rectification</h4><p>Correct inaccurate or incomplete data</p></div>
            <div className="pp-rights-card2"><h4>Erasure</h4><p>Request deletion of your personal data</p></div>
            <div className="pp-rights-card2"><h4>Restriction</h4><p>Limit processing of your data in certain circumstances</p></div>
            <div className="pp-rights-card2"><h4>Portability</h4><p>Receive your data in a structured, commonly used format</p></div>
            <div className="pp-rights-card2"><h4>Objection</h4><p>Object to certain processing activities</p></div>
            <div className="pp-rights-card2"><h4>Withdraw Consent</h4><p>Withdraw previously given consent at any time</p></div>
            <div className="pp-rights-card2"><h4>Complaint</h4><p>Lodge a complaint with a supervisory authority</p></div>
          </div>
          <div className="pp-callout pp-callout--amber" style={{ marginTop: '1.2rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Exercising Your Rights</p><p className="pp-callout__text">To exercise any of these rights, please contact us using the information in the "Contact Us" section below. We may need to verify your identity before processing your request.</p><p className="pp-callout__text" style={{ marginTop: '0.5rem' }}>We will respond to your request within 30 days, though this period may be extended where necessary.</p></div></div>
        </section>

        {/* 6 */}
        <section className="pp-section" id="pp-s-6">
          <h2 className="pp-section__heading"><span className="pp-section__number">6.</span> Cookies and Tracking Technologies</h2>
          <p className="pp-body-text">We use cookies and similar tracking technologies to enhance your experience:</p>
          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead><tr><th>TYPE</th><th>PURPOSE</th><th>EXAMPLES</th></tr></thead>
              <tbody>
                <tr><td className="pp-table__bold">Essential</td><td>Necessary for website functionality</td><td>Login sessions, security</td></tr>
                <tr><td className="pp-table__bold">Performance</td><td>Improve site performance and user experience</td><td>Analytics, error tracking</td></tr>
                <tr><td className="pp-table__bold">Functional</td><td>Remember preferences and settings</td><td>Language selection, font size</td></tr>
                <tr><td className="pp-table__bold">Targeting</td><td>Deliver relevant content and ads</td><td>Social media integration, remarketing</td></tr>
              </tbody>
            </table>
          </div>
          <div className="pp-callout pp-callout--blue" style={{ marginTop: '1.2rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Cookie Management</p><p className="pp-callout__text">You can control or delete cookies through your browser settings. However, disabling essential cookies may affect website functionality.</p><p className="pp-callout__text" style={{ marginTop: '0.5rem' }}>For more information about the cookies we use, please see our <a href="#" className="pp-link">Cookie Policy</a>.</p></div></div>
        </section>

        {/* 7 */}
        <section className="pp-section" id="pp-s-7">
          <h2 className="pp-section__heading"><span className="pp-section__number">7.</span> Third-Party Services</h2>
          <p className="pp-body-text">Our services may contain links to or integrations with third-party websites and services. This Privacy Policy does not apply to these third parties:</p>
          <div className="pp-third-party-grid">
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Payment processors (Razorpay, PayPal)</span></div>
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Learning management systems</span></div>
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Analytics providers (Google Analytics)</span></div>
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Marketing platforms</span></div>
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Social media platforms</span></div>
            <div className="pp-tp-chip"><CheckCircleIcon color="#2563eb" /><span>Cloud service providers</span></div>
          </div>
          <div className="pp-callout pp-callout--purple" style={{ marginTop: '1.2rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Third-Party Policies</p><p className="pp-callout__text">We recommend reviewing the privacy policies of any third-party services you interact with through our platform.</p></div></div>
        </section>

        {/* 8 */}
        <section className="pp-section" id="pp-s-8">
          <h2 className="pp-section__heading"><span className="pp-section__number">8.</span> Children&apos;s Privacy</h2>
          <p className="pp-body-text">Our services are not directed to children under the age of 13 (or 16 in some jurisdictions). We do not knowingly collect personal information from children:</p>
          <div className="pp-callout pp-callout--green" style={{ marginBottom: '1.2rem' }}><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Parental Controls</p><p className="pp-callout__text">If you believe we have collected information from a child without parental consent, please contact us immediately. We will take steps to remove such information and terminate the child's account if applicable.</p></div></div>
          <div className="pp-dual-cards">
            <div className="pp-info-card"><h3 className="pp-info-card__title--plain">Age Verification</h3><p className="pp-info-card__desc">For certain programs or services that may be appropriate for minors, we implement age verification mechanisms and obtain parental consent where required by law.</p></div>
            <div className="pp-info-card"><h3 className="pp-info-card__title--plain">Educational Programs</h3><p className="pp-info-card__desc">For educational programs involving minors, we collect only necessary information and implement additional safeguards to protect children's privacy.</p></div>
          </div>
        </section>

        {/* 9 */}
        {/* 9 */}
        <section className="pp-section" id="pp-s-9">
          <h2 className="pp-section__heading"><span className="pp-section__number">9.</span> Changes to This Policy</h2>
          <p className="pp-body-text">We may update this Privacy Policy from time to time. We will notify you of any material changes:</p>
          <div className="pp-callout pp-callout--amber"><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label">Notification Methods</p><ul className="pp-notif-list"><li>Through our website</li><li>Via email to registered users</li><li>Through prominent notices within our services</li></ul></div></div>
          <p className="pp-muted" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Continued use of our services after any modifications constitutes your acceptance of the updated Privacy Policy.</p>
          
          <div className="pp-callout pp-callout--blue"><div className="pp-callout__bar" /><div className="pp-callout__content"><p className="pp-callout__label" style={{ color: '#1d4ed8', fontWeight: 600 }}>Policy Review</p><p className="pp-callout__text" style={{ color: '#1e40af' }}>We encourage you to periodically review this Privacy Policy to stay informed about how we are protecting your information.</p></div></div>
        </section>

        {/* 10 Contact */}
        <section className="pp-section" id="pp-s-10">
          <h2 className="pp-section__heading"><span className="pp-section__number">10.</span> Contact Us</h2>
          <p className="pp-body-text">If you have any questions about this Privacy Policy or our privacy practices:</p>
          
          <div className="pp-dual-cards" style={{ marginBottom: '1.5rem' }}>
            <div className="pp-info-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
              <h3 className="pp-info-card__title--plain" style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.8rem' }}>Mailing Address</h3>
              <p className="pp-body-text" style={{ margin: 0, lineHeight: '1.6', color: '#475569' }}>
                Saroj Educational Group<br />
                L-5, First Floor, Lajpat Nagar - II<br />
                Delhi, Delhi, India, 110024
              </p>
            </div>
            <div className="pp-info-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
              <h3 className="pp-info-card__title--plain" style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.8rem' }}>Contact Information</h3>
              <p className="pp-body-text" style={{ margin: 0, lineHeight: '1.8', color: '#475569' }}>
                <strong>Email:</strong> info@seglko.org<br />
                <strong>Phone:</strong> +91 9555699988<br />
                <strong>Hours:</strong> Mon-Sat, 9AM-6PM IST
              </p>
            </div>
          </div>

          <div className="pp-callout pp-callout--green" style={{ marginBottom: '2rem' }}>
            <div className="pp-callout__bar" />
            <div className="pp-callout__content">
              <p className="pp-callout__label" style={{ color: '#166534', fontWeight: 600 }}>Data Protection Officer</p>
              <p className="pp-callout__text" style={{ color: '#166534' }}>
                For specific privacy concerns or to exercise your rights, you may contact our Data Protection Officer directly at <strong>dpo@seglko.org</strong>.
              </p>
            </div>
          </div>

          <div className="pp-acceptance-card">
            <h3 className="pp-acceptance-card__title">Acceptance of This Privacy Policy</h3>
            <p className="pp-acceptance-card__text">
              By using our services, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our services. Your continued use of the services following the posting of changes to this policy will be deemed your acceptance of those changes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
