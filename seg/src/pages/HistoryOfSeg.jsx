import HistoryHero from '../components/history/HistoryHero'
import HistoryTimeline from '../components/history/HistoryTimeline'
import '../history.css'

export default function HistoryOfSeg() {
  return (
    <main className="history-page">
      <HistoryHero />
      <HistoryTimeline />
    </main>
  )
}
