import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Programs from '../components/Programs'
import ProgramsSpotlight from '../components/ProgramsSpotlight'
import PlacementsShowcase from '../components/PlacementsShowcase'
import FacultyShowcase from '../components/FacultyShowcase'
import FullSections from '../components/FullSections'
import HappeningsShowcase from '../components/HappeningsShowcase'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <Programs />
      <ProgramsSpotlight />
      <PlacementsShowcase />
      <FacultyShowcase />
      <FullSections />
      <HappeningsShowcase />
    </main>
  )
}
