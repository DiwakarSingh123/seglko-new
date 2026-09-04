import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Institution } from '@/lib/models';
import { logApiError, readJsonFallback } from '@/lib/api-fallback';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const defaultInstitutions = [
  {
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007',
    tag: 'ENGINEERING',
    short: 'SSITM',
    date: { day: '01', month: 'JAN', year: '2001' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Engineering, management and computer applications programs with strong industry tie-ups and research focus.',
    url: 'https://ssitm.in/',
    image: '/best-engineering-and-management-college-in-aligarh-shivdan-singh-institute-of-technology-and-management-saroj-educational-group.webp',
    category: 'Engineering',
    type: 'Engineering',
    estd: 2001,
    programs: 10,
    students: 3000,
    location: 'Aligarh, UP',
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
    url: 'https://sitmlko.org/',
    image: '/best-engineering-and-management-college-in-lucknow-saroj-institute-of-technology-and-management-saroj-educational-group.webp',
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
    approval: 'Approved by Bar Council of India and affiliated to Lucknow University.',
    description: 'Dedicated law college providing quality legal education approved by the Bar Council of India.',
    url: '/scl/',
    image: '/best-law-college-in-lucknow-saroj-college-of-law-saroj-educational-group.webp',
    category: 'Law',
    type: 'Law',
    estd: 2005,
    programs: 3,
    students: 800,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'BCI / Lucknow University',
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
    url: '/scp/',
    image: '/best-pharmacy-college-in-lucknow-saroj-college-of-pharmacy-saroj-educational-group.webp',
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
    approval: 'Approved by AICTE and affiliated to BTE, Lucknow.',
    description: 'Polytechnic and engineering diploma programs designed to produce skilled technical professionals.',
    url: '/scep/',
    image: '/best-engineering-and-polytechnic-college-in-lucknow-saroj-college-of-engineering-and-polytechnics-saroj-educational-group.webp',
    category: 'Polytechnic',
    type: 'Polytechnic',
    estd: 2004,
    programs: 8,
    students: 1500,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'BTE',
    color: 'from-violet-500 to-violet-700',
  },
];

export async function GET() {
  try {
    await connectDB();
    let items = await Institution.find().sort({ createdAt: -1 });
    if (items.length === 0) {
      items = await Institution.insertMany(defaultInstitutions);
    }
    return NextResponse.json(items, { headers: corsHeaders });
  } catch (error) {
    logApiError('GET /api/institutions', error);
    const items = await readJsonFallback('institutions.json', defaultInstitutions);
    return NextResponse.json(items, { headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const item = await Institution.create(body);
    return NextResponse.json(item, { status: 201, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to add institution' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await Institution.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to update institution' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await Institution.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to delete institution' }, { status: 500 });
  }
}
