import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'programs.json');

// Merged data structure for Admin Panel and Frontend Individual Pages
const defaultPrograms = [
  {
    id: 1,
    name: "Master of Technology",
    description: "Elevate your engineering expertise with our research-intensive postgraduate program designed for future innovators.",
    level: "PG",
    duration: "2 Years",
    seats: 60,
    institution: "SIET",
    status: "Active",
    fee: "₹85,000/yr",
    color: "blue",
    slug: "mtech",
    icon: "GearIcon",
    image: "program1",
    label: "POSTGRADUATE PROGRAM",
    subtitle: "(M.Tech)",
    highlights: [
      { title: '2-Year Program', desc: 'Comprehensive 4-semester curriculum with research focus' },
      { title: '4 Specializations', desc: 'Cutting-edge domains with industry relevance' },
      { title: 'Advanced Labs', desc: 'State-of-the-art research facilities' },
      { title: 'Industry Connect', desc: 'Strong corporate partnerships for placements' }
    ],
    specializations: [
      { name: 'Computer Science', desc: 'AI, Data Science, Advanced Computing' },
      { name: 'Electronics', desc: 'VLSI, Embedded Systems, Communication' },
      { name: 'Mechanical', desc: 'Robotics, CAD/CAM, Thermal Engineering' },
      { name: 'Civil', desc: 'Structural, Environmental, Construction' }
    ],
    whyChoose: [
      { title: 'Research Excellence', desc: 'Opportunities to publish in international journals' },
      { title: 'Industry-Aligned Curriculum', desc: 'Courses designed with corporate partners' },
      { title: 'Expert Faculty', desc: 'Learn from professors with research experience' },
      { title: 'Placement Support', desc: 'Dedicated cell connecting students with employers' }
    ],
    careers: ['R&D Engineer', 'Software Architect', 'Data Scientist', 'Design Engineer', 'Project Manager', 'Academician']
  },
  {
    id: 2,
    name: "Bachelor of Business Administration",
    description: "Develop leadership and business management skills with our industry-focused BBA program designed for future business leaders.",
    level: "UG",
    duration: "3 Years",
    seats: 120,
    institution: "SIMS",
    status: "Active",
    fee: "₹65,000/yr",
    color: "orange",
    slug: "bba",
    icon: "BagIcon",
    image: "program2",
    label: "UNDERGRADUATE PROGRAM",
    subtitle: "(BBA)",
    highlights: [
      { title: '3-Year Program', desc: 'Comprehensive 6-semester curriculum with case studies' },
      { title: '4 Specializations', desc: 'Finance, Marketing, HR, Entrepreneurship' },
      { title: 'Industry Projects', desc: 'Live projects with top companies' },
      { title: 'Global Exposure', desc: 'International business case studies' }
    ],
    specializations: [
      { name: 'Finance', desc: 'Financial Analysis, Banking, Investment' },
      { name: 'Marketing', desc: 'Digital Marketing, Brand Management' },
      { name: 'Human Resources', desc: 'Talent Management, Organizational Behavior' },
      { name: 'Entrepreneurship', desc: 'Startup Management, Business Development' }
    ],
    whyChoose: [
      { title: 'Industry Mentors', desc: 'Learn from top business leaders' },
      { title: 'Case-Based Learning', desc: 'Real-world business problem solving' },
      { title: 'Internships', desc: 'Mandatory industry internship' },
      { title: 'Placement Support', desc: 'Dedicated placement cell' }
    ],
    careers: ['Business Analyst', 'Marketing Executive', 'HR Manager', 'Sales Manager', 'Entrepreneur', 'Consultant']
  },
  {
    id: 3,
    name: "Master of Business Administration",
    description: "Develop leadership and strategic management skills for global business with our industry-focused MBA program.",
    level: "PG",
    duration: "2 Years",
    seats: 180,
    institution: "SIMS",
    status: "Active",
    fee: "₹95,000/yr",
    color: "green",
    slug: "mba",
    icon: "BagIcon",
    image: "program2",
    label: "POSTGRADUATE PROGRAM",
    subtitle: "(MBA)",
    highlights: [
      { title: '2-Year Program', desc: 'Comprehensive 4-semester curriculum with case studies' },
      { title: '4 Specializations', desc: 'Finance, Marketing, HR, Operations' },
      { title: 'Industry Projects', desc: 'Live projects with top companies' },
      { title: 'Global Exposure', desc: 'International business case studies and guest lectures' }
    ],
    specializations: [
      { name: 'Finance', desc: 'Investment Banking, Financial Analysis, Risk Management' },
      { name: 'Marketing', desc: 'Digital Marketing, Brand Management, Sales' },
      { name: 'Human Resources', desc: 'Talent Management, Organizational Behavior' },
      { name: 'Operations', desc: 'Supply Chain, Logistics, Project Management' }
    ],
    whyChoose: [
      { title: 'Industry Mentors', desc: 'Learn from top business leaders and entrepreneurs' },
      { title: 'Case-Based Learning', desc: 'Real-world business problem solving approach' },
      { title: 'Global Network', desc: 'Connect with alumni across 50+ countries' },
      { title: '100% Placement', desc: 'Dedicated placement cell with top recruiters' }
    ],
    careers: ['Business Analyst', 'Marketing Manager', 'Finance Manager', 'HR Manager', 'Operations Head', 'Entrepreneur']
  },
  {
    id: 4,
    name: "Bachelor of Computer Applications",
    description: "Master programming, system management, and application development for a thriving career in the IT industry.",
    level: "UG",
    duration: "3 Years",
    seats: 120,
    institution: "SIET",
    status: "Active",
    fee: "₹65,000/yr",
    color: "violet",
    slug: "bca",
    icon: "CodeIcon",
    image: "program3",
    label: "UNDERGRADUATE PROGRAM",
    subtitle: "(BCA)",
    highlights: [
      { title: '3-Year Program', desc: '6-semester curriculum focused on practical coding' },
      { title: 'Modern Tech Stack', desc: 'Web, Mobile, Cloud and AI technologies' },
      { title: 'Coding Labs', desc: 'Dedicated programming labs with latest tools' },
      { title: 'Internships', desc: 'Mandatory industry internship in final year' }
    ],
    specializations: [
      { name: 'Web Development', desc: 'React, Node.js, Full Stack Development' },
      { name: 'Mobile Apps', desc: 'Android, iOS, Flutter Development' },
      { name: 'Data Science', desc: 'Python, Machine Learning, Analytics' },
      { name: 'Cloud Computing', desc: 'AWS, Azure, DevOps' }
    ],
    whyChoose: [
      { title: 'Hands-on Coding', desc: 'Project-based learning from semester one' },
      { title: 'Industry Tools', desc: 'Training on latest industry-standard technologies' },
      { title: 'Hackathons', desc: 'Regular coding competitions and hackathons' },
      { title: 'Tech Placements', desc: 'Strong connections with IT companies' }
    ],
    careers: ['Software Developer', 'Web Developer', 'App Developer', 'Data Analyst', 'System Analyst', 'IT Consultant']
  },
  {
    id: 5,
    name: "Masters in Computer Applications",
    description: "Equip yourself with expertise in software development, IT, and systems management with our comprehensive MCA program.",
    level: "PG",
    duration: "2 Years",
    seats: 60,
    institution: "SIET",
    status: "Active",
    fee: "₹75,000/yr",
    color: "cyan",
    slug: "mca",
    icon: "CodeIcon",
    image: "program3",
    label: "POSTGRADUATE PROGRAM",
    subtitle: "(MCA)",
    highlights: [
      { title: '2-Year Program', desc: '4-semester curriculum focused on advanced computing' },
      { title: 'Modern Tech Stack', desc: 'Cloud, AI, Full Stack Development' },
      { title: 'Research Projects', desc: 'Industry-sponsored research projects' },
      { title: 'Internships', desc: 'Mandatory industry internship' }
    ],
    specializations: [
      { name: 'Software Engineering', desc: 'Advanced programming, system design' },
      { name: 'Data Science', desc: 'Machine Learning, Big Data, Analytics' },
      { name: 'Cloud Computing', desc: 'AWS, Azure, DevOps' },
      { name: 'Cybersecurity', desc: 'Network security, ethical hacking' }
    ],
    whyChoose: [
      { title: 'Advanced Curriculum', desc: 'Cutting-edge technology curriculum' },
      { title: 'Industry Tools', desc: 'Training on latest industry tools' },
      { title: 'Research Focus', desc: 'Opportunities for research publications' },
      { title: 'Tech Placements', desc: 'Strong connections with IT companies' }
    ],
    careers: ['Software Architect', 'Data Scientist', 'Cloud Engineer', 'IT Manager', 'System Analyst', 'Tech Lead']
  },
  {
    id: 6,
    name: "Bachelor of Pharmacy",
    description: "Comprehensive education in pharmaceutical sciences preparing students for diverse roles in healthcare and research.",
    level: "UG",
    duration: "4 Years",
    seats: 100,
    institution: "SCP",
    status: "Active",
    fee: "₹90,000/yr",
    color: "cyan",
    slug: "bpharm",
    icon: "FlaskIcon",
    image: "program4",
    label: "UNDERGRADUATE PROGRAM",
    subtitle: "(B.Pharm)",
    highlights: [
      { title: '4-Year Program', desc: 'Comprehensive pharmaceutical sciences curriculum' },
      { title: 'Research Labs', desc: 'Modern pharmaceutical research facilities' },
      { title: 'Clinical Training', desc: 'Hospital and industry training exposure' },
      { title: 'Drug Development', desc: 'Hands-on experience in drug formulation' }
    ],
    specializations: [
      { name: 'Pharmaceutics', desc: 'Drug formulation, delivery systems' },
      { name: 'Pharmacology', desc: 'Drug action, clinical pharmacology' },
      { name: 'Pharmaceutical Chemistry', desc: 'Drug synthesis, analysis' },
      { name: 'Pharmacognosy', desc: 'Herbal medicines, natural products' }
    ],
    whyChoose: [
      { title: 'Modern Labs', desc: 'State-of-the-art pharmaceutical labs' },
      { title: 'Industry Tie-ups', desc: 'Partnerships with leading pharma companies' },
      { title: 'Research Focus', desc: 'Opportunities for research publications' },
      { title: 'Healthcare Careers', desc: 'Wide career options in healthcare sector' }
    ],
    careers: ['Pharmacist', 'Drug Inspector', 'Research Scientist', 'Medical Representative', 'Quality Analyst', 'Clinical Researcher']
  },
  {
    id: 7,
    name: "Diploma Programs",
    description: "Industry-focused diploma programs designed for skill enhancement and quick entry into the professional world.",
    level: "Diploma",
    duration: "1-3 Years",
    seats: 160,
    institution: "SIET",
    status: "Active",
    fee: "₹55,000/yr",
    color: "orange",
    slug: "diploma",
    icon: "DiplomaIcon",
    image: "program4",
    label: "DIPLOMA PROGRAM",
    subtitle: "(Engineering & Technology)",
    highlights: [
      { title: 'Skill-Focused', desc: 'Practical training for immediate industry readiness' },
      { title: 'Multiple Streams', desc: 'Engineering, IT, Management and Design' },
      { title: 'Workshop Training', desc: 'Hands-on workshops with industry equipment' },
      { title: 'Job Assistance', desc: 'Placement support for all diploma students' }
    ],
    specializations: [
      { name: 'Diploma in Engineering', desc: 'Mechanical, Civil, Electrical streams' },
      { name: 'Diploma in IT', desc: 'Programming, Networking, Database' },
      { name: 'Diploma in Management', desc: 'Business Administration, Retail Management' },
      { name: 'Diploma in Design', desc: 'Graphic Design, Interior Design' }
    ],
    whyChoose: [
      { title: 'Quick Entry', desc: 'Start your career faster with focused skill training' },
      { title: 'Affordable', desc: 'Cost-effective programs with high ROI' },
      { title: 'Industry Ready', desc: 'Curriculum designed by industry experts' },
      { title: 'Lateral Entry', desc: 'Option to upgrade to degree programs' }
    ],
    careers: ['Junior Engineer', 'Technician', 'IT Support', 'Design Assistant', 'Supervisor', 'Entrepreneur']
  }
];

