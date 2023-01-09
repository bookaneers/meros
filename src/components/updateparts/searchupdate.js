// import dependencies and libraries
import React,{ useState, useRef } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showToast } from '../utils/tools';

// import components and functions
import { validatePartInMeros } from '../../store/utils/thunks';
import { addFoundPartToOnePart } from '../../store/reducers/onepart';

const SearchUpdatePart = () => {

    //set objects to identify errors and visualize parts of the page
    const [error,setError] = useState([false, '']);

    // define dispatch const
    const dispatch = useDispatch();

    // define const for input info from the DOM using useRef()
    const partNumberInput = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        setError([false, '']) //get ready of the error messages

        // define const to obtain inputs form the DOM
        const partNumberValue = partNumberInput.current.value;

        // define const to hold result form validatePartInput function
        const validatePart = validatePartInput(partNumberValue); 

        if (validatePart) {

            dispatch(validatePartInMeros({partNumber:`${partNumberValue}`})) 
            .unwrap() 
            .then((response)=>{ // activate toasts to SUCCESS or ERROR

                if (response.result === 'not-found') {
                    showToast('ERROR', 'Item not found')
                }
                else {
                    showToast('SUCCESS', 'FOUND ITEM')
                    dispatch(addFoundPartToOnePart(response.data))
                }
            })
        }
    }
    
    // define function to validate errors
    const validatePartInput = (partNumberValue) => {
        if (partNumberValue === '') {
            setError([true, 'Part Number can not be empty'])
            return false
        }
        if (partNumberValue.length <3) {
            setError([true, 'Part Number must be 3 char at least'])
            return false
        }
        return true
    }

    return (
        <div className="updateparts_container">

            <Form className='mt-4'>
                <Form.Group>
                    <Form.Control
                    type='text'
                    placeholder='Part number'
                    name="partNumber"
                    ref={partNumberInput}
                    />
                </Form.Group>

                { error[0] ?
                    <Alert className='mt-3'>
                        {error[1]}
                    </Alert>
                :null}

                <Button onClick={(e)=> handleSearch(e)} className='mt-3' variant="primary" type="button">
                        Search part in the database
                </Button>
            </Form>
        </div>
    )
}

// export components
export default SearchUpdatePart;