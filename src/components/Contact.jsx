import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorResult, setErrorResult] = useState('');
  const [isError, setIsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const isValidEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '' || message.trim() === '') {
      setErrorResult('Required fields cannot be empty');
      setIsError(true);
      setShowConfirmation(true);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorResult('Email address invalid');
      setIsError(true);
      setShowConfirmation(true);
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setErrorResult('Message sent successfully!');
        setIsError(false);
        setShowConfirmation(true);
        if (nameInputRef.current) nameInputRef.current.value = '';
        if (emailInputRef.current) emailInputRef.current.value = '';
        if (messageInputRef.current) messageInputRef.current.value = '';
        setTimeout(() => setShowConfirmation(false), 3000);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b border-ink py-2 font-sans text-[15px] text-ink outline-none';

  return (
    <div className="grow w-full">
      <div className="max-w-[1152px] mx-auto grid gap-12 px-8 py-16 md:py-[72px] md:grid-cols-2 md:gap-[72px]">
        <div>
          <h1 className="font-serif font-semibold text-3xl md:text-[44px] text-ink mb-5">
            Let&apos;s talk data.
          </h1>
          <p className="font-sans text-base leading-[1.7] text-body mb-8">
            Open to data analyst roles and collaborations. Email is fastest.
          </p>
          <div className="flex flex-col gap-3.5 font-mono text-sm">
            <span className="text-ink">Joabbastidas@gmail.com</span>
            <span className="text-subtle">New York, NY</span>
            <div className="flex gap-5 mt-2 text-xl">
              <a href="https://www.linkedin.com/in/joab-bastidas/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/Joabbas26?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://www.instagram.com/joab_bastidas/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com/Joabbas26" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-xs tracking-[0.1em] text-subtle">NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
              ref={nameInputRef}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-mono text-xs tracking-[0.1em] text-subtle">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@email.com"
              className={inputClass}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-mono text-xs tracking-[0.1em] text-subtle">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="What can I help with?"
              className={`${inputClass} resize-y`}
              onChange={(e) => setMessage(e.target.value)}
              ref={messageInputRef}
            />
          </div>
          <button
            type="submit"
            className="bg-ink text-btnfg px-6 py-3.5 font-mono text-sm border-0 cursor-pointer self-start"
          >
            Send message →
          </button>
          {showConfirmation && (
            <p className={`font-mono text-[13px] m-0 ${isError ? 'text-red-600' : 'text-green-700'}`}>
              {errorResult}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
