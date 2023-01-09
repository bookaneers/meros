// import dependencies and libraries
import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../utils/tools'

// import components and functions
import { clearOnePart } from '../../store/reducers/onepart';
import { updatePartInMeros } from '../../store/utils/thunks';
import ProcessesUpdate from './processesupdates'

const SubmitUpdatePart = () => {

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    // give access to State and provide array with the parts that are showing up on the screen
    const onepart = useSelector((state)=> state.onepart);

    const handleSubmitChanges = (e) => {
        e.preventDefault();

        dispatch(updatePartInMeros(onepart))
        .unwrap()
        .then((response)=>{ // activate toasts to SUCCESS or ERROR

            if (response.result === 'updated') {
                showToast('SUCCESS', 'Part was updated')
                dispatch(clearOnePart({
                    partNumber:'',
                    description:'',
                    processes:[
                        {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                         'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
                    ]
                }))
            } else {
                showToast('ERROR', 'Action not completed')
            }
        })
    }

    const cancelChanges = () => {
        
        dispatch(clearOnePart({
            partNumber: '',
            description: '',
            processes:[
                {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
            ]
        }))
    }

    return (

        <div className="form">
            <Form className='mt-4'>
                <Form.Group>
                    <Form.Control 
                    name="partNumber"
                    defaultValue={onepart.oneItem.partNumber}
                    disabled={true}
                    />
                    <Form.Control
                    className='mt-3'
                    name="description"
                    defaultValue={onepart.oneItem.description}
                    disabled={true}
                    />    
                </Form.Group>

                <ProcessesUpdate/>

                <Button onClick={(e) => handleSubmitChanges(e)} className='mt-5' variant="primary" type="button">
                        Submit changes
                </Button>
                <Button onClick={(e) => cancelChanges(e)} className='mt-5 ms-5' variant="danger" type="button">
                        Cancel entry
                </Button>

            </Form>
        </div>
    )
}

export default SubmitUpdatePart;
