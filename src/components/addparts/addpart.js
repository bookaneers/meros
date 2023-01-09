// import dependencies and libraries
import React,{ useState, useRef} from 'react';
import {Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { showToast } from '../utils/tools';

// import components and functions
import { validatePartInMeros } from '../../store/utils/thunks';
import { addPartToOnePart } from '../../store/reducers/onepart';

// build component
const AddPart = () => {

    //set objects to identify errors and visualize parts of the page
    const [error,setError] = useState([false, '']);

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    // define const for input info from the DOM using useRef()
    const partNumberInput = useRef();

    const addCurrentPart = (e) => {
        e.preventDefault();
        setError([false, '']) //get ready of the error messages

        // define const to obtain inputs form the DOM
        const partNumberValue = partNumberInput.current.value;

        // define const to hold result form validatePartInput function
        const validatePart = validatePartInput(partNumberValue);

        // if data is correct, then dispatch to the database to be validated
        if (validatePart) {

            dispatch(validatePartInMeros({partNumber:`${partNumberValue}`}))
            .unwrap()
            .then((response)=>{ // activate toasts to SUCCESS or ERROR

                if (response.result === 'found') {
                    showToast('ERROR', 'Item already in the database')
                } else {
                    showToast('SUCCESS', 'NEW ITEM')
                    dispatch(addPartToOnePart(partNumberValue))
                }
            })
        }
    }

    // define function to validate errors
    const validatePartInput = (partNumberValue) => {
        if (partNumberValue === '' ) {
            setError([true, 'Part Number can not be empty'])
            return false
        }
        if (partNumberValue.length < 5 || partNumberValue.length > 20) {
            setError([true, 'Part Number must be between 5-20 characters'])
            return false
        }
        return true
    }

    // return form
    return(
        <div className="addparts_container">

            <Form className='mt-4'>
                <Form.Group>
                    <Form.Control
                    type='text'
                    placeholder='Part number'
                    name="partNumber"
                    ref={partNumberInput}
                    />
                </Form.Group>

                {error[0] ?
                    <Alert className='mt-3'>
                        {error[1]}
                    </Alert>
                :null}

                <Button onClick={(e)=> addCurrentPart(e)} className='mt-3' variant="primary" type="button">
                    Search part in the database
                </Button>
            </Form>
        </div>
    )
}

// export components
export default AddPart;
