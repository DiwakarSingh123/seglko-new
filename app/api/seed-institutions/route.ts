import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Institution } from '@/lib/models';

const institutions = [
  {
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007',
    tag: 'ENGINEERING',
    short: 'SSITM',
    date: { day: '01', month: 'JAN', year: '2001' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Engineering, management and computer applications programs with strong industry tie-ups and research focus.',
    url: 'https://ssitm.in/',
    image: 'program1',
    category: 'Engineering',
    type: 'Engineering',
    estd: 2001,
    programs: 10,
    students: 3000,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Saroj Institute of Technology and Management',
    code: '123',
    tag: 'ENGINEERING',
    short: 'SITM',
    date: { day: '01', month: 'JAN', year: '2002' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Premier engineering and management institute offering a wide range of technical and professional programs.',
    url: 'https://seglko.org/',
    image: 'program1',
    category: 'Engineering',
    type: 'Engineering',
    estd: 2002,
    programs: 12,
    students: 4000,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    title: 'Saroj College of Law',
    code: 'BCI Approved',
    tag: 'LAW',
    short: 'SCL',
    date: { day: '01', month: 'JAN', year: '2005' },
    approval: 'Approved by Bar Council of India and affiliated to AKTU, Lucknow.',
    description: 'Dedicated law college providing quality legal education approved by the Bar Council of India.',
    url: 'https://seglko.org/',
    image: 'program1',
    category: 'Law',
    type: 'Law',
    estd: 2005,
    programs: 3,
    students: 800,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'BCI / AKTU',
    color: 'from-amber-500 to-amber-700',
  },
  {
    title: 'Saroj College of Pharmacy',
    code: '2031',
    tag: 'PHARMACY',
    short: 'SCP',
    date: { day: '01', month: 'JAN', year: '2003' },
    approval: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow.',
    description: 'Offering B.Pharm and D.Pharm programs with state-of-the-art pharmaceutical labs and experienced faculty.',
    url: 'https://seglko.org/',
    image: 'program1',
    category: 'Pharmacy',
    type: 'Pharmacy',
    estd: 2003,
    programs: 2,
    students: 600,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'PCI / AKTU',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    title: 'Saroj College of Engineering and Polytechnic',
    code: 'SCEP',
    tag: 'POLYTECHNIC',
    short: 'SCEP',
    date: { day: '01', month: 'JAN', year: '2004' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Polytechnic and engineering diploma programs designed to produce skilled technical professionals.',
    url: 'https://seglko.org/',
    image: 'program1',
    category: 'Polytechnic',
    type: 'Polytechnic',
    estd: 2004,
    programs: 8,
    students: 1500,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-violet-500 to-violet-700',
  },
];

export async function GET() {
  try {
    await connectDB();
    const existing = await Institution.countDocuments();
    if (existing > 0) {
      return NextResponse.json({ message: `Skipped — ${existing} institutions already exist.` });
    }
    const created = await Institution.insertMany(institutions);
    return NextResponse.json({ message: `Seeded ${created.length} institutions successfully.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
