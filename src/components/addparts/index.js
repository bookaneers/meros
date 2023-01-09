// import dependencies and libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components and functions
import AddPart from "./addpart";
import AddDescription from "./adddescription";
import { clearOnePart } from '../../store/reducers/onepart';

// build component
const PartNumberAndProcesses = () => {

    // define distach const to be use to add data to the database
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearOnePart({
            partNumber:'',
            description:'',
            processes:[
                {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
            ]
        }))
    },[dispatch])


    // give access to State and provide array with the parts that are showing up on the screen
    const onepart = useSelector((state) => state.onepart);

    // return form
    return(
        <div className="addparts_container">
            <h4>ADD NEW PART ...</h4>

            {/* switch to page Search if loding is true or item was not found or updated is true */}
            { !onepart.loading ?
                <AddPart/>
            :
                <AddDescription/>
            }
        </div>
    )
}

export default PartNumberAndProcesses;
