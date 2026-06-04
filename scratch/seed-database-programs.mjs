import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'docmem71d',
  api_key: '817155411327787',
  api_secret: '78YR7YGJdyzUX1k80ZNOqAENIS0'
});

const uri = 'mongodb+srv://diwakarsinghdd111:Diwakar%401234@codingadda.evpsohq.mongodb.net/seglko?retryWrites=true&w=majority';

// Define Program Schema to match models.ts
const programSchema = new mongoose.Schema({
  name: String,
  description: String,
  level: String,
  duration: String,
  seats: Number,
  institution: String,
  status: String,
  fee: String,
  color: String,
  slug: String,
  icon: String,
  image: String,
  label: String,
  subtitle: String,
  highlights: [{ title: String, desc: String }],
  specializations: [{ name: String, desc: String }],
  whyChoose: [{ title: String, desc: String }],
  careers: [String],
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema, 'programs');

async function run() {
  // Upload law image
  let lawImageUrl = '';
  try {
    const fullPath = path.resolve('seg/src/assets/images/college of law.avif');
    console.log(`Uploading law image from ${fullPath}...`);
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'programs'
    });
    lawImageUrl = result.secure_url;
    console.log(`Uploaded law image: ${lawImageUrl}`);
  } catch (error) {
    console.error('Failed to upload law image, using fallback:', error);
    lawImageUrl = 'https://res.cloudinary.com/docmem71d/image/upload/v1780470125/programs/ausu9jgvseiyxo0ssp5j.webp';
  }

  const programsData = [
    {
      slug: 'mtech',
      label: 'POSTGRADUATE PROGRAM',
      name: 'Master of Technology',
      subtitle: '(M.Tech)',
      description: 'Elevate your engineering expertise with our research-intensive postgraduate program designed for future innovators.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470123/programs/buhlgc4c08a0iszflmw6.webp',
      color: 'blue',
      level: 'PG',
      duration: '2 Years',
      seats: 60,
      institution: 'SIET',
      status: 'Active',
      fee: '₹75,000/yr',
      icon: 'GearIcon',
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
      name: 'Bachelor of Business Administration',
      subtitle: '(BBA)',
      description: 'Develop leadership and business management skills with our industry-focused BBA program designed for future business leaders.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470124/programs/vqbtkzi3hsw2bvsggwvs.jpg',
      color: 'green',
      level: 'UG',
      duration: '3 Years',
      seats: 120,
      institution: 'SIMS',
      status: 'Active',
      fee: '₹50,000/yr',
      icon: 'BagIcon',
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
      name: 'Master of Business Administration',
      subtitle: '(MBA)',
      description: 'Develop leadership and strategic management skills for global business with our industry-focused MBA program.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470124/programs/vqbtkzi3hsw2bvsggwvs.jpg',
      color: 'green',
      level: 'PG',
      duration: '2 Years',
      seats: 180,
      institution: 'SIMS',
      status: 'Active',
      fee: '₹90,000/yr',
      icon: 'BagIcon',
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
      name: 'Bachelor of Computer Applications',
      subtitle: '(BCA)',
      description: 'Master programming, system management, and application development for a thriving career in the IT industry.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470125/programs/ausu9jgvseiyxo0ssp5j.webp',
      color: 'violet',
      level: 'UG',
      duration: '3 Years',
      seats: 120,
      institution: 'SIET',
      status: 'Active',
      fee: '₹55,000/yr',
      icon: 'CodeIcon',
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
      name: 'Masters in Computer Applications',
      subtitle: '(MCA)',
      description: 'Equip yourself with expertise in software development, IT, and systems management with our comprehensive MCA program.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470125/programs/ausu9jgvseiyxo0ssp5j.webp',
      color: 'violet',
      level: 'PG',
      duration: '2 Years',
      seats: 60,
      institution: 'SIET',
      status: 'Active',
      fee: '₹80,000/yr',
      icon: 'CodeIcon',
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
      name: 'Bachelor of Pharmacy',
      subtitle: '(B.Pharm)',
      description: 'Comprehensive education in pharmaceutical sciences preparing students for diverse roles in healthcare and research.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470127/programs/oznk987taddlwnxqrgvx.jpg',
      color: 'cyan',
      level: 'UG',
      duration: '4 Years',
      seats: 100,
      institution: 'SCP',
      status: 'Active',
      fee: '₹85,000/yr',
      icon: 'FlaskIcon',
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
      name: 'Diploma Programs',
      subtitle: '(Engineering & Technology)',
      description: 'Industry-focused diploma programs designed for skill enhancement and quick entry into the professional world.',
      image: 'https://res.cloudinary.com/docmem71d/image/upload/v1780470126/programs/nbv3gab6lx5y1qjblxya.jpg',
      color: 'orange',
      level: 'Diploma',
      duration: '1-3 Years',
      seats: 160,
      institution: 'SIET',
      status: 'Active',
      fee: '₹35,000/yr',
      icon: 'DiplomaIcon',
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
      slug: 'law',
      label: 'LAW PROGRAM',
      name: 'Law Programs',
      subtitle: '(LLB)',
      description: 'LLB programs to build legal expertise and professional excellence.',
      image: lawImageUrl,
      color: 'rose',
      level: 'UG',
      duration: '3-5 Years',
      seats: 120,
      institution: 'SIMS',
      status: 'Active',
      fee: '₹40,000/yr',
      icon: 'LawIcon',
      highlights: [
        { title: 'Professional Degree', desc: 'Recognized by Bar Council of India' },
        { title: 'Moot Court', desc: 'Practical training with simulated court trials' },
        { title: 'Legal Internships', desc: 'Internship opportunities with top law firms and courts' },
        { title: 'Legal Aid Cell', desc: 'Free legal advice and social service exposure' },
      ],
      specializations: [
        { name: 'Constitutional Law', desc: 'Structure, rights, governance systems' },
        { name: 'Criminal Law', desc: 'Offences, penal code, trials' },
        { name: 'Corporate Law', desc: 'Business compliance, mergers, finance' },
        { name: 'Intellectual Property', desc: 'Patents, copyright, trademark protections' },
      ],
      whyChoose: [
        { title: 'Moot Court Room', desc: 'State-of-the-art moot court facility' },
        { title: 'Experienced Faculty', desc: 'Learn from retired judges and senior advocates' },
        { title: 'Legal Research', desc: 'Access to extensive physical and online libraries' },
        { title: 'Placement Drive', desc: 'Placements with corporate legal cells and firms' },
      ],
      careers: ['Advocate', 'Legal Advisor', 'Judicial Officer', 'Corporate Legal Head', 'Legal Researcher', 'Public Prosecutor'],
    }
  ];

  await mongoose.connect(uri);
  
  // Clean collection
  await Program.deleteMany({});
  console.log('Cleaned programs collection.');
  
  // Insert new programs
  const seeded = await Program.insertMany(programsData);
  console.log(`Successfully seeded ${seeded.length} programs!`);
  
  mongoose.connection.close();
}

run();
