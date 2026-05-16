import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

const initializeDataFile = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    const defaultData = [
      { id: "#AP-1284", student: "Rahul Sharma", email: "rahul@email.com", university: "IIT Delhi", course: "B.Tech CSE", date: "Jan 15, 2024", status: "Pending", fee: "₹2,500", color: "from-orange-400 to-orange-600" },
      { id: "#AP-1283", student: "Priya Singh", email: "priya@email.com", university: "Stanford University", course: "MS Computer Science", date: "Jan 14, 2024", status: "Accepted", fee: "₹5,000", color: "from-blue-400 to-blue-600" },
      { id: "#AP-1282", student: "Amit Patel", email: "amit@email.com", university: "Univ. of Toronto", course: "MBA", date: "Jan 13, 2024", status: "Rejected", fee: "₹3,500", color: "from-emerald-400 to-emerald-600" },
      { id: "#AP-1281", student: "Sneha Reddy", email: "sneha@email.com", university: "Oxford University", course: "MSc Data Science", date: "Jan 12, 2024", status: "In Review", fee: "₹4,500", color: "from-purple-400 to-purple-600" },
      { id: "#AP-1280", student: "Vikram Malhotra", email: "vikram@email.com", university: "MIT", course: "PhD AI", date: "Jan 11, 2024", status: "Accepted", fee: "₹5,000", color: "from-rose-400 to-rose-600" },
      { id: "#AP-1279", student: "Anjali Gupta", email: "anjali@email.com", university: "IIT Bombay", course: "B.Tech ECE", date: "Jan 10, 2024", status: "Pending", fee: "₹2,500", color: "from-amber-400 to-amber-600" },
      { id: "#AP-1278", student: "Rohan Verma", email: "rohan@email.com", university: "NUS Singapore", course: "MS Finance", date: "Jan 9, 2024", status: "In Review", fee: "₹4,000", color: "from-teal-400 to-teal-600" },
      { id: "#AP-1277", student: "Kavya Nair", email: "kavya@email.com", university: "Cambridge University", course: "LLM", date: "Jan 8, 2024", status: "Accepted", fee: "₹5,000", color: "from-pink-400 to-pink-600" },
    ];
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
