import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import emailjs from 'emailjs-com';

export default function Contact() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorResult, seterrorResult] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.trim() === "" && message.trim() === ""){
      seterrorResult("Required fields cannot be empty")
      setShowConfirmation(true);
      return
    }
    
    if(!isValidEmail(email)) {
      seterrorResult("Email address invalid");
      setShowConfirmation(true);
      return
    }

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name, email, message },
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then(() => {
      seterrorResult("Message Sent Successfully!");
      setShowConfirmation(true);
      // Clear input fields
        if (nameInputRef.current) nameInputRef.current.value = "";
        if (emailInputRef.current) emailInputRef.current.value = "";
        if (messageInputRef.current) messageInputRef.current.value = "";
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
  };


  return (
    <div className="bg-gray-800 py-20 grow w-full flex justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl mb-6 font-bold text-center text-white">Contact Me</h1>
      <div className="container lg:w-2/3 px-6 py-8 bg-gray-700 rounded-3xl mx-auto flex flex-col md:flex-row">
        
        {/* Contact Form */}
        <div className="md:w-1/2 md:pr-8">
          <form className='mb-2' onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" 
              className="w-full px-3 py-2 border rounded-md text-black bg-white" 
              onChange={(e) => setName(e.target.value)}
              ref={nameInputRef}/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" 
              className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errorResult === 'Required fields cannot be empty' || errorResult === 'Email address invalid' ? 'border-red-500' : 'bg-white'}`}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}/>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" 
              className={`w-full px-3 py-2 border rounded-md text-black bg-white ${errorResult === 'Required fields cannot be empty' ? 'border-red-500' : 'bg-white'}`}
              onChange={(e) => setMessage(e.target.value)} ref={messageInputRef}/>
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md" onClick={handleSubmit}>Send</button>
          </form>
          {showConfirmation && (
          <p className={`border ${errorResult === 'Required fields cannot be empty' || errorResult === 'Email address invalid' ? 'bg-red-600' : 'border-green-500'}
          p-2 text-white mx-1`}>
            {errorResult}
          </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-white mr-2" />
            <span className="text-white">Joabbastidas@gmail.com</span>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white mr-2" />
            <span className="text-white">New York, NY</span>
          </div>
          <div className="flex items-center">
            <a href="https://www.linkedin.com/in/joab-bastidas/" className="text-white hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://github.com/Joabbas26?tab=repositories" className="text-white hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://www.instagram.com/joab_bastidas/" className="text-white hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://twitter.com/Joabbas26" className="text-white hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}