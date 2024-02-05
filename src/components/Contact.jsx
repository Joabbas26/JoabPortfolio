import '../styles/Contact.scss';
import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons"
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
    <div className='contactDiv'>
      <p className='contactTitle'>Get In Touch</p>
      <div className='container' id='contactMainForm'>
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
  )
}

/**
 * 
*              
 <div className='col-md-1 col-sm-3' id='iconDiv'>
    <a href='https://www.amazon.com/'><FontAwesomeIcon icon={faAmazon}/></a>
    <a href='https://github.com/Joabbas26?tab=repositories'><FontAwesomeIcon icon={faGithub}/></a>
    <a href='https://www.instagram.com/joab_bastidas/'><FontAwesomeIcon icon={faInstagram}/></a>
    <a href='https://twitter.com/Joabbas26'><FontAwesomeIcon icon={faTwitter}/></a>
    <a href='https://www.linkedin.com/in/joab-bastidas/'><FontAwesomeIcon icon={faLinkedin}/> </a>
</div>

 */