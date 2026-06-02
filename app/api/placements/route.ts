import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Placement } from '@/lib/models';

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
    const placements = await Placement.find().sort({ createdAt: -1 });
    return NextResponse.json(placements, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to load placements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const placement = await Placement.create(body);
    return NextResponse.json(placement, { status: 201, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to add placement' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await Placement.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to update placement' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await Placement.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to delete placement' }, { status: 500 });
  }
}
