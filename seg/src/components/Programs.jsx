import React from 'react';
import './Programs.css';
import program1 from '../assets/images/program1.png';
import program2 from '../assets/images/program2.png';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';

const topRow = [
  { image: program1, title: 'Engineering & Technology', big: true },
  { image: program2, title: 'Medical & Health Sciences', big: false },
  { image: program1, title: 'Engineering & Technology', big: true },
  { image: program2, title: 'Medical & Health Sciences', big: false },
  { image: program1, title: 'Engineering & Technology', big: true },
  { image: program2, title: 'Medical & Health Sciences', big: false },
  { image: program1, title: 'Engineering & Technology', big: true },
  { image: program2, title: 'Medical & Health Sciences', big: false },
];

const bottomRow = [
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
];

export default function Programs() {
  return (
    <section className="programs" id="programs">
      {/* Top row — slides RIGHT */}
      <div className="programs__track programs__track--right">
        {topRow.map((p, i) => (
          <div 
            key={i} 
            className={`programs__card ${p.big ? 'programs__card--big' : 'programs__card--small'}`}
          >
            <img src={p.image} alt={p.title} className="programs__image" />
          </div>
        ))}
      </div>

      {/* Bottom row — slides LEFT */}
      <div className="programs__track programs__track--left">
        {bottomRow.map((p, i) => (
          <div 
            key={i} 
            className={`programs__card ${p.big ? 'programs__card--big' : 'programs__card--small'}`}
          >
            <img src={p.image} alt={p.title} className="programs__image" />
          </div>
        ))}
      </div>
    </section>
  );
}
