import { Link } from 'react-router-dom';
import Joab from '../assets/Joab.png'


export default function Home() {

  return (
  <div className='bg-gray-800 w-full grow'>
    <div className='container flex flex-col mx-auto px-4 py-16 justify-between items-center md:flex-row md:pl-16'>
      <div className='md:w-1/2'>
        <h1 className='mb-5'>Welcome to My Site</h1>
        <button className='rounded-xl border-white bg-gray-800 p-3 mr-2 mb-5 inline-block'><Link to='/projects'>Full Stack</Link></button>
        <button className='rounded-xl border-white bg-gray-800 p-3 mr-2 mb-5 inline-block2 cursor-not-allowed'>Coming Soon</button>
        <span className="flex flex-wrap justify-center gap-1 items-center bg-gray-600 rounded-md p-1 mt-20 md:w-4/5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042" alt="Tailwind CSS Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="Redux Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" alt="Git Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="SQL Logo" className="h-10"/>
        </span>
        </div>
        <div id='profilePic' className='md:w-1/2'>
          <img className='img-fluid' id='circleImage' src={Joab} alt="mainImage"/>
        </div>
    </div>
  </div>
  );
}
