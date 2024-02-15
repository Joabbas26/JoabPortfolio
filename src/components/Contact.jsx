import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon, faGithub, faInstagram, faLinkedin, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"
import emailjs from 'emailjs-com';

export default function Contact() {
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [resultStyle, setResultStyle] = useState()
  const [requiredStyle, setRequiredStyle] = useState()
  const form = useRef();

  function handleSubmit (e) {
    e.preventDefault();
    if((email == "" && number == "")){
      setResultStyle({display: "block", border: "solid red 5px"})
      setRequiredStyle({border: "solid red 5px"})
      setResult("Required fields cannot be empty")
    }
    else {
    // setResult("Message Sent Successfully!");
    // setResultStyle({display: "block", border: "solid green 1px"})
      const details = {
      name: name.value,
      number: number.value,
      email: email.value,
      message: message.value,
    };
    emailjs
    .send(
      "service_v16sidi",
      "template_wjaoovc",
      {
        name,
        number,
        email,
        message,
      },
      "BkTBjQCdtQ_kvasib"
    )
    .then(() => {
      setResult("Message Sent Successfully!");
      setResultStyle({display: "block", border: "solid green 1px"})
      setName("")
      setNumber("")
      setEmail("")
      setMessage("")
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    });
  }
}

  return (
    <div className="bg-gray-800 min-h-screen w-full flex items-center justify-center">
    <div className="w-full md:w-2/3 px-6 py-8 bg-gray-400 rounded-3xl">
      <div className="container mx-auto flex flex-col md:flex-row">
        {/* Contact Form */}
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-2xl text-gray-200 font-bold mb-4">Contact Me</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" className="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Send</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-700 mr-2" />
            <span className="text-gray-700">example@example.com</span>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faPhone} className="text-gray-700 mr-2" />
            <span className="text-gray-700">+123 456 7890</span>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-700 mr-2" />
            <span className="text-gray-700">123 Main St, City, Country</span>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-gray-700 hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-500 mr-4"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="text-gray-700 hover:text-blue-500"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

/**
 * 
*              
 








import React from 'react';


const ContactPage = () => {
  return (
    
  );
};









<div className='bg-gray-100 min-h-screen'>
      <p className='contactTitle'>Get In Touch</p>
      <div className='container mx-auto p-6 flex flex-col md:flex-row'>
        <div className='row'>
          <div className='col-md-8' id='contactForm'>
            <form ref={form} onSubmit={handleSubmit} method="POST">
              <div className='row'>
                <div className='col'>
                  <label htmlFor='name'>Name</label>
                  <br/>
                  <input className='form-control' type='text' name='name' 
                  value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name'/>
                </div>
                <div className='col'>
                  <label htmlFor='number'>Phone Number</label>
                  <br/>
                  <input className='form-control' type='tel' name='number' 
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder='123-456-7890'
                  value={number} onChange={(e) => setNumber(e.target.value)} 
                  style={{requiredStyle}}/>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <label htmlFor='email'>Email</label>
                  <br/>
                  <input className='form-control' type='email' name='email' 
                  placeholder='Email Address' value={email} required
                  onChange={(e) => setEmail(e.target.value)} style={{requiredStyle}}/>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <label htmlFor='message'>Message</label>
                  <br/>
                  <textarea className='form-control' name="message" rows="4" cols="50" 
                  value={message} onChange={(e) => setMessage(e.target.value)} required/>
                </div>
              </div>
              <div className='row' id='successOrFailure' style={resultStyle}>
                <p>{result}</p>
              </div>
              <button className='btn btn-primary' id='submitButton' onClick={handleSubmit}>Submit</button>
            </form>
          </div>
          <div className='col-md-4' id='contactInfoDiv'>
            <p className='contactInfo'>Contact Info</p>
            <div className='emailInfo'>
                <FontAwesomeIcon icon={faEnvelope} />
               <p> Joabbastidas@gmail.com </p>
            </div>
            <div className='linkedInInfo'>
              <FontAwesomeIcon icon={faLinkedin}/>
              <p>Linkedin.com/joab_bastidas </p>
            </div>
            <div className='instagramInfo'>
            <FontAwesomeIcon icon={faInstagram}/>
              <p>Instagram.com/joabbas26 </p>
            </div>
            <div className='twitterInfo'>
              <FontAwesomeIcon icon={faTwitter}/>  
              <p>Twitter.com/joab_bastidas </p>
            </div>
          </div>
        </div>
      </div>
    </div>








<div className='col-md-1 col-sm-3' id='iconDiv'>
    <a href='https://www.amazon.com/'><FontAwesomeIcon icon={faAmazon}/></a>
    <a href='https://github.com/Joabbas26?tab=repositories'><FontAwesomeIcon icon={faGithub}/></a>
    <a href='https://www.instagram.com/joab_bastidas/'><FontAwesomeIcon icon={faInstagram}/></a>
    <a href='https://twitter.com/Joabbas26'><FontAwesomeIcon icon={faTwitter}/></a>
    <a href='https://www.linkedin.com/in/joab-bastidas/'><FontAwesomeIcon icon={faLinkedin}/> </a>
</div>

 */