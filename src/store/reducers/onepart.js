// import dependencies and libraries
import { createSlice } from "@reduxjs/toolkit";

// import components
import { addPartToMeros, validatePartInMeros } from "../utils/thunks";

// create a Reducer with createSlice
// Reducers are located inside the Slices. The initial configuration is
// name, initialState, reducer.
export const addPartSlice = createSlice({
    name:'onepart',
    initialState:{
        action:{},
        oneItem:{
            partNumber:'',
            description:'',
            processes:[
                {'processID': 0, 'process': 'scheduler', 'setupTime': 0, 'cycleTime': 0, 'employeeTaktTime':0, 
                 'employeeRopeTime':0, 'employeeName':'', 'employeeID':'', 'priority': false }
            ]
        },
        loading: false
    },
    reducers:{
        // =============== ADD ===============
        addPartToOnePart:(state, action) => {
            state.oneItem.partNumber = action.payload
            state.loading = true;
        },
        addDescriptionToOnePart: (state, action) => {
            state.oneItem.description = action.payload
            state.loading = true;
        },
        addProcessToOnePart:(state, action) => {
            state.oneItem.processes = [...state.oneItem.processes, action.payload]
            state.loading = true;
        },
        clearOnePart:(state, action) => {
            state.oneItem = action.payload
            state.loading = false;
        },

        // =============== UPDATE ===============
        addFoundPartToOnePart:(state, action) => {
            state.oneItem = action.payload[0]
            state.loading = true;
        },
        updateProcessesOnePart:(state, action) => {
            state.oneItem.processes = action.payload
            state.loading = true;
        },
        
        updateTimesInOnePart:(state, action) => {
            state.oneItem.processes[action.payload.index].setupTime = action.payload.setupTime
            state.oneItem.processes[action.payload.index].cycleTime = action.payload.cycleTime
            state.loading = true;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(validatePartInMeros.pending,(state)=>{
            state.loading = true
        })
        .addCase(validatePartInMeros.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(addPartToMeros.fulfilled,(state)=>{
            state.loading = false
        })
    }
})

// exporting the reducer
export const { addPartToOnePart } = addPartSlice.actions;
export const { addDescriptionToOnePart } = addPartSlice.actions;
export const { addProcessToOnePart } = addPartSlice.actions;
export const { clearOnePart } = addPartSlice.actions;

export const { addFoundPartToOnePart } = addPartSlice.actions;
export const { updateProcessesOnePart } = addPartSlice.actions;
export const { updateTimesInOnePart } = addPartSlice.actions;

export default addPartSlice.reducer;
