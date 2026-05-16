import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'placements.json');

const defaultPlacements = [
  { id: 1, student: 'Rahul Sharma', program: 'B.Tech CSE', company: 'TCS', pkg: '₹6.5 LPA', role: 'Software Engineer', year: '2024', institution: 'SIET', color: 'from-blue-400 to-blue-600' },
  { id: 2, student: 'Priya Singh', program: 'MBA', company: 'HDFC Bank', pkg: '₹8.2 LPA', role: 'Management Trainee', year: '2024', institution: 'SIMS', color: 'from-purple-400 to-purple-600' },
  { id: 3, student: 'Amit Patel', program: 'B.Tech ECE', company: 'Infosys', pkg: '₹5.5 LPA', role: 'Systems Engineer', year: '2024', institution: 'SIET', color: 'from-emerald-400 to-emerald-600' },
  { id: 4, student: 'Sneha Reddy', program: 'MCA', company: 'Wipro', pkg: '₹6.0 LPA', role: 'Project Engineer', year: '2024', institution: 'SIET', color: 'from-orange-400 to-orange-600' },
  { id: 5, student: 'Vikram Malhotra', program: 'B.Tech CSE', company: 'HCL Technologies', pkg: '₹7.0 LPA', role: 'Software Developer', year: '2023', institution: 'SIET', color: 'from-rose-400 to-rose-600' },
  { id: 6, student: 'Anjali Gupta', program: 'MBA', company: 'Deloitte', pkg: '₹9.5 LPA', role: 'Business Analyst', year: '2023', institution: 'SIMS', color: 'from-teal-400 to-teal-600' }
];

async function ensureDataFile() {
  try { await fs.access(DATA_DIR); } catch { await fs.mkdir(DATA_DIR, { recursive: true }); }
  try { await fs.access(FILE_PATH); } catch { await fs.writeFile(FILE_PATH, JSON.stringify(defaultPlacements, null, 2)); }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to load placements' }, { status: 500 });
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
  } catch {
    return NextResponse.json({ error: 'Failed to add placement' }, { status: 500 });
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
  } catch {
    return NextResponse.json({ error: 'Failed to update placement' }, { status: 500 });
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
  } catch {
    return NextResponse.json({ error: 'Failed to delete placement' }, { status: 500 });
  }
}
