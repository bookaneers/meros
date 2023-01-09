import React,{ useRef } from 'react';
import {Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// import components and functions
import { addProcessToOnePart } from '../../store/reducers/onepart';

const AddProcess = () => {

    // give access to State and provide array with the parts that are showing up on the screen
    const onepart_processes = useSelector((state) => state.onepart.oneItem.processes);

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    const processInput = useRef();
    const setupTimeInput = useRef();
    const cycleTimeInput = useRef();

    const addCurrentProcess = (e) => {
        e.preventDefault()

        // define const to obtain inputs form the DOM
        const processValue = processInput.current.value;
        let setupTimeValue = setupTimeInput.current.value;
        let cycleTimeValue = cycleTimeInput.current.value;

        setupTimeValue = +setupTimeValue;
        cycleTimeValue = +cycleTimeValue;

        if (processValue !== 'Select process') {
            dispatch(addProcessToOnePart(
                {'processID': onepart_processes.length,
                'process': processValue,
                'setupTime':setupTimeValue,
                'cycleTime': cycleTimeValue,
                'employeeTaktTime':0,
                'employeeRopeTime':0,
                'employeeName':'',
                'employeeID':'',
                'priority': false
            }
            ))
        }

        // clean const values
        processInput.current.value = 'Select process';
        setupTimeInput.current.value = 0;
        cycleTimeInput.current.value = 0;
    }

    return(
        <>
            <Form.Group className="mt-5">
                <div className="input-group">
                    <Form.Control
                        className="flow"
                        defaultValue="Flow"
                    />
                    <Form.Control
                        className="ms-5 flow"
                        defaultValue="Process"
                    />
                    <Form.Control
                        className="ms-5 flow"
                        defaultValue='Setup Time'
                    />
                    <Form.Control
                        className="ms-5 flow"
                        defaultValue="Cycle Time"
                    />
                </div>
            </Form.Group>

            <Form.Group>

                { onepart_processes.length > 0 ?
                    onepart_processes.map( process => (
                        < div className="input-group mt-2" key={process.processID}>
                            <Form.Control
                            className="below-flow"
                            name="cycle time"
                            defaultValue={process.processID}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow"
                            name="process"
                            defaultValue={process.process}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow"
                            name="setup-time"
                            defaultValue={process.setupTime}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow"
                            name="cycle-time"
                            defaultValue={process.cycleTime}
                            disabled={true}
                            />
                        </div>
                    ))
                : null }
            </Form.Group>

            <Form.Group className='input-group mt-5'>
                <Form.Select ref={processInput}>
                    <option>Select process</option>
                    <option value="nesting">Nesting</option>
                    <option value="laser">Laser</option>
                    <option value="press-brake">Press Brake</option>
                    <option value="tube-laser">Tube Laser</option>
                    <option value="tube-bender">Tube Bender</option>
                    <option value="saw">Saw</option>
                    <option value="mill">Mill</option>
                    <option value="lathe">Lathe</option>
                    <option value="welding">Welding</option>
                    <option value="robot-welding">Robot Welding</option>
                    <option value="powder-coating">Powder Coating</option>
                    <option value="sew-shop">Sew Shop</option>
                    <option value="hardware">Hardware</option>
                    <option value="final-assembly">Final Assembly</option>
                    <option value="packaging">Packaging</option>
                    <option value="shipping">Shipping</option>
                </Form.Select>
                <Form.Control
                    className='ms-5'
                    type='number'
                    min="0"
                    max="1440"
                    name="setup-time"
                    placeholder="Setup time"
                    ref={setupTimeInput}
                />
                <Form.Control
                    className='ms-5'
                    type='number'
                    min="0"
                    max="1440"
                    name="cycle-time"
                    placeholder="Cycle time"
                    ref={cycleTimeInput}
                />
                <Button onClick={(e)=> addCurrentProcess(e)} className='ms-5' variant="secondary" type="button">
                    Add process
                </Button>

            </Form.Group>
        </>
    )
}

// export components
export default AddProcess;
