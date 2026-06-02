import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import HistoryOfSeg from './pages/HistoryOfSeg'
import ChairmansMessage from './pages/ChairmansMessage'
import MissionVision from './pages/MissionVision'
import WhyJoinSeg from './pages/WhyJoinSeg'
import ContactUs from './pages/ContactUs'
import AdmissionProcess from './pages/AdmissionProcess'
import EligibilityCriteria from './pages/EligibilityCriteria'
import PlacementsPage from './pages/PlacementsPage'
import ExploreMore from './pages/ExploreMore'
import FeeStructure from './pages/FeeStructure'
import ManagementQuota from './pages/ManagementQuota'
import ResearchProjects from './pages/ResearchProjects'
import TechnologiesDeveloped from './pages/TechnologiesDeveloped'
import AwardWinningProjects from './pages/AwardWinningProjects'
import ResearchPublications from './pages/ResearchPublications'
import FacultyPage from './pages/FacultyPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import PayFeePage from './pages/PayFeePage'
import StudentNoticePage from './pages/StudentNoticePage'
import FacultyNewPage from './pages/FacultyNewPage'
import FacultyProfilePage from './pages/FacultyProfilePage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import JobApplicationPage from './pages/JobApplicationPage'
import InstitutionsPage from './pages/InstitutionsPage'
import CareersPage from './pages/CareersPage'
import EventDetailPage from './pages/EventDetailPage'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function EnquireNowFloating() {
  return (
    <a href="/contact-us" className="enquire-now-btn">
      Enquire Now!
    </a>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <TopBar />
      <Navbar />
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
      </Routes>
      <Footer />
      <Chatbot />
      <EnquireNowFloating />
    </Router>
  )
}

export default App
