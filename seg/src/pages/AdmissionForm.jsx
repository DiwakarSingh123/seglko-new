import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../AdmissionProcess.css';
import './AdmissionForm.css';

const COURSES = [
  'Bachelor of Technology (B.Tech)',
  'Master of Technology (M.Tech)',
  'Bachelor of Business Administration (BBA)',
  'Master of Business Administration (MBA)',
  'Bachelor of Computer Applications (BCA)',
  'Masters in Computer Applications (MCA)',
  'Bachelor of Pharmacy (B.Pharm)',
  'Master of Pharmacy (M.Pharm)',
  'Diploma in Pharmacy (D.Pharm)',
  'Polytechnic Diploma',
];

const INSTITUTIONS = [
  'Shivdan Singh Institute of Technology & Management (SSITM)',
  'Saroj Institute of Technology & Management (SITM)',
  'Lucknow Institute of Pharmacy (LIP)',
  'Saroj College of Pharmacy (SCP)',
  'Saroj College of Engineering & Polytechnic (SCEP)',
];

const STEP_ICONS = [
  // 1 Personal
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  // 2 Education
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-6 10 6-10 6-10-6z"/><path d="M22 9v7"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>,
  // 3 Course
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  // 4 Payment
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  // 5 Submit
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
];

const STEPS = [
  { n: 1, label: 'Personal Info' },
  { n: 2, label: 'Education' },
  { n: 3, label: 'Course' },
  { n: 4, label: 'Payment' },
  { n: 5, label: 'Submit' },
];

const empty = {
  firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '',
  address: '', city: '', state: '', pincode: '',
  fatherName: '', fatherPhone: '', motherName: '', motherPhone: '',
  class10School: '', class10Board: '', class10Year: '', class10Percent: '', class10Marksheet: '',
  class12School: '', class12Board: '', class12Year: '', class12Percent: '', class12Stream: '', class12Marksheet: '',
  desiredCourse: '', desiredInstitution: '',
};

async function uploadPDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, folder: 'seglko-marksheets' }),
        });
        const data = await res.json();
        resolve(data.url || '');
      } catch { reject('Upload failed'); }
    };
    reader.readAsDataURL(file);
  });
}

