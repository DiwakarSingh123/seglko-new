import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Contact, Settings } from '@/lib/models';

const defaultContactData = {
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
    { label: "LinkedIn", icon: "work", url: "https://www.linkedin.com/company/segindia" },
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

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne({ key: 'contact_page_data' });
    if (!settings) {
      settings = await Settings.create({ key: 'contact_page_data', value: defaultContactData });
    }
    
    const dbInquiries = await Contact.find().sort({ createdAt: -1 });
    const inquiries = dbInquiries.map(inq => ({
      id: inq._id.toString(),
      name: inq.name,
      email: inq.email,
      phone: inq.phone,
      subject: inq.subject,
      message: inq.message,
      date: new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: inq.status === 'unread' ? 'New' : inq.status
    }));

    return NextResponse.json({
      ...settings.value,
      inquiries
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const updatedData = await request.json();
    
    // Extract inquiries from updatedData if any (for status update or delete)
    if (updatedData.inquiries) {
       const currentIds = updatedData.inquiries.map((i: any) => i.id).filter((id: any) => id);
       
       // Handle delete (where ID exists in DB but not in the new list)
       if (currentIds.length > 0) {
           await Contact.deleteMany({ _id: { $nin: currentIds } });
       } else if (updatedData.inquiries.length === 0) {
           await Contact.deleteMany({});
       }
       
       // Update statuses
       for (const inq of updatedData.inquiries) {
         if (inq.id) {
           await Contact.findByIdAndUpdate(inq.id, { status: inq.status });
         }
       }
       
       delete updatedData.inquiries;
    }

    if (Object.keys(updatedData).length > 0) {
       // Save other settings
       let settings = await Settings.findOne({ key: 'contact_page_data' });
       if (!settings) {
         settings = new Settings({ key: 'contact_page_data', value: defaultContactData });
       }
       settings.value = { ...settings.value, ...updatedData };
       // Since it's Mixed type, we need to mark it modified
       settings.markModified('value');
       await settings.save();
    }
    
    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const newInquiry = await request.json();
    
    const dbInq = await Contact.create({
      name: newInquiry.name || 'Anonymous',
      email: newInquiry.email || '',
      phone: newInquiry.phone || '',
      subject: newInquiry.message || newInquiry.inquiry || 'No message',
      message: newInquiry.message || '',
      status: 'New'
    });
    
    const formattedDate = new Date(dbInq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const fullInquiry = {
      id: dbInq._id.toString(),
      name: dbInq.name,
      email: dbInq.email,
      phone: dbInq.phone,
      subject: dbInq.subject,
      message: dbInq.message,
      date: formattedDate,
      status: dbInq.status
    };
    
    return NextResponse.json({ success: true, data: fullInquiry }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
