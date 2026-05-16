import facultyBgImg from '../../assets/images/chairman.jpeg'

const messagePoints = [
  'Education lays the foundation for building a better tomorrow and shaping ground for future leaders. Since our inception, SEG has remained steadfast in its mission to impart quality education, develop practical skills, and instill a sense of responsibility in our students.',
  'Education at SEG is not just about obtaining degrees; it is about shaping character, developing critical thinking, and preparing individuals for real-world challenges. Our dedicated faculty, state-of-the-art facilities, and industry-driven curriculum aim to provide a holistic learning experience that prepares students for a successful future.',
  'I firmly believe that education is the key to empowerment, and at SEG, we strive to ignite the spark of curiosity, creativity, and courage in every learner. I invite you to be a part of this remarkable journey of knowledge, growth, and transformation.',
]

const UserIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.9" />
    <path d="M5 19C5 15.9 8 13.8 12 13.8C16 13.8 19 15.9 19 19" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
)

export default function ChairmanLetter() {
  return (
    <section className="chairman-letter">
      <div className="chairman-letter__shell">
        <article className="chairman-letter__profile">
          <div className="chairman-letter__photo-wrap">
            <img src={facultyBgImg} alt="Mr. Sunil Singh" className="chairman-letter__photo" />
          </div>

          <div className="chairman-letter__nameplate">
            <span className="chairman-letter__nameplate-icon">
              <UserIcon />
            </span>
            <div className="chairman-letter__nameplate-copy">
              <strong>Mr. Sunil Singh</strong>
              <span>Chairman, Saroj Educational Group</span>
            </div>
          </div>
        </article>

        <article className="chairman-letter__content">
          <span className="chairman-letter__quote-mark" aria-hidden="true">”</span>

          <div className="chairman-letter__rail" aria-hidden="true">
            <span className="chairman-letter__rail-line" />
            <span className="chairman-letter__rail-dot" />
            <span className="chairman-letter__rail-dot" />
            <span className="chairman-letter__rail-dot" />
          </div>

          <div className="chairman-letter__body">
            {messagePoints.map((item) => (
              <div className="chairman-letter__point" key={item}>
                <p>{item}</p>
              </div>
            ))}

            <div className="chairman-letter__signoff">
              <span className="chairman-letter__signoff-line" />
              <p>Warm Regards,</p>
              <strong>Mr. Sunil Singh</strong>
              <span>Chairman, Saroj Educational Group</span>
            </div>
          </div>

          <span className="chairman-letter__dots" aria-hidden="true" />
        </article>
      </div>
    </section>
  )
}
