import { Link } from 'react-router-dom';
import Joab from '../assets/Joab.png'


export default function Home() {

  return (
  <div className='bg-gray-800'>
    <div id='circle1'></div>
    <div id='circle1'></div>
    <div id='circle1'></div>
    <div id='circle1'></div>
    <div className='container flex mx-auto px-16 py-16 justify-items-space-between'>
      <div id='projects' className='w-1/2'>
        <h1>About Me</h1>
        <p className='rounded border border-white p-4 inline-block'>Full Stack</p>
        <p className='rounded border border-white p-4 inline-block'>Coming Soon</p>
        <div className="flex flex-wrap justify-center items-center bg-gray-600 rounded-md">
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png?20230715030042" alt="Tailwind CSS Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="Redux Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" alt="Git Logo" className="h-10"/>
          </div>
          <div className="m-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="SQL Logo" className="h-10"/>
          </div>
        </div>
        <div id='profilePic' className='w-1/2'>
          <img className='img-fluid' id='circleImage' src={Joab} alt="mainImage"/>
        </div>
      </div>
    </div>
  </div>
  );
}
