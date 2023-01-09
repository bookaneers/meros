import React,{ useRef, useState } from 'react';
import {Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete, TiEdit } from 'react-icons/ti';
import { GiSave } from 'react-icons/gi';
import { RiArrowDownCircleFill, RiArrowUpCircleFill } from 'react-icons/ri';

// import components and functions
import { updateProcessesOnePart } from '../../store/reducers/onepart';
import { updateTimesInOnePart } from '../../store/reducers/onepart';

const ProcessesUpdate = () => {

    // give access to State and provide array with the parts that are showing up on the screen
    const onepart_processes = useSelector((state) => state.onepart.oneItem.processes);

    const [state,setState] = useState(onepart_processes)
    const [changeTimes, setChangeTimes] = useState(null)

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

        if (setupTimeValue > 1440) setupTimeValue = 1440;
        if (cycleTimeValue > 1440) cycleTimeValue = 1440;

        let copiedState = structuredClone(state);

        if (processValue !== 'Select process') {

            let addProcess = {'processID': state.length,
            'process': processValue,
            'setupTime': setupTimeValue,
            'cycleTime': cycleTimeValue,
            'employeeTaktTime':0, 
            'employeeRopeTime': 0,
            'employeeName':'', 
            'employeeID':'', 
            'priority': false
            };

            copiedState.push(addProcess)
        }

        setState(copiedState)
        dispatch(updateProcessesOnePart(copiedState))

        // clean const values
        processInput.current.value = 'Select process';
        setupTimeInput.current.value = 0;
        cycleTimeInput.current.value = 0;
    }

    const deleteProcess = (index) => {

        let indexToBeDeleted = parseInt(index);
        let copiedState = structuredClone(state);

        copiedState.map((item, indexFromList) => (
            indexFromList === indexToBeDeleted ?
                copiedState.splice(indexToBeDeleted, 1)
            :null
        ))

        copiedState.map((item2, indexFromList2) => (
            item2.processID >= indexToBeDeleted ?
                item2.processID = item2.processID - 1
            :null
        ))

        setState(copiedState)
        dispatch(updateProcessesOnePart(copiedState))
    }

    const updateTimes = (index) => {
        setChangeTimes(index)
    }

    const saveTimes = (index) => {

        let setupTimeValue = setupTimeInput.current.value;
        let cycleTimeValue = cycleTimeInput.current.value;

        setupTimeValue = +setupTimeValue;
        cycleTimeValue = +cycleTimeValue;

        if (setupTimeValue > 1440) setupTimeValue = 1440;
        if (cycleTimeValue > 1440) cycleTimeValue = 1440;

        dispatch(updateTimesInOnePart({
            'index': index,
            'setupTime': setupTimeValue,
            'cycleTime': cycleTimeValue,
        }))

        let indexToBeModified = parseInt(index);
        let copiedState = structuredClone(state);

        copiedState.forEach((item, index) => {
            if (index === indexToBeModified) {
                item.setupTime = setupTimeValue;
                item.cycleTime = cycleTimeValue;               
            } 
        })

        setState(copiedState)
        setChangeTimes(null)

    }

    const moveDown = (indexToBeMovedDown) => {
        let copiedState = structuredClone(state);
        if (indexToBeMovedDown === copiedState.length - 1 ) return
        const newArray = []
        copiedState.forEach((item, index) => {
            if (index === indexToBeMovedDown) {
                newArray.push(copiedState[index + 1])
                newArray.push(copiedState[index]) 
            } else if (index === indexToBeMovedDown + 1) {
            } else {
                newArray.push(item) 
            }
        })

        newArray.map((item2, index) => (
                item2.processID = index
        ))
        setState(newArray)
        dispatch(updateProcessesOnePart(newArray))
    }

    const moveUp = (indexToBeMovedUp) => {
        let copiedState = structuredClone(state);
        if (indexToBeMovedUp === 0 ) return

        const newArray = []
        copiedState.forEach((item, index) => {

            if (index === indexToBeMovedUp - 1) {
                newArray.push(copiedState[indexToBeMovedUp])
                newArray.push(copiedState[index])

            } else if (index === indexToBeMovedUp) {
            } else {
                newArray.push(item) 
            }
        })

        newArray.map((item2, index) => (
            item2.processID = index
        ))

        setState(newArray)
        dispatch(updateProcessesOnePart(newArray))

    }

    return(
        <>
            <Form.Group className="mt-5">
                <div className="input-group">

                    <RiArrowUpCircleFill size="40" className="ms-5"  opacity="0.0" disabled/>
                    <RiArrowDownCircleFill size="40" className="ms-5"  opacity="0.0" disabled/>
                    <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>

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

                    <GiSave size="40" className="ms-5"  opacity="0.0" disabled/>
                    <TiEdit size="40" className="ms-5"  opacity="0.0" disabled/>
                    <TiDelete size="50" className="ms-5"  opacity="0.0" disabled />
       
                </div>
            </Form.Group>

            <Form.Group className="mt-3">

                { state.length > 0 ?
                    <>
                        { changeTimes === null ?

                            state.map( process => (
                                
                                < div className="input-group mt-3" key={process.processID}>

                                    <RiArrowUpCircleFill onClick={() => moveUp(process.processID)} size="40" color="green"  className="md-5 icons"/>
                                    <RiArrowDownCircleFill onClick={() => moveDown(process.processID)} size="40" color="green" className="ms-5 icons"/>
                                    <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>

                                    <Form.Control 
                                    className="below-flow-update ms-5"
                                    name="flow-order"
                                    value={process.processID}
                                    disabled={true}
                                    />

                                    <Form.Control
                                    className="ms-5 below-flow-update"
                                    name="process"
                                    value={process.process}
                                    disabled={true}
                                    />

                                    <Form.Control
                                    className="ms-5 below-flow-update"
                                    name="setup-time"
                                    value={process.setupTime}
                                    disabled={true}
                                    />

                                    <Form.Control
                                    className="ms-5 below-flow-update"
                                    name="cycle-time"
                                    value={process.cycleTime}
                                    disabled={true}
                                    />                

                                    <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>
                                    <TiEdit onClick={() => updateTimes(process.processID)} size="40" color="blue" className="ms-5 icons"/>
                                    <TiDelete onClick={() => deleteProcess(process.processID)} size="50" color="red" className="ms-5 icons"/>

                                </div>
                            ))
                        :

                            state.map( process => (
                                <div key={process.processID}>
                                    { changeTimes === process.processID ?
                                        < div className="input-group mt-3">

                                            <RiArrowUpCircleFill onClick={() => moveDown(process.processID)} size="40" color="green"  className="md-5 icons"/>
                                            <RiArrowDownCircleFill onClick={() => moveUp(process.processID)} size="40" color="green" className="ms-5 icons"/>
                                            <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>                                         

                                            <Form.Control 
                                            className="below-flow-update ms-5"
                                            name="flow-order"
                                            value={process.processID}
                                            disabled={true}
                                            />

                                            <Form.Control
                                            className="ms-5 below-flow-update"
                                            name="process"
                                            value={process.process}
                                            disabled={true}
                                            />

                                            <Form.Control
                                            className='ms-5'
                                            type='number'
                                            min="0"
                                            max="1440"
                                            name="setup-time"
                                            defaultValue={process.setupTime}
                                            ref={setupTimeInput}
                                            />

                                            <Form.Control
                                            className='ms-5'
                                            type='number'
                                            min="0"
                                            max="1440"
                                            name="cycle-time"
                                            defaultValue={process.cycleTime}
                                            ref={cycleTimeInput}
                                            />                

                                            <GiSave onClick={() => saveTimes(process.processID)} size="35" color="green" className="ms-5 icons"/>
                                            <TiEdit onClick={() => updateTimes(process.processID)} size="40" color="blue" className="ms-5 icons"/>
                                            <TiDelete onClick={() => deleteProcess(process.processID)} size="50" color="red" className="ms-5 icons"/>

                                        </div>

                                    :
                                    
                                        < div className="input-group mt-3">

                                            <RiArrowUpCircleFill onClick={() => moveDown(process.processID)} size="40" color="green"  className="md-5 icons"/>
                                            <RiArrowDownCircleFill onClick={() => moveUp(process.processID)} size="40" color="green" className="ms-5 icons"/>
                                            <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>

                                            <Form.Control 
                                            className="below-flow-update ms-5"
                                            name="flow-order"
                                            value={process.processID}
                                            disabled={true}
                                            />

                                            <Form.Control
                                            className="ms-5 below-flow-update"
                                            name="process"
                                            value={process.process}
                                            disabled={true}
                                            />

                                            <Form.Control
                                            className="ms-5 below-flow-update"
                                            name="setup-time"
                                            value={process.setupTime}
                                            disabled={true}
                                            />

                                            <Form.Control
                                            className="ms-5 below-flow-update"
                                            name="cycle-time"
                                            value={process.cycleTime}
                                            disabled={true}
                                            />                

                                            <GiSave size="35" color="green" className="ms-5" opacity="0.0" disabled/>
                                            <TiEdit onClick={() => updateTimes(process.processID)} size="40" color="blue" className="ms-5 icons"/>
                                            <TiDelete onClick={() => deleteProcess(process.processID)} size="50" color="red" className="ms-5 icons"/>

                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </>
                : null }
         
            </Form.Group>

            <Form.Group className='input-group mt-5'>
                <Form.Select ref={processInput}>
                    <option>Select process</option>
                    <option value="scheduler">Scheduler</option>
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
export default ProcessesUpdate;
