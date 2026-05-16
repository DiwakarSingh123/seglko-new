import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'contact.json');

// Initialize data directory and file if they don't exist
const initializeDataFile = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      contactDetails: {
        address: "L-5, First Floor, Lajpat Nagar - II, Delhi, Delhi, India, 110024",
        phone: "09555699988, 09810054878",
        email: "admission.cell@seglko.org",
        website: "www.seglko.org",
      },
      socialLinks: [
        { label: "Facebook", icon: "facebook", url: "https://facebook.com/seglko" },
        { label: "Instagram", icon: "photo_camera", url: "https://instagram.com/seglko" },
        { label: "Twitter / X", icon: "alternate_email", url: "https://twitter.com/seglko" },
        { label: "YouTube", icon: "play_circle", url: "https://youtube.com/@seglko" },
        { label: "LinkedIn", icon: "work", url: "https://linkedin.com/company/seglko" },
        { label: "WhatsApp", icon: "chat", url: "https://wa.me/919555699988" },
      ],
      faqs: [
        { q: "How long does it take to get a response?", a: "We respond to all queries within 24 hours." },
        { q: "How can I apply for admission?", a: "Visit our website and fill the online application form under the Admissions section." },
        { q: "Can I visit the campus before admission?", a: "Yes, you can book a campus visit through our website or call our admissions helpline." },
        { q: "Do you provide scholarship assistance?", a: "Yes, we offer merit-based and need-based scholarships. Contact admissions for details." },
        { q: "How can I track my application?", a: "Login to your student portal to track your application status in real-time." },
        { q: "Who can I contact for admission support?", a: "Call 09555699988 or email admission.cell@seglko.org for admission support." },
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
    return NextResponse.json({ error: 'Failed to read data' }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
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
