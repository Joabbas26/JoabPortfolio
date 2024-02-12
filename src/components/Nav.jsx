import React, {useState, useEffect} from 'react';
import { Link, NavLink} from 'react-router-dom';
import '../styles/Nav.scss';

export default function Nav() {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [navStyle, setNavStyle] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
    toggleMenu === true ? setNavStyle({display:'none'}) : setNavStyle({display:'block'});
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  return (
    <div className='navDiv'>
        <nav className='relative container mx-auto p-6'>
          <div className='flex items-center justify-between'>
            <div className='pt-2'>
              <NavLink to="/" className="brand">Joab Bastidas</NavLink>
            </div>
            <div className='hidden:flex space-x-6'>
              <ul className="nav-list" style={navStyle}>
                <li onClick={toggleNav}><Link to="/projects">Projects</Link></li>
                <li onClick={toggleNav}><Link to="/about">About</Link></li>
                <li onClick={toggleNav}><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

/**
 
<div className="nav-container">
            <NavLink to="/" className="brand">Joab Bastidas</NavLink>
            <nav>
                <div className="nav-mobile">
                    <button id="nav-toggle" onClick={toggleNav}>
                      <span></span>
                      </button>
                </div>
                {(toggleMenu || screenWidth > 500) && (
                <ul className="nav-list" style={navStyle}>
                    <li onClick={toggleNav}><Link to="/projects">Projects</Link></li>
                    <li onClick={toggleNav}><Link to="/about">About</Link></li>
                    <li onClick={toggleNav}><Link to="/contact">Contact</Link></li>
                </ul>
                )}
            </nav>
        </div>


 */