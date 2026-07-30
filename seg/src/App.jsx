import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import NoPaperPopup from './components/NoPaperPopup'

const Home = lazy(() => import('./pages/Home'))
const HistoryOfSeg = lazy(() => import('./pages/HistoryOfSeg'))
const ChairmansMessage = lazy(() => import('./pages/ChairmansMessage'))
const MissionVision = lazy(() => import('./pages/MissionVision'))
const WhyJoinSeg = lazy(() => import('./pages/WhyJoinSeg'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const AdmissionProcess = lazy(() => import('./pages/AdmissionProcess'))
const EligibilityCriteria = lazy(() => import('./pages/EligibilityCriteria'))
const PlacementsPage = lazy(() => import('./pages/PlacementsPage'))
const ExploreMore = lazy(() => import('./pages/ExploreMore'))
const FeeStructure = lazy(() => import('./pages/FeeStructure'))
const ManagementQuota = lazy(() => import('./pages/ManagementQuota'))
const ResearchProjects = lazy(() => import('./pages/ResearchProjects'))
const TechnologiesDeveloped = lazy(() => import('./pages/TechnologiesDeveloped'))
const AwardWinningProjects = lazy(() => import('./pages/AwardWinningProjects'))
const ResearchPublications = lazy(() => import('./pages/ResearchPublications'))
const FacultyPage = lazy(() => import('./pages/FacultyPage'))
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'))
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage'))
const PayFeePage = lazy(() => import('./pages/PayFeePage'))
const StudentNoticePage = lazy(() => import('./pages/StudentNoticePage'))
const FacultyNewPage = lazy(() => import('./pages/FacultyNewPage'))
const FacultyProfilePage = lazy(() => import('./pages/FacultyProfilePage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const JobApplicationPage = lazy(() => import('./pages/JobApplicationPage'))
const InstitutionsPage = lazy(() => import('./pages/InstitutionsPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'))

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AdminRedirect() {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/login';
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history-of-seg" element={<HistoryOfSeg />} />
        <Route path="/chairmans-message" element={<ChairmansMessage />} />
        <Route path="/mission-vision" element={<MissionVision />} />
        <Route path="/why-join-seg" element={<WhyJoinSeg />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        <Route path="/admission-process" element={<AdmissionProcess />} />
        <Route path="/eligibility-criteria" element={<EligibilityCriteria />} />
        <Route path="/explore-more" element={<ExploreMore />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/management-quota" element={<ManagementQuota />} />
        <Route path="/rd-projects" element={<ResearchProjects />} />
        <Route path="/technologies-developed" element={<TechnologiesDeveloped />} />
        <Route path="/award-winning-projects" element={<AwardWinningProjects />} />
        <Route path="/research-publications" element={<ResearchPublications />} />
        <Route path="/all-programs" element={<FacultyPage />} />
        <Route path="/faculty-new" element={<FacultyNewPage />} />
        <Route path="/faculty/:id" element={<FacultyProfilePage />} />
        <Route path="/pay-fee" element={<PayFeePage />} />
        <Route path="/student-notice" element={<StudentNoticePage />} />
        <Route path="/institutions" element={<InstitutionsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/apply" element={<JobApplicationPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/admin/*" element={<AdminRedirect />} />
      </Routes>
      </Suspense>
      <Footer />
      <Chatbot />
      <NoPaperPopup />
    </Router>
  )
}

export default App
