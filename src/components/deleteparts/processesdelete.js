import React,{ useState } from 'react';
import {Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProcessesDelete = () => {

    // give access to State and provide array with the parts that are showing up on the screen
    const onepart_processes = useSelector((state) => state.onepart.oneItem.processes);

    const [state] = useState(onepart_processes)

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

            <Form.Group className="mt-3">

                { state.length > 0 ?
                    state.map( process => (
                        < div className="input-group mt-3" key={process.processID}>
                            <Form.Control
                            className="below-flow-update"
                            name="flow-order"
                            defaultValue={process.processID}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow-update"
                            name="process"
                            defaultValue={process.process}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow-update"
                            name="setup time"
                            defaultValue={process.setupTime}
                            disabled={true}
                            />
                            <Form.Control
                            className="ms-5 below-flow-update"
                            name="cycle time"
                            defaultValue={process.cycleTime}
                            disabled={true}
                            />
                        </div>
                    ))
                : null }
            </Form.Group>
        </>
    )
}

// export components
export default ProcessesDelete;
