import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.png';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';

const topRow = [
  { image: program1, title: 'Engineering & Technology' },
  { image: program2, title: 'Medical & Health Sciences' },
  { image: program1, title: 'Engineering & Technology' },
  { image: program2, title: 'Medical & Health Sciences' },
];

const bottomRow = [
  { image: program3, title: 'Business & Management' },
  { image: program4, title: 'Arts & Humanities' },
  { image: program3, title: 'Business & Management' },
  { image: program4, title: 'Arts & Humanities' },
];

const cardStyle = {
  flex: '0 0 calc(50vw - 52px)',
  height: '295px',
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: '0 0 11px rgba(0,0,0,0.25)',
  position: 'relative',
};

const overlayStyle = {
  position: 'absolute',
  bottom: 0, left: 0, right: 0,
  padding: '20px',
  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
  color: 'white',
};

export default function Programs() {
  return (
    <section className="programs" id="programs">
      <style>{`
        @keyframes slideRight {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideLeft {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div style={{ overflow: 'hidden', padding: '0 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>

        {/* Top row — slides RIGHT */}
        <div style={{ display: 'flex', gap: '15px', animation: 'slideRight 18s linear infinite', width: 'max-content' }}>
          {topRow.map((p, i) => (
            <div key={i} style={cardStyle}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={overlayStyle}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>{p.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — slides LEFT */}
        <div style={{ display: 'flex', gap: '15px', animation: 'slideLeft 18s linear infinite', width: 'max-content' }}>
          {bottomRow.map((p, i) => (
            <div key={i} style={cardStyle}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={overlayStyle}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>{p.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
