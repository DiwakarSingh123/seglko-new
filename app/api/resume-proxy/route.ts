import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || !url.includes('cloudinary.com')) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  // Extract public_id from URL
  // e.g. https://res.cloudinary.com/docmem71d/raw/upload/v123/seglko-job-applications/resumes/abc123
  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return NextResponse.json({ error: 'Cannot parse URL' }, { status: 400 });

  const publicId = match[1];

  // Generate signed URL valid for 60 seconds
  const signedUrl = cloudinary.url(publicId, {
    resource_type: 'raw',
    type: 'upload',
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 60,
  });

  const res = await fetch(signedUrl);
  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch from Cloudinary' }, { status: 502 });

  const buffer = await res.arrayBuffer();
  const disposition = searchParams.get('download') === '1'
    ? 'attachment; filename="resume.pdf"'
    : 'inline; filename="resume.pdf"';

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': disposition,
    },
  });
}
