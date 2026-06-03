import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { JobOpening } from '@/lib/models';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const defaultJobOpenings = [
  {
    title: 'Chairman PS',
    category: 'Administration',
    tag: 'Administration',
    dept: 'Secretariat',
    location: 'Lucknow',
    experience: '5-8 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'blue',
    description: 'Provide leadership and administrative oversight for the institution. Manage strategic initiatives and institutional governance.',
  },
  {
    title: 'Admission Counsellor',
    category: 'Administration',
    tag: 'Admissions',
    dept: 'Counselling',
    location: 'Lucknow',
    experience: '1-3 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'violet',
    description: 'Guide prospective students through the admissions process, answer queries, and support application review.',
  },
  {
    title: 'Assistant Professor',
    category: 'Teaching',
    tag: 'Teaching',
    dept: 'Pharmacy',
    location: 'Lucknow',
    experience: '2-5 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'green',
    description: 'Teach pharmacy courses, mentor students, and contribute to academic and research activities.',
  },
  {
    title: 'Field Officers',
    category: 'Administration',
    tag: 'Administration',
    dept: 'Field Officer',
    location: 'Uttar Pradesh',
    experience: '1-4 Years',
    type: 'Full Time',
    posted: '05 June 2025',
    color: 'orange',
    description: 'Conduct field operations, coordinate outreach activities, and support institutional programs on the ground.',
  },
];

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectDB();
    let jobs = await JobOpening.find().sort({ createdAt: -1 });
    if (jobs.length === 0) {
      jobs = await JobOpening.insertMany(defaultJobOpenings);
    }
    return NextResponse.json(jobs, { headers: corsHeaders });
  } catch (error) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json({ error: 'Failed to load job openings' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const job = await JobOpening.create(body);
    return NextResponse.json(job, { status: 201, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to add job opening' }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await JobOpening.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to update job opening' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400, headers: corsHeaders });
    await JobOpening.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to delete job opening' }, { status: 500, headers: corsHeaders });
  }
}
