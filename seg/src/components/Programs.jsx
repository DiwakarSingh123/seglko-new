import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.png';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';

const topRow = [
  { image: program1, title: 'Engineering & Technology' },
  { image: program2, title: 'Medical & Health Sciences' },
];

const bottomRow = [
  { image: program3, title: 'Business & Management' },
  { image: program4, title: 'Arts & Humanities' },
];

const renderProgramCards = (items, groupIndex) => (
  <div className="programs__marquee-group" key={groupIndex} aria-hidden={groupIndex > 0}>
    {items.map((p, i) => (
      <div
        key={`${groupIndex}-${p.title}-${i}`}
        className={`programs__card programs__card--marquee ${i % 2 === 0 ? 'programs__card--wide' : 'programs__card--small'}`}
      >
        <img src={p.image} alt={groupIndex === 0 ? p.title : ''} />
      </div>
    ))}
  </div>
);

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
      <div className="programs__marquee">

        {/* Top row — slides RIGHT */}
        <div className="programs__marquee-row programs__marquee-row--right">
          {[0, 1].map((groupIndex) => renderProgramCards(topRow, groupIndex))}
        </div>

        {/* Bottom row — slides LEFT */}
        <div className="programs__marquee-row programs__marquee-row--left">
          {[0, 1].map((groupIndex) => renderProgramCards(bottomRow, groupIndex))}
        </div>

      </div>
    </section>
  );
}
