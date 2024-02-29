import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../reducers/ModalSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';import { toggleEdit } from '../reducers/EditModalSlice';
import { addRow, deleteRow, saveRow } from '../reducers/NewRowSlice';


export default function CRUDApp() {
    const newRow = useSelector((state) => state.newRow);
    const isOpen = useSelector((state) => state.modal.value);
    const editIsOpen = useSelector((state) => state.editModal.value);
    const dispatch = useDispatch();

    // Hooks for all row values
    const [rowNumber, setRowNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setage] = useState('');
    const [overTime, setOverTime] = useState('');
    const [fullTime, setFullTime] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState("");

     // Used to toggle modal show and hide
     const editModalHandler = () => {
        dispatch(toggleEdit());
    }

    // Used to toggle modal show and hide
    const modalHandler = () => {
        dispatch(toggle());
    }

    // Handles deleting row
    function openDeleteHandler (e) {
      e.preventDefault();
        // Get index from tr id
        const rowIndex = parseInt(e.target.parentNode.parentNode.id);
        dispatch(deleteRow( {rowNum: rowIndex} ));  
    }

   // Ref for calculating total
   const totalRef = useRef(0);

   const getRowTotal = () =>{
       var calcTotal = 0;
            // If age is more than 30, but less than 60 get 30 points 
            if (age <= 18) {
                calcTotal += 10;
            } else if (age > 18 && age < 30) {
                calcTotal += 20;
            }else if (age <= 60){
                calcTotal += 30;
                
            }
    
            // If full time get 20 points 
            if (fullTime === 'Yes') {
                calcTotal += 20;
            } else {
                calcTotal += 10;
            }
    
            // If over time more than 5 get 30 points 
            if (overTime < 5) {
                calcTotal += 10;
            } else {
                calcTotal += 20;
            }
    
            // Divide recommendation score by 10 and multiply  by 3 to get 30 points
            if (recommendation <= 100) {
                calcTotal += Math.floor((recommendation / 10) * 3);
            } else {
                calcTotal += 0;
            }
           // Sets ref to calculated total score
           totalRef.current = calcTotal;
  }

  const handleEditSubmit = () => {
    if(firstName === ''){
      setError('Cannot be blank')
    }
    else{
    dispatch(toggleEdit());
     // Adds input data to row
    dispatch(saveRow({
        rowNum: rowNumber,
        fName : firstName,
        lName : lastName, 
        age : age, 
        fTime : fullTime,
        oTime : overTime,
        recomm: recommendation,
        total : totalRef.current,
    }));  
    getRowTotal();
    }
}

   // Handles adding user data to table
   const handleSubmit = () => {
       if(firstName === ''){
        setError('Cannot be blank')
       }
       else{
        dispatch(toggle());
        getRowTotal();

        dispatch(addRow({
           fName : firstName,
           lName : lastName, 
           age : age, 
           fTime : fullTime,
           oTime : overTime,
           recomm: recommendation,
           total : totalRef.current,
       }));  
       }
   }

    // Handles edit of table row
    const openEditHandler = (e) => {
        editModalHandler();
        const rowIndex = parseInt(e.target.parentNode.parentNode.id);
        setRowNumber(rowIndex);
        let rowCounter = 1;
        // loop over values
        for (let value of Object.values(newRow)) {
            if (rowCounter === rowIndex) {
                setFirstName(value.fName);
                setLastName(value.lName);
                setage(value.age);
                setFullTime(value.fTime);
                setOverTime(value.oTime);
                setRecommendation(value.recomm);
            }
            rowCounter += 1;
        }
    }

    // Delete button in row
    const deleteIcon = () => {
        return (
          <FontAwesomeIcon icon={faTrash} className='delete' onClick={openDeleteHandler}/>
    )};

    // Edit button in row
    const editIcon = () => {
        return(
          <FontAwesomeIcon icon={faPencilAlt} className='edit' onClick={openEditHandler}/>
        )
    }

    return (
        <div className='bg-gray-800 relative w-full grow flex justify-center'>
             <div className={`z-60 inset-0 overflow-y-auto ${editIsOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-lg font-bold mb-4">Employee Evaluation</h1>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name*</label>
                <input id="firstName" type="text" placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <p className="text-red-500 text-xs italic">Cannot be left blank</p>
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                <input id="age" type="number" placeholder="In Years" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={age} onChange={(e) => setage(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="fullTime" className="block text-gray-700 text-sm font-bold mb-2">Full-Time</label>
                <select id="fullTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={fullTime} onChange={(e) => setFullTime(e.target.value)}>
                  <option value='...'>...</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="overTime" className="block text-gray-700 text-sm font-bold mb-2">Overtime</label>
                <input id="overTime" type="number" placeholder="In Hours" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={overTime} onChange={(e) => setOverTime(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="recommendation" className="block text-gray-700 text-sm font-bold mb-2">Recommendation</label>
                <input id="recommendation" type="number" placeholder="Score" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleEditSubmit}>Save</button>
            <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded" onClick={editModalHandler}>Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div className={`z-60 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-lg font-bold mb-4">Employee Evaluation</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name*</label>
                <input id="firstName" type="text" placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <p className="text-red-500 text-xs italic">Cannot be left blank</p>
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                <input id="age" type="number" placeholder="In Years" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={age} onChange={(e) => setage(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="fullTime" className="block text-gray-700 text-sm font-bold mb-2">Full-Time</label>
                <select id="fullTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={fullTime} onChange={(e) => setFullTime(e.target.value)}>
                  <option value='...'>...</option>
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="overTime" className="block text-gray-700 text-sm font-bold mb-2">Overtime</label>
                <input id="overTime" type="number" placeholder="In Hours" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={overTime} onChange={(e) => setOverTime(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="recommendation" className="block text-gray-700 text-sm font-bold mb-2">Recommendation</label>
                <input id="recommendation" type="number" placeholder="Score" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleSubmit}>Save</button>
            <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded" onClick={modalHandler}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
            
    <div className="justify-center items-center py-20 bg-gray-800">
      <div className="justify-center container mx-auto px-4">
          <h1 className="text-3xl mb-6 font-bold text-center">CRUD App</h1>
          <div className="overflow-x-auto">
              <table className="table-auto border">
                  <thead>
                      <tr>
                          <th className="border px-4">#</th>
                          <th className="border px-4">First Name</th>
                          <th className="border px-4">Last Name</th>
                          <th className="border px-4">Age</th>
                          <th className="border px-4">Full-Time</th>
                          <th className="border px-4">Overtime</th>
                          <th className="border px-4">Recommendation</th>
                          <th className="border px-4">Total</th>
                          <th className="border px-4">Edit</th>
                          <th className="border px-4">Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      {newRow.map((row, index) => (
                          <tr key={uuidv4()} id={index + 1} className="border">
                              <td className="border px-4">{index + 1}</td>
                              <td className="border px-4">{row.fName}</td>
                              <td className="border px-4">{row.lName}</td>
                              <td className="border px-4">{row.age}</td>
                              <td className="border px-4">{row.fTime}</td>
                              <td className="border px-4">{row.oTime}</td>
                              <td className="border px-4">{row.recomm}</td>
                              <td className="border px-4">{row.total}</td>
                              <td className="border px-4">{editIcon()}</td>
                              <td className="border px-4">{deleteIcon()}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <FontAwesomeIcon icon={faPlusSquare} className="w-8 h-8 border-2 border-green-600 rounded-lg my-1" onClick={modalHandler}/>
      </div>
    </div>

  </div>
)
}

