import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Institution } from '@/lib/models';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectDB();
    const items = await Institution.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to load institutions' }, { status: 500 });
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
