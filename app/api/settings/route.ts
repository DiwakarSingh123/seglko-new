import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');

async function getSettingsData() {
  try {
    const fileContent = await fs.readFile(settingsFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading settings file:', error);
    return null;
  }
}

export async function GET() {
  const data = await getSettingsData();
  if (!data) {
    return NextResponse.json({ success: false, message: 'Settings database not found' }, { status: 404 });
  }
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await fs.writeFile(settingsFilePath, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ success: true, message: 'Settings updated successfully' }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
