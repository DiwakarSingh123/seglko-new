import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Happening } from '@/lib/models';
import { logApiError, readJsonFallback } from '@/lib/api-fallback';

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
    const items = await Happening.find().sort({ createdAt: -1 });
    return NextResponse.json(items, { headers: corsHeaders });
  } catch (error) {
    logApiError('GET /api/happenings', error);
    const items = await readJsonFallback('happenings.json', []);
    return NextResponse.json(items, { headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('POST /api/happenings body:', body);
    const item = await Happening.create(body);
    console.log('Saved happening:', item);
    return NextResponse.json(item, { status: 201, headers: corsHeaders });
  } catch (err: any) {
    console.error('POST /api/happenings error:', err.message);
    return NextResponse.json({ error: err.message || 'Failed to add happening' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await Happening.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to update happening' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await Happening.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to delete happening' }, { status: 500 });
  }
}
