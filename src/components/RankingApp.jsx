import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../reducers/ModalSlice';
// import { Trash, PencilSquare, PlusSquare } from 'react-bootstrap-icons';
import { toggleEdit } from '../reducers/EditModalSlice';
import { addRow, deleteRow, saveRow } from '../reducers/NewRowSlice';
// import { v4 as uuidv4 } from 'uuid';


export default function RankingApp() {
    // Use dispatch declaration and modal state from redux
    const newRow = useSelector((state) => state.newRow);
    const isOpen = useSelector((state) => state.modal.value);
    const editIsOpen = useSelector((state) => state.editModal.value);
    const dispatch = useDispatch();

    // Hooks for all row values
    const [rowNumber, setRowNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyTime, setCompanyTime] = useState('');
    const [overTime, setOverTime] = useState('');
    const [fullTime, setFullTime] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [inputStyle, setInputStyle] = useState({});
    const [textValidationStyle, setTexValidationStyle] = useState({ display: 'none'});

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
            // If comp time more than 50 get 30 points 
            if (companyTime <= 10) {
                calcTotal += 10;
            } else if (companyTime > 10 && companyTime < 50) {
                calcTotal += 20;
            }else if (companyTime >= 50){
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
     // Add text description
     setInputStyle({border: 'solid red 1px'});
     setTexValidationStyle({fontSize:'.4rem', color: 'red', display: 'block'})
    }
    else{
    dispatch(toggleEdit());
     // Adds input data to row
    dispatch(saveRow({
        rowNum: rowNumber,
        fName : firstName,
        lName : lastName, 
        compTime : companyTime, 
        fTime : fullTime,
        oTime : overTime,
        recomm: recommendation,
        total : totalRef.current,
    }));  
    getRowTotal();
    setInputStyle({border: 'solid #ced4da 1px'});
    setTexValidationStyle({display: 'none'});
    }
}

   // Handles adding user data to table
   const handleSubmit = () => {
       if(firstName === ''){
        // Add text description
        setInputStyle({border: 'solid red 1px'});
        setTexValidationStyle({fontSize:'.4rem', color: 'red', display: 'block'})
       }
       else{
        dispatch(toggle());
        getRowTotal();
        // Adds input data to row
        dispatch(addRow({
        //    rowNum: rowNumber,
           fName : firstName,
           lName : lastName, 
           compTime : companyTime, 
           fTime : fullTime,
           oTime : overTime,
           recomm: recommendation,
           total : totalRef.current,
       }));  
       setInputStyle({border: 'solid #ced4da 1px'});
       setTexValidationStyle({display: 'none'});
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
                setCompanyTime(value.compTime);
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
          <Trash className='delete' id='icon' style={{height:30, width:50}} onClick={openDeleteHandler}/>
    )};

    // Edit button in row
    const editIcon = () => {
        return(
          <PencilSquare className='edit' id='icon' style={{height:30, width:50}} onClick={openEditHandler}/>
        )
    }

    return (
        <div className='mainTable'>
            <Modal className='editModal' onHide={editModalHandler} show={editIsOpen}>
        <Modal.Header>
            <Modal.Title>Employee Evaluation</Modal.Title>
            <CloseButton onClick={editModalHandler}/>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control type="text" placeholder="First Name" 
                    value={firstName} onInput={e => setFirstName(e.target.value)} style={inputStyle}/>
                    <p style={textValidationStyle}>Cannot be left blank</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" 
                    value={lastName} onInput={e => setLastName(e.target.value)}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridYearsAtCompany">
                    <Form.Label>Time At Company</Form.Label>
                    <Form.Control placeholder="In Years" type="number" 
                    value={companyTime} onInput={e => setCompanyTime(e.target.value)}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFullTime">
                    <Form.Label>Full-Time</Form.Label>
                    <Form.Control as="select" value={fullTime} onChange={e => setFullTime(e.target.value)}>
                        <option value='...'>...</option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridOvertime">
                    <Form.Label>Overtime</Form.Label>
                    <Form.Control placeholder='In Hours' type="number" 
                    value={overTime} onInput={e => setOverTime(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRecommendtion">
                    <Form.Label>Recommendation</Form.Label>
                    <Form.Control placeholder='Score' type="number"
                    value={recommendation} onInput={e => setRecommendation(e.target.value)}/>
                    </Form.Group>
                </Row>

            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleEditSubmit}>Save</Button>
        </Modal.Footer>
    </Modal>


            <Modal className='modal' onHide={modalHandler} show={isOpen}>
                <Modal.Header>
                    <Modal.Title>Employee Evaluation</Modal.Title>
                    <CloseButton onClick={modalHandler}/>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control type="text" placeholder="First Name"
                            value={firstName} onInput={e => setFirstName(e.target.value)}  style={inputStyle}/>
                            <p style={textValidationStyle}>Cannot be left blank</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" 
                            value={lastName} onInput={e => setLastName(e.target.value)}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridYearsAtCompany">
                            <Form.Label>Time At Company</Form.Label>
                            <Form.Control placeholder="In Years" type="number" 
                            value={companyTime} onInput={e => setCompanyTime(e.target.value)}/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFullTime">
                            <Form.Label>Full-Time</Form.Label>
                            <Form.Control as="select" value={fullTime} onChange={e => setFullTime(e.target.value)}>
                                <option value='...'>...</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridOvertime">
                            <Form.Label>Overtime</Form.Label>
                            <Form.Control placeholder='In Hours' type="number" 
                            value={overTime} onInput={e => setOverTime(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRecommendtion">
                            <Form.Label>Recommendation</Form.Label>
                            <Form.Control placeholder='Score' type="number"
                            value={recommendation} onInput={e => setRecommendation(e.target.value)}/>
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>

            <h1 className='tableTitle'>Employee Ranking</h1>
            <div className="table-responsive">
                    <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Years At Company</th>
                                    <th>Full-Time</th>
                                    <th>Overtime</th>
                                    <th>Recommendation</th>
                                    <th>Total</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newRow.map((row, index) => (
                                    <tr key={uuidv4()} id={index+1}>
                                        <td>{index+1}</td>
                                        <td>{row.fName}</td>
                                        <td>{row.lName}</td>
                                        <td>{row.compTime}</td>
                                        <td>{row.fTime}</td>
                                        <td>{row.oTime}</td>
                                        <td>{row.recomm}</td>
                                        <td>{row.total}</td>
                                        <td>{editIcon()}</td>
                                        <td>{deleteIcon()}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    <PlusSquare className='addRow' id='icon' onClick={modalHandler} style={{height:30, width:30}}/>
                </div>
            </div>
    )
}
