import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Backend is connected properly!',
    timestamp: new Date().toISOString()
  });
}
