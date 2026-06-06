import mongoose from 'mongoose';

// ── Placement ──────────────────────────────────────────────
const placementSchema = new mongoose.Schema({
  student: String,
  program: String,
  company: String,
  role: String,
  pkg: String,
  year: String,
  institution: String,
  color: String,
  customImage: String,
}, { timestamps: true });

// ── Happening ──────────────────────────────────────────────
const happeningSchema = new mongoose.Schema({
  title: String,
  type: { type: String, default: 'whats_happening' },
  category: String,
  date: String,
  description: String,
  image: String,
  url: String,
}, { timestamps: true });

// ── Program ────────────────────────────────────────────────
const programSchema = new mongoose.Schema({
  name: String,
  description: String,
  level: String,
  duration: String,
  seats: Number,
  institution: String,
  status: String,
  fee: String,
  color: String,
  slug: String,
  icon: String,
  image: String,
  label: String,
  subtitle: String,
  highlights: [{ title: String, desc: String }],
  specializations: [{ name: String, desc: String }],
  whyChoose: [{ title: String, desc: String }],
  careers: [String],
}, { timestamps: true });

// ── Faculty ────────────────────────────────────────────────
const facultySchema = new mongoose.Schema({
  faculties: mongoose.Schema.Types.Mixed,
  awards: mongoose.Schema.Types.Mixed,
  stories: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

// ── Gallery ────────────────────────────────────────────────
const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  url: String,
  publicId: String,
  description: String,
  date: String,
}, { timestamps: true });

// ── Institution ────────────────────────────────────────────
const institutionSchema = new mongoose.Schema({
  title: String,
  code: String,
  tag: String,
  short: String,
  date: mongoose.Schema.Types.Mixed,
  approval: String,
  description: String,
  url: String,
  image: String,
  category: String,
  type: String,
  estd: Number,
  programs: Number,
  students: Number,
  location: String,
  status: String,
  affiliation: String,
  color: String,
  customImage: String,
}, { timestamps: true });

// ── Research ───────────────────────────────────────────────
const researchSchema = new mongoose.Schema({
  title: String,
  author: String,
  department: String,
  year: String,
  type: String,
  description: String,
  link: String,
}, { timestamps: true });

// ── Admission ──────────────────────────────────────────────
const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  program: String,
  message: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

// ── Contact ────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: { type: String, default: 'unread' },
}, { timestamps: true });

// ── Application ────────────────────────────────────────────
const applicationSchema = new mongoose.Schema({
  type: { type: String, enum: ['job', 'admission'], default: 'job' },
  name: String,
  email: String,
  phone: String,
  position: String,
  qualification: String,
  experience: String,
  expectedSalary: String,
  lastOrganization: String,
  lastSalary: String,
  address: String,
  resume: String,
  photo: String,
  coverLetter: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

// ── Student Zone ───────────────────────────────────────────
const studentZoneSchema = new mongoose.Schema({
  title: String,
  type: String,
  category: String,
  date: String,
  fileUrl: String,
  description: String,
}, { timestamps: true });

// ── Settings ───────────────────────────────────────────────
const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

// ── Job Opening ────────────────────────────────────────────
const jobOpeningSchema = new mongoose.Schema({
  title: String,
  category: String,
  tag: String,
  dept: String,
  location: String,
  experience: String,
  type: String,
  posted: String,
  color: String,
  description: String,
}, { timestamps: true });

// ── Admin Auth ─────────────────────────────────────────────
const adminAuthSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
}, { timestamps: true });

// ── Student Application ────────────────────────────────────
const studentApplicationSchema = new mongoose.Schema({
  // Personal Info
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  // Parents Info
  fatherName: String,
  fatherPhone: String,
  motherName: String,
  motherPhone: String,
  // Education
  class10School: String,
  class10Board: String,
  class10Year: String,
  class10Percent: String,
  class10Marksheet: String, // Cloudinary URL
  class12School: String,
  class12Board: String,
  class12Year: String,
  class12Percent: String,
  class12Stream: String,
  class12Marksheet: String, // Cloudinary URL
  // Course
  desiredCourse: String,
  desiredInstitution: String,
  // Status
  applicationId: String,
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Pending' },
  paymentAmount: String,
}, { timestamps: true });

// Export models (prevent re-compilation in Next.js hot reload)
export const Placement = mongoose.models.Placement || mongoose.model('Placement', placementSchema);
export const Happening = mongoose.models.Happening || mongoose.model('Happening', happeningSchema);
export const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
export const FacultyData = mongoose.models.FacultyData || mongoose.model('FacultyData', facultySchema);
export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
export const Institution = mongoose.models.Institution || mongoose.model('Institution', institutionSchema);
export const Research = mongoose.models.Research || mongoose.model('Research', researchSchema);
export const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export const StudentZone = mongoose.models.StudentZone || mongoose.model('StudentZone', studentZoneSchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
export const AdminAuth = mongoose.models.AdminAuth || mongoose.model('AdminAuth', adminAuthSchema);
export const StudentApplication = mongoose.models.StudentApplication || mongoose.model('StudentApplication', studentApplicationSchema);
export const JobOpening = mongoose.models.JobOpening || mongoose.model('JobOpening', jobOpeningSchema);
