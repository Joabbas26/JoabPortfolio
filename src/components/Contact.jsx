import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
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
    <div className="bg-gray-800 py-20 min-h-screen w-full flex justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl mb-6 font-bold text-center ">Contact Me</h1>
      <div className="container lg:w-2/3 px-6 py-8 bg-gray-700 rounded-3xl mx-auto flex flex-col md:flex-row">
        {/* Contact Form */}
        <div className="md:w-1/2 md:pr-8">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" className="w-full px-3 py-2 border rounded-md text-black"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Send</button>
          </form>
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