import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.png';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const GraduationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 4L20 8.5L12 13L4 8.5L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M7 10.5V14.5C7 15.6 9.2 17.3 12 17.3C14.8 17.3 17 15.6 17 14.5V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);
const LabIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M10 3H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M10.5 3V8L5.7 16.1C4.9 17.5 5.9 19.2 7.5 19.2H16.5C18.1 19.2 19.1 17.5 18.3 16.1L13.5 8V3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);
const IndustryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 20V8L10 5V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M10 9L19 6V20H10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);
const SpecIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const CareerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M8 7V5.5C8 4.1 9.1 3 10.5 3H13.5C14.9 3 16 4.1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="3.5" y="7" width="17" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" /></svg>
);

const highlightIcons = [<GraduationIcon />, <LabIcon />, <IndustryIcon />, <SpecIcon />];
const highlightColors = ['#1f63db', '#6cbf46', '#ff8b1a', '#9a43f0'];

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        const imageMap = { program1, program2, program3, program4 };
        const found = data.find(p => p.slug === slug);
        
        if (found) {
          setProgram({
            ...found,
            title: found.name,
            subtitle: found.subtitle || `(${found.level})`,
            image: imageMap[found.image] || program1,
            color: found.color || '#1f63db',
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load program:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pdp-notfound" style={{ padding: '100px', textAlign: 'center', color: '#1041c6', fontSize: '1.2rem', fontWeight: '600' }}>
        Loading program details...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pdp-notfound" style={{ padding: '100px', textAlign: 'center' }}>
        <h2 style={{ color: '#162341', marginBottom: '20px' }}>Program not found</h2>
        <button onClick={() => navigate('/programs')} style={{ padding: '12px 28px', background: '#1041c6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
          Back to Programs
        </button>
      </div>
    );
  }

  return (
    <div className="pdp">
      <style>{`
        .pdp { background: #fff; min-height: 100vh; }
        .pdp-notfound { padding: 80px 45px; text-align: center; }
        .pdp-notfound h2 { color: #162341; margin-bottom: 20px; }
        .pdp-notfound button { padding: 12px 28px; background: #1041c6; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; }

        /* Hero */
        .pdp-hero { background: linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%); padding: 60px 45px 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .pdp-hero__label { font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
        .pdp-hero__title { font-size: 2.8rem; font-weight: 700; color: #162341; line-height: 1.15; margin-bottom: 8px; }
        .pdp-hero__subtitle { font-size: 2rem; font-weight: 700; margin-bottom: 20px; }
        .pdp-hero__desc { font-size: 1rem; color: #5f6785; line-height: 1.8; max-width: 480px; margin-bottom: 32px; }
        .pdp-hero__btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .pdp-hero__btn-primary { padding: 14px 32px; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .pdp-hero__btn-outline { padding: 14px 32px; background: transparent; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
        .pdp-hero__img { border-radius: 18px; overflow: hidden; box-shadow: 0 20px 50px rgba(20,35,90,0.15); height: 320px; }
        .pdp-hero__img img { width: 100%; height: 100%; object-fit: cover; }

        /* Highlights */
        .pdp-highlights { padding: 50px 45px; background: #fff; }
        .pdp-highlights__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1350px; margin: 0 auto; }
        .pdp-highlight-card { padding: 28px 22px; border-radius: 14px; background: #f8faff; text-align: center; }
        .pdp-highlight-card__icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .pdp-highlight-card h3 { font-size: 16px; font-weight: 700; color: #162341; margin-bottom: 8px; }
        .pdp-highlight-card p { font-size: 13px; color: #5f6785; line-height: 1.6; }
        .pdp-highlight-card__bar { width: 36px; height: 3px; border-radius: 999px; margin: 14px auto 0; }

        /* Specializations */
        .pdp-spec { padding: 50px 45px; background: linear-gradient(135deg, #0a275d 0%, #1041c6 100%); }
        .pdp-spec__inner { max-width: 1350px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr; gap: 50px; align-items: center; }
        .pdp-spec__label { color: #ffbe23; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
        .pdp-spec__title { font-size: 2rem; font-weight: 700; color: #fff; line-height: 1.3; margin-bottom: 16px; }
        .pdp-spec__bar { width: 40px; height: 3px; background: #ffbe23; border-radius: 999px; margin-bottom: 16px; }
        .pdp-spec__desc { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.7; }
        .pdp-spec__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pdp-spec-item { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px 22px; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: flex-start; gap: 14px; cursor: pointer; transition: background 0.2s; }
        .pdp-spec-item:hover { background: rgba(255,255,255,0.15); }
        .pdp-spec-item__icon { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: #ffbe23; flex-shrink: 0; }
        .pdp-spec-item h4 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .pdp-spec-item p { font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.5; }

        /* Why Choose */
        .pdp-why { padding: 60px 45px; background: #f8faff; }
        .pdp-why__inner { max-width: 1350px; margin: 0 auto; }
        .pdp-why__title { font-size: 2rem; font-weight: 700; color: #162341; text-align: center; margin-bottom: 8px; }
        .pdp-why__bar { width: 50px; height: 3px; background: #ffbe23; border-radius: 999px; margin: 0 auto 40px; }
        .pdp-why__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .pdp-why-card { background: #fff; border-radius: 14px; padding: 28px 22px; text-align: center; box-shadow: 0 4px 16px rgba(20,35,90,0.06); }
        .pdp-why-card__icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .pdp-why-card h3 { font-size: 15px; font-weight: 700; color: #162341; margin-bottom: 10px; }
        .pdp-why-card p { font-size: 13px; color: #5f6785; line-height: 1.65; }
        .pdp-why-card__bar { width: 30px; height: 3px; border-radius: 999px; margin: 14px auto 0; }

        /* Careers */
        .pdp-careers { padding: 60px 45px; background: #fff; }
        .pdp-careers__inner { max-width: 1350px; margin: 0 auto; }
        .pdp-careers__title { font-size: 2rem; font-weight: 700; color: #162341; text-align: center; margin-bottom: 8px; }
        .pdp-careers__bar { width: 50px; height: 3px; background: #ffbe23; border-radius: 999px; margin: 0 auto 40px; }
        .pdp-careers__grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; }
        .pdp-career-item { display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 120px; }
        .pdp-career-item__icon { width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .pdp-career-item span { font-size: 13px; font-weight: 600; color: #162341; text-align: center; }

        /* CTA */
        .pdp-cta { margin: 0 45px 60px; border-radius: 20px; background: linear-gradient(135deg, #0a275d 0%, #1041c6 100%); padding: 50px 60px; display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center; }
        .pdp-cta h2 { font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
        .pdp-cta__bar { width: 40px; height: 3px; background: #ffbe23; border-radius: 999px; margin-bottom: 14px; }
        .pdp-cta p { font-size: 15px; color: rgba(255,255,255,0.82); line-height: 1.7; max-width: 500px; }
        .pdp-cta__btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .pdp-cta__btn-white { padding: 14px 32px; background: #fff; color: #1041c6; border: none; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .pdp-cta__btn-outline { padding: 14px 32px; background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.5); border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1023px) {
          .pdp-hero { grid-template-columns: 1fr; padding: 50px 20px 40px; }
          .pdp-hero__img { height: 260px; }
          .pdp-highlights { padding: 40px 20px; }
          .pdp-highlights__grid { grid-template-columns: repeat(2, 1fr); }
          .pdp-spec { padding: 40px 20px; }
          .pdp-spec__inner { grid-template-columns: 1fr; gap: 28px; }
          .pdp-why { padding: 40px 20px; }
          .pdp-why__grid { grid-template-columns: repeat(2, 1fr); }
          .pdp-careers { padding: 40px 20px; }
          .pdp-cta { margin: 0 20px 40px; padding: 36px 28px; grid-template-columns: 1fr; }
        }

        @media (max-width: 767px) {
          .pdp-hero { padding: 36px 16px 30px; gap: 24px; }
          .pdp-hero__title { font-size: 1.8rem; }
          .pdp-hero__subtitle { font-size: 1.4rem; }
          .pdp-hero__img { height: 200px; }
          .pdp-hero__btns { flex-direction: column; }
          .pdp-hero__btn-primary, .pdp-hero__btn-outline { width: 100%; justify-content: center; }
          .pdp-highlights { padding: 28px 16px; }
          .pdp-highlights__grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pdp-highlight-card { padding: 18px 14px; }
          .pdp-spec { padding: 28px 16px; }
          .pdp-spec__grid { grid-template-columns: 1fr; }
          .pdp-spec__title { font-size: 1.5rem; }
          .pdp-why { padding: 28px 16px; }
          .pdp-why__grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pdp-why__title { font-size: 1.5rem; }
          .pdp-why-card { padding: 18px 14px; }
          .pdp-careers { padding: 28px 16px; }
          .pdp-careers__title { font-size: 1.5rem; }
          .pdp-cta { margin: 0 14px 30px; padding: 28px 18px; border-radius: 14px; }
          .pdp-cta h2 { font-size: 1.5rem; }
          .pdp-cta__btns { flex-direction: column; }
          .pdp-cta__btn-white, .pdp-cta__btn-outline { width: 100%; justify-content: center; }
        }

        @media (max-width: 480px) {
          .pdp-highlights__grid { grid-template-columns: 1fr; }
          .pdp-why__grid { grid-template-columns: 1fr; }
          .pdp-hero__title { font-size: 1.6rem; }
          .pdp-hero__subtitle { font-size: 1.2rem; }
        }

        @media (max-width: 375px) {
          .pdp-hero { padding: 28px 12px 24px; }
          .pdp-hero__title { font-size: 1.4rem; }
          .pdp-hero__subtitle { font-size: 1.1rem; }
          .pdp-hero__desc { font-size: 0.9rem; }
          .pdp-highlights { padding: 22px 12px; }
          .pdp-spec { padding: 22px 12px; }
          .pdp-why { padding: 22px 12px; }
          .pdp-careers { padding: 22px 12px; }
          .pdp-cta { margin: 0 12px 24px; padding: 22px 14px; }
        }
      `}</style>

      {/* Hero */}
      <div className="pdp-hero">
        <div>
          <p className="pdp-hero__label" style={{ color: program.color }}>{program.label}</p>
          <h1 className="pdp-hero__title">{program.title}</h1>
          <h2 className="pdp-hero__subtitle" style={{ color: program.color }}>{program.subtitle}</h2>
          <p className="pdp-hero__desc">{program.description}</p>
          <div className="pdp-hero__btns">
            <button className="pdp-hero__btn-primary" style={{ background: program.color }}>
              Apply Now <ArrowRight />
            </button>
            <button className="pdp-hero__btn-outline" style={{ color: program.color, border: `2px solid ${program.color}` }}>
              Download Brochure
            </button>
          </div>
        </div>
        <div className="pdp-hero__img">
          <img src={program.image} alt={program.title} />
        </div>
      </div>

      {/* Highlights */}
      {program.highlights && program.highlights.length > 0 && (
        <div className="pdp-highlights">
          <div className="pdp-highlights__grid">
            {program.highlights.map((h, i) => (
              <div key={h.title} className="pdp-highlight-card" style={{ border: `1px solid ${highlightColors[i % 4]}22` }}>
                <div className="pdp-highlight-card__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                  {highlightIcons[i % 4]}
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                <div className="pdp-highlight-card__bar" style={{ background: highlightColors[i % 4] }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specializations */}
      {program.specializations && program.specializations.length > 0 && (
        <div className="pdp-spec">
          <div className="pdp-spec__inner">
            <div>
              <p className="pdp-spec__label">Specializations</p>
              <h2 className="pdp-spec__title">Explore Our Specializations</h2>
              <div className="pdp-spec__bar" />
              <p className="pdp-spec__desc">Tailor your expertise with our industry-aligned specializations</p>
            </div>
            <div className="pdp-spec__grid">
              {program.specializations.map((spec) => (
                <div key={spec.name} className="pdp-spec-item">
                  <div className="pdp-spec-item__icon"><SpecIcon /></div>
                  <div style={{ flex: 1 }}>
                    <h4>{spec.name}</h4>
                    <p>{spec.desc}</p>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}><ArrowRight /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Why Choose */}
      {program.whyChoose && program.whyChoose.length > 0 && (
        <div className="pdp-why">
          <div className="pdp-why__inner">
            <h2 className="pdp-why__title">
              Why Choose <span style={{ color: program.color }}>SEG</span> for {program.subtitle}?
            </h2>
            <div className="pdp-why__bar" />
            <div className="pdp-why__grid">
              {program.whyChoose.map((item, i) => (
                <div key={item.title} className="pdp-why-card">
                  <div className="pdp-why-card__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                    <CheckIcon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="pdp-why-card__bar" style={{ background: highlightColors[i % 4] }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Career Paths */}
      {program.careers && program.careers.length > 0 && (
        <div className="pdp-careers">
          <div className="pdp-careers__inner">
            <h2 className="pdp-careers__title">
              Your Future <span style={{ color: program.color }}>Career</span> Paths
            </h2>
            <div className="pdp-careers__bar" />
            <div className="pdp-careers__grid">
              {program.careers.map((career, i) => (
                <div key={career} className="pdp-career-item">
                  <div className="pdp-career-item__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                    <CareerIcon />
                  </div>
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pdp-cta">
        <div>
          <h2>Ready to Transform Your Career?</h2>
          <div className="pdp-cta__bar" />
          <p>Join our {program.subtitle} program and become part of the next generation of leaders.</p>
        </div>
        <div className="pdp-cta__btns">
          <button className="pdp-cta__btn-white">Apply Now <ArrowRight /></button>
          <button className="pdp-cta__btn-outline">Contact Admissions</button>
        </div>
      </div>

    </div>
  );
}
