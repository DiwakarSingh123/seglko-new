import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { api } from '../api.js';
import programsHeroImg from '../assets/images/programs-page image.jpeg';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const levelFilters = {
  ug: {
    title: 'Undergraduate Programs',
    matches: (program) => /undergraduate/i.test(program.label || ''),
  },
  pg: {
    title: 'Postgraduate Programs',
    matches: (program) => /postgraduate/i.test(program.label || ''),
  },
  diploma: {
    title: 'Diploma Programs',
    matches: (program) => /diploma/i.test(`${program.label || ''} ${program.title || ''}`),
  },
  phd: {
    title: 'Ph.D. Programs',
    matches: (program) => /ph\.?d|doctor/i.test(`${program.label || ''} ${program.title || ''}`),
  },
  online: {
    title: 'Online Programs',
    matches: (program) => /online/i.test(`${program.label || ''} ${program.title || ''}`),
  },
};

export const allPrograms = [
  {
    slug: 'mtech',
    label: 'POSTGRADUATE PROGRAM',
    title: 'Master of Technology',
    subtitle: '(M.Tech)',
    description: 'Elevate your engineering expertise with our research-intensive postgraduate program designed for future innovators.',
    image: '/Master-of-Technology.jpg',
    color: '#1f63db',
    duration: '2 Years',
    seats: '60 Seats',
    highlights: [
      { title: '2-Year Program', desc: 'Comprehensive 4-semester curriculum with research focus' },
      { title: '4 Specializations', desc: 'Cutting-edge domains with industry relevance' },
      { title: 'Advanced Labs', desc: 'State-of-the-art research facilities' },
      { title: 'Industry Connect', desc: 'Strong corporate partnerships for placements' },
    ],
    specializations: [
      { name: 'Computer Science', desc: 'AI, Data Science, Advanced Computing' },
      { name: 'Electronics', desc: 'VLSI, Embedded Systems, Communication' },
      { name: 'Mechanical', desc: 'Robotics, CAD/CAM, Thermal Engineering' },
      { name: 'Civil', desc: 'Structural, Environmental, Construction' },
    ],
    whyChoose: [
      { title: 'Research Excellence', desc: 'Opportunities to publish in international journals' },
      { title: 'Industry-Aligned Curriculum', desc: 'Courses designed with corporate partners' },
      { title: 'Expert Faculty', desc: 'Learn from professors with research experience' },
      { title: 'Placement Support', desc: 'Dedicated cell connecting students with employers' },
    ],
    careers: ['R&D Engineer', 'Software Architect', 'Data Scientist', 'Design Engineer', 'Project Manager', 'Academician'],
  },
  {
    slug: 'bba',
    label: 'UNDERGRADUATE PROGRAM',
    title: 'Bachelor of Business Administration',
    subtitle: '(BBA)',
    description: 'Develop leadership and business management skills with our industry-focused BBA program designed for future business leaders.',
    image: '/Bachelor-of-Business-Administration.png',
    color: '#ff8b1a',
    duration: '3 Years',
    seats: '120 Seats',
    highlights: [
      { title: '3-Year Program', desc: 'Comprehensive 6-semester curriculum with case studies' },
      { title: '4 Specializations', desc: 'Finance, Marketing, HR, Entrepreneurship' },
      { title: 'Industry Projects', desc: 'Live projects with top companies' },
      { title: 'Global Exposure', desc: 'International business case studies' },
    ],
    specializations: [
      { name: 'Finance', desc: 'Financial Analysis, Banking, Investment' },
      { name: 'Marketing', desc: 'Digital Marketing, Brand Management' },
      { name: 'Human Resources', desc: 'Talent Management, Organizational Behavior' },
      { name: 'Entrepreneurship', desc: 'Startup Management, Business Development' },
    ],
    whyChoose: [
      { title: 'Industry Mentors', desc: 'Learn from top business leaders' },
      { title: 'Case-Based Learning', desc: 'Real-world business problem solving' },
      { title: 'Internships', desc: 'Mandatory industry internship' },
      { title: 'Placement Support', desc: 'Dedicated placement cell' },
    ],
    careers: ['Business Analyst', 'Marketing Executive', 'HR Manager', 'Sales Manager', 'Entrepreneur', 'Consultant'],
  },
  {
    slug: 'mba',
    label: 'POSTGRADUATE PROGRAM',
    title: 'Master of Business Administration',
    subtitle: '(MBA)',
    description: 'Develop leadership and strategic management skills for global business with our industry-focused MBA program.',
    image: '/Master-of-Business-Administration.png',
    color: '#6cbf46',
    duration: '2 Years',
    seats: '180 Seats',
    highlights: [
      { title: '2-Year Program', desc: 'Comprehensive 4-semester curriculum with case studies' },
      { title: '4 Specializations', desc: 'Finance, Marketing, HR, Operations' },
      { title: 'Industry Projects', desc: 'Live projects with top companies' },
      { title: 'Global Exposure', desc: 'International business case studies and guest lectures' },
    ],
    specializations: [
      { name: 'Finance', desc: 'Investment Banking, Financial Analysis, Risk Management' },
      { name: 'Marketing', desc: 'Digital Marketing, Brand Management, Sales' },
      { name: 'Human Resources', desc: 'Talent Management, Organizational Behavior' },
      { name: 'Operations', desc: 'Supply Chain, Logistics, Project Management' },
    ],
    whyChoose: [
      { title: 'Industry Mentors', desc: 'Learn from top business leaders and entrepreneurs' },
      { title: 'Case-Based Learning', desc: 'Real-world business problem solving approach' },
      { title: 'Global Network', desc: 'Connect with alumni across 50+ countries' },
      { title: '100% Placement', desc: 'Dedicated placement cell with top recruiters' },
    ],
    careers: ['Business Analyst', 'Marketing Manager', 'Finance Manager', 'HR Manager', 'Operations Head', 'Entrepreneur'],
  },
  {
    slug: 'bca',
    label: 'UNDERGRADUATE PROGRAM',
    title: 'Bachelor of Computer Applications',
    subtitle: '(BCA)',
    description: 'Master programming, system management, and application development for a thriving career in the IT industry.',
    image: '/Bachelor-of-Computer-Applications.png',
    color: '#6a32df',
    duration: '3 Years',
    seats: '120 Seats',
    highlights: [
      { title: '3-Year Program', desc: '6-semester curriculum focused on practical coding' },
      { title: 'Modern Tech Stack', desc: 'Web, Mobile, Cloud and AI technologies' },
      { title: 'Coding Labs', desc: 'Dedicated programming labs with latest tools' },
      { title: 'Internships', desc: 'Mandatory industry internship in final year' },
    ],
    specializations: [
      { name: 'Web Development', desc: 'React, Node.js, Full Stack Development' },
      { name: 'Mobile Apps', desc: 'Android, iOS, Flutter Development' },
      { name: 'Data Science', desc: 'Python, Machine Learning, Analytics' },
      { name: 'Cloud Computing', desc: 'AWS, Azure, DevOps' },
    ],
    whyChoose: [
      { title: 'Hands-on Coding', desc: 'Project-based learning from semester one' },
      { title: 'Industry Tools', desc: 'Training on latest industry-standard technologies' },
      { title: 'Hackathons', desc: 'Regular coding competitions and hackathons' },
      { title: 'Tech Placements', desc: 'Strong connections with IT companies' },
    ],
    careers: ['Software Developer', 'Web Developer', 'App Developer', 'Data Analyst', 'System Analyst', 'IT Consultant'],
  },
  {
    slug: 'mca',
    label: 'POSTGRADUATE PROGRAM',
    title: 'Masters in Computer Applications',
    subtitle: '(MCA)',
    description: 'Equip yourself with expertise in software development, IT, and systems management with our comprehensive MCA program.',
    image: '/Master-of-Computer-Applications.png',
    color: '#27c6d8',
    duration: '2 Years',
    seats: '60 Seats',
    highlights: [
      { title: '2-Year Program', desc: '4-semester curriculum focused on advanced computing' },
      { title: 'Modern Tech Stack', desc: 'Cloud, AI, Full Stack Development' },
      { title: 'Research Projects', desc: 'Industry-sponsored research projects' },
      { title: 'Internships', desc: 'Mandatory industry internship' },
    ],
    specializations: [
      { name: 'Software Engineering', desc: 'Advanced programming, system design' },
      { name: 'Data Science', desc: 'Machine Learning, Big Data, Analytics' },
      { name: 'Cloud Computing', desc: 'AWS, Azure, DevOps' },
      { name: 'Cybersecurity', desc: 'Network security, ethical hacking' },
    ],
    whyChoose: [
      { title: 'Advanced Curriculum', desc: 'Cutting-edge technology curriculum' },
      { title: 'Industry Tools', desc: 'Training on latest industry tools' },
      { title: 'Research Focus', desc: 'Opportunities for research publications' },
      { title: 'Tech Placements', desc: 'Strong connections with IT companies' },
    ],
    careers: ['Software Architect', 'Data Scientist', 'Cloud Engineer', 'IT Manager', 'System Analyst', 'Tech Lead'],
  },
  {
    slug: 'bpharm',
    label: 'UNDERGRADUATE PROGRAM',
    title: 'Bachelor of Pharmacy',
    subtitle: '(B.Pharm)',
    description: 'Comprehensive education in pharmaceutical sciences preparing students for diverse roles in healthcare and research.',
    image: '/Bachelor-of-Pharmacy.png',
    color: '#27c6d8',
    duration: '4 Years',
    seats: '100 Seats',
    highlights: [
      { title: '4-Year Program', desc: 'Comprehensive pharmaceutical sciences curriculum' },
      { title: 'Research Labs', desc: 'Modern pharmaceutical research facilities' },
      { title: 'Clinical Training', desc: 'Hospital and industry training exposure' },
      { title: 'Drug Development', desc: 'Hands-on experience in drug formulation' },
    ],
    specializations: [
      { name: 'Pharmaceutics', desc: 'Drug formulation, delivery systems' },
      { name: 'Pharmacology', desc: 'Drug action, clinical pharmacology' },
      { name: 'Pharmaceutical Chemistry', desc: 'Drug synthesis, analysis' },
      { name: 'Pharmacognosy', desc: 'Herbal medicines, natural products' },
    ],
    whyChoose: [
      { title: 'Modern Labs', desc: 'State-of-the-art pharmaceutical labs' },
      { title: 'Industry Tie-ups', desc: 'Partnerships with leading pharma companies' },
      { title: 'Research Focus', desc: 'Opportunities for research publications' },
      { title: 'Healthcare Careers', desc: 'Wide career options in healthcare sector' },
    ],
    careers: ['Pharmacist', 'Drug Inspector', 'Research Scientist', 'Medical Representative', 'Quality Analyst', 'Clinical Researcher'],
  },
  {
    slug: 'diploma',
    label: 'DIPLOMA PROGRAM',
    title: 'Diploma Programs',
    subtitle: '(Engineering & Technology)',
    description: 'Industry-focused diploma programs designed for skill enhancement and quick entry into the professional world.',
    image: '/Polytechnic-Diploma.png',
    color: '#ff8b1a',
    duration: '1-3 Years',
    seats: '160 Seats',
    highlights: [
      { title: 'Skill-Focused', desc: 'Practical training for immediate industry readiness' },
      { title: 'Multiple Streams', desc: 'Engineering, IT, Management and Design' },
      { title: 'Workshop Training', desc: 'Hands-on workshops with industry equipment' },
      { title: 'Job Assistance', desc: 'Placement support for all diploma students' },
    ],
    specializations: [
      { name: 'Diploma in Engineering', desc: 'Mechanical, Civil, Electrical streams' },
      { name: 'Diploma in IT', desc: 'Programming, Networking, Database' },
      { name: 'Diploma in Management', desc: 'Business Administration, Retail Management' },
      { name: 'Diploma in Design', desc: 'Graphic Design, Interior Design' },
    ],
    whyChoose: [
      { title: 'Quick Entry', desc: 'Start your career faster with focused skill training' },
      { title: 'Affordable', desc: 'Cost-effective programs with high ROI' },
      { title: 'Industry Ready', desc: 'Curriculum designed by industry experts' },
      { title: 'Lateral Entry', desc: 'Option to upgrade to degree programs' },
    ],
    careers: ['Junior Engineer', 'Technician', 'IT Support', 'Design Assistant', 'Supervisor', 'Entrepreneur'],
  },
  {
    slug: 'btech',
    label: 'UNDERGRADUATE PROGRAM',
    title: 'Bachelor of Technology',
    subtitle: '(B.Tech)',
    description: 'A rigorous 4-year engineering program that builds a strong technical foundation for a successful career in engineering and technology sectors.',
    image: '/Bachelor-of-Technology.png',
    color: '#1f63db',
    duration: '4 Years',
    seats: '240 Seats',
    highlights: [
      { title: '4-Year Program', desc: 'Comprehensive 8-semester engineering curriculum with research and projects' },
      { title: '6 Branches', desc: 'CS, EC, ME, CE, EE and more to choose from' },
      { title: 'Advanced Labs', desc: 'State-of-the-art engineering and computing facilities' },
      { title: 'Industry Connect', desc: 'Strong corporate tie-ups for internships and placements' },
    ],
    specializations: [
      { name: 'Computer Science & Engineering', desc: 'AI, Data Science, Full Stack Development, Cloud Computing' },
      { name: 'Electronics & Communication', desc: 'VLSI, Embedded Systems, IoT, Signal Processing' },
      { name: 'Mechanical Engineering', desc: 'Robotics, CAD/CAM, Thermal Engineering, Manufacturing' },
      { name: 'Civil Engineering', desc: 'Structural Design, Environmental Engg., Construction Management' },
    ],
    whyChoose: [
      { title: 'Strong Foundation', desc: 'Deep theoretical and practical engineering training from day one' },
      { title: 'Live Industry Projects', desc: 'Hands-on projects with real corporate partners every semester' },
      { title: 'Expert Faculty', desc: 'Experienced professors with both academic and industry background' },
      { title: 'Top Placements', desc: 'Dedicated placement cell with 200+ recruiting companies' },
    ],
    careers: ['Software Engineer', 'Hardware Engineer', 'Design Engineer', 'Systems Analyst', 'Project Manager', 'Entrepreneur'],
  },
  {
    slug: 'dpharm',
    label: 'DIPLOMA PROGRAM',
    title: 'Diploma in Pharmacy',
    subtitle: '(D.Pharm)',
    description: 'A 2-year pharmacy diploma equipping students with essential pharmaceutical knowledge and hands-on skills required in the healthcare and pharmacy industry.',
    image: '/Diploma-in-Pharmacy.png',
    color: '#27c6d8',
    duration: '2 Years',
    seats: '60 Seats',
    highlights: [
      { title: '2-Year Program', desc: 'Focused pharmaceutical sciences curriculum with practical training' },
      { title: 'Hospital Training', desc: 'Mandatory clinical training in hospitals and pharmacies' },
      { title: 'Drug Knowledge', desc: 'Comprehensive study of drug formulation and dispensing' },
      { title: 'Quick Career Start', desc: 'Fast-track entry into the pharmacy profession' },
    ],
    specializations: [
      { name: 'Pharmaceutics', desc: 'Drug preparation, formulation and dispensing techniques' },
      { name: 'Pharmacology', desc: 'Drug action, mechanisms and clinical interactions' },
      { name: 'Pharmaceutical Chemistry', desc: 'Drug analysis, quality control and testing' },
      { name: 'Community Pharmacy', desc: 'Patient counseling, OTC drugs and retail pharmacy' },
    ],
    whyChoose: [
      { title: 'Modern Pharma Labs', desc: 'Well-equipped pharmaceutical and chemistry laboratories' },
      { title: 'Hospital Internship', desc: 'Practical exposure in hospitals, clinics and pharmacies' },
      { title: 'Quick Career', desc: 'Start working as a licensed pharmacist in just 2 years' },
      { title: 'Higher Studies Path', desc: 'Lateral entry option into B.Pharm available after D.Pharm' },
    ],
    careers: ['Pharmacist', 'Pharmacy Technician', 'Medical Representative', 'Drug Store Manager', 'Hospital Pharmacist', 'Quality Controller'],
  },
  {
    slug: 'mpharm',
    label: 'POSTGRADUATE PROGRAM',
    title: 'Master of Pharmacy',
    subtitle: '(M.Pharm)',
    description: 'An advanced postgraduate program in pharmaceutical sciences for students aiming at research, academia, regulatory affairs and specialized pharmacy practice.',
    image: '/Master-of-Pharmacy.png',
    color: '#6cbf46',
    duration: '2 Years',
    seats: '30 Seats',
    highlights: [
      { title: '2-Year Program', desc: 'Advanced pharmaceutical research-focused curriculum' },
      { title: 'Research Labs', desc: 'High-end pharmaceutical and biotechnology research facilities' },
      { title: 'Industry Collaboration', desc: 'Live projects with top pharma companies' },
      { title: 'Publication Support', desc: 'Guidance for international journal and conference publications' },
    ],
    specializations: [
      { name: 'Pharmaceutics', desc: 'Advanced drug delivery systems, nano-formulations' },
      { name: 'Pharmacology', desc: 'Clinical pharmacology, toxicology and drug discovery' },
      { name: 'Pharmaceutical Chemistry', desc: 'Medicinal chemistry, computer-aided drug design' },
      { name: 'Pharmacognosy', desc: 'Herbal medicine, phytochemistry, natural product research' },
    ],
    whyChoose: [
      { title: 'Research Excellence', desc: 'Internationally recognized research environment with funded projects' },
      { title: 'Expert Mentorship', desc: 'Guidance from experienced research faculty with global publications' },
      { title: 'Pharma Industry Tie-ups', desc: 'Partnerships with leading national and multinational pharma companies' },
      { title: 'Diverse Career Paths', desc: 'Academia, R&D, regulatory affairs and clinical research roles' },
    ],
    careers: ['Research Scientist', 'Pharmaceutical Analyst', 'Drug Regulatory Officer', 'Academic Lecturer', 'Quality Assurance Head', 'Clinical Researcher'],
  },
];

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [displayPrograms, setDisplayPrograms] = useState(allPrograms);
  const level = (searchParams.get('level') || '').toLowerCase();
  const activeFilter = levelFilters[level];
  const visiblePrograms = useMemo(
    () => activeFilter ? displayPrograms.filter(activeFilter.matches) : displayPrograms,
    [activeFilter, displayPrograms]
  );

  useEffect(() => {
    fetch(api('/api/programs'))
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return;
        // Merge API data into static list
        const merged = allPrograms.map(sp => {
          const api = data.find(ap => ap.slug === sp.slug);
          return api ? { ...sp, ...api, image: api.image || sp.image } : sp;
        });
        setDisplayPrograms(merged);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ background: '#f5f8fe', minHeight: '100vh', paddingBottom: '60px' }}>

      <div style={{
        background: `linear-gradient(rgba(10, 39, 93, 0.9), rgba(16, 65, 198, 0.85)), url(${programsHeroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '110px 45px 80px',
        marginTop: '0'
      }}>
        <p style={{ color: '#ffbe23', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Our Programs</p>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 700, color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>
          {activeFilter?.title || 'Programs'} Designed for a <span style={{ color: '#ffbe23' }}>Successful Future</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', maxWidth: '520px', lineHeight: 1.7 }}>
          Discover a wide range of programs designed to build your skills, expand your knowledge, and shape your future.
        </p>
      </div>

      <div style={{ padding: '44px 45px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
          {visiblePrograms.map((program) => (
            <div
              key={program.slug}
              onClick={() => navigate(`/programs/${program.slug}`)}
              style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(20,35,90,0.08)', borderTop: `4px solid ${program.color}`, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(20,35,90,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(20,35,90,0.08)'; }}
            >
              <div style={{ height: '190px', overflow: 'hidden' }}>
                <img src={program.image} alt={program.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '22px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: program.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{program.label}</p>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#162341', marginBottom: '4px' }}>{program.title}</h3>
                <p style={{ fontSize: '15px', fontWeight: 600, color: program.color, marginBottom: '10px' }}>{program.subtitle}</p>
                <div style={{ width: '36px', height: '3px', background: program.color, borderRadius: '999px', marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', color: '#5f6785', lineHeight: 1.7, marginBottom: '18px' }}>{program.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f0f4ff' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#8a9bbf' }}>⏱ {program.duration}</span>
                    <span style={{ fontSize: '13px', color: '#8a9bbf' }}>🎓 {program.seats}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: program.color }}>
                    Explore <ArrowRight />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visiblePrograms.length === 0 && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '34px', textAlign: 'center', color: '#5f6785', boxShadow: '0 6px 20px rgba(20,35,90,0.08)' }}>
            No {activeFilter?.title.toLowerCase() || 'programs'} are available right now.
          </div>
        )}
      </div>
    </div>
  );
}
