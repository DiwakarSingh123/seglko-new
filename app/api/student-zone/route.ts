import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'student-zone.json');

const initializeDataFile = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      notices: [
        { id: 1, title: "Examination Schedule - Even Semester 2024", category: "Exam", date: "May 10, 2024", institution: "SIET", pinned: true, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000" },
        { id: 2, title: "Scholarship Application Form 2024-25", category: "Scholarship", date: "May 8, 2024", institution: "All", pinned: true, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000" },
        { id: 3, title: "Annual Sports Meet Registration Open", category: "Event", date: "May 5, 2024", institution: "All", pinned: false, image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000" },
        { id: 4, title: "Library Timing Change Notice", category: "General", date: "May 3, 2024", institution: "SIET", pinned: false, image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000" },
        { id: 5, title: "Industrial Visit to NTPC Lucknow", category: "Event", date: "Apr 28, 2024", institution: "SIET", pinned: false, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" },
      ],
      resources: [
        { name: "Student Handbook 2024-25", type: "PDF", size: "2.4 MB", downloads: 1240 },
        { name: "Academic Calendar 2024-25", type: "PDF", size: "1.1 MB", downloads: 980 },
        { name: "Hostel Rules & Regulations", type: "PDF", size: "0.8 MB", downloads: 650 },
        { name: "Anti-Ragging Policy", type: "PDF", size: "0.5 MB", downloads: 420 },
      ],
      lifeItems: [
        { id: 1, title: "Welcome to SEG", desc: "Where dreams take shape", category: "Campus Views" },
        { id: 2, title: "Our Campus", desc: "Explore our beautiful campus", category: "Campus Views" },
        { id: 3, title: "Library Moments", desc: "Knowledge at your fingertips", category: "Library" },
        { id: 4, title: "Knowledge Hub", desc: "Our state-of-the-art library", category: "Library" },
        { id: 5, title: "Student Life", desc: "Vibrant student community", category: "Students" },
        { id: 6, title: "Learning & Growth", desc: "Students in action", category: "Students" },
        { id: 7, title: "Annual Fest", desc: "Celebrating talent and culture", category: "Events" },
        { id: 8, title: "Computer Labs", desc: "Modern computing facilities", category: "Facilities" },
      ]
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
  }
};

export async function GET() {
  try {
    initializeDataFile();
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileData);
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    initializeDataFile();
    const updatedData = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
