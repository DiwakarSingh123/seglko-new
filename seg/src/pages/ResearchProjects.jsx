import { useState } from 'react';
import { Link } from 'react-router-dom';
import researchHeroImg from '../assets/images/researchprojects.jpeg'; // Using a placeholder for now
import '../research-projects.css';

const ResearchProjects = () => {
  const [activeTab, setActiveTab] = useState('Electronics');

  const departments = [
    { name: 'Electronics Department', id: 'Electronics', icon: '⚡' },
    { name: 'Electrical Department', id: 'Electrical', icon: '🔋' },
    { name: 'Mechanical Department', id: 'Mechanical', icon: '⚙️' },
  ];

  const projects = {
    Electronics: [
      "Automatic Street Lighting system using IoT",
      "IoT based Weather Monitoring",
      "Smart Water Monitoring System using IoT",
      "Animatronic Hand",
      "Smart Irrigation System using IoT",
      "Health Monitoring Wearable Glove",
      "IoT using Raspberry Pi",
      "Home Automation System",
      "GPS & GSM based Tracker",
      "Biometric Authentication",
      "Automated Railway Crossing",
      "Access Control with RFID",
      "Smart Lighting System",
      "Persistence of Vision",
      "Robotic Arm",
      "Bluetooth Robotics",
      "Gesture Based Robotics",
      "Mobile Robotics",
      "Swarm Robotics",
      "Sensor Guided Robotics"
    ],
    Electrical: [
      "Smart Grid Management",
      "Solar Powered Irrigation",
      "Wireless Power Transfer",
      "Power Factor Correction",
      "PLC based Industrial Automation",
      "EV Charging Station Design",
      "Fault Detection in Transformers",
      "Wind Energy Harvesting",
      "Hybrid Power Systems",
      "Energy Efficient Motors"
    ],
    Mechanical: [
      "Autonomous Ground Vehicle",
      "3D Printing Innovations",
      "Hydraulic Excavator Model",
      "Formula Student Race Car",
      "Smart HVAC Systems",
      "Renewable Energy Turbines",
      "Precision CNC Machining",
      "Biomechanical Exoskeleton",
      "Advanced Welding Techniques",
      "Robotic Fabrication"
    ]
  };

  return (
    <div className="rd-projects-page">
      {/* Hero Section */}
      <section className="rd-hero">
        <div className="rd-hero__bg">
          <img src={researchHeroImg} alt="Research and Development" />
        </div>
        <div className="rd-hero__overlay"></div>
        <div className="rd-hero__container">
          <div className="rd-hero__content">
            <h1 className="rd-hero__title">Research Projects</h1>
            <p className="rd-hero__subtitle">
              Driving innovation and excellence through research. Explore the impactful projects by our talented students and dedicated faculty.
            </p>

            <div className="rd-hero__features">
              <div className="rd-hero__feature">
                <div className="rd-hero__feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                </div>
                <div className="rd-hero__feature-info">
                  <span className="rd-hero__feature-title">Innovate</span>
                  <span className="rd-hero__feature-desc">Creative solutions for <br /> real-world challenges</span>
                </div>
              </div>

              <div className="rd-hero__feature">
                <div className="rd-hero__feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div className="rd-hero__feature-info">
                  <span className="rd-hero__feature-title">Collaborate</span>
                  <span className="rd-hero__feature-desc">Interdisciplinary teamwork</span>
                </div>
              </div>

              <div className="rd-hero__feature">
                <div className="rd-hero__feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                </div>
                <div className="rd-hero__feature-info">
                  <span className="rd-hero__feature-title">Impact</span>
                  <span className="rd-hero__feature-desc">Research that creates difference</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rd-hero__quote-card">
            <span className="rd-hero__quote-icon">“</span>
            <p className="rd-hero__quote-text">
              Research is the bridge between knowledge and innovation.
            </p>
            <div className="rd-hero__quote-line"></div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="rd-breadcrumbs-wrapper">
        <div className="rd-breadcrumbs">

        </div>
      </div>

      {/* Intro Section */}
      <section className="rd-intro">
        <h2 className="rd-intro__title">Research & Innovation</h2>
        <p className="rd-intro__text">
          Research activities in academic institutions play a pivotal role in enhancing the quality of teaching and fostering innovation. At Saroj Educational Group, we encourage our faculty to integrate a balanced mix of teaching and research.
        </p>
      </section>

      {/* Stats Bar */}
      <section className="rd-stats">
        <div className="rd-stats__inner">
          <div className="rd-stats__item rd-stats__item--projects">
            <div className="rd-stats__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </div>
            <div className="rd-stats__info">
              <span className="rd-stats__value">150+</span>
              <span className="rd-stats__label">Research Projects</span>
            </div>
          </div>

          <div className="rd-stats__item rd-stats__item--researchers">
            <div className="rd-stats__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <div className="rd-stats__info">
              <span className="rd-stats__value">300+</span>
              <span className="rd-stats__label">Student Researchers</span>
            </div>
          </div>

          <div className="rd-stats__item rd-stats__item--faculty">
            <div className="rd-stats__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            </div>
            <div className="rd-stats__info">
              <span className="rd-stats__value">50+</span>
              <span className="rd-stats__label">Faculty Involved</span>
            </div>
          </div>

          <div className="rd-stats__item rd-stats__item--awards">
            <div className="rd-stats__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
            </div>
            <div className="rd-stats__info">
              <span className="rd-stats__value">25+</span>
              <span className="rd-stats__label">Awards & Recognition</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Projects Section */}
      <section className="rd-tabs-section">
        <div className="rd-tabs-container">
          <div className="rd-tabs">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className={`rd-tab ${activeTab === dept.id ? 'active' : ''}`}
                onClick={() => setActiveTab(dept.id)}
              >
                <span className="rd-tab__icon">{dept.icon}</span>
                {dept.name}
              </button>
            ))}
          </div>

          <div className="rd-projects-panel">
            <div className="rd-projects__header">
              <div className="rd-projects__header-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              </div>
              <h3 className="rd-projects__header-title">{activeTab} Department Projects</h3>
            </div>

            <div className="rd-projects-grid">
              {projects[activeTab].map((project, index) => (
                <div key={index} className="rd-project-card">
                  <div className="rd-project-card__left">
                    <div className="rd-project-card__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    </div>
                    <span className="rd-project-card__title">{project}</span>
                  </div>
                  <div className="rd-project-card__arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchProjects;
