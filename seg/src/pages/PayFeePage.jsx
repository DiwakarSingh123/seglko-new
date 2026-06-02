import { Link } from 'react-router-dom';
import institutionsBg from '../assets/images/institutions-bg.png';
import aboutBg from '../assets/images/about-bg.png';
import campusBg from '../assets/images/campus-bg.png';

const institutions = [
  { name: 'Saroj Institute of Technology & Management', city: 'Lucknow', code: '123', image: institutionsBg, color: '#1041c6', payUrl: 'https://seglko.org/' },
  { name: 'Shivdan Singh Institute of Technology & Management', city: 'Aligarh', code: '007', image: aboutBg, color: '#16a34a', payUrl: 'https://ssitm.in/' },
  { name: 'Lucknow Institute of Pharmacy', city: 'Lucknow', code: '572', image: campusBg, color: '#e31e24', payUrl: 'https://seglko.org/lip/' },
];

const features = [
  { icon: '🛡️', title: 'Secure & Trusted', desc: 'Your payments are protected with bank-level security.' },
  { icon: '⚡', title: 'Quick & Easy', desc: 'Pay your fees in just a few simple steps.' },
  { icon: '🕐', title: '24/7 Availability', desc: 'Make payments anytime, from anywhere.' },
  { icon: '🧾', title: 'Instant Receipt', desc: 'Get instant payment confirmation & receipt.' },
  { icon: '🎧', title: 'Need Help?', desc: 'Our support team is always here to assist you.' },
];

