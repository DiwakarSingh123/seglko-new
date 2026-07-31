import React from 'react';
import './Programs.css';

const topRow = [
  { image: '/our-recruiters-saroj-educational-group.webp', title: 'Our Recruiters', big: true },
  { image: '/placement-success-saroj-educational-group.webp', title: 'Placement Success', big: false },
  { image: '/student-congratulations-saroj-educational-group.webp', title: 'Student Congratulations', big: false },
  { image: '/gate-2026-achiever-saroj-educational-group.webp', title: 'GATE 2026 Achiever', big: false },
  { image: '/gpat-qualified-congratulations-saroj-educational-group.webp', title: 'GPAT Qualified', big: false },
  { image: '/our-alumni-students-saroj-educational-group.webp', title: 'Our Alumni Students', big: true, contain: true },
  { image: '/our-recruiters-saroj-educational-group.webp', title: 'Our Recruiters', big: true },
  { image: '/placement-success-saroj-educational-group.webp', title: 'Placement Success', big: false },
  { image: '/student-congratulations-saroj-educational-group.webp', title: 'Student Congratulations', big: false },
  { image: '/gate-2026-achiever-saroj-educational-group.webp', title: 'GATE 2026 Achiever', big: false },
  { image: '/gpat-qualified-congratulations-saroj-educational-group.webp', title: 'GPAT Qualified', big: false },
  { image: '/our-alumni-students-saroj-educational-group.webp', title: 'Our Alumni Students', big: true, contain: true },
];

const bottomRow = [
  { image: '/alumni-meet-saroj-educational-group-best-college-in-lucknow.webp', title: 'Alumni Meet', big: false },
  { image: '/annual-sports-and-creative-gala-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Gala', big: false },
  { image: '/annual-sports-week-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Week', big: false },
  { image: '/artificial-intelligence-workshop-saroj-educational-group-best-college-in-lucknow.webp', title: 'AI Workshop', big: false },
  { image: '/campus-placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Campus Placement', big: true },
  { image: '/guest-lecture-saroj-educational-group-best-college-in-lucknow.webp', title: 'Guest Lecture', big: false },
  { image: '/industry-placement-saroj-educational-group.webp', title: 'Industry Placement', big: true, contain: true },
  { image: '/placement-drive-hiring-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Drive', big: true },
  { image: '/placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Hiring', big: true },
  { image: '/alumni-meet-saroj-educational-group-best-college-in-lucknow.webp', title: 'Alumni Meet', big: false },
  { image: '/annual-sports-and-creative-gala-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Gala', big: false },
  { image: '/annual-sports-week-saroj-educational-group-best-college-in-lucknow.webp', title: 'Sports Week', big: false },
  { image: '/artificial-intelligence-workshop-saroj-educational-group-best-college-in-lucknow.webp', title: 'AI Workshop', big: false },
  { image: '/campus-placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Campus Placement', big: true },
  { image: '/guest-lecture-saroj-educational-group-best-college-in-lucknow.webp', title: 'Guest Lecture', big: false },
  { image: '/industry-placement-saroj-educational-group.webp', title: 'Industry Placement', big: true, contain: true },
  { image: '/placement-drive-hiring-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Drive', big: true },
  { image: '/placement-drive-saroj-educational-group-best-college-in-lucknow.webp', title: 'Placement Hiring', big: true },
];

export default function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="programs__track programs__track--right">
        {topRow.map((p, i) => (
          <div key={i} className={`programs__card ${p.big ? 'programs__card--big' : 'programs__card--small'} ${p.contain ? 'programs__card--contain' : ''}`}>
            <img src={p.image} alt={p.title} className="programs__image" />
          </div>
        ))}
      </div>
      <div className="programs__track programs__track--left">
        {bottomRow.map((p, i) => (
          <div key={i} className={`programs__card ${p.big ? 'programs__card--big' : 'programs__card--small'} ${p.contain ? 'programs__card--contain' : ''}`}>
            <img src={p.image} alt={p.title} className="programs__image" />
          </div>
        ))}
      </div>
    </section>
  );
}
