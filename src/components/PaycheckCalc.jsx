import React, {useState, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { CloseButton } from 'react-bootstrap';

export default function PaycheckCalc() {
  const [firstName, setFirstName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [Salary, setSalary] = useState(0);
  const [City, setCity] = useState('');
  const [tax, setTax] = useState(0);
  const [Hours, setHours] = useState(0);
  const [Earnings, setEarnings] = useState(0);
  const [Cleared, setCleared] = useState(false);
  const [Stopped, setStopped] = useState(false);
  const [Time, setTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [CentsPerSec, setCentsPerSec] = useState(0);
  const [maxEarnings, setmaxEarnings] = useState(0);
  const [maxSeconds, setmaxSeconds] = useState(0);


  // Showing and Hiding Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Disply style hook
  const [timer_style, setTimer_Style] = useState({display: 'none'});

  // Axios api call
  useEffect(()=>{
    axios.get('/Data.json')
    .then((res) => {
      let matchingResult = JSON.stringify(res.data);
      setTax(parseFloat(JSON.parse(matchingResult).states[City]));
      // console.log(JSON.parse(matchingResult).states[City]);
    })
  }, [City])

const toggleStop = () => {
  setStopped(true)
}

// Add code to clear values and form
const toggleClear = () => {
  setCleared(true);
  if(Cleared){
    setEarnings('');
    setFirstName("");
    setCity('');
    setJobTitle('');
    setHours();
    setSalary('');
  }
}

  // Handles adding user data to timer
const handleSubmit = () => {
    handleClose();
    setTimer_Style({display: 'block'});
    // Then run useEffect 
    setTime(moment().format("hh:mm A"));
    setEndTime(moment().add(Hours, 'hours').format('hh:mm A'));
    setCentsPerSec((Salary / tax) / (Hours * 3600));
    setmaxSeconds(Hours * 3600);
    setmaxEarnings(Salary / tax);
    console.log("max seconds: " + maxSeconds);
    console.log("max earnings: " + maxEarnings);
    console.log("cents per sec: " + CentsPerSec);
}

  //Timer to update money
    useEffect(() => {

      let mainTimer = setTimeout(() => {
      //This will run every second
        while(Earnings < maxEarnings){
          setEarnings((Earnings + CentsPerSec).toFixed(2));
        }
      }, 1000);
      if (Stopped) {
        return clearTimeout(mainTimer);
      }
    }, [CentsPerSec, Stopped, Earnings, Time, EndTime, maxEarnings]);

  return (
    <div className="MoneyCounter">
      <Modal className='Modal' show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Add Your Salary Information</Modal.Title>
            <CloseButton onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First Name" 
                      value={firstName} onInput={e => setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridJobTitle">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control type="text" placeholder="Job Title" 
                      value={jobTitle} onInput={e => setJobTitle(e.target.value)}/>
                    </Form.Group>
                </Row>

            
                <Row>
                    <Form.Group className="mb-3" controlId="formGridSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control placeholder="Hourly Wage" type="number" 
                        value={Salary} onInput={e => setSalary(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridHours">
                        <Form.Label>Hours</Form.Label>
                        <Form.Control placeholder="Per day" type="number" 
                        value={Hours} onInput={e => setHours(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>State 2 Letter Abriviation</Form.Label>
                    <Form.Control placeholder="State ABRV" type="text" 
                        value={City} onInput={e => setCity(e.target.value)}/>
                    </Form.Group>
                </Row>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
    </Modal>
    
      <h2 className='articleHeading'>Calculate How Much Money You Make Per Second</h2>
      <button className='btn btn-primary' onClick={handleShow}>Calculate Earnings</button>
      

      <main className='timer__display' style={timer_style}>
        <h3>{jobTitle} {firstName}'s Income</h3>
        <p className="earnings">${Earnings}</p>
        <span id="playBackButtons">
          <p id='startTime'>Start Time: {Time}</p>
            <button className="btn btn-primary" id='stopBtn' onClick={toggleStop}>Stop</button>
            <button className="btn btn-primary" id='clearBtn' onClick={toggleClear}>Clear</button>
          <p id='endTime'>End Time: {EndTime}</p>
        </span>
      </main>
      
    </div>
  );
}

/**

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function App() {
  // Declare a state variable for the modal data
  const [modalData, setModalData] = useState({ hourlyWage: 0, hoursPerWeek: 0 });
  const [showModal, setShowModal] = useState("")
  // Function to handle input changes in the modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Function to calculate the money earned per second based on the modal data
  const calculateMoneyPerSecond = () => {
    // Calculate the money earned per second
    const moneyPerSecond = modalData.hourlyWage / (modalData.hoursPerWeek * 3600);
    // Update the state with the calculated value
    setMoneyPerSecond(moneyPerSecond);
  };

  // Declare a state variable for the money earned per second
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);

  return (
    <div>
      { Render a button to open the modal }
      <button type="button" onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      { Render the modal }
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Hourly Wage and Hours per Week</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { Render form inputs for the modal data }
          <form>
            <div className="form-group">
              <label htmlFor="hourlyWage">Hourly Wage:</label>
              <input
                type="number"
                name="hourlyWage"
                id="hourlyWage"
                value={modalData.hourlyWage}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hoursPerWeek">Hours per Week:</label>
              <input
                type="number"
                name="hoursPerWeek"
                id="hoursPerWeek"
                value={modalData.hoursPerWeek}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          { Render a button to close the modal and calculate the money earned per second }
          <button type="button" onClick={() => { setShowModal(false); calculateMoneyPerSecond(); }}>
            Calculate
          </button>
        </Modal.Footer>
      </Modal>
      { Render the money earned per second }
      <h1>Money Earned per Second: ${moneyPerSecond.toFixed(2)}</h1>
    </div>
  );
}




 */