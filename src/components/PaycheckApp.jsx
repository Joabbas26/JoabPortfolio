import React, {useState } from 'react';

export default function PaycheckApp() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [hours, setHours] = useState('');
  const [city, setCity] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
  <div className="MoneyCounter">
    <button onClick={handleShow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add Your Salary Information
    </button>

    {show && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h1 className="text-lg font-bold mb-4">Add Your Salary Information</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input id="firstName" type="text" placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                  <input id="jobTitle" type="text" placeholder="Job Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                  <input id="salary" type="number" placeholder="Hourly Wage" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="hours" className="block text-gray-700 text-sm font-bold mb-2">Hours</label>
                  <input id="hours" type="number" placeholder="Per day" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={hours} onChange={(e) => setHours(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">State 2 Letter Abbreviation</label>
                  <input id="city" type="text" placeholder="State ABRV" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleSubmit}>Save</button>
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )}
  
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