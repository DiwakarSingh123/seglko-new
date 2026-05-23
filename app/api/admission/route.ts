import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'admission.json');

const defaultCycles = [
  { id: 1, session: '2024-25', program: 'B.Tech CSE', institution: 'SIET', openDate: 'Mar 1, 2024', closeDate: 'Jul 31, 2024', totalSeats: 120, filled: 98, status: 'Open' },
  { id: 2, session: '2024-25', program: 'MBA', institution: 'SIMS', openDate: 'Mar 1, 2024', closeDate: 'Jul 31, 2024', totalSeats: 60, filled: 55, status: 'Open' },
  { id: 3, session: '2024-25', program: 'B.Pharm', institution: 'SCP', openDate: 'Mar 1, 2024', closeDate: 'Jul 31, 2024', totalSeats: 60, filled: 60, status: 'Full' },
  { id: 4, session: '2024-25', program: 'B.Ed', institution: 'SCOE', openDate: 'Apr 1, 2024', closeDate: 'Aug 31, 2024', totalSeats: 100, filled: 42, status: 'Open' },
  { id: 5, session: '2023-24', program: 'B.Tech ECE', institution: 'SIET', openDate: 'Mar 1, 2023', closeDate: 'Jul 31, 2023', totalSeats: 60, filled: 60, status: 'Closed' },
  { id: 6, session: '2023-24', program: 'MCA', institution: 'SIET', openDate: 'Mar 1, 2023', closeDate: 'Jul 31, 2023', totalSeats: 60, filled: 58, status: 'Closed' },
];

async function ensureDataFile() {
  try { await fs.access(DATA_DIR); } catch { await fs.mkdir(DATA_DIR, { recursive: true }); }
  try { await fs.access(FILE_PATH); } catch { await fs.writeFile(FILE_PATH, JSON.stringify(defaultCycles, null, 2)); }
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
  } catch {
    return NextResponse.json({ error: 'Failed to load admission cycles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDataFile();
    const newItem = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const items = JSON.parse(data);
    const nextId = items.length ? Math.max(...items.map((i: { id: number }) => i.id)) + 1 : 1;
    const withId = { ...newItem, id: nextId };
    items.push(withId);
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(withId, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add cycle' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDataFile();
    const updated = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const items = JSON.parse(data);
    const index = items.findIndex((i: { id: number }) => i.id === updated.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[index] = { ...items[index], ...updated };
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(items[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update cycle' }, { status: 500 });
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
    items = items.filter((i: { id: number }) => i.id !== parseInt(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete cycle' }, { status: 500 });
  }
}
