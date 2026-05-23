import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'gallery.json');

type GalleryItem = {
  id: number;
  title: string;
  url: string;
  category: string;
  description?: string;
};

async function ensureDataFile() {
  try { await fs.access(DATA_DIR); } catch { await fs.mkdir(DATA_DIR, { recursive: true }); }
  try { await fs.access(FILE_PATH); } catch { await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2)); }
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
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDataFile();
    const newItem = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const items: GalleryItem[] = JSON.parse(data);
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const withId = { ...newItem, id: nextId };
    items.push(withId);
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(withId, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDataFile();
    const updated = await request.json();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const items: GalleryItem[] = JSON.parse(data);
    const index = items.findIndex((i) => i.id === updated.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[index] = { ...items[index], ...updated };
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json(items[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await ensureDataFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    let items: GalleryItem[] = JSON.parse(data);
    items = items.filter((i) => i.id !== parseInt(id));
    await fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
