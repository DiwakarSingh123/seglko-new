import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'research.json');

const initializeDataFile = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      papers: [
        { id: 1, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Digital Signal Processors (DSP) for 3G Mobile Communication Systems", journal: "International Journal on Emerging Technologies", year: "2010", dept: "Computer Science and Engineering (CSE)" },
        { id: 2, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Survey Paper on Reversible CPU Based on Logic Gate Structure", journal: "International Journal of Innovative Research in Computer and Communication Engineering", year: "2016", dept: "Computer Science and Engineering (CSE)" },
        { id: 3, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "An Enhanced Clustering Based Technique for Congestion Control in VANET", journal: "International Journal of Innovative Research in Science, Engineering and Technology", year: "2016", dept: "Computer Science and Engineering (CSE)" },
        { id: 4, faculty: "Dr. Shivi Chaturvedi", type: "National", title: "Waste to Energy Conversion", journal: "National Journal of Engineering Science and Management", year: "2011", dept: "Computer Science and Engineering (CSE)" },
        { id: 5, faculty: "Dr. Shivi Chaturvedi", type: "National", title: "Use of Independent Component Analysis in Wireless Communication System", journal: "National Journal of Engineering Science and Management", year: "2011", dept: "Computer Science and Engineering (CSE)" },
        { id: 6, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Clinical Prediction on ML based Internet of Things for E-Health", journal: "International Journal of Data Informatics and Intelligent Computing (IJDIC)", year: "2023", dept: "Computer Science and Engineering (CSE)" },
        { id: 7, faculty: "Dr. Shivi Chaturvedi", type: "International", title: "Implementing and Analyzing Machine Learning Models for Early Diabetes Detection: A Methodological Approach using Survey-based Data", journal: "International Conference on Energy Systems, Drives and Automations", year: "2024", dept: "Computer Science and Engineering (CSE)" },
        { id: 8, faculty: "Mr. Deepanshu Kumar", type: "International", title: "E-VOTING WEBSITE", journal: "International Journal of Novel Research and Development", year: "2024", dept: "Computer Science and Engineering (CSE)" },
      ],
      projects: [
        { id: 1, name: "Automatic Street Lighting system using IoT", dept: "Electronics Department" },
        { id: 2, name: "Smart Building Project using PIR", dept: "Electronics Department" },
        { id: 3, name: "Smart Water Monitoring System using IoT", dept: "Electronics Department" },
        { id: 4, name: "IoT based Weather Monitoring", dept: "Electronics Department" },
        { id: 5, name: "Smart Irrigation System using IoT", dept: "Electronics Department" },
        { id: 6, name: "Health Monitoring Wearable Glove", dept: "Electronics Department" },
        { id: 7, name: "Animatronic Hand", dept: "Electronics Department" },
        { id: 8, name: "Home Automation System", dept: "Electronics Department" },
        { id: 9, name: "GPS & GSM based Tracker", dept: "Electronics Department" },
        { id: 10, name: "IoT using Raspberry Pi", dept: "Electronics Department" },
        { id: 11, name: "Automated Railway Crossing", dept: "Electronics Department" },
        { id: 12, name: "Access Control with RFID", dept: "Electronics Department" },
        { id: 13, name: "Biometric Authentication", dept: "Electronics Department" },
        { id: 14, name: "Persistence of Vision", dept: "Electronics Department" },
        { id: 15, name: "Robotic Arm", dept: "Electronics Department" },
        { id: 16, name: "Smart Lighting System", dept: "Electronics Department" },
        { id: 17, name: "Gesture Based Robotics", dept: "Electronics Department" },
        { id: 18, name: "Mobile Robotics", dept: "Electronics Department" },
        { id: 19, name: "Bluetooth Robotics", dept: "Electronics Department" },
        { id: 20, name: "Swarm Robotics", dept: "Electronics Department" },
        { id: 21, name: "Sensor Guided Robotics", dept: "Electronics Department" },
        { id: 22, name: "Voice Controlled Robot", dept: "Electronics Department" },
        { id: 23, name: "WiFi Controlled robot", dept: "Electronics Department" },
      ],
      awards: [
        { id: 1, faculty: "Prof. (Dr) S.N. Pandeya", projects: [], dept: "Computer Science and Engineering (CSE)" },
        { id: 2, faculty: "Dr. D.N. Mishra", projects: ["Community Based Distribution Project", "Update Primary Health Care services in Mohanlal Ganj Block", "Study of NRHM (National Rural Health Mission) Asha in Gosaipur Block"], dept: "Computer Science and Engineering (CSE)" },
        { id: 3, faculty: "Er. D. K. Singh", projects: [], dept: "Electrical Engineering (EE)" },
        { id: 4, faculty: "Dr. Pramod Kr. Pandey", projects: [], dept: "Mechanical Engineering (ME)" },
      ],
      innovations: [
        { id: 1, title: "Generation of Concrete Surfaces with GUI", faculty: "Dr. Suraj Singh", dept: "Mathematics" },
        { id: 2, title: "Graphs Theoretic Algorithms for Equations", faculty: "Dr. Suraj Singh", dept: "Mathematics" },
        { id: 3, title: "Energy Efficient Design of a Milk Processing Plant", faculty: "Dr. Dhruwala Thakuri", dept: "Mechanical" },
        { id: 4, title: "R & D impact Design concept of 3 - wheeler Vikram", faculty: "Dr. D. P. Tiwari", dept: "Mechanical" },
        { id: 5, title: "Fumarate Agorts Anti Technology", faculty: "Prof. (Dr) S.N. Pandeya", dept: "Pharmacy" },
        { id: 6, title: "Potential and HIV Agent Non rich", faculty: "Prof. (Dr) S.N. Pandeya", dept: "Pharmacy" },
        { id: 7, title: "Laser displacement transducer for accurate displacement measurements", faculty: "Prof. M.U. Khan", dept: "Electrical Engineering" },
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
