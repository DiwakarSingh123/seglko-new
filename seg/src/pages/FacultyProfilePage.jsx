import { useParams, useNavigate } from 'react-router-dom';
import { facultyData } from '../data/facultyData';

// SVG Icons
const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

const BookOpenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

const FileTextIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

// Dynamic motto helper to render specialized quote blocks in the hero header
const getFacultyMotto = (dept) => {
  const department = dept?.toLowerCase() || '';
  if (department.includes('computer') || department.includes('science') || department.includes('computing')) {
    return "Empowering future technology leaders through rigorous engineering, research excellence, and hands-on coding paradigms.";
  }
  if (department.includes('mechanical') || department.includes('electrical') || department.includes('engineering')) {
    return "Fostering engineering innovation, systematic research, and hands-on designs to solve complex real-world challenges.";
  }
  if (department.includes('pharmacy') || department.includes('medical') || department.includes('sciences')) {
    return "Shaping the frontier of medical sciences and clinical research through rigorous scholarship, innovation, and healthcare commitment.";
  }
  if (department.includes('management') || department.includes('business') || department.includes('studies')) {
    return "Nurturing modern strategic leadership, entrepreneurial capability, and professional excellence in future business managers.";
  }
  return "Dedicated to excellence in higher education, active research advocacy, and student mentorship.";
};

