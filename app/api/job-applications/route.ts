import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Application } from '@/lib/models';

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
    const applications = await Application.find({ type: 'job' }).sort({ createdAt: -1 });
    return NextResponse.json(applications, { headers: corsHeaders });
  } catch (error) {
    console.error('GET /api/job-applications error:', error);
    return NextResponse.json({ error: 'Failed to load job applications' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const applicationData = {
      type: 'job',
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      position: formData.get('position')?.toString() || '',
      qualification: formData.get('qualification')?.toString() || '',
      experience: formData.get('experience')?.toString() || '',
      expectedSalary: formData.get('expectedSalary')?.toString() || '',
      lastOrganization: formData.get('lastOrganization')?.toString() || '',
      lastSalary: formData.get('lastSalary')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      status: 'pending',
    };

    if (!applicationData.name || !applicationData.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400, headers: corsHeaders });
    }

    const application = await Application.create(applicationData);
    console.log('Job application created:', application._id);
    return NextResponse.json(application, { status: 201, headers: corsHeaders });
  } catch (error: any) {
    console.error('POST /api/job-applications error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit job application' }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...data } = body;
    const updated = await Application.findByIdAndUpdate(_id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
    return NextResponse.json(updated, { headers: corsHeaders });
  } catch (error) {
    console.error('PUT /api/job-applications error:', error);
    return NextResponse.json({ error: 'Failed to update job application' }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400, headers: corsHeaders });
    await Application.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('DELETE /api/job-applications error:', error);
    return NextResponse.json({ error: 'Failed to delete job application' }, { status: 500, headers: corsHeaders });
  }
}
