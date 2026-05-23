import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TopBar() {
  const [general, setGeneral] = useState({
    tollFree: "1800-180-7686",
    hrEmail: "hr@seglko.org",
    contactEmail: "admission.cell@seglko.org",
    contactPhone: "09555699988",
    marqueeNews: "Admissions are Open for academic session 2026-27. Register online today for attractive scholarships."
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.general) {
          setGeneral(data.general);
        }
      })
      .catch(err => console.error("Error loading general settings:", err));
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__primary">
          <Link to="/why-join-seg" className="top-bar__link">Why SEG?</Link>
          <span className="top-bar__divider top-bar__divider--visible" />
          <Link to="/careers" className="top-bar__link">Career</Link>
          <span className="top-bar__divider top-bar__divider--visible" />
          <a href="https://sitmalumni.seglko.org/" target="_blank" rel="noopener noreferrer" className="top-bar__link">Alumini</a>
        </div>
        <div className="top-bar__utility">
          <span className="top-bar__link">Toll Free no: {general.tollFree}</span>
          <span className="top-bar__divider top-bar__divider--visible" />
          <span className="top-bar__link top-bar__email">
            <MailIcon />
            <span>: For jobs ( send Cv ) ~ {general.hrEmail}</span>
          </span>
        </div>
      </div>
      <div className="top-bar__right">
        <Link to="/pay-fee" className="top-bar__pay-btn">Pay Fee Online</Link>
      </div>
    </div>
  );
}
