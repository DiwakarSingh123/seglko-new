import { useState, useEffect } from 'react';
import defaultChairmanImg from '../../assets/images/chairman.jpeg';

export default function ChairmanLetter() {
  const [message, setMessage] = useState('Education lays the foundation for building a better tomorrow and shaping ground for future leaders. Since our inception, SEG has remained steadfast in its mission to impart quality education, develop practical skills, and instill a sense of responsibility in our students.\n\nEducation at SEG is not just about obtaining degrees; it is about shaping character, developing critical thinking, and preparing individuals for real-world challenges. Our dedicated faculty, state-of-the-art facilities, and industry-driven curriculum aim to provide a holistic learning experience that prepares students for a successful future.\n\nI firmly believe that education is the key to empowerment, and at SEG, we strive to ignite the spark of curiosity, creativity, and courage in every learner. I invite you to be a part of this remarkable journey of knowledge, growth, and transformation.');
  const [author, setAuthor] = useState('Mr. Sunil Singh');
  const [designation, setDesignation] = useState('Chairman, Saroj Educational Group');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.aboutChairman) {
          if (data.aboutChairman.message) setMessage(data.aboutChairman.message);
          if (data.aboutChairman.author) setAuthor(data.aboutChairman.author);
          if (data.aboutChairman.designation) setDesignation(data.aboutChairman.designation);
          if (data.aboutChairman.image) setImage(data.aboutChairman.image);
        }
      })
      .catch(() => {});
  }, []);

  const paragraphs = message.split('\n').filter(p => p.trim());

  return (
    <section className="chairman-letter">
      <div className="chairman-letter__shell">
        <article className="chairman-letter__profile">
          <div className="chairman-letter__photo-wrap">
            <img src={image || defaultChairmanImg} alt={author} className="chairman-letter__photo" />
          </div>
        </article>

        <article className="chairman-letter__content">
          <span className="chairman-letter__quote-mark" aria-hidden="true">"</span>
          <div className="chairman-letter__rail" aria-hidden="true">
            <span className="chairman-letter__rail-line" />
            <span className="chairman-letter__rail-dot" />
            <span className="chairman-letter__rail-dot" />
            <span className="chairman-letter__rail-dot" />
          </div>
          <div className="chairman-letter__body">
            {paragraphs.map((para, i) => (
              <div className="chairman-letter__point" key={i}>
                <p>{para}</p>
              </div>
            ))}
            <div className="chairman-letter__signoff">
              <span className="chairman-letter__signoff-line" />
              <p>Warm Regards,</p>
              <strong>{author}</strong>
              <span>{designation}</span>
            </div>
          </div>
          <span className="chairman-letter__dots" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
