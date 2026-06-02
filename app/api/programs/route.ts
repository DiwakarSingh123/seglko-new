import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Program } from '@/lib/models';

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
    const programs = await Program.find().sort({ createdAt: -1 });
    return NextResponse.json(programs, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to load programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const program = await Program.create(body);
    return NextResponse.json(program, { status: 201, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to add program' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await Program.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await Program.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}
