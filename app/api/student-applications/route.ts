import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { StudentApplication } from '@/lib/models';
import nodemailer from 'nodemailer';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: cors });
}

function generateAppId() {
  return `SEG-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
}

async function sendEmails(data: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to student
    await transporter.sendMail({
      from: `"SEG Admissions" <${process.env.SMTP_EMAIL}>`,
      to: data.email,
      subject: `Application Received — ${data.applicationId} | Saroj Educational Group`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8faff;padding:32px;border-radius:12px;">
          <div style="background:#1041c6;padding:24px;border-radius:8px;text-align:center;margin-bottom:24px;">
            <h1 style="color:#fff;margin:0;font-size:22px;">Saroj Educational Group</h1>
            <p style="color:#ffbe23;margin:6px 0 0;font-size:14px;">Application Confirmation</p>
          </div>
          <p style="color:#162341;font-size:16px;">Dear <strong>${data.firstName} ${data.lastName}</strong>,</p>
          <p style="color:#5f6785;">Your admission application has been received successfully. Here are your details:</p>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:16px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Application ID</td><td style="padding:8px 0;font-weight:700;color:#1041c6;">${data.applicationId}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Desired Course</td><td style="padding:8px 0;font-weight:600;color:#162341;">${data.desiredCourse}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Institution</td><td style="padding:8px 0;font-weight:600;color:#162341;">${data.desiredInstitution}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Status</td><td style="padding:8px 0;"><span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:600;">Under Review</span></td></tr>
            </table>
          </div>
          <p style="color:#5f6785;font-size:14px;">Our admissions team will review your application and contact you within <strong>3–5 working days</strong>.</p>
          <p style="color:#5f6785;font-size:14px;">For any queries, contact us at:<br/>
            📞 <strong>09555699988</strong><br/>
            ✉️ <strong>admission.cell@seglko.org</strong>
          </p>
          <div style="border-top:1px solid #e2e8f0;margin-top:24px;padding-top:16px;text-align:center;color:#94a3b8;font-size:12px;">
            © ${new Date().getFullYear()} Saroj Educational Group | seglko.org
          </div>
        </div>
      `,
    });

    // Email to admin
    await transporter.sendMail({
      from: `"SEG Admissions Portal" <${process.env.SMTP_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Application: ${data.applicationId} — ${data.firstName} ${data.lastName} (${data.desiredCourse})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1041c6;">New Admission Application</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Application ID</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.applicationId}</td></tr>
            <tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Student Name</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.firstName} ${data.lastName}</td></tr>
            <tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Email</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.email}</td></tr>
            <tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Phone</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.phone}</td></tr>
            <tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Course</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.desiredCourse}</td></tr>
            <tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Institution</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.desiredInstitution}</td></tr>
            <tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Father's Name</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.fatherName} (${data.fatherPhone})</td></tr>
            <tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">Mother's Name</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.motherName} (${data.motherPhone})</td></tr>
            <tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">10th %</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.class10Percent}% — ${data.class10Board} (${data.class10Year})</td></tr>
            <tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">12th %</td><td style="padding:10px;border:1px solid #e2e8f0;">${data.class12Percent}% — ${data.class12Board} (${data.class12Year}) — ${data.class12Stream}</td></tr>
            ${data.class10Marksheet ? `<tr style="background:#f8faff;"><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">10th Marksheet</td><td style="padding:10px;border:1px solid #e2e8f0;"><a href="${data.class10Marksheet}">View PDF</a></td></tr>` : ''}
            ${data.class12Marksheet ? `<tr><td style="padding:10px;font-weight:600;border:1px solid #e2e8f0;">12th Marksheet</td><td style="padding:10px;border:1px solid #e2e8f0;"><a href="${data.class12Marksheet}">View PDF</a></td></tr>` : ''}
          </table>
          <p style="color:#64748b;font-size:13px;margin-top:16px;">Login to admin panel to review and update status.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Email sending failed:', err);
    // Don't throw — email failure should not block application submission
  }
}

export async function GET() {
  try {
    await connectDB();
    const apps = await StudentApplication.find().sort({ createdAt: -1 });
    return NextResponse.json(apps, { headers: cors });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500, headers: cors });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const applicationId = generateAppId();
    const app = await StudentApplication.create({ ...body, applicationId, status: 'Pending', paymentStatus: 'Pending' });
    // Send emails async
    sendEmails({ ...body, applicationId });
    return NextResponse.json({ success: true, applicationId, _id: app._id }, { status: 201, headers: cors });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500, headers: cors });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...data } = await request.json();
    const updated = await StudentApplication.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(updated, { headers: cors });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500, headers: cors });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const id = new URL(request.url).searchParams.get('id');
    await StudentApplication.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { headers: cors });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500, headers: cors });
  }
}
