import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-line py-7 px-8">
      <div className="max-w-[1152px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-subtle m-0">
          &copy; 2026 Joab Bastidas. All rights reserved.
        </p>
        <div className="flex gap-5 text-lg">
          <a href="https://www.linkedin.com/in/joab-bastidas/" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.instagram.com/joab_bastidas/" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com/Joabbas26" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://github.com/Joabbas26?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
}
