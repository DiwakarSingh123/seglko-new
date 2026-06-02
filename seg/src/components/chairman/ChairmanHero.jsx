import { Link } from 'react-router-dom'
import heroBgImg from '../../assets/images/seg.jpeg'
import facultyBgImg from '../../assets/images/chairmansimage.jpeg'

export default function ChairmanHero() {
  return (
    <section className="chairman-hero">
      <div className="chairman-hero__shell">
        <div className="chairman-hero__copy">
          <div className="chairman-hero__breadcrumbs">

            <span className="separator">&gt;</span>
            <span className="current">Chairman&apos;s Message</span>
          </div>

          <span className="chairman-hero__dots" aria-hidden="true" />

          <h1 className="chairman-hero__title">
            <span>Chairman&apos;s</span>
            <strong>Message</strong>
          </h1>

          <div className="chairman-hero__signature-row">
            <span className="chairman-hero__signature-line" />
            <p className="chairman-hero__signature">Sunil Singh</p>
            <span className="chairman-hero__signature-line" />
          </div>
        </div>

        <div className="chairman-hero__visual">
          <div className="chairman-hero__portrait-blob" aria-hidden="true" />
          <div className="chairman-hero__portrait-wrap">
            <img src={facultyBgImg} alt="Chairman portrait" className="chairman-hero__portrait" />
          </div>

          <div className="chairman-hero__quote">
            <span className="chairman-hero__quote-mark">“</span>
            <p>Education is not the learning of facts, but the training of the mind to think.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
