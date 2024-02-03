import { useRef } from 'react';
import Joab from './assets/Joab.png'
import './src/styles/Home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmazon, faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"


export default function Home() {

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior:'smooth'});
  }

  return (
    <div className='HomeDiv'>
      <p className='homeTitle'>Welcome to My Site</p>
        <div className='container'>
          <div className='row' id='optionsDiv'>
              <div className='col-md-4 col-sm-12' id='textsDiv'>
                <div className="content" id='devText'>
                  <div className="content__container">
                    <ul className="content__container__list" onClick={handleClick}>
                      <li className="content__container__list__item">HTML</li>
                      <li className="content__container__list__item">CSS</li>
                      <li className="content__container__list__item">JavaScript</li>
                      <li className="content__container__list__item">React</li>
                    </ul>
                  </div>
                </div>
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
