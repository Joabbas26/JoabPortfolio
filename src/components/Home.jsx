import { Link } from 'react-router-dom';
import Joab from '../assets/Joab.png'
import '../styles/Home.scss'


export default function Home() {

  return (
    <div className='py-6 px-4 sm:p-6 md:py-10 md:px-8'>
      <p className='space-y-4'>Welcome to My Site</p>
        <div className='container'>
          <div className='row' id='optionsDiv'>
              <div className='col-md-4 col-sm-12' id='textsDiv'>
                    <ul className="list-none" >
                      <li><Link to="/projects">Full Stack</Link></li>
                    </ul>
              </div>
              <div className='col-md-8 col-sm-12' id='circleDiv'>
                <img className='img-fluid' id='circleImage' src={Joab} alt="mainImage"/>
              </div>
            </div>
          </div>   
        </div>
  );
}
