import React, {useState } from 'react';

export default function PaycheckApp() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [city, setCity] = useState('');
  const [earnings, setEarnings] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [showData, setShowData] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Function to handle city input change
  const handleCityChange = (e) => {
    // Get the input value and convert it to uppercase
    let inputVal = e.target.value.toUpperCase();

    // Check if the input consists of exactly 2 letters
    if (/^[A-Z]{2}$/.test(inputVal)) {
      // Update the state with the validated and capitalized input
      setCity(inputVal);
    }
  };

  // Function to handle work hours input change
  const handleWorkHoursChange = (e) => {
    let inputVal = parseInt(e.target.value);

    // Check if the input is a positive integer between 0 and 16
    if (!isNaN(inputVal) && inputVal >= 0 && inputVal <= 16) {
      // Update the state with the validated input
      setWorkHours(inputVal);
    }
  };

  // Function to handle salary input change
  const handleSalaryChange = (e) => {
    let inputVal = parseInt(e.target.value);

    // Check if the input is a positive integer between 0 and 100,000
    if (!isNaN(inputVal) && inputVal >= 0 && inputVal <= 100000) {
      // Update the state with the validated input
      setSalary(inputVal);
    }
  };

  const toggleStop = () => {
    setEndTime(time);
  }

  const toggleClear = () => {
    setEndTime('')
  }

  const handleSubmit = () => {
    setShow(false)
    setStartTime(time)
    setEarnings((salary / workHours).toFixed(2));
    setShowData(true);
  }

  return (
    <div className="justify-center items-center py-20 bg-gray-800 grow h-screen">
        {/* Modal for inputting data */}
          <div className={`z-60 inset-0 overflow-y-auto ${show === false ? 'hidden' : 'block'}`}>
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className='bg-white rounded-lg p-5 w-80 z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-all'>
              <p className="text-xl justify-center text-gray-700 my-1 lg:text-2xl">Add Your Salary Information</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input id="firstName" type="text" placeholder="First Name" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                  <input id="jobTitle" type="text" placeholder="Job Title" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                  value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                  <input id="salary" type="number" placeholder="Hourly Wage" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                  value={salary} onChange={(e) => handleSalaryChange(e)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="workHours" className="block text-gray-700 text-sm font-bold mb-2">Work Hours</label>
                  <input id="workHours" type="number" placeholder="Per day" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                  value={workHours} onChange={(e) => handleWorkHoursChange(e)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">State 2 Letter Abbreviation</label>
                  <input id="city" type="text" placeholder="State ABRV" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                  value={city} onChange={(e) => handleCityChange(e)} />
                </div>
              </form>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleSubmit}>Calculate</button>
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded" onClick={handleClose}>Cancel</button>
            </div>
            </div>   
          </div>

          <div className="justify-center items-center py-20 bg-gray-800">
            <div className="justify-center mx-auto px-4">
              <h2 className='text-3xl mb-12 font-bold text-center'>How Much Are You Making?</h2>
              <div className="text-center my-4">
                <button className='rounded-lg my-1 cursor-pointer' onClick={handleShow}>Calculate Earnings</button>
              </div>
              <div className={`${showData === false ? 'hidden' : 'block'}`}>
                <div className='text-center my-4'>
                  <h3>{jobTitle} {firstName}'s Income</h3>
                </div>
                <div className='text-center my-4'>
                  <p className="earnings">${earnings}</p>
                </div>
                <div className="text-center my-4">
                  <div className='flex flex-row justify-center'>
                    <p className='inline-block md:mr-4'>Start Time: {startTime}</p>
                    <button className="inline-block mx-4" onClick={toggleStop}>Stop</button>
                    <button className="inline-block mx-4" onClick={toggleClear}>Clear</button>
                    <p className='inline-block md:ml-4'>End Time: {endTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

  </div>
  );
}