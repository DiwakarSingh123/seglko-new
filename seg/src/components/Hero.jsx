import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/images/hero-bg.png';

const ArrowRight = ({ color = 'currentColor' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src={heroBg} alt="Campus" />
      </div>

      <div className="hero__content">
        <h1 className="hero__heading animate-fade-in">
          <span className="hero__heading-line">EMPOWERING FUTURE</span>
          <span className="hero__heading-line">LEADERS, UNLOCKING</span>
          <span className="hero__heading-line hero__heading-line--accent">POTENTIAL</span>
        </h1>
        <p className="hero__subtext animate-fade-in" style={{ animationDelay: '0.2s' }}>
          At Saroj Educational Group, we nurture talent, encourage innovation, and empower students to achieve excellence in every sphere.
        </p>
        <div className="hero__buttons animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button className="btn btn--primary" id="explore-programs-btn" onClick={() => navigate('/all-programs')}>
            Explore Programs
            <span className="btn__arrow">
              <ArrowRight color="#fff" />
            </span>
          </button>
          <button className="btn btn--secondary" id="campus-tour-btn" onClick={() => navigate('/explore-more')}>
            Take Campus Tour
            <span className="btn__arrow">
              <ArrowRight color="#1041C6" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
