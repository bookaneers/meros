// import dependencies and libraries
import React,{ useState, useRef} from 'react';
import {Form, Button, Alert  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../utils/tools'

// import components and functions
import { addPartToMeros } from "../../store/utils/thunks";
import { addDescriptionToOnePart, clearOnePart } from '../../store/reducers/onepart';
import AddProcess from './addprocess';

const AddDescription = () => {
    // give access to State and provide array with the parts that are showing up on the screen
    const onepart = useSelector((state) => state.onepart);

    //set objects to identify errors and visualize parts of the page
    const [showProcesses,setShowProcesses] = useState(false);
    //set objects to identify errors and visualize parts of the page
    const [error,setError] = useState([false, '']);
    
    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    // define const for input info from the DOM using useRef()
    const descriptionInput = useRef();

    const addDescription = (e) => {
        e.preventDefault();
        setError([false, '']) //get ready of the error messages

        // define const to obtain inputs form the DOM
        const descriptionValue = descriptionInput.current.value;

        // define const to hold result form validatePartInput function
        const validateDesc = validateDescInput(descriptionValue);

        // if data is correct, then dispatch to the database to be validated
        if (validateDesc) {
            dispatch(addDescriptionToOnePart(descriptionValue))
            setShowProcesses(true)
        }
    }

    // define function to validate errors
    const validateDescInput = (descriptionValue) => {
        if (descriptionValue === '' ) {
            setError([true, 'Description can not be empty'])
            return false
        }
        if (descriptionValue.length < 5 || descriptionValue.length > 75) {
            setError([true, 'Description must be between 5-75 characters'])
            return false
        }
        return true
    }

    // function to handle changes in state and database
    const handleSubmitChanges = (e) => {
        e.preventDefault();

        dispatch(addPartToMeros({onepart}))
        .unwrap()
        .then((response) => { // activate toasts to SUCCESS or ERROR

            if (response.result === 'added'){
                showToast('SUCCESS', 'New part was added')
                setShowProcesses(false)
                dispatch(clearOnePart({
                    partNumber:'',
                    description:'',
                    processes:[
                        {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                         'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
                    ]
                })
                )
            } else {
                showToast('ERROR', 'Action not completed')
            }
        })
    }

    const cancelChanges = (e) => {
        e.preventDefault();
        dispatch(clearOnePart({
            partNumber:'',
            description:'',
            processes:[
                {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
            ]
        })
        )
    }

    return(
        <div className="form">
            <Form className='mt-4'>
            { !showProcesses ?
            <>
                <Form.Group>
                    <Form.Control
                    name="partNumber"
                    value={onepart.oneItem.partNumber}
                    disabled={true}
                    />
                </Form.Group>
                <Form.Group className='input-group mt-3'>
                    <Form.Control
                    name="description"
                    placeholder="Enter description..."
                    ref={descriptionInput}
                    />
                    <Button onClick={(e)=> addDescription(e)} className='ms-5' variant="secondary" type="button">
                        Add description
                    </Button>
                </Form.Group>
                {error[0] ?
                    <Alert className='mt-3'>
                        {error[1]}
                    </Alert>
                :null}
            </>
            :
            <>
                <Form.Group>
                    <Form.Control
                    name="partNumber"
                    value={onepart.oneItem.partNumber}
                    disabled={true}
                    />
                    <Form.Control
                    className='input-group mt-3'
                    name="description"
                    value={onepart.oneItem.description}
                    disabled={true}
                    />
                </Form.Group>

                <AddProcess/>

                <Button onClick={(e) => handleSubmitChanges(e)} className='mt-5' variant="primary" type="button">
                    Submit new part
                </Button>
                <Button onClick={(e) => cancelChanges(e)} className='mt-5 ms-5' variant="danger" type="button">
                    Cancel entry
                </Button>
            </>
            }
            </Form>
        </div>
    )
}

// export components
export default AddDescription