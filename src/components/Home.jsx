import { Link } from 'react-router-dom';
import Joab from '../assets/Joab.png'
import ExcelLogo from '../assets/ExcelLogo.png'

export default function Home() {
  
  return (
  <div className='bg-gray-800 w-full grow'>
    <div className='container flex flex-col mx-auto px-4 py-16 justify-between items-center md:flex-row md:pl-16'>
      <div className='md:w-1/2'>
        <h1 className='mb-2 text-white'>Joab Bastidas</h1>
        <p className='mb-5 text-gray-300 text-lg'>Data Analyst in Training | Web Developer | iOS Developer</p>
        <Link className='rounded-xl border border-white bg-gray-800 p-3 mr-2 mb-5 inline-block text-white hover:bg-blue-700 hover:text-white' to='/projects#data-projects'>Data Projects</Link>
        <Link className='rounded-xl border border-white bg-gray-800 p-3 mr-2 mb-5 inline-block text-white hover:bg-blue-700 hover:text-white' to='/projects#full-stack-projects'>Full Stack</Link>
        <Link className='rounded-xl border border-white bg-gray-800 p-3 mr-2 mb-5 inline-block text-white hover:bg-blue-700 hover:text-white' to='/projects#ios-projects'>iOS Apps</Link>
        <span className="flex flex-wrap justify-center gap-1 items-center bg-gray-600 rounded-md p-1 mt-12 md:w-4/5 grow">
            {/* Data Analytics */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="SQL Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" alt="Power BI Logo" className="h-10"/>
            <img src={ExcelLogo} alt="Excel Logo" className="h-10"/>
            {/* Web Development */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" className="h-10"/>
          <img src="https://cdn.simpleicons.org/tailwindcss" alt="Tailwind CSS Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" className="h-10"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" alt="Git Logo" className="h-10"/>
        </span>
        </div>
        <div id='profilePic' className='md:w-1/2'>
          <img className='img-fluid' id='circleImage' src={Joab} alt="mainImage"/>
        </div>
    </div>
  </div>
  );
}
