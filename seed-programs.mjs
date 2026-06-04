import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ──
const MONGODB_URI = 'mongodb+srv://diwakarsinghdd111:Diwakar%401234@codingadda.evpsohq.mongodb.net/seglko?retryWrites=true&w=majority';
const CLOUDINARY_CLOUD_NAME = 'docmem71d';
const CLOUDINARY_API_KEY = '817155411327787';
const CLOUDINARY_API_SECRET = '78YR7YGJdyzUX1k80ZNOqAENIS0';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// ── Program Schema ──
const programSchema = new mongoose.Schema({
  name: String, description: String, level: String, duration: String,
  seats: Number, institution: String, status: String, fee: String,
  color: String, slug: String, icon: String, image: String,
  label: String, subtitle: String,
  highlights: [{ title: String, desc: String }],
  specializations: [{ name: String, desc: String }],
  whyChoose: [{ title: String, desc: String }],
  careers: [String],
}, { timestamps: true });

const Program = mongoose.models.Program || mongoose.model('Program', programSchema);

// ── Programs Data ──
const programsData = [
  {
    slug: 'mtech',
    label: 'POSTGRADUATE PROGRAM',
    title: 'Master of Technology',
    name: 'Master of Technology',
    subtitle: '(M.Tech)',
    description: 'Elevate your engineering expertise with our research-intensive postgraduate program designed for future innovators.',
    imageFile: 'Master-of-Technology.jpg',
    color: '#1f63db', level: 'PG', duration: '2 Years', seats: 60,
    institution: 'SSITM', status: 'Active', fee: '₹80,000/yr',
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
    slug: 'btech',
    label: 'UNDERGRADUATE PROGRAM',
    name: 'Bachelor of Technology',
    title: 'Bachelor of Technology',
    subtitle: '(B.Tech)',
    description: 'A rigorous 4-year engineering program that builds a strong technical foundation for a successful career in engineering and technology.',
    imageFile: 'Bachelor-of-Technology.png',
    color: '#1f63db', level: 'UG', duration: '4 Years', seats: 240,
    institution: 'SSITM', status: 'Active', fee: '₹75,000/yr',
    highlights: [
      { title: '4-Year Program', desc: 'Comprehensive 8-semester engineering curriculum' },
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
    slug: 'bba',
    label: 'UNDERGRADUATE PROGRAM',
    name: 'Bachelor of Business Administration',
    title: 'Bachelor of Business Administration',
    subtitle: '(BBA)',
    description: 'Develop leadership and business management skills with our industry-focused BBA program designed for future business leaders.',
    imageFile: 'Bachelor-of-Business-Administration.png',
    color: '#ff8b1a', level: 'UG', duration: '3 Years', seats: 120,
    institution: 'SITM', status: 'Active', fee: '₹60,000/yr',
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
    title: 'Master of Business Administration',
    subtitle: '(MBA)',
    description: 'Develop leadership and strategic management skills for global business with our industry-focused MBA program.',
    imageFile: 'Master-of-Business-Administration.png',
    color: '#6cbf46', level: 'PG', duration: '2 Years', seats: 180,
    institution: 'SITM', status: 'Active', fee: '₹90,000/yr',
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
    title: 'Bachelor of Computer Applications',
    subtitle: '(BCA)',
    description: 'Master programming, system management, and application development for a thriving career in the IT industry.',
    imageFile: 'Bachelor-of-Computer-Applications.png',
    color: '#6a32df', level: 'UG', duration: '3 Years', seats: 120,
    institution: 'SSITM', status: 'Active', fee: '₹55,000/yr',
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
    title: 'Masters in Computer Applications',
    subtitle: '(MCA)',
    description: 'Equip yourself with expertise in software development, IT, and systems management with our comprehensive MCA program.',
    imageFile: 'Master-of-Computer-Applications.png',
    color: '#27c6d8', level: 'PG', duration: '2 Years', seats: 60,
    institution: 'SSITM', status: 'Active', fee: '₹70,000/yr',
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
    title: 'Bachelor of Pharmacy',
    subtitle: '(B.Pharm)',
    description: 'Comprehensive education in pharmaceutical sciences preparing students for diverse roles in healthcare and research.',
    imageFile: 'Bachelor-of-Pharmacy.png',
    color: '#27c6d8', level: 'UG', duration: '4 Years', seats: 100,
    institution: 'LIP', status: 'Active', fee: '₹85,000/yr',
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
    slug: 'dpharm',
    label: 'DIPLOMA PROGRAM',
    name: 'Diploma in Pharmacy',
    title: 'Diploma in Pharmacy',
    subtitle: '(D.Pharm)',
    description: 'A 2-year pharmacy diploma equipping students with essential pharmaceutical knowledge and hands-on skills for the healthcare industry.',
    imageFile: 'Diploma-in-Pharmacy.png',
    color: '#27c6d8', level: 'Diploma', duration: '2 Years', seats: 60,
    institution: 'LIP', status: 'Active', fee: '₹45,000/yr',
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
    name: 'Master of Pharmacy',
    title: 'Master of Pharmacy',
    subtitle: '(M.Pharm)',
    description: 'An advanced postgraduate program in pharmaceutical sciences for students aiming at research, academia and specialized pharmacy practice.',
    imageFile: 'Master-of-Pharmacy.png',
    color: '#6cbf46', level: 'PG', duration: '2 Years', seats: 30,
    institution: 'SCP', status: 'Active', fee: '₹95,000/yr',
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
  {
    slug: 'diploma',
    label: 'DIPLOMA PROGRAM',
    name: 'Polytechnic Diploma',
    title: 'Polytechnic Diploma',
    subtitle: '(Engineering & Technology)',
    description: 'Industry-focused diploma programs designed for skill enhancement and quick entry into the professional world.',
    imageFile: 'Polytechnic-Diploma.png',
    color: '#ff8b1a', level: 'Diploma', duration: '3 Years', seats: 160,
    institution: 'SCEP', status: 'Active', fee: '₹35,000/yr',
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
];

async function uploadImage(imageFile) {
  const imagePath = path.join(__dirname, 'seg', 'public', imageFile);
  if (!fs.existsSync(imagePath)) {
    console.log(`  ⚠ Image not found: ${imagePath}, skipping upload`);
    return null;
  }
  console.log(`  📤 Uploading ${imageFile} to Cloudinary...`);
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: 'seglko-programs',
    public_id: imageFile.replace(/\.[^/.]+$/, ''),
    overwrite: true,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  console.log(`  ✅ Uploaded: ${result.secure_url}`);
  return result.secure_url;
}

async function seed() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected\n');

  for (const p of programsData) {
    const { imageFile, title, ...programData } = p;

    // Check if already exists
    const existing = await Program.findOne({ slug: p.slug });

    // Upload image
    const imageUrl = await uploadImage(imageFile);

    const data = {
      ...programData,
      image: imageUrl || existing?.image || '',
    };

    if (existing) {
      await Program.findByIdAndUpdate(existing._id, data);
      console.log(`🔄 Updated: ${p.name}\n`);
    } else {
      await Program.create(data);
      console.log(`✨ Created: ${p.name}\n`);
    }
  }

  console.log('🎉 All 10 programs seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
