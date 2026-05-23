import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.png';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';
import programsHero from '../assets/images/programs-page image.jpeg';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        const imageMap = { program1, program2, program3, program4 };
        const mapped = data.map(p => ({
          ...p,
          title: p.name,
          subtitle: p.subtitle || `(${p.level})`,
          image: p.customImage && p.customImage.trim() !== '' ? p.customImage : (imageMap[p.image] || program1),
          color: p.color || '#1f63db',
          duration: p.duration,
          seats: `${p.seats} Seats`
        }));
        setPrograms(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch programs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#f5f8fe', minHeight: '100vh', paddingBottom: '60px' }}>

      <div style={{ position: 'relative', overflow: 'hidden', padding: '60px 45px 50px', minHeight: '280px' }}>
        <img src={programsHero} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0, display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,39,93,0.92) 0%, rgba(16,65,198,0.85) 100%)', zIndex: 1 }} />
        <p style={{ position: 'relative', zIndex: 2, color: '#ffbe23', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Our Programs</p>
        <h1 style={{ position: 'relative', zIndex: 2, fontSize: '2.8rem', fontWeight: 700, color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>
          Programs Designed for a <span style={{ color: '#ffbe23' }}>Successful Future</span>
        </h1>
        <p style={{ position: 'relative', zIndex: 2, fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', maxWidth: '520px', lineHeight: 1.7 }}>
          Discover a wide range of programs designed to build your skills, expand your knowledge, and shape your future.
        </p>
      </div>

      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '44px 45px 0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#1041c6', fontSize: '1.2rem', fontWeight: '600' }}>
            Loading live programs...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '28px' }}>
            {programs.map((program) => (
              <div
                key={program.slug}
                onClick={() => navigate(`/programs/${program.slug}`)}
                style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(20,35,90,0.08)', borderTop: `4px solid ${program.color}`, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(20,35,90,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(20,35,90,0.08)'; }}
              >
                <div style={{ height: '190px', overflow: 'hidden' }}>
                  <img src={program.image} alt={program.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '22px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: program.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{program.label}</p>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#162341', marginBottom: '4px' }}>{program.title}</h3>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: program.color, marginBottom: '10px' }}>{program.subtitle}</p>
                  <div style={{ width: '36px', height: '3px', background: program.color, borderRadius: '999px', marginBottom: '12px' }} />
                  <p style={{ fontSize: '14px', color: '#5f6785', lineHeight: 1.7, marginBottom: '18px' }}>{program.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f0f4ff' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontSize: '13px', color: '#8a9bbf' }}>⏱ {program.duration}</span>
                      <span style={{ fontSize: '13px', color: '#8a9bbf' }}>🎓 {program.seats}</span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: program.color }}>
                      Explore <ArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
