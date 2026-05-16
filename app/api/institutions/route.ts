import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'institutions.json');

const defaultInstitutions = [
  {
    id: 1,
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007',
    tag: 'ENGINEERING',
    date: { day: '12', month: 'MAY', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Engineering, management and computer applications programs with strong industry tie-ups and research focus.',
    url: 'https://ssitm.in/',
    image: 'program1',
    category: 'Engineering',
    short: 'SSITM',
    type: 'Engineering',
    estd: 2001,
    programs: 8,
    students: 4200,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    title: 'Saroj Institute of Technology and Management',
    code: '123',
    tag: 'ENGINEERING',
    date: { day: '29', month: 'APR', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Modern campus offering B.Tech, BBA, BCA and more with a focus on practical learning and innovation.',
    url: 'https://sitmlko.org/',
    image: 'program2',
    category: 'Engineering',
    short: 'SIET',
    type: 'Engineering',
    estd: 2003,
    programs: 6,
    students: 3800,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 3,
    title: 'Lucknow Institute of Pharmacy',
    code: 'LIP',
    tag: 'PHARMACY',
    date: { day: '28', month: 'APR', year: '2026' },
    approval: 'Approved by Pharmacy Council of India (PCI) and affiliated to AKTU.',
    description: 'Premier pharmacy education with advanced laboratories and professional training for healthcare excellence.',
    url: 'https://seglko.org/lip/',
    image: 'program3',
    category: 'Pharmacy',
    short: 'LIP',
    type: 'Pharmacy',
    estd: 2005,
    programs: 3,
    students: 900,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 4,
    title: 'Saroj College of Pharmacy',
    code: '2031',
    tag: 'PHARMACY',
    date: { day: '17', month: 'APR', year: '2026' },
    approval: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow.',
    description: 'B.Pharm and D.Pharm programs designed for strong clinical exposure and cutting-edge pharmaceutical research.',
    url: 'https://seglko.org/scp/',
    image: 'program4',
    category: 'Pharmacy',
    short: 'SCP',
    type: 'Pharmacy',
    estd: 2003,
    programs: 3,
    students: 800,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 5,
    title: 'Saroj College of Engineering and Polytechnic',
    code: 'SCEP',
    tag: 'POLYTECHNIC',
    date: { day: '17', month: 'APR', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU.',
    description: 'Integrated engineering and diploma programs with world-class infrastructure and industry-standard labs.',
    url: 'https://seglko.org/scep/',
    image: 'program1',
    category: 'Polytechnic',
    short: 'SCEP',
    type: 'Polytechnic',
    estd: 2007,
    programs: 5,
    students: 1200,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'AKTU',
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 6,
    title: 'Saroj College of Law',
    code: 'SCL',
    tag: 'LAW',
    date: { day: '10', month: 'APR', year: '2026' },
    approval: 'Affiliated to Lucknow University.',
    description: 'Comprehensive law programs focusing on advocacy, legal ethics, and practical courtroom skills for future leaders.',
    url: 'https://seglko.org/scl/',
    image: 'program2',
    category: 'Law',
    short: 'SCL',
    type: 'Law',
    estd: 2012,
    programs: 2,
    students: 400,
    location: 'Lucknow, UP',
    status: 'Active',
    affiliation: 'LU',
    color: 'from-rose-500 to-rose-700'
  }
];

async function ensureDataFile() {
  try { await fs.access(DATA_DIR); } catch { await fs.mkdir(DATA_DIR, { recursive: true }); }
  try { await fs.access(FILE_PATH); } catch { await fs.writeFile(FILE_PATH, JSON.stringify(defaultInstitutions, null, 2)); }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load institutions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDataFile();
    const newItem = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const items = JSON.parse(data);
    const nextId = items.length ? Math.max(...items.map((i: any) => i.id)) + 1 : 1;
    const withId = { ...newItem, id: nextId };
    items.push(withId);
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(withId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add institution' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDataFile();
    const updated = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    let items = JSON.parse(data);
    const index = items.findIndex((i: any) => i.id === updated.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[index] = { ...items[index], ...updated };
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(items[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update institution' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    let items = JSON.parse(data);
    items = items.filter((i: any) => i.id !== parseInt(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete institution' }, { status: 500 });
  }
}
