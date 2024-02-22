import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
<footer className="bg-gray-800 text-white py-8 bottom-0 left-0 w-full z-10 sticky top-[100vh]">
  <div className="flex justify-center">
    <div className="mx-4">
      <a href="https://www.linkedin.com/in/joab-bastidas/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-white hover:text-gray-400" />
      </a>
    </div>
    <div className="mx-4">
      <a href="https://www.instagram.com/joab_bastidas/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white hover:text-gray-400" />
      </a>
    </div>
    <div className="mx-4">
      <a href="https://twitter.com/Joabbas26" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" className="text-white hover:text-gray-400" />
      </a>
    </div>
    <div className="mx-4">
      <a href="https://github.com/Joabbas26?tab=repositories" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" className="text-white hover:text-gray-400" />
      </a>
    </div>
    </div>
  <div className="mt-4 text-center">
    <p>&copy; 2024 Joab Bastidas. All rights reserved.</p>
    <a href="https://www.flaticon.com/free-icons/technology" title="technology icons">Technology icons created by Freepik - Flaticon</a>
  </div>
</footer>
  )
}