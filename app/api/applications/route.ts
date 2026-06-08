import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { StudentApplication } from '@/lib/models';

const COLORS = [
  "from-orange-400 to-orange-600",
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-purple-400 to-purple-600",
  "from-rose-400 to-rose-600",
  "from-amber-400 to-amber-600",
  "from-teal-400 to-teal-600",
  "from-pink-400 to-pink-600"
];

function getColorForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export async function GET() {
  try {
    await connectDB();
    const apps = await StudentApplication.find({}).sort({ createdAt: -1 }).lean();
    
    const formattedData = apps.map((app: any) => ({
      id: app.applicationId || app._id.toString(),
      student: `${app.firstName || ''} ${app.lastName || ''}`.trim() || 'Unknown Student',
      email: app.email || '',
      university: app.desiredInstitution || '',
      course: app.desiredCourse || '',
      date: app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
      status: app.status || 'Pending',
      fee: app.paymentAmount ? `₹${app.paymentAmount}` : '₹0',
      color: getColorForId(app.applicationId || app._id.toString())
    }));

    return NextResponse.json(formattedData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // We expect the body to have { id, status } now
    if (body.id && body.status) {
      const updated = await StudentApplication.findOneAndUpdate(
        { $or: [{ applicationId: body.id }, { _id: body.id }] },
        { status: body.status },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