export default function FacultyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find faculty by id (fall back to id 1 if not found)
  const faculty = facultyData[id] || facultyData[1];

  return (
    <div className="fpp-container">
      <style>{`
        .fpp-container {
          background: #fcfdfe;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          color: #1e293b;
        }

        /* ── Full Width Hero Header (Creative Style) ── */
        .fpp-hero-banner {
          background: radial-gradient(circle at 10% 20%, #06183a 0%, #0d2c6e 40%, #1041c6 100%);
          padding: 130px 5% 85px 5%;
          position: relative;
          overflow: hidden;
          color: #fff;
          border-bottom: 5px solid #ffbe23;
        }

        /* Ambient Glowing Blobs */
        .fpp-hero-banner::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 190, 35, 0.07) 0%, transparent 70%);
          top: -200px;
          right: -100px;
          pointer-events: none;
        }

        .fpp-hero-banner::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
          bottom: -250px;
          left: -150px;
          pointer-events: none;
        }

        .fpp-glow-blob-center {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 65, 198, 0.3) 0%, transparent 70%);
          top: 20%;
          left: 30%;
          filter: blur(50px);
          pointer-events: none;
          animation: pulseBlob 12s ease-in-out infinite alternate;
        }

        .fpp-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        @keyframes pulseBlob {
          0% { transform: scale(1) translate(0, 0); opacity: 0.6; }
          100% { transform: scale(1.25) translate(20px, -20px); opacity: 0.9; }
        }

        .fpp-banner-inner {
          width: 100%;
          position: relative;
          z-index: 5;
        }

        /* Back Button - modern absolute position or floating style */
        .fpp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 13.5px;
          margin-bottom: 35px;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .fpp-back-btn:hover {
          background: #ffbe23;
          border-color: #ffbe23;
          color: #0a275d;
          transform: translateX(-5px);
          box-shadow: 0 6px 20px rgba(255, 190, 35, 0.35);
        }

        /* Hero Split Grid */
        .fpp-hero-grid {
          display: grid;
          grid-template-columns: 310px 1fr;
          gap: 60px;
          align-items: center;
        }

        .fpp-image-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Floating Offset Creative Frame */
        .fpp-image-frame-container {
          position: relative;
          padding: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .fpp-image-wrap {
          width: 250px;
          height: 310px;
          border-radius: 28px;
          overflow: hidden;
          border: 5px solid #fff;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
          position: relative;
          z-index: 3;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .fpp-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fpp-image-frame-gold {
          position: absolute;
          inset: 0px;
          border: 2px solid #ffbe23;
          border-radius: 34px;
          transform: rotate(-4deg);
          z-index: 1;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .fpp-image-frame-blue {
          position: absolute;
          inset: 8px;
          border: 2px dashed rgba(255, 255, 255, 0.25);
          border-radius: 32px;
          transform: rotate(5deg);
          z-index: 2;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .fpp-image-frame-container:hover .fpp-image-wrap {
          transform: translateY(-8px) scale(1.02);
        }

        .fpp-image-frame-container:hover .fpp-image-frame-gold {
          transform: rotate(4deg) scale(1.04);
          border-color: #fff;
        }

        .fpp-image-frame-container:hover .fpp-image-frame-blue {
          transform: rotate(-6deg) scale(1.04);
          border-color: #ffbe23;
        }

        .fpp-social-row {
          display: flex;
          gap: 14px;
          margin-top: 15px;
          position: relative;
          z-index: 5;
        }

        .fpp-social-icon-btn {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(5px);
        }

        .fpp-social-icon-btn:hover {
          background: #ffbe23;
          color: #0a275d;
          transform: translateY(-4px) rotate(8deg);
          border-color: #ffbe23;
          box-shadow: 0 6px 18px rgba(255, 190, 35, 0.3);
        }

        /* Text and details layout */
        .fpp-text-panel {
          display: flex;
          flex-direction: column;
        }

        .fpp-dept-badge {
          align-self: flex-start;
          background: #ffbe23;
          color: #0a275d;
          font-weight: 800;
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 7px 18px;
          border-radius: 99px;
          margin-bottom: 16px;
          box-shadow: 0 6px 15px rgba(255, 190, 35, 0.25);
        }

        .fpp-name {
          font-size: clamp(2.4rem, 4.5vw, 3.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 40%, #ffbe23 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 6px;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .fpp-role {
          font-size: 1.3rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 20px;
        }

        /* Motto block */
        .fpp-motto {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          font-style: italic;
          margin-bottom: 28px;
          border-left: 3px solid #ffbe23;
          padding-left: 16px;
          max-width: 750px;
        }

        /* Neon-border Glass Quick Stats */
        .fpp-quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
          max-width: 850px;
        }

        .fpp-quick-stat-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 16px 22px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .fpp-quick-stat-box::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #ffbe23;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .fpp-quick-stat-box:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 190, 35, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .fpp-quick-stat-box:hover::before {
          opacity: 1;
        }

        .fpp-qs-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 700;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .fpp-qs-value {
          font-size: 16.5px;
          color: #fff;
          font-weight: 700;
        }

        /* Glass Floating Contacts Card Layout */
        .fpp-contacts-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          max-width: 900px;
        }

        .fpp-contact-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 11px 20px;
          display: flex;
          align-items: center;
          gap: 11px;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .fpp-contact-card:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 190, 35, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .fpp-contact-icon {
          color: #ffbe23;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fpp-contact-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 600;
          font-size: 13.5px;
          transition: color 0.2s;
        }

        .fpp-contact-card:hover .fpp-contact-link {
          color: #ffbe23;
        }

        /* ── Main Details Grid (Full Width margins) ── */
        .fpp-main-section {
          padding: 60px 5% 80px;
          box-sizing: border-box;
          width: 100%;
        }

        .fpp-main-grid {
          display: grid;
          grid-template-columns: 1.8fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        .fpp-card {
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
          margin-bottom: 40px;
        }

        .fpp-card-title {
          font-size: 22px;
          font-weight: 800;
          color: #162341;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .fpp-card-title::after {
          content: '';
          display: block;
          width: 40px;
          height: 3.5px;
          background: #ffbe23;
          position: absolute;
          bottom: -8px;
          left: 0;
          border-radius: 99px;
        }

        .fpp-bio-text {
          font-size: 16px;
          line-height: 1.8;
          color: #4f5f86;
        }

        /* Subjects list styling */
        .fpp-subjects-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }

        .fpp-subject-tag {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          color: #1e293b;
          font-size: 13.5px;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: 12px;
          transition: all 0.25s ease;
        }

        .fpp-subject-tag:hover {
          border-color: #1041c6;
          background: #f0f7ff;
          color: #1041c6;
          transform: translateY(-2px);
        }

        /* Research Publications list */
        .fpp-publication-item {
          padding: 20px 0;
          border-bottom: 1.5px dashed #f1f5f9;
        }

        .fpp-publication-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .fpp-pub-title {
          font-size: 16px;
          font-weight: 700;
          color: #162341;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .fpp-pub-journal {
          font-size: 13.5px;
          color: #1041c6;
          font-weight: 700;
        }

        /* Achievements list */
        .fpp-achievement-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .fpp-achievement-item:last-child {
          margin-bottom: 0;
        }

        .fpp-achievement-bullet {
          color: #ffbe23;
          flex-shrink: 0;
          font-size: 20px;
          line-height: 1;
        }

        .fpp-achievement-text {
          font-size: 15px;
          color: #4f5f86;
          line-height: 1.7;
          font-weight: 600;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .fpp-contacts-grid {
            justify-content: flex-start;
          }
        }

        @media (max-width: 992px) {
          .fpp-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .fpp-image-panel {
            margin-bottom: 10px;
          }
          .fpp-dept-badge {
            align-self: center;
          }
          .fpp-motto {
            margin-inline: auto;
          }
          .fpp-quick-stats {
            margin-inline: auto;
            width: 100%;
          }
          .fpp-contacts-grid {
            justify-content: center;
            width: 100%;
          }
          .fpp-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .fpp-quick-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .fpp-hero-banner {
            padding: 100px 5% 60px;
          }
        }

        @media (max-width: 480px) {
          .fpp-hero-banner {
            padding: 110px 4% 50px 4%;
          }
          .fpp-hero-grid {
            gap: 25px;
          }
          .fpp-image-wrap {
            width: 210px;
            height: 260px;
            border-radius: 20px;
          }
          .fpp-image-frame-gold {
            border-radius: 24px;
          }
          .fpp-image-frame-blue {
            border-radius: 22px;
          }
          .fpp-social-row {
            margin-top: 10px;
            gap: 10px;
          }
          .fpp-social-icon-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .fpp-name {
            font-size: 1.95rem;
            letter-spacing: -0.3px;
          }
          .fpp-role {
            font-size: 1.05rem;
            margin-bottom: 16px;
          }
          .fpp-motto {
            font-size: 13.5px;
            line-height: 1.5;
            margin-bottom: 20px;
            padding-left: 12px;
          }
          .fpp-quick-stats {
            grid-template-columns: 1fr;
            gap: 12px;
            width: 100%;
          }
          .fpp-quick-stat-box {
            padding: 14px 18px;
            border-radius: 16px;
          }
          .fpp-qs-value {
            font-size: 15px;
          }
          .fpp-contacts-grid {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            gap: 12px;
          }
          .fpp-contact-card {
            width: 100%;
            box-sizing: border-box;
            padding: 10px 14px;
            justify-content: flex-start;
          }
          .fpp-contact-link {
            font-size: 12.5px;
            word-break: break-all;
          }
          .fpp-main-section {
            padding: 30px 4% 60px;
          }
          .fpp-card {
            padding: 24px 16px;
            border-radius: 16px;
            margin-bottom: 24px;
          }
          .fpp-card-title {
            font-size: 19px;
            margin-bottom: 20px;
          }
          .fpp-bio-text {
            font-size: 14.5px;
            line-height: 1.7;
          }
          .fpp-publication-item {
            padding: 16px 0;
          }
          .fpp-pub-title {
            font-size: 14.5px;
          }
          .fpp-subject-tag {
            font-size: 12.5px;
            padding: 8px 14px;
            border-radius: 10px;
          }
          .fpp-back-btn {
            padding: 8px 16px;
            font-size: 12.5px;
            margin-bottom: 25px;
          }
        }
      `}</style>

      {/* Ambient backgrounds & layers */}
      <header className="fpp-hero-banner">
        <div className="fpp-glow-blob-center" />
        <div className="fpp-grid-pattern" />

        <div className="fpp-banner-inner">

          <div className="fpp-hero-grid">
            <div className="fpp-image-panel">
              <div className="fpp-image-frame-container">
                <div className="fpp-image-wrap">
                  <img src={faculty.image} alt={faculty.name} />
                </div>
                <div className="fpp-image-frame-gold" />
                <div className="fpp-image-frame-blue" />
              </div>
              <div className="fpp-social-row">
                <a href={faculty.linkedin} target="_blank" rel="noopener noreferrer" className="fpp-social-icon-btn">
                  <LinkedInIcon />
                </a>
                <a href={`mailto:${faculty.email}`} className="fpp-social-icon-btn">
                  <MailIcon />
                </a>
              </div>
            </div>

            <div className="fpp-text-panel">
              <span className="fpp-dept-badge">{faculty.dept}</span>
              <h1 className="fpp-name">{faculty.name}</h1>
              <p className="fpp-role">{faculty.role}</p>

              {/* Motto quote */}
              <div className="fpp-motto">
                "{getFacultyMotto(faculty.dept)}"
              </div>

              <div className="fpp-quick-stats">
                <div className="fpp-quick-stat-box">
                  <span className="fpp-qs-label">Education</span>
                  <span className="fpp-qs-value">{faculty.edu}</span>
                </div>
                <div className="fpp-quick-stat-box">
                  <span className="fpp-qs-label">Experience</span>
                  <span className="fpp-qs-value">{faculty.exp}</span>
                </div>
                <div className="fpp-quick-stat-box">
                  <span className="fpp-qs-label">Expertise</span>
                  <span className="fpp-qs-value">{faculty.tags[0] || 'Academician'}</span>
                </div>
              </div>

              <div className="fpp-contacts-grid">
                <div className="fpp-contact-card">
                  <span className="fpp-contact-icon"><MailIcon /></span>
                  <a href={`mailto:${faculty.email}`} className="fpp-contact-link">{faculty.email}</a>
                </div>
                <div className="fpp-contact-card">
                  <span className="fpp-contact-icon"><PhoneIcon /></span>
                  <span className="fpp-contact-link">{faculty.phone}</span>
                </div>
                <div className="fpp-contact-card">
                  <span className="fpp-contact-icon"><MapPinIcon /></span>
                  <span className="fpp-contact-link">{faculty.office}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content below Hero */}
      <main className="fpp-main-section">
        <div className="fpp-banner-inner fpp-main-grid">
          <div>
            <section className="fpp-card">
              <h2 className="fpp-card-title">Biography</h2>
              <p className="fpp-bio-text">{faculty.bio}</p>
            </section>

            <section className="fpp-card">
              <h2 className="fpp-card-title"><FileTextIcon /> Selected Research Publications</h2>
              <div style={{ marginTop: '16px' }}>
                {faculty.research && faculty.research.map((pub, index) => (
                  <div key={index} className="fpp-publication-item">
                    <h3 className="fpp-pub-title">"{pub.title}"</h3>
                    <span className="fpp-pub-journal">{pub.journal}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <section className="fpp-card">
              <h2 className="fpp-card-title"><BookOpenIcon /> Teaching Areas</h2>
              <div className="fpp-subjects-grid">
                {faculty.teaching && faculty.teaching.map((sub, index) => (
                  <span key={index} className="fpp-subject-tag">{sub}</span>
                ))}
              </div>
            </section>

            <section className="fpp-card">
              <h2 className="fpp-card-title"><AwardIcon /> Key Achievements</h2>
              <div style={{ marginTop: '16px' }}>
                {faculty.achievements && faculty.achievements.map((ach, index) => (
                  <div key={index} className="fpp-achievement-item">
                    <span className="fpp-achievement-bullet">★</span>
                    <p className="fpp-achievement-text">{ach}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
