import { useState, useEffect } from 'react'
import './InstitutionsPage.css'
import program1 from '../assets/images/program1.png'
import program2 from '../assets/images/program2.png'
import program3 from '../assets/images/program3.png'
import program4 from '../assets/images/program4.png'

const imageMap = { program1, program2, program3, program4 }



const sidebarItems = [
  { label: "What's Happening", icon: "🌐", active: true },
  { label: "Event Calendar", icon: "📅" },
  { label: "Upcoming Events", icon: "🔭" },
  { label: "Announcements", icon: "📢" },
  { label: "News", icon: "🗞️" },
  { label: "Media Coverage", icon: "📸" },
  { label: "FM Radio: Suno Saroj 90.8 FM", icon: "📻" },
  { label: "Testimonials", icon: "💬" },
  { label: "What's Happening", icon: "📅" },
  { label: "Contact Us", icon: "📕" },
  { label: "Image Gallery", icon: "🖼️" },
]

export default function InstitutionsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [institutions, setInstitutions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/institutions')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(inst => ({
          ...inst,
          image: imageMap[inst.image] || imageMap.program1
        }))
        setInstitutions(mapped)
        setLoading(false)
      })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const filteredInstitutions = activeFilter === 'All'
    ? institutions
    : institutions.filter(inst => inst.category === activeFilter)

  return (
    <div className="institutions-page">
      <div className="institutions-container">

        {/* Sidebar */}
        <aside className="institutions-sidebar">
          <nav className="sidebar-menu">
            {sidebarItems.map((item, idx) => (
              <a key={idx} href="#" className={`sidebar-item ${item.active ? 'active' : ''}`}>
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="sidebar-promo">
            <h4>Share Your News</h4>
            <p>Have an event or achievement to share? Let us know!</p>
            <a href="#" className="sidebar-promo-btn">Submit News →</a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="institutions-main">

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

          {/* Filter Bar */}
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
              <input type="text" placeholder="Search news..." className="search-input" />
              <select className="sort-select">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
              </select>
            </div>
          </div>

          {/* News Grid */}
          <div className="news-grid">
            {filteredInstitutions.map((inst, idx) => (
              <article className="news-card" key={idx}>
                <div className="news-card__media">
                  <img src={inst.image} alt={inst.title} className="news-card__image" />
                  <div className="news-card__date">
                    <strong>{inst.date.day}</strong>
                    <span>{inst.date.month}</span>
                    <span>{inst.date.year}</span>
                  </div>
                </div>
                <div className="news-card__body">
                  <span className="news-card__tag">{inst.tag}</span>
                  <h3 className="news-card__title">{inst.title}</h3>
                  <p className="news-card__text">{inst.description}</p>
                  <a href={inst.url} target="_blank" rel="noopener noreferrer" className="news-card__link">
                    Read More <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}


