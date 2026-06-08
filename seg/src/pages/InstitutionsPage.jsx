import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import './InstitutionsPage.css'
import program1 from '../assets/images/program1.png'
import program2 from '../assets/images/program2.png'
import program3 from '../assets/images/program3.png'
import program4 from '../assets/images/program4.png'
import program5 from '../assets/images/programsimg.jpeg'
import program6 from '../assets/images/seg.jpeg'

const institutions = [
  {
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007', tag: 'ENGINEERING',
    date: { day: '12', month: 'MAY', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Engineering, management and computer applications programs with strong industry tie-ups and research focus.',
    url: 'https://ssitm.in/', image: program1, category: 'Engineering',
  },
  {
    title: 'Saroj Institute of Technology and Management',
    code: '123', tag: 'ENGINEERING',
    date: { day: '29', month: 'APR', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Modern campus offering B.Tech, BBA, BCA and more with a focus on practical learning and innovation.',
    url: 'https://sitmlko.org/', image: program2, category: 'Engineering',
  },
  {
    title: 'Lucknow Institute of Pharmacy',
    code: 'LIP', tag: 'PHARMACY',
    date: { day: '28', month: 'APR', year: '2026' },
    approval: 'Approved by Pharmacy Council of India (PCI) and affiliated to AKTU.',
    description: 'Premier pharmacy education with advanced laboratories and professional training for healthcare excellence.',
    url: 'https://seglko.org/lip/', image: program3, category: 'Pharmacy',
  },
  {
    title: 'Saroj College of Pharmacy',
    code: '2031', tag: 'PHARMACY',
    date: { day: '17', month: 'APR', year: '2026' },
    approval: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow.',
    description: 'B.Pharm and D.Pharm programs designed for strong clinical exposure and cutting-edge pharmaceutical research.',
    url: 'https://seglko.org/scp/', image: program4, category: 'Pharmacy',
  },
  {
    title: 'Saroj College of Engineering and Polytechnic',
    code: 'SCEP', tag: 'POLYTECHNIC',
    date: { day: '17', month: 'APR', year: '2026' },
    approval: 'Approved by AICTE and affiliated to AKTU.',
    description: 'Integrated engineering and diploma programs with world-class infrastructure and industry-standard labs.',
    url: 'https://seglko.org/scep/', image: program5, category: 'Polytechnic',
  },
  {
    title: 'Saroj College of Law',
    code: 'SCL', tag: 'LAW',
    date: { day: '10', month: 'APR', year: '2026' },
    approval: 'Affiliated to Lucknow University.',
    description: 'Comprehensive law programs focusing on advocacy, legal ethics, and practical courtroom skills for future leaders.',
    url: 'https://seglko.org/scl/', image: program6, category: 'Law',
  },
]

const sidebarItems = [
  { label: "What's Happening", icon: '🌐', tab: 'whats_happening' },
  { label: 'Upcoming Events',  icon: '🔭', tab: 'upcoming_event' },
  { label: 'Announcements',    icon: '📢', tab: 'announcement' },
  { label: 'Contact Us',       icon: '📕', route: '/contact-us' },
  { label: 'Image Gallery',    icon: '🖼️', route: '/explore-more' },
]

function parseDate(date) {
  if (!date) return { day: '', month: '', year: '' }
  if (typeof date === 'object') return { day: date.day, month: date.month, year: date.year }
  const d = new Date(date)
  if (isNaN(d.getTime())) return { day: '', month: '', year: '' }
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
    year: String(d.getFullYear()),
  }
}

function NewsCard({ item, fallbackImg, tagLabel }) {
  const { day, month, year } = parseDate(item.date)
  const tag = tagLabel || item.tag || item.category?.toUpperCase() || 'NEWS'
  const imageUrl = item.image || fallbackImg
  const url = item.url || '#'
  return (
    <article className="news-card">
      <div className="news-card__media">
        <img src={imageUrl} alt={item.title} className="news-card__image" />
        {(day || month || year) && (
          <div className="news-card__date">
            {day && <strong>{day}</strong>}
            {month && <span>{month}</span>}
            {year && <span>{year}</span>}
          </div>
        )}
      </div>
      <div className="news-card__body">
        <span className="news-card__tag">{tag}</span>
        <h3 className="news-card__title">{item.title}</h3>
        <p className="news-card__text">{item.description}</p>
        {url !== '#' && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__link">
            Read More <span>→</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function InstitutionsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('whats_happening')
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [happenings, setHappenings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHappenings = async () => {
      try {
        const res = await fetch(api('/api/happenings'))
        if (res.ok) {
          const data = await res.json()
          setHappenings(data)
        }
      } catch (err) {
        console.error('Error fetching happenings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchHappenings()
  }, [])

  const whFromAPI = happenings.filter(h => h.type === 'whats_happening')
  const displayItems = whFromAPI.length > 0 ? whFromAPI : institutions
  const tabItems = happenings.filter(h => h.type === activeTab)

  let filteredItems = displayItems.filter(item => {
    if (activeFilter === 'All') return true
    const cat = item.category || item.tag
    return cat?.toLowerCase() === activeFilter.toLowerCase()
  })

  if (searchTerm.trim()) {
    const query = searchTerm.toLowerCase()
    filteredItems = filteredItems.filter(item =>
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    )
  }

  filteredItems.sort((a, b) => {
    const dateA = a.date && typeof a.date === 'string' ? new Date(a.date) : new Date(`${a.date?.year}-${a.date?.month}-01`)
    const dateB = b.date && typeof b.date === 'string' ? new Date(b.date) : new Date(`${b.date?.year}-${b.date?.month}-01`)
    return sortBy === 'Newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="institutions-page">
      <div className="institutions-container">

        {/* Sidebar */}
        <aside className="institutions-sidebar">
          <nav className="sidebar-menu">
            {sidebarItems.map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`sidebar-item${activeTab === item.tab ? ' active' : ''}`}
                onClick={e => {
                  e.preventDefault()
                  if (item.route) { navigate(item.route); return }
                  setActiveTab(item.tab)
                }}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="institutions-main">

          {/* Upcoming Events */}
          {activeTab === 'upcoming_event' && (
            <>
              <header className="content-header">
                <div className="header-text">
                  <h1>🔭 Upcoming Events</h1>
                  <p>Stay ahead with all upcoming events, workshops, seminars and activities across Saroj Educational Group campuses.</p>
                </div>
              </header>
              {loading ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Loading...</p>
              ) : tabItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔭</div>
                  <p style={{ fontSize: '16px', fontWeight: 600 }}>No upcoming events added yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Check back soon for new events.</p>
                </div>
              ) : (
                <div className="news-grid">
                  {tabItems.map((item, idx) => (
                    <NewsCard key={item._id || idx} item={item} fallbackImg={program5} tagLabel="UPCOMING EVENT" />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Announcements */}
          {activeTab === 'announcement' && (
            <>
              <header className="content-header">
                <div className="header-text">
                  <h1>📢 Announcements</h1>
                  <p>Important notices, circulars and official announcements from Saroj Educational Group.</p>
                </div>
              </header>
              {loading ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>Loading...</p>
              ) : tabItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📢</div>
                  <p style={{ fontSize: '16px', fontWeight: 600 }}>No announcements yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Check back soon.</p>
                </div>
              ) : (
                <div className="news-grid">
                  {tabItems.map((item, idx) => (
                    <NewsCard key={item._id || idx} item={item} fallbackImg={program5} tagLabel="ANNOUNCEMENT" />
                  ))}
                </div>
              )}
            </>
          )}

          {/* What's Happening */}
          {activeTab === 'whats_happening' && (
            <>
              <header className="content-header">
                <div className="header-text">
                  <h1>What&apos;s Happening in Saroj</h1>
                  <p>Stay informed about the latest events, achievements, workshops, innovations, campus stories and student activities across Saroj Educational Group.</p>
                </div>
                <div className="subscribe-box">
                  <div style={{ flexGrow: 1 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Subscribe to our newsletter</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>Get the latest updates delivered to your inbox.</p>
                  </div>
                  <input type="email" placeholder="Enter your email" className="subscribe-input" />
                  <button className="subscribe-btn">Subscribe</button>
                </div>
              </header>

              <div className="filter-bar">
                <div className="filter-tabs">
                  {['All', 'Engineering', 'Pharmacy', 'Law', 'Polytechnic'].map(tab => (
                    <button
                      key={tab}
                      className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
                      onClick={() => setActiveFilter(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="filter-controls">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Newest">Sort by: Newest</option>
                    <option value="Oldest">Sort by: Oldest</option>
                  </select>
                </div>
              </div>

              <div className="news-grid">
                {filteredItems.map((item, idx) => (
                  <NewsCard key={item._id || idx} item={item} fallbackImg={program5} />
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  )
}
