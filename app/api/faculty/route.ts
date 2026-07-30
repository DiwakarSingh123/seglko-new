import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { FacultyData } from '@/lib/models';
import { readJsonFallback } from '@/lib/api-fallback';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const defaultFacultyData = {
  faculties: [
    { id: '1', name: 'Prof. (Dr.) Anviti Gupta', role: 'Professor & Dean', school: 'Sharda School of Humanities & Social Sciences', image: 'facultyBg', tone: 'cyan' },
    { id: '2', name: 'Prof. Prem Kumar Malhotra', role: 'Professor', school: 'Sharda School of Law', image: 'aboutBg', tone: 'gold' },
    { id: '3', name: 'Prof. (Dr.) Debasis Mallik', role: 'Dean', school: 'Sharda School of Business Studies', image: 'institutionsBg', tone: 'blue' },
    { id: '4', name: 'Prof. (Dr.) Hrishikesh Dave', role: 'Dean', school: 'Sharda School of Law', image: 'campusBg', tone: 'violet' },
  ],
  awards: [
    { id: '1', title: 'Best University Award 2023', body: 'Ministry of Education, India', desc: 'Recognized for outstanding academic excellence and research contributions across all disciplines.', tone: 'gold' },
    { id: '2', title: 'NAAC A+ Accreditation', body: 'National Assessment and Accreditation Council', desc: 'Highest grade awarded for quality education, infrastructure and student outcomes.', tone: 'blue' },
    { id: '3', title: 'Top 100 Universities', body: 'NIRF Rankings 2023', desc: 'Ranked among top 100 universities in India by National Institutional Ranking Framework.', tone: 'cyan' },
    { id: '4', title: 'Research Excellence Award', body: 'UGC India', desc: 'Awarded for outstanding research output and publications in international journals.', tone: 'violet' },
  ],
  stories: [
    { id: '1', name: 'Rahul Sharma', batch: 'B.Tech CSE 2020', company: 'Google', role: 'Software Engineer', package: '32 LPA', image: 'facultyBg', tone: 'cyan' },
    { id: '2', name: 'Priya Singh', batch: 'MBA 2021', company: 'McKinsey & Co.', role: 'Business Analyst', package: '28 LPA', image: 'aboutBg', tone: 'gold' },
    { id: '3', name: 'Amit Kumar', batch: 'B.Pharm 2019', company: 'Sun Pharma', role: 'Research Scientist', package: '18 LPA', image: 'institutionsBg', tone: 'blue' },
    { id: '4', name: 'Neha Gupta', batch: 'LLB 2022', company: 'Cyril Amarchand', role: 'Associate Lawyer', package: '22 LPA', image: 'campusBg', tone: 'violet' },
  ],
};

type FacultyItem = {
  id?: string | number;
  [key: string]: unknown;
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectDB();
    let data = await FacultyData.findOne();
    if (!data) {
      data = await FacultyData.create(defaultFacultyData);
    }
    return NextResponse.json(data, {
      headers: { ...corsHeaders, 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('Failed to load faculty data:', error);
    const data = await readJsonFallback('faculty.json', defaultFacultyData);
    return NextResponse.json(data, { headers: corsHeaders });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    let data = await FacultyData.findOne();
    if (!data) {
      data = await FacultyData.create({ ...defaultFacultyData, ...body });
    } else {
      if (body.faculties !== undefined) data.faculties = body.faculties;
      if (body.awards !== undefined) data.awards = body.awards;
      if (body.stories !== undefined) data.stories = body.stories;
      await data.save();
    }
    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to update faculty data:', error);
    return NextResponse.json({ error: 'Failed to update faculty data' }, { status: 500, headers: corsHeaders });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const faculty = body.faculty;

    if (!faculty || !faculty.id) {
      return NextResponse.json({ error: 'Missing faculty id' }, { status: 400, headers: corsHeaders });
    }

    let data = await FacultyData.findOne();
    if (!data) {
      data = await FacultyData.create({ ...defaultFacultyData, faculties: [faculty] });
    } else {
      const existingIndex = data.faculties.findIndex((item: FacultyItem) => item.id?.toString() === faculty.id?.toString());
      if (existingIndex >= 0) {
        data.faculties[existingIndex] = faculty;
      } else {
        data.faculties.push(faculty);
      }
      data.markModified('faculties');
      await data.save();
    }

    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to patch faculty data:', error);
    return NextResponse.json({ error: 'Failed to patch faculty data' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing faculty id' }, { status: 400, headers: corsHeaders });
    }

    const data = await FacultyData.findOne();
    if (!data) {
      return NextResponse.json({ error: 'No faculty data found' }, { status: 404, headers: corsHeaders });
    }

    data.faculties = data.faculties.filter((item: FacultyItem) => item.id?.toString() !== id.toString());
    await data.save();

    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to delete faculty data:', error);
    return NextResponse.json({ error: 'Failed to delete faculty data' }, { status: 500, headers: corsHeaders });
  }
}
