import React from 'react';
import './Programs.css';
import program3 from '../assets/images/program3.png';
import program4 from '../assets/images/program4.png';

const topRow = [
  { image: '/Manisha-verma.jpeg', title: 'Manisha Verma', big: false },
  { image: '/out-alumuni.jpeg', title: 'Our Alumni', big: true },
  { image: '/Satyam-ojha.jpeg', title: 'Satyam Ojha', big: false },
  { image: '/Amit-chaudhary.jpeg', title: 'Amit Chaudhary', big: false },
  { image: '/Ayush-mishra.jpeg', title: 'Ayush Mishra', big: false },
  { image: '/Pravin-tiwari.jpeg', title: 'Pravin Tiwari', big: false },
  { image: '/Manisha-verma.jpeg', title: 'Manisha Verma', big: false },
  { image: '/out-alumuni.jpeg', title: 'Our Alumni', big: true },
  { image: '/Satyam-ojha.jpeg', title: 'Satyam Ojha', big: false },
  { image: '/Amit-chaudhary.jpeg', title: 'Amit Chaudhary', big: false },
  { image: '/Ayush-mishra.jpeg', title: 'Ayush Mishra', big: false },
  { image: '/Pravin-tiwari.jpeg', title: 'Pravin Tiwari', big: false },
];

const bottomRow = [
  { image: '/All-company.jpeg', title: 'All Company', big: true },
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
  { image: '/All-company.jpeg', title: 'All Company', big: true },
  { image: program3, title: 'Business & Management', big: false },
  { image: program4, title: 'Arts & Humanities', big: true },
  { image: '/All-company.jpeg', title: 'All Company', big: true },
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
