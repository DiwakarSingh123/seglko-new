import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { FacultyData } from '@/lib/models';

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
    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error('Failed to load faculty data:', error);
    return NextResponse.json({ error: 'Failed to load faculty data' }, { status: 500, headers: corsHeaders });
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
