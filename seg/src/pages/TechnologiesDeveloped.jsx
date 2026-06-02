import robotImg from '../assets/images/seg.jpeg'; // Placeholder for robotic arm
import '../technologies-developed.css';

const TechnologiesDeveloped = () => {
  const techData = [
    {
      id: 1,
      details: 'Generation of Concave Surfaces with GUI',
      faculty: 'Dr. Sunil Singh',
      department: 'Mathematics',
      tagClass: 'tag-math'
    },
    {
      id: 2,
      details: 'Graphs Theoretic Algorithms for Equations',
      faculty: 'Dr. Sunil Singh',
      department: 'Mathematics',
      tagClass: 'tag-math'
    },
    {
      id: 3,
      details: 'Energy Efficient Design of a Milk Processing Plant',
      faculty: 'Dr. Dhirendra Thakural',
      department: 'Mechanical',
      tagClass: 'tag-mech'
    },
    {
      id: 4,
      details: 'R & D aspect Design concept of 3 - wheeler Vikram',
      faculty: 'Dr. O. P. Tiwari',
      department: 'Mechanical',
      tagClass: 'tag-mech'
    },
    {
      id: 5,
      details: 'Fubeceh Agentc Anti Technology',
      faculty: 'Prof. (Dr.) S.N Pandyaa',
      department: 'Pharmacy',
      tagClass: 'tag-pharm'
    },
    {
      id: 6,
      details: 'Potential anti HIV Agent-Man rich',
      faculty: 'Prof. (Dr.) S.N Pandyaa',
      department: 'Pharmacy',
      tagClass: 'tag-pharm'
    },
    {
      id: 7,
      details: 'Laser displacement transducer for accurate displacement measurements',
      faculty: 'Prof. M.U. Khan',
      department: 'Electrical Engineering',
      tagClass: 'tag-elec'
    }
  ];

  return (
    <div className="tech-dev-page">
      {/* Hero Section */}
      <section className="td-hero">
        <div className="td-hero__top">
          <div className="td-hero__content">
            <h1 className="td-hero__title">Innovation & Technology Transfer</h1>
            <div className="td-hero__text">
              <p>
                Technology plays a transformative role in shaping economies, enhancing global connectivity, and improving quality of life. However, it also presents challenges such as environmental impact, resource depletion, and ethical considerations, particularly in areas like efficiency and bioethics.
              </p>
              <p>
                Saroj Institute of Technology & Management is committed to fostering innovation through dedicated Research and Development (R&D) initiatives. With a strong emphasis on technological advancements, the institute aims to address national and societal needs while striving for global leadership in cutting-edge research. Below are some of the recent innovations and technologies developed or ready for transfer at Saroj Institute of Technology & Management, Lucknow.
              </p>
            </div>
          </div>

          <div className="td-hero__visual">
            <img src={robotImg} alt="Robotic Innovation" className="td-hero__image" />
            <div className="td-hero__quote">
              <div className="td-hero__quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6"/></svg>
              </div>
              <p className="td-hero__quote-text">
                Innovation distinguishes between a leader and a follower.
              </p>
              <span className="td-hero__quote-author">— Steve Jobs</span>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="td-features">
          <div className="td-feature">
            <div className="td-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </div>
            <div className="td-feature__info">
              <span className="td-feature__title">Driving Innovation</span>
              <span className="td-feature__desc">Creating impact through ideas</span>
            </div>
          </div>

          <div className="td-feature">
            <div className="td-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <div className="td-feature__info">
              <span className="td-feature__title">Research Excellence</span>
              <span className="td-feature__desc">Pushing boundaries</span>
            </div>
          </div>

          <div className="td-feature">
            <div className="td-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="td-feature__info">
              <span className="td-feature__title">Tech for Society</span>
              <span className="td-feature__desc">Solving real-world challenges</span>
            </div>
          </div>

          <div className="td-feature">
            <div className="td-feature__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div className="td-feature__info">
              <span className="td-feature__title">Global Impact</span>
              <span className="td-feature__desc">Building a better tomorrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="td-table-section">
        <div className="td-table-container">
          <table className="td-table">
            <thead>
              <tr>
                <th className="td-table__sr">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                   &nbsp; Sr. No
                </th>
                <th>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  &nbsp; Technology Transfer Details
                </th>
                <th>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  &nbsp; Faculty Name
                </th>
                <th>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  &nbsp; Department
                </th>
              </tr>
            </thead>
            <tbody>
              {techData.map((item) => (
                <tr key={item.id}>
                  <td className="td-table__sr">
                    <div className="td-table__sr-box">{item.id}</div>
                  </td>
                  <td className="td-table__details">{item.details}</td>
                  <td>{item.faculty}</td>
                  <td>
                    <span className={`td-table__tag ${item.tagClass}`}>
                      {item.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="td-footer-note">
          <div className="td-footer-note__icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <p className="td-footer-note__text">
            Encouraging innovation today for a smarter, sustainable tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TechnologiesDeveloped;