// Helper to ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify(defaultPrograms, null, 2));
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading programs:', error);
    return NextResponse.json({ error: 'Failed to load programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDataFile();
    const newProgram = await request.json();
    
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const programs = JSON.parse(data);
    
    // Assign ID
    const nextId = programs.length ? Math.max(...programs.map((p: any) => p.id)) + 1 : 1;
    const programWithId = { ...newProgram, id: nextId };
    
    programs.push(programWithId);
    await fs.writeFile(FILE_PATH, JSON.stringify(programs, null, 2));
    
    return NextResponse.json(programWithId, { status: 201 });
  } catch (error) {
    console.error('Error adding program:', error);
    return NextResponse.json({ error: 'Failed to add program' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDataFile();
    const updatedProgram = await request.json();
    
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    let programs = JSON.parse(data);
    
    const index = programs.findIndex((p: any) => p.id === updatedProgram.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    // Merge new fields while keeping nested arrays if they exist in the original but not the update
    programs[index] = { ...programs[index], ...updatedProgram };
    await fs.writeFile(FILE_PATH, JSON.stringify(programs, null, 2));
    
    return NextResponse.json(programs[index]);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    let programs = JSON.parse(data);
    
    programs = programs.filter((p: any) => p.id !== parseInt(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(programs, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}
