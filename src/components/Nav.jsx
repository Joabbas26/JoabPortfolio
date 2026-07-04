import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('joab-theme') === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('joab-theme', theme);
    } catch (e) {
      // localStorage unavailable — theme just won't persist
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const isDark = theme === 'dark';

  const linkClass = ({ isActive }) =>
    `font-mono text-[13px] tracking-[0.08em] text-ink pb-0.5 border-b-2 ${
      isActive ? 'border-accent' : 'border-transparent'
    }`;

  return (
    <div className="sticky top-0 z-50 w-full bg-paper border-b border-line transition-colors">
      <nav className="max-w-[1152px] mx-auto flex justify-between items-center px-8 py-6">
        <NavLink to="/" className="font-serif font-bold text-xl text-ink">
          Joab Bastidas
        </NavLink>

        <div className="flex items-center gap-6 md:gap-9">
          {/* Desktop links */}
          <ul className="hidden md:flex gap-9 list-none m-0 p-0">
            <li><NavLink to="/about" className={linkClass}>ABOUT</NavLink></li>
            <li><NavLink to="/projects" className={linkClass}>PROJECTS</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>CONTACT</NavLink></li>
          </ul>

          {/* Sun / moon theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className="flex items-center border border-line rounded-full p-[3px] bg-transparent cursor-pointer"
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${
                isDark ? 'text-subtle' : 'bg-ink text-btnfg'
              }`}
            >
              <FontAwesomeIcon icon={faSun} />
            </span>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${
                isDark ? 'bg-ink text-btnfg' : 'text-subtle'
              }`}
            >
              <FontAwesomeIcon icon={faMoon} />
            </span>
          </button>

          {/* Hamburger for small screens */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden text-ink focus:outline-none"
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-paper border-t border-line px-8 py-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            <li><NavLink to="/about" className={linkClass} onClick={() => setIsOpen(false)}>ABOUT</NavLink></li>
            <li><NavLink to="/projects" className={linkClass} onClick={() => setIsOpen(false)}>PROJECTS</NavLink></li>
            <li><NavLink to="/contact" className={linkClass} onClick={() => setIsOpen(false)}>CONTACT</NavLink></li>
          </ul>
        </div>
      )}
    </div>
  );
}
