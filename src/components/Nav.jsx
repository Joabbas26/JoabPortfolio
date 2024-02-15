import React, {useState, useEffect} from 'react';
import { Link, NavLink} from 'react-router-dom';

export default function Nav() {

  const [isOpen, setIsOpen] = useState(false);

  return (
<div className="fixed top-0 w-full">
<nav className="bg-gray-800 text-white p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <NavLink to="/" className="text-white font-bold text-xl">Joab Bastidas</NavLink>

        {/* Hamburger Icon for Small Screens */}
        <div className="block md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex md:items-center md:w-auto ${isOpen ? "absolute top-full left-0 bg-gray-800 w-full" : "hidden"} md:relative z-50`}>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li><NavLink to="/projects" className="hover:text-gray-300">Projects</NavLink></li>
            <li><NavLink to="/about" className="hover:text-gray-300">About</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-gray-300">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
</div>
  )
}
