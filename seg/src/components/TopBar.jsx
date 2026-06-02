import { Link } from 'react-router-dom';

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <div className="top-bar__primary">
          <Link to="/why-join-seg" className="top-bar__link">Why SEG?</Link>
          <span className="top-bar__divider top-bar__divider--visible" />
          <Link to="/careers" className="top-bar__link">Career</Link>
          <span className="top-bar__divider top-bar__divider--visible" />
          <a href="https://sitmalumni.seglko.org/" target="_blank" rel="noopener noreferrer" className="top-bar__link">Alumni</a>
        </div>
        <div className="top-bar__utility">
          <span className="top-bar__link">Toll Free no: 1800-180-7686</span>
          <span className="top-bar__divider top-bar__divider--visible" />
          <span className="top-bar__link top-bar__email">
            <MailIcon />
            <span>: For jobs ( send Cv ) ~hr @seglko.org</span>
          </span>
        </div>
      </div>
      <div className="top-bar__right">
        <Link to="/pay-fee" className="top-bar__pay-btn">Pay Fee Online</Link>
      </div>
    </div>
  );
}
