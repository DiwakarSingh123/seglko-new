import { useParams } from 'react-router-dom';
import { programsData } from '../data/programsData';
import programsHero from '../assets/images/programs-page image.jpeg';

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
const programColors = {
  mtech: '#1041c6',
  bba: '#1041c6',
  mba: '#1041c6',
  bca: '#1041c6',
  mca: '#1041c6',
  bpharm: '#1041c6',
  diploma: '#1041c6',
};

const splitProgramTitle = (title) => {
  if (!title) return { title: '', subtitle: '' };

  if (title.includes('\n')) {
    const [mainTitle, ...rest] = title.split('\n');
    return {
      title: mainTitle.trim(),
      subtitle: rest.join(' ').trim(),
    };
  }

  const match = title.match(/^(.*?)\s*(\([^)]*\))\s*$/);
  if (match) {
    return {
      title: match[1].trim(),
      subtitle: match[2].trim(),
    };
  }

  return { title: title.trim(), subtitle: '' };
};

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const normalizedSlug = slug && programsData[slug] ? slug : 'mtech';
  const program = programsData[normalizedSlug];
  const { title: programTitle, subtitle: programSubtitle } = splitProgramTitle(program.hero.title);
  const programColor = programColors[normalizedSlug] || '#1041c6';

  return (
    <div className="pdp">
      <style>{`
        .pdp {
          --pdp-color: ${programColor};
        }

        .pdp { background: #fff; min-height: 100vh; }
        .pdp, .pdp * { box-sizing: border-box; }
        .pdp button { font-family: inherit; }

        /* Hero */
        .pdp-hero { position: relative; min-height: 570px; padding: 118px 45px 70px; display: flex; align-items: center; overflow: hidden; background: #f5f8ff; }
        .pdp-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.68) 50%, rgba(255,255,255,0) 60%); z-index: 1; pointer-events: none; }
        .pdp-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .pdp-hero__bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .pdp-hero__content { position: relative; z-index: 3; width: min(620px, 48%); min-width: 0; }
        .pdp-hero__label { font-weight: 800; font-size: 13px; letter-spacing: 0.26em; text-transform: uppercase; margin-bottom: 24px; color: var(--pdp-color); }
        .pdp-hero__title { font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 800; color: #162341; line-height: 1.08; margin-bottom: 6px; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pdp-hero__subtitle { font-size: clamp(1.4rem, 2.2vw, 2rem); font-weight: 800; margin-bottom: 28px; color: #1041c6; }
        .pdp-hero__desc { font-size: 1.18rem; color: #4f5f86; line-height: 1.8; max-width: 600px; margin-bottom: 38px; }
        .pdp-hero__title, .pdp-hero__subtitle, .pdp-hero__desc, .pdp-highlight-card h3, .pdp-why-card h3, .pdp-spec-item h4 { overflow-wrap: anywhere; }
        .pdp-hero__btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .pdp-hero__btn-primary { padding: 17px 36px; color: #fff; border: none; border-radius: 7px; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 10px; background: var(--pdp-color); }
        .pdp-hero__btn-outline { padding: 15px 36px; background: #fff; border-radius: 7px; font-size: 16px; font-weight: 800; cursor: pointer; color: var(--pdp-color); border: 2px solid var(--pdp-color); }

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
          .pdp-hero { min-height: 520px; padding: 90px 24px 60px; }
          .pdp-hero::before { background: linear-gradient(100deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 54%, rgba(255,255,255,0.28) 78%, rgba(255,255,255,0) 100%); }
          .pdp-hero::after { display: none; }
          .pdp-hero__bg { inset: 0; }
          .pdp-hero__content { width: min(560px, 62%); }
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
          .pdp-hero { min-height: auto; padding: 48px 16px 0; flex-direction: column; align-items: stretch; gap: 28px; }
          .pdp-hero::before { inset: 0 0 auto 0; height: 64%; background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 72%, rgba(255,255,255,0) 100%); }
          .pdp-hero__bg { position: relative; inset: auto; height: 230px; margin: 0 -16px; order: 2; width: calc(100% + 32px); }
          .pdp-hero__bg img { object-position: center; }
          .pdp-hero__content { width: 100%; max-width: none; }
          .pdp-hero__label { font-size: 12px; letter-spacing: 0.18em; margin-bottom: 18px; }
          .pdp-hero__title { font-size: 2.1rem; }
          .pdp-hero__subtitle { font-size: 1.55rem; }
          .pdp-hero__desc { font-size: 0.98rem; line-height: 1.65; margin-bottom: 26px; }
          .pdp-hero__btns { flex-direction: column; }
          .pdp-hero__btn-primary, .pdp-hero__btn-outline { width: 100%; justify-content: center; padding: 14px 18px; }
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
          .pdp-careers__grid { gap: 16px 12px; }
          .pdp-career-item { min-width: 104px; }
          .pdp-careers__title { font-size: 1.5rem; }
          .pdp-cta { margin: 0 14px 30px; padding: 28px 18px; border-radius: 14px; }
          .pdp-cta h2 { font-size: 1.5rem; }
          .pdp-cta__btns { flex-direction: column; }
          .pdp-cta__btn-white, .pdp-cta__btn-outline { width: 100%; justify-content: center; }
        }

        @media (max-width: 480px) {
          .pdp-highlights__grid { grid-template-columns: 1fr; }
          .pdp-why__grid { grid-template-columns: 1fr; }
          .pdp-hero__title { font-size: 1.85rem; }
          .pdp-hero__subtitle { font-size: 1.3rem; }
          .pdp-hero__bg { height: 200px; }
          .pdp-spec-item { padding: 16px 14px; }
          .pdp-spec-item > span { display: none; }
          .pdp-career-item { min-width: 92px; }
          .pdp-career-item__icon { width: 58px; height: 58px; }
        }

        @media (max-width: 375px) {
          .pdp-hero { padding: 34px 12px 0; gap: 22px; }
          .pdp-hero__label { font-size: 11px; letter-spacing: 0.14em; }
          .pdp-hero__title { font-size: 1.65rem; }
          .pdp-hero__subtitle { font-size: 1.16rem; margin-bottom: 18px; }
          .pdp-hero__desc { font-size: 0.9rem; }
          .pdp-hero__bg { width: calc(100% + 24px); height: 180px; margin: 0 -12px; }
          .pdp-highlights { padding: 22px 12px; }
          .pdp-highlight-card { padding: 16px 12px; }
          .pdp-spec { padding: 22px 12px; }
          .pdp-why { padding: 22px 12px; }
          .pdp-careers { padding: 22px 12px; }
          .pdp-cta { margin: 0 12px 24px; padding: 22px 14px; }
        }

        @media (max-width: 340px) {
          .pdp-hero__title { font-size: 1.48rem; }
          .pdp-hero__subtitle { font-size: 1.05rem; }
          .pdp-hero__btn-primary, .pdp-hero__btn-outline { font-size: 14px; padding: 12px 14px; }
          .pdp-hero__bg { height: 160px; }
          .pdp-spec-item { gap: 10px; }
          .pdp-spec-item__icon { width: 34px; height: 34px; }
          .pdp-cta h2 { font-size: 1.25rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="pdp-hero">
        <div className="pdp-hero__bg" aria-hidden="true">
          <img src={programsHero} alt="" />
        </div>
        <div className="pdp-hero__content">
          <p className="pdp-hero__label">{program.hero.category}</p>
          <h1 className="pdp-hero__title">{programTitle}</h1>
          {programSubtitle && <h2 className="pdp-hero__subtitle">{programSubtitle}</h2>}
          <p className="pdp-hero__desc">{program.hero.description}</p>
          <div className="pdp-hero__btns">
            <a href="https://ssitm.in/" target="_blank" rel="noreferrer" className="pdp-hero__btn-primary">
              Apply Now <ArrowRight />
            </a>
            <button className="pdp-hero__btn-outline">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {program.infoCards && program.infoCards.length > 0 && (
        <div className="pdp-highlights">
          <div className="pdp-highlights__grid">
            {program.infoCards.map((h, i) => (
              <div key={h.title} className="pdp-highlight-card" style={{ border: `1px solid ${highlightColors[i % 4]}22` }}>
                <div className="pdp-highlight-card__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                  {highlightIcons[i % 4]}
                </div>
                <h3>{h.title}</h3>
                <p>{h.description}</p>
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
                <div key={spec.title} className="pdp-spec-item">
                  <div className="pdp-spec-item__icon"><SpecIcon /></div>
                  <div style={{ flex: 1 }}>
                    <h4>{spec.title}</h4>
                    <p>{spec.description}</p>
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
              Why Choose <span style={{ color: programColor }}>SEG</span> for {programSubtitle || programTitle}?
            </h2>
            <div className="pdp-why__bar" />
            <div className="pdp-why__grid">
              {program.whyChoose.map((item, i) => (
                <div key={item.title} className="pdp-why-card">
                  <div className="pdp-why-card__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                    <CheckIcon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
              Your Future <span style={{ color: programColor }}>Career</span> Paths
            </h2>
            <div className="pdp-careers__bar" />
            <div className="pdp-careers__grid">
              {program.careers.map((career, i) => (
                <div key={career.title} className="pdp-career-item">
                  <div className="pdp-career-item__icon" style={{ background: `${highlightColors[i % 4]}15`, color: highlightColors[i % 4] }}>
                    <CareerIcon />
                  </div>
                  <span>{career.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pdp-cta">
        <div>
          <h2>{program.cta.title}</h2>
          <div className="pdp-cta__bar" />
          <p>{program.cta.description}</p>
        </div>
        <div className="pdp-cta__btns">
          <a href="https://ssitm.in/" target="_blank" rel="noreferrer" className="pdp-cta__btn-white">Apply Now <ArrowRight /></a>
          <button className="pdp-cta__btn-outline">Contact Admissions</button>
        </div>
      </div>

    </div>
  );
}