export default function AdmissionForm({ onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [uploading10, setUploading10] = useState(false);
  const [uploading12, setUploading12] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim()) e.lastName = 'Required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.phone.trim() || form.phone.length < 10) e.phone = '10-digit phone required';
      if (!form.dob) e.dob = 'Required';
      if (!form.gender) e.gender = 'Required';
      if (!form.address.trim()) e.address = 'Required';
      if (!form.city.trim()) e.city = 'Required';
      if (!form.state.trim()) e.state = 'Required';
      if (!form.fatherName.trim()) e.fatherName = 'Required';
      if (!form.fatherPhone.trim()) e.fatherPhone = 'Required';
      if (!form.motherName.trim()) e.motherName = 'Required';
    }
    if (s === 2) {
      if (!form.class10School.trim()) e.class10School = 'Required';
      if (!form.class10Board.trim()) e.class10Board = 'Required';
      if (!form.class10Year.trim()) e.class10Year = 'Required';
      if (!form.class10Percent.trim()) e.class10Percent = 'Required';
      if (!form.class12School.trim()) e.class12School = 'Required';
      if (!form.class12Board.trim()) e.class12Board = 'Required';
      if (!form.class12Year.trim()) e.class12Year = 'Required';
      if (!form.class12Percent.trim()) e.class12Percent = 'Required';
      if (!form.class12Stream.trim()) e.class12Stream = 'Required';
    }
    if (s === 3) {
      if (!form.desiredCourse) e.desiredCourse = 'Select a course';
      if (!form.desiredInstitution) e.desiredInstitution = 'Select institution';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handlePDF = async (field, file, setUpl) => {
    setUpl(true);
    try {
      const url = await uploadPDF(file);
      set(field, url);
    } catch { alert('Upload failed. Try again.'); }
    setUpl(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/student-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setAppId(data.applicationId);
        setSubmitted(true);
        setStep(5);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  const err = (f) => errors[f] ? <p className="af-error">{errors[f]}</p> : null;

  return (
    <div className="admission-process">
      <section className="ap-hero">
        <div className="ap-hero__content">
          <h1 className="ap-hero__title">ADMISSION <span>PROCESS</span></h1>
          <p className="ap-hero__subtitle">Your Journey to a Bright Future Starts Here</p>
          <div className="ap-hero__line"></div>
        </div>
        <div className="ap-hero__floating-card">
          <h3>Hassle - Free<br />Registration</h3>
          <div className="ap-hero__card-line"></div>
        </div>
      </section>

      <section className="af-section">
        <div className="af-container">

          {/* Step Indicator */}
          <div className="af-steps">
            {STEPS.map((s, i) => (
              <div key={s.n} className="af-step-wrap">
                {i > 0 && (
                  <div className={`af-step__line ${step > s.n ? 'af-step__line--done' : step === s.n ? 'af-step__line--active' : ''}`}>
                    <div className="af-step__line-fill" />
                  </div>
                )}
                <div className="af-step-circle-wrap">
                  <div className={`af-step ${step > s.n ? 'af-step--done' : step === s.n ? 'af-step--active' : ''}`}>
                    {step > s.n
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      : STEP_ICONS[i]
                    }
                  </div>
                  <span className={`af-step__label ${step === s.n ? 'af-step__label--active' : step > s.n ? 'af-step__label--done' : ''}`}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="af-card">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="af-step-content">
                <div className="af-step-header">
                  <div className="af-step-header__icon">👤</div>
                  <div>
                    <h2 className="af-step-header__title">Personal Information</h2>
                    <p className="af-step-header__sub">Fill in your personal and parent details</p>
                  </div>
                </div>

                <div className="af-grid-2">
                  <div className="af-field">
                    <label className="af-label">First Name <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.firstName ? 'af-input--err' : ''}`} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Rahul" />
                    {err('firstName')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Last Name <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.lastName ? 'af-input--err' : ''}`} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Sharma" />
                    {err('lastName')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Email <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.email ? 'af-input--err' : ''}`} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="rahul@email.com" />
                    {err('email')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Phone <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.phone ? 'af-input--err' : ''}`} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" maxLength={10} />
                    {err('phone')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Date of Birth <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.dob ? 'af-input--err' : ''}`} type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
                    {err('dob')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Gender <span className="af-req">*</span></label>
                    <select className={`af-input ${errors.gender ? 'af-input--err' : ''}`} value={form.gender} onChange={e => set('gender', e.target.value)}>
                      <option value="">Select Gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                    {err('gender')}
                  </div>
                </div>

                <div className="af-field af-field--full">
                  <label className="af-label">Address <span className="af-req">*</span></label>
                  <input className={`af-input ${errors.address ? 'af-input--err' : ''}`} value={form.address} onChange={e => set('address', e.target.value)} placeholder="House No., Street, Colony" />
                  {err('address')}
                </div>

                <div className="af-grid-3">
                  <div className="af-field">
                    <label className="af-label">City <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.city ? 'af-input--err' : ''}`} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Lucknow" />
                    {err('city')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">State <span className="af-req">*</span></label>
                    <input className={`af-input ${errors.state ? 'af-input--err' : ''}`} value={form.state} onChange={e => set('state', e.target.value)} placeholder="Uttar Pradesh" />
                    {err('state')}
                  </div>
                  <div className="af-field">
                    <label className="af-label">Pincode</label>
                    <input className="af-input" value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="226001" maxLength={6} />
                  </div>
                </div>

                <div className="af-parent-box">
                  <p className="af-parent-box__title">👨‍👩‍👦 Parent / Guardian Details</p>
                  <div className="af-grid-2">
                    <div className="af-field">
                      <label className="af-label">Father's Name <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.fatherName ? 'af-input--err' : ''}`} value={form.fatherName} onChange={e => set('fatherName', e.target.value)} placeholder="Rajesh Sharma" />
                      {err('fatherName')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Father's Phone <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.fatherPhone ? 'af-input--err' : ''}`} value={form.fatherPhone} onChange={e => set('fatherPhone', e.target.value)} placeholder="9876543210" maxLength={10} />
                      {err('fatherPhone')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Mother's Name <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.motherName ? 'af-input--err' : ''}`} value={form.motherName} onChange={e => set('motherName', e.target.value)} placeholder="Sunita Sharma" />
                      {err('motherName')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Mother's Phone</label>
                      <input className="af-input" value={form.motherPhone} onChange={e => set('motherPhone', e.target.value)} placeholder="9876543210" maxLength={10} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="af-step-content">
                <div className="af-step-header">
                  <div className="af-step-header__icon">📚</div>
                  <div>
                    <h2 className="af-step-header__title">Educational Details</h2>
                    <p className="af-step-header__sub">Provide your 10th and 12th details with marksheets</p>
                  </div>
                </div>

                <div className="af-edu-box af-edu-box--blue">
                  <p className="af-edu-box__title">📋 Class 10th Details</p>
                  <div className="af-grid-2">
                    <div className="af-field">
                      <label className="af-label">School Name <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class10School ? 'af-input--err' : ''}`} value={form.class10School} onChange={e => set('class10School', e.target.value)} placeholder="ABC Senior Secondary School" />
                      {err('class10School')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Board <span className="af-req">*</span></label>
                      <select className={`af-input ${errors.class10Board ? 'af-input--err' : ''}`} value={form.class10Board} onChange={e => set('class10Board', e.target.value)}>
                        <option value="">Select Board</option>
                        <option>CBSE</option><option>ICSE</option><option>UP Board</option><option>MP Board</option><option>Bihar Board</option><option>Other</option>
                      </select>
                      {err('class10Board')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Passing Year <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class10Year ? 'af-input--err' : ''}`} value={form.class10Year} onChange={e => set('class10Year', e.target.value)} placeholder="2022" maxLength={4} />
                      {err('class10Year')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Percentage / CGPA <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class10Percent ? 'af-input--err' : ''}`} value={form.class10Percent} onChange={e => set('class10Percent', e.target.value)} placeholder="85.5" />
                      {err('class10Percent')}
                    </div>
                  </div>
                  <div className="af-field af-field--full" style={{ marginTop: 16 }}>
                    <label className="af-label">10th Marksheet <span className="af-label-note">(PDF / Image)</span></label>
                    <label className="af-file-label">
                      <input type="file" accept=".pdf,image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handlePDF('class10Marksheet', f, setUploading10); }} className="af-file-input" />
                      <span className="af-file-btn">📎 Choose File</span>
                      <span className="af-file-name">{uploading10 ? '⏳ Uploading...' : form.class10Marksheet ? '✅ Uploaded' : 'No file chosen'}</span>
                    </label>
                    {form.class10Marksheet && <a href={form.class10Marksheet} target="_blank" rel="noreferrer" className="af-view-link">View Uploaded File →</a>}
                  </div>
                </div>

                <div className="af-edu-box af-edu-box--purple">
                  <p className="af-edu-box__title">📋 Class 12th Details</p>
                  <div className="af-grid-2">
                    <div className="af-field">
                      <label className="af-label">School Name <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class12School ? 'af-input--err' : ''}`} value={form.class12School} onChange={e => set('class12School', e.target.value)} placeholder="ABC Senior Secondary School" />
                      {err('class12School')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Board <span className="af-req">*</span></label>
                      <select className={`af-input ${errors.class12Board ? 'af-input--err' : ''}`} value={form.class12Board} onChange={e => set('class12Board', e.target.value)}>
                        <option value="">Select Board</option>
                        <option>CBSE</option><option>ICSE</option><option>UP Board</option><option>MP Board</option><option>Bihar Board</option><option>Other</option>
                      </select>
                      {err('class12Board')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Passing Year <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class12Year ? 'af-input--err' : ''}`} value={form.class12Year} onChange={e => set('class12Year', e.target.value)} placeholder="2024" maxLength={4} />
                      {err('class12Year')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Percentage / CGPA <span className="af-req">*</span></label>
                      <input className={`af-input ${errors.class12Percent ? 'af-input--err' : ''}`} value={form.class12Percent} onChange={e => set('class12Percent', e.target.value)} placeholder="78.0" />
                      {err('class12Percent')}
                    </div>
                    <div className="af-field">
                      <label className="af-label">Stream <span className="af-req">*</span></label>
                      <select className={`af-input ${errors.class12Stream ? 'af-input--err' : ''}`} value={form.class12Stream} onChange={e => set('class12Stream', e.target.value)}>
                        <option value="">Select Stream</option>
                        <option>Science (PCM)</option><option>Science (PCB)</option><option>Commerce</option><option>Arts / Humanities</option><option>Other</option>
                      </select>
                      {err('class12Stream')}
                    </div>
                  </div>
                  <div className="af-field af-field--full" style={{ marginTop: 16 }}>
                    <label className="af-label">12th Marksheet <span className="af-label-note">(PDF / Image)</span></label>
                    <label className="af-file-label">
                      <input type="file" accept=".pdf,image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handlePDF('class12Marksheet', f, setUploading12); }} className="af-file-input" />
                      <span className="af-file-btn">📎 Choose File</span>
                      <span className="af-file-name">{uploading12 ? '⏳ Uploading...' : form.class12Marksheet ? '✅ Uploaded' : 'No file chosen'}</span>
                    </label>
                    {form.class12Marksheet && <a href={form.class12Marksheet} target="_blank" rel="noreferrer" className="af-view-link">View Uploaded File →</a>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="af-step-content">
                <div className="af-step-header">
                  <div className="af-step-header__icon">🎓</div>
                  <div>
                    <h2 className="af-step-header__title">Course Selection</h2>
                    <p className="af-step-header__sub">Choose the course and institution you want to enroll in</p>
                  </div>
                </div>

                <div className="af-course-grid">
                  {COURSES.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`af-course-card ${form.desiredCourse === c ? 'af-course-card--active' : ''}`}
                      onClick={() => set('desiredCourse', c)}
                    >
                      <span className="af-course-card__icon">🎓</span>
                      <span className="af-course-card__name">{c}</span>
                      {form.desiredCourse === c && <span className="af-course-card__check">✓</span>}
                    </button>
                  ))}
                </div>
                {err('desiredCourse')}

                <div className="af-field af-field--full" style={{ marginTop: 24 }}>
                  <label className="af-label">Preferred Institution <span className="af-req">*</span></label>
                  <select className={`af-input ${errors.desiredInstitution ? 'af-input--err' : ''}`} value={form.desiredInstitution} onChange={e => set('desiredInstitution', e.target.value)}>
                    <option value="">— Select Institution —</option>
                    {INSTITUTIONS.map(i => <option key={i}>{i}</option>)}
                  </select>
                  {err('desiredInstitution')}
                </div>

                {form.desiredCourse && form.desiredInstitution && (
                  <div className="af-selection-preview">
                    <p className="af-selection-preview__title">✅ Your Selection</p>
                    <p><strong>Course:</strong> {form.desiredCourse}</p>
                    <p><strong>Institution:</strong> {form.desiredInstitution}</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="af-step-content">
                <div className="af-step-header">
                  <div className="af-step-header__icon">💳</div>
                  <div>
                    <h2 className="af-step-header__title">Application Fee Payment</h2>
                    <p className="af-step-header__sub">Pay the non-refundable application processing fee</p>
                  </div>
                </div>

                <div className="af-fee-box">
                  <div className="af-fee-box__left">
                    <p className="af-fee-box__label">Application Processing Fee</p>
                    <p className="af-fee-box__amount">₹500</p>
                  </div>
                  <span className="af-fee-box__badge">NON-REFUNDABLE</span>
                </div>

                <div className="af-payment-methods">
                  {['💸 UPI', '💳 Debit Card', '🏦 Net Banking', '💳 Credit Card'].map(m => (
                    <div key={m} className="af-payment-method">{m}</div>
                  ))}
                </div>

                <div className="af-demo-notice">
                  <p className="af-demo-notice__title">⚠️ Demo Mode</p>
                  <p className="af-demo-notice__text">Payment gateway is ready to connect with Razorpay/PayU. Click "Confirm & Proceed" to continue.</p>
                </div>

                <button onClick={next} className="af-btn af-btn--primary af-btn--full">
                  Confirm & Proceed →
                </button>
              </div>
            )}

            {/* STEP 5 — Review */}
            {step === 5 && !submitted && (
              <div className="af-step-content">
                <div className="af-step-header">
                  <div className="af-step-header__icon">📝</div>
                  <div>
                    <h2 className="af-step-header__title">Review & Submit</h2>
                    <p className="af-step-header__sub">Please review your details before submitting</p>
                  </div>
                </div>

                {[
                  { title: '👤 Personal Info', rows: [['Name', `${form.firstName} ${form.lastName}`], ['Email', form.email], ['Phone', form.phone], ['DOB', form.dob], ['Gender', form.gender], ['Address', `${form.address}, ${form.city}, ${form.state}`]] },
                  { title: '👨‍👩‍👦 Parent Info', rows: [['Father', `${form.fatherName} — ${form.fatherPhone}`], ['Mother', `${form.motherName}${form.motherPhone ? ' — ' + form.motherPhone : ''}`]] },
                  { title: '📋 10th Details', rows: [['School', form.class10School], ['Board', form.class10Board], ['Year', form.class10Year], ['Marks', `${form.class10Percent}%`], ['Marksheet', form.class10Marksheet ? '✅ Uploaded' : '—']] },
                  { title: '📋 12th Details', rows: [['School', form.class12School], ['Board', form.class12Board], ['Year', form.class12Year], ['Marks', `${form.class12Percent}%`], ['Stream', form.class12Stream], ['Marksheet', form.class12Marksheet ? '✅ Uploaded' : '—']] },
                  { title: '🎓 Course', rows: [['Course', form.desiredCourse], ['Institution', form.desiredInstitution]] },
                ].map(sec => (
                  <div key={sec.title} className="af-review-section">
                    <div className="af-review-section__head">{sec.title}</div>
                    <div className="af-review-section__body">
                      {sec.rows.map(([k, v]) => (
                        <div key={k} className="af-review-row">
                          <span className="af-review-row__key">{k}</span>
                          <span className="af-review-row__val">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={handleSubmit} disabled={submitting} className={`af-btn af-btn--primary af-btn--full ${submitting ? 'af-btn--disabled' : ''}`}>
                  {submitting ? '⏳ Submitting...' : '🚀 Submit Application'}
                </button>
              </div>
            )}

            {/* SUCCESS */}
            {step === 5 && submitted && (
              <div className="af-success">
                <div className="af-success__icon">🎉</div>
                <h2 className="af-success__title">Application Submitted!</h2>
                <p className="af-success__sub">Your application has been received successfully.</p>
                <div className="af-success__id-box">
                  <p className="af-success__id-label">Your Application ID</p>
                  <p className="af-success__id">{appId}</p>
                </div>
                <p className="af-success__note">
                  A confirmation email has been sent to <strong>{form.email}</strong><br />
                  Our team will contact you within 3–5 working days.
                </p>
                <div className="af-success__actions">
                  <Link to="/" className="af-btn af-btn--primary">Back to Home</Link>
                  <Link to="/contact-us" className="af-btn af-btn--secondary">Contact Us</Link>
                </div>
              </div>
            )}

            {/* Navigation */}
            {!(step === 5 && submitted) && step !== 4 && (
              <div className="af-nav">
                {step > 1 ? (
                  <button onClick={back} className="af-btn af-btn--secondary">← Back</button>
                ) : (
                  <button onClick={onBack} className="af-btn af-btn--secondary">← Cancel</button>
                )}
                {step < 5 && (
                  <button onClick={next} className="af-btn af-btn--primary">Continue →</button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="ap-help">
        <div className="ap-help__left">
          <h2>Need Help?</h2>
          <p>Get in touch with our team anytime you need.</p>
        </div>
        <div className="ap-help__right">
          <div className="ap-contact-item">
            <div className="ap-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.4 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="ap-contact-text">
              <strong>09555699988</strong>
              <span>Mon - Sat (9:00 AM - 6:00 PM)</span>
            </div>
          </div>
          <div className="ap-contact-divider"></div>
          <div className="ap-contact-item">
            <div className="ap-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="ap-contact-text">
              <strong>admission.cell@seglko.org</strong>
              <span>We'll get back to you soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