/* Real-looking QR SVG */
const QRCode = ({ color }) => (
  <svg viewBox="0 0 100 100" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#fff"/>
    {/* TL finder */}
    <rect x="4" y="4" width="32" height="32" rx="3" fill="none" stroke={color} strokeWidth="3"/>
    <rect x="10" y="10" width="20" height="20" rx="1" fill={color}/>
    {/* TR finder */}
    <rect x="64" y="4" width="32" height="32" rx="3" fill="none" stroke={color} strokeWidth="3"/>
    <rect x="70" y="10" width="20" height="20" rx="1" fill={color}/>
    {/* BL finder */}
    <rect x="4" y="64" width="32" height="32" rx="3" fill="none" stroke={color} strokeWidth="3"/>
    <rect x="10" y="70" width="20" height="20" rx="1" fill={color}/>
    {/* Data modules */}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="4" width="5" height="5" fill={i%2===0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="12" width="5" height="5" fill={i%3===0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[4,10,16,22,28,34,40,46,52,58,64,70,76,82,88,94].map((y,i) => (
      <rect key={i} x="42" y={y} width="5" height="5" fill={i%2===0?color:'none'} stroke={color} strokeWidth="0.3"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="42" width="5" height="5" fill={i%2!==0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="50" width="5" height="5" fill={i%3!==0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="58" width="5" height="5" fill={i%2===0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="66" width="5" height="5" fill={i%3===0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="74" width="5" height="5" fill={i%2!==0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="82" width="5" height="5" fill={i%3!==0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
    {[42,48,54,60,66,72,78,84,90].map((x,i) => (
      <rect key={i} x={x} y="90" width="5" height="5" fill={i%2===0?color:'none'} stroke={color} strokeWidth="0.5"/>
    ))}
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity="0.9"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function PayFeePage() {
  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh' }}>
      <style>{`
        /* Hero */
        .pf-hero { background: linear-gradient(120deg,#0a1a4e 0%,#0d2b8a 55%,#1041c6 100%); padding:100px 5% 50px; display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; position:relative; overflow:hidden; }
        .pf-hero__title { font-size:4.2rem; font-weight:900; color:#fff; line-height:1; margin-bottom:14px; letter-spacing:-1px; }
        .pf-hero__title span { color:#ffbe23; }
        .pf-hero__sub { font-size:1.1rem; color:rgba(255,255,255,0.82); margin-bottom:6px; }
        .pf-hero__accent { font-size:1.15rem; font-weight:700; color:#ffbe23; margin-bottom:32px; }
        .pf-hero__badges { display:flex; gap:12px; flex-wrap:wrap; }
        .pf-hero__badge { display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:10px 14px; color:#fff; font-size:12px; font-weight:600; }
        .pf-hero__mockup { background:#fff; border-radius:16px; padding:22px; max-width:360px; box-shadow:0 30px 60px rgba(0,0,0,0.35); margin-left:auto; }
        .pf-hero__mockup h4 { font-size:14px; font-weight:700; color:#162341; margin-bottom:3px; }
        .pf-hero__mockup p { font-size:11px; color:#8a9bbf; margin-bottom:16px; }
        .pf-field { background:#f5f8ff; border:1px solid #e0e8ff; border-radius:7px; padding:9px 12px; margin-bottom:9px; font-size:12px; color:#aab4cc; }
        .pf-pay-btn-hero { width:100%; padding:11px; background:#1041c6; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; margin-top:4px; display:flex; align-items:center; justify-content:center; gap:6px; }

        /* Breadcrumb */
        .pf-bc { background:#fff; padding:12px 5%; font-size:13px; color:#5f6785; border-bottom:1px solid #eef2ff; }
        .pf-bc a { color:#1041c6; text-decoration:none; font-weight:600; }

        /* Main */
        .pf-main { padding:44px 5% 50px; }
        .pf-main__title { font-size:1.85rem; font-weight:800; color:#162341; text-align:center; margin-bottom:6px; }
        .pf-main__sub { font-size:14px; color:#8a9bbf; text-align:center; margin-bottom:8px; }
        .pf-dot { width:10px; height:10px; background:#ffbe23; border-radius:50%; margin:0 auto 32px; }

        /* Cards */
        .pf-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-bottom:40px; }

        /* Card */
        .pf-card { background:#fff; border-radius:14px; overflow:hidden; box-shadow:0 4px 20px rgba(20,35,90,0.1); }

        /* Card Header */
        .pf-card__head { position:relative; padding:18px 16px 16px; display:flex; align-items:center; gap:14px; overflow:hidden; border-bottom:1px solid #f0f4ff; }
        .pf-card__corner { position:absolute; top:0; right:0; width:0; height:0; border-style:solid; border-width:0 90px 90px 0; }
        .pf-card__corner-icon { position:absolute; top:10px; right:10px; color:#fff; z-index:2; }
        /* Hexagon image */
        .pf-card__hex { width:72px; height:72px; flex-shrink:0; position:relative; }
        .pf-card__hex-inner { width:72px; height:72px; clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); overflow:hidden; }
        .pf-card__hex-inner img { width:100%; height:100%; object-fit:cover; }
        .pf-card__hex-border { position:absolute; inset:0; clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); border:3px solid transparent; pointer-events:none; }
        .pf-card__info { flex:1; min-width:0; }
        .pf-card__name { font-size:15px; font-weight:700; color:#162341; line-height:1.3; margin-bottom:5px; }
        .pf-card__meta { font-size:12px; color:#8a9bbf; display:flex; align-items:center; gap:5px; }

        /* Card Body */
        .pf-card__body { padding:16px; display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .pf-card__col-label { font-size:10px; font-weight:700; color:#8a9bbf; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px; text-align:center; }
        .pf-card__qr-wrap { display:flex; flex-direction:column; align-items:center; }
        .pf-card__qr-box { background:#fff; border:1.5px solid #e8eeff; border-radius:8px; padding:6px; display:inline-flex; margin-bottom:8px; }
        .pf-card__dl { font-size:12px; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:4px; }
        .pf-card__pay-wrap { display:flex; flex-direction:column; }
        .pf-card__pay-btn { display:flex; align-items:center; justify-content:center; gap:7px; padding:11px 12px; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; margin-bottom:14px; text-decoration:none; width:100%; }
        .pf-card__opts { display:flex; flex-direction:column; gap:8px; }
        .pf-card__opt { font-size:13px; color:#334155; display:flex; align-items:center; gap:8px; font-weight:500; }
        .pf-card__check { width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:10px; color:#fff; font-weight:900; }

        /* Card Footer */
        .pf-card__foot { padding:12px 16px; display:flex; align-items:center; gap:8px; font-size:12px; color:#8a9bbf; }
        .pf-card__foot strong { color:#475569; }

        /* Features */
        .pf-features { display:grid; grid-template-columns:repeat(5,1fr); background:#fff; border-radius:14px; box-shadow:0 4px 16px rgba(20,35,90,0.06); border:1px solid #eef2ff; overflow:hidden; }
        .pf-feat { display:flex; align-items:flex-start; gap:12px; padding:20px 16px; }
        .pf-feat:not(:last-child) { border-right:1px solid #eef2ff; }
        .pf-feat__icon { font-size:24px; flex-shrink:0; }
        .pf-feat__title { font-size:13px; font-weight:700; color:#162341; margin-bottom:3px; }
        .pf-feat__desc { font-size:11px; color:#8a9bbf; line-height:1.5; }

        /* Responsive */
        @media (max-width:1023px) {
          .pf-hero { grid-template-columns:1fr; padding:48px 5% 36px; }
          .pf-hero__title { font-size:3rem; }
          .pf-hero__mockup { max-width:100%; margin-left:0; }
          .pf-cards { grid-template-columns:1fr; max-width:460px; margin:0 auto 40px; }
          .pf-features { grid-template-columns:repeat(2,1fr); }
          .pf-feat:nth-child(2) { border-right:none; }
          .pf-feat:nth-child(4) { border-right:none; }
          .pf-feat:not(:last-child) { border-bottom:1px solid #eef2ff; }
        }
        @media (max-width:767px) {
          .pf-hero { padding:32px 16px 26px; gap:22px; }
          .pf-hero__title { font-size:2.2rem; }
          .pf-hero__badges { gap:8px; }
          .pf-hero__badge { font-size:11px; padding:8px 11px; }
          .pf-main { padding:28px 16px 36px; }
          .pf-main__title { font-size:1.4rem; }
          .pf-cards { max-width:100%; }
          .pf-card__body { grid-template-columns:1fr; }
          .pf-features { grid-template-columns:1fr; }
          .pf-feat { border-right:none !important; }
          .pf-feat:not(:last-child) { border-bottom:1px solid #eef2ff; }
        }
        @media (max-width:475px) {
          .pf-hero { padding:28px 14px 24px; gap:18px; }
          .pf-hero__title { font-size:2rem; line-height:1.05; }
          .pf-hero__sub { font-size:0.95rem; line-height:1.45; }
          .pf-hero__accent { font-size:1rem; margin-bottom:20px; }
          .pf-hero__mockup { padding:16px; border-radius:14px; }
          .pf-bc { padding:10px 14px; font-size:12px; }
          .pf-main { padding:24px 14px 32px; }
          .pf-dot { margin-bottom:22px; }
          .pf-cards { gap:18px; margin-bottom:28px; }
          .pf-card__head { padding:15px 13px; gap:10px; align-items:flex-start; }
          .pf-card__corner { border-width:0 68px 68px 0; }
          .pf-card__hex,
          .pf-card__hex-inner { width:58px; height:58px; }
          .pf-card__name { font-size:13.5px; }
          .pf-card__meta { font-size:11px; flex-wrap:wrap; }
          .pf-card__body { padding:14px; gap:14px; }
          .pf-card__qr-box svg { width:104px; height:104px; }
          .pf-card__foot { align-items:flex-start; flex-wrap:wrap; font-size:11px; line-height:1.45; }
          .pf-card__foot strong { overflow-wrap:anywhere; }
          .pf-feat { padding:16px 14px; }
        }
        @media (max-width:375px) {
          .pf-hero__title { font-size:1.8rem; }
          .pf-hero__badges { flex-direction:column; }
          .pf-main__title { font-size:1.2rem; }
          .pf-hero { padding:24px 12px 22px; }
          .pf-hero__badge { width:100%; }
          .pf-hero__mockup { padding:14px; }
          .pf-main { padding:22px 12px 30px; }
          .pf-card__head { padding:14px 12px; }
          .pf-card__body { padding:12px; }
          .pf-card__pay-btn,
          .pf-pay-btn-hero { font-size:12px; }
          .pf-feat__title { font-size:12.5px; }
          .pf-feat__desc { font-size:10.5px; }
        }
        @media (max-width:320px) {
          .pf-hero { padding:20px 10px 20px; gap:16px; }
          .pf-hero__title { font-size:1.55rem; letter-spacing:-0.5px; }
          .pf-hero__sub { font-size:0.85rem; }
          .pf-hero__accent { font-size:0.9rem; margin-bottom:16px; }
          .pf-hero__badge { font-size:10px; padding:7px 9px; }
          .pf-hero__mockup h4 { font-size:13px; }
          .pf-hero__mockup p,
          .pf-field { font-size:10.5px; }
          .pf-bc { padding:9px 10px; font-size:11px; }
          .pf-main { padding:20px 10px 28px; }
          .pf-main__title { font-size:1.05rem; }
          .pf-main__sub { font-size:12px; line-height:1.45; }
          .pf-card { border-radius:12px; }
          .pf-card__head { gap:8px; }
          .pf-card__corner { border-width:0 56px 56px 0; }
          .pf-card__corner-icon { top:7px; right:7px; }
          .pf-card__hex,
          .pf-card__hex-inner { width:50px; height:50px; }
          .pf-card__name { font-size:12.5px; }
          .pf-card__meta,
          .pf-card__dl,
          .pf-card__foot { font-size:10.5px; }
          .pf-card__qr-box svg { width:96px; height:96px; }
          .pf-card__opt { font-size:12px; }
          .pf-feat { padding:14px 12px; gap:10px; }
          .pf-feat__icon { font-size:20px; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="pf-hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="pf-hero__title"><span>FEE</span> PORTAL</h1>
          <p className="pf-hero__sub">A secure, fast & convenient way to pay your fees</p>
          <p className="pf-hero__accent">anytime, anywhere.</p>
          <div className="pf-hero__badges">
            <div className="pf-hero__badge">🛡️ 100% Secure Transactions</div>
            <div className="pf-hero__badge">⚡ Instant Payment Confirmation</div>
            <div className="pf-hero__badge">💳 Multiple Payment Options</div>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="pf-hero__mockup">
            <h4>Fee Payment Portal</h4>
            <p>Secure payment for your bright future</p>
            <div className="pf-field">Select Institution ▾</div>
            <div className="pf-field">Enter Roll Number</div>
            <div className="pf-field">Select Payment Type ▾</div>
            <button className="pf-pay-btn-hero"><LockIcon /> Proceed to Pay</button>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
     
      {/* ── Main ── */}
      <div className="pf-main">
        <h2 className="pf-main__title">Colleges Fee Payment Portal</h2>
        <p className="pf-main__sub">Secure online payment for all affiliated institutions</p>
        <div className="pf-dot" />

        {/* ── Cards ── */}
        <div className="pf-cards">
          {institutions.map((inst) => (
            <div key={inst.name} className="pf-card" style={{ border: `1.5px solid ${inst.color}30` }}>

              {/* Header */}
              <div className="pf-card__head">
                <div className="pf-card__corner" style={{ borderColor: `transparent ${inst.color} transparent transparent` }} />
                <div className="pf-card__corner-icon"><BuildingIcon /></div>

                {/* Hexagon with colored border */}
                <div className="pf-card__hex">
                  <div style={{ position:'relative', width:72, height:72 }}>
                    {/* Colored border layer */}
                    <div style={{ position:'absolute', inset:-3, clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', background: inst.color, zIndex:0 }} />
                    {/* White gap */}
                    <div style={{ position:'absolute', inset:0, clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', background:'#fff', zIndex:1 }} />
                    {/* Image */}
                    <div style={{ position:'absolute', inset:4, clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', overflow:'hidden', zIndex:2 }}>
                      <img src={inst.image} alt={inst.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                  </div>
                </div>

                <div className="pf-card__info">
                  <div className="pf-card__name">{inst.name}</div>
                  <div className="pf-card__meta">
                    {inst.city}
                    <span style={{ width:4, height:4, background:'#8a9bbf', borderRadius:'50%', display:'inline-block' }} />
                    Code: {inst.code}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="pf-card__body">
                <div className="pf-card__qr-wrap">
                  <div className="pf-card__col-label">◀ Scan & Pay ▶</div>
                  <div className="pf-card__qr-box">
                    <QRCode color={inst.color} />
                  </div>
                  <a href="#" className="pf-card__dl" style={{ color: inst.color }}>
                    Download QR Code 📥
                  </a>
                </div>

                <div className="pf-card__pay-wrap">
                  <div className="pf-card__col-label">Payment Options</div>
                  <a href={inst.payUrl} target="_blank" rel="noopener noreferrer"
                    className="pf-card__pay-btn" style={{ background: inst.color }}>
                    <LockIcon /> Pay Online Now
                  </a>
                  <div className="pf-card__opts">
                    {['Net Banking', 'Debit / Credit Card', 'UPI / Wallets'].map(opt => (
                      <div key={opt} className="pf-card__opt">
                        <span className="pf-card__check" style={{ background: inst.color }}>✓</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pf-card__foot" style={{ background: `${inst.color}08`, borderTop: `1px solid ${inst.color}20` }}>
                <MailIcon />
                For payment issues, contact: <strong>admission.cell@seglko.org</strong>
              </div>
            </div>
          ))}
        </div>

        {/* ── Features ── */}
        <div className="pf-features">
          {features.map((f) => (
            <div key={f.title} className="pf-feat">
              <div className="pf-feat__icon">{f.icon}</div>
              <div>
                <div className="pf-feat__title">{f.title}</div>
                <div className="pf-feat__desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
