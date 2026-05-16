import ChairmanHero from '../components/chairman/ChairmanHero'
import ChairmanLetter from '../components/chairman/ChairmanLetter'
import '../chairman.css'

export default function ChairmansMessage() {
  return (
    <main className="chairman-page">
      <ChairmanHero />
      <ChairmanLetter />
    </main>
  )
}
