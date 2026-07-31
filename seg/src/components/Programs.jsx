import React from 'react';
import './Programs.css';

const topRow = [
  { image: '/Manisha-verma.webp', title: 'Manisha Verma', big: false },
  { image: '/Our-aluminu.webp', title: 'Our Alumni', big: true },
  { image: '/Satyam-Ojha.webp', title: 'Satyam Ojha', big: false },
  { image: '/Amit-chaudhary.webp', title: 'Amit Chaudhary', big: false },
  { image: '/Ayush-mishra.webp', title: 'Ayush Mishra', big: false },
  { image: '/Pravin-tiwari.webp', title: 'Pravin Tiwari', big: false },
  { image: '/Manisha-verma.webp', title: 'Manisha Verma', big: false },
  { image: '/Our-aluminu.webp', title: 'Our Alumni', big: true },
  { image: '/Satyam-Ojha.webp', title: 'Satyam Ojha', big: false },
  { image: '/Amit-chaudhary.webp', title: 'Amit Chaudhary', big: false },
  { image: '/Ayush-mishra.webp', title: 'Ayush Mishra', big: false },
  { image: '/Pravin-tiwari.webp', title: 'Pravin Tiwari', big: false },
];

const bottomRow = [
  { image: '/All-company.webp', title: 'Our Recruiters', big: true },
  { image: '/alumni-meet-saroj-educational-group-best-college-in-lucknow.webp', title: 'Alumni Meet', big: false },
  { image: '/annual-sports-and-creative-gala-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Gala', big: false },
  { image: '/annual-sports-week-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Week', big: false },
  { image: '/artificial-intelligence-workshop-saroj-educational-group-best-college-in-lucknow.webp', title: 'AI Workshop', big: false },
  { image: '/campus-placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Campus Placement', big: true },
  { image: '/guest-lecture-saroj-educational-group-best-college-in-lucknow.webp', title: 'Guest Lecture', big: false },
  { image: '/placement-drive-hiring-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Drive', big: true },
  { image: '/placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Hiring', big: true },
  { image: '/All-company.webp', title: 'Our Recruiters', big: true },
  { image: '/alumni-meet-saroj-educational-group-best-college-in-lucknow.webp', title: 'Alumni Meet', big: false },
  { image: '/annual-sports-and-creative-gala-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Gala', big: false },
  { image: '/annual-sports-week-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Week', big: false },
  { image: '/artificial-intelligence-workshop-saroj-educational-group-best-college-in-lucknow.webp', title: 'AI Workshop', big: false },
  { image: '/campus-placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Campus Placement', big: true },
  { image: '/guest-lecture-saroj-educational-group-best-college-in-lucknow.webp', title: 'Guest Lecture', big: false },
  { image: '/placement-drive-hiring-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Drive', big: true },
  { image: '/placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Hiring', big: true },
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
