import { useRef } from 'react';
import Joab from '../assets/Joab.png'
import '../styles/Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon, faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"


export default function Home() {

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior:'smooth'});
  }

  return (
    <div className='py-6 px-4 sm:p-6 md:py-10 md:px-8'>
      <p className='space-y-4'>Welcome to My Site</p>
        <div className='container'>
          <div className='row' id='optionsDiv'>
              <div className='col-md-4 col-sm-12' id='textsDiv'>
                    <ul className="content__container__list" onClick={handleClick}>
                      <li className="content__container__list__item">HTML</li>
                    </ul>
                <p className= 'appsText' onClick={handleClick}>Apps</p>
                <p className='novelText anim-typewriter' onClick={handleClick}>Author</p>
              </div>
              <div className='col-md-8 col-sm-12' id='circleDiv'>
                <img className='img-fluid' id='circleImage' src={Joab} alt="mainImage"/>
              </div>
            </div>
          </div>   
        </div>
  );
}
