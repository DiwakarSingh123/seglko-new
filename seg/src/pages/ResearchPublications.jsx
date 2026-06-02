import { useState } from 'react';
import bookImg from '../assets/images/book image.jpeg';
import { Link } from 'react-router-dom';
import '../research-publications.css';

const ResearchPublications = () => {
  const [activeTab, setActiveTab] = useState('CSE');

  const tabs = [
    { id: 'CSE', label: 'Computer Science and Engineering (CSE)' },
    { id: 'EE', label: 'Electrical Engineering (EE)' },
    { id: 'ME', label: 'Mechanical Engineering (ME)' },
    { id: 'Pharmacy', label: 'Pharmacy' },
    { id: 'Biotechnology', label: 'Biotechnology' }
  ];

  const publicationData = {
    CSE: [
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'International',
        title: 'Digital Signal Processors (DSP) for 3G Mobile Communication Systems',
        journal: 'International Journal on Emerging Technologies',
        year: '2010'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'International',
        title: 'Survey Paper on Reversible CPU Based on Logic Gate Structure',
        journal: 'International Journal of Innovative Research in Computer and Communication Engineering',
        year: '2016'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'International',
        title: 'An Enhanced Clustering Based Technique for Congestion Control in VANET',
        journal: 'International Journal of Innovative Research in Science, Engineering and Technology',
        year: '2016'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'National',
        title: 'Waste to Energy Conversion',
        journal: 'National Journal of Engineering Science and Management',
        year: '2011'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'National',
        title: 'Use of Independent Component Analysis in Wireless Communication System',
        journal: 'National Journal of Engineering Science and Management',
        year: '2011'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'International',
        title: 'Clinical Prediction on ML based Internet of Things for E-Health',
        journal: 'International Journal of Data Informatics and Intelligent Computing (IJDIC)',
        year: '2023'
      },
      {
        faculty: 'Dr. Shivi Chaturvedi',
        type: 'International',
        title: 'Implementing and Analyzing Machine Learning Models for Early Diabetes Detection: A Methodological Approach using Survey-based Data',
        journal: 'International Conference on Energy Systems, Drives and Automations',
        year: '2024'
      },
      {
        faculty: 'Mr. Deepanshu Kumar',
        type: 'International',
        title: 'E-VOTING WEBSITE',
        journal: 'International Journal of Novel Research and Development',
        year: '2024'
      }
    ],
    EE: [
      {
        faculty: 'Prof. M.U. Khan',
        type: 'International',
        title: 'Power Quality Improvement in Distribution Systems',
        journal: 'IEEE Transactions on Power Delivery',
        year: '2022'
      }
    ],
    ME: [
      {
        faculty: 'Dr. Dhirendra Thakural',
        type: 'International',
        title: 'Thermal Analysis of Solar Water Heaters',
        journal: 'Journal of Renewable Energy',
        year: '2021'
      }
    ],
    Pharmacy: [
      {
        faculty: 'Prof. (Dr.) S.N. Pandeya',
        type: 'International',
        title: 'Synthesis and Pharmacological Screening of Novel Anticonvulsants',
        journal: 'Bioorganic & Medicinal Chemistry',
        year: '2019'
      }
    ],
    Biotechnology: [
      {
        faculty: 'Dr. Aarti Gupta',
        type: 'International',
        title: 'CRISPR-Cas9 Applications in Plant Biotechnology',
        journal: 'Nature Communications',
        year: '2023'
      }
    ]
  };

  const renderDots = () => (
    <div className="rp-section__dots">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rp-section__dot"></div>
      ))}
    </div>
  );

  return (
    <div className="rp-page">
      {/* Hero Section */}
      <section className="rp-hero">
        <div className="rp-hero__container">
          <div className="rp-hero__content">
            <h1 className="rp-hero__title">Research Publications</h1>
            <p className="rp-hero__subtitle">
              Explore high-quality research contributions and scholarly publications by our faculty members.
            </p>
          </div>
          <div className="rp-hero__visual">
            <img src={bookImg} alt="Research Books" className="rp-hero__img" />
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="rp-breadcrumbs-bar">

      </div>

      {/* Table Section */}
      <section className="rp-section">
        <div className="rp-section__header">
          {renderDots()}
          <h2 className="rp-section__title">Faculty Research Papers by Department</h2>
          {renderDots()}
        </div>

        <div className="rp-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`rp-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          
        </div>

        <div className="rp-table-container">
          <table className="rp-table">
            <thead>
              <tr>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  Faculty Name
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  Article Type
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                  Article Title
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  Journal / Conference
                </th>
                <th>
                  <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {publicationData[activeTab].map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="rp-table__faculty">
                      <div className="rp-table__faculty-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      {item.faculty}
                    </div>
                  </td>
                  <td>
                    <span className={`rp-table__tag ${item.type === 'International' ? 'tag--int' : 'tag--nat'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.journal}</td>
                  <td>
                    <span className="rp-table__year-tag">{item.year}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ResearchPublications;
