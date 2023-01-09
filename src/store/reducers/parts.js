// import dependencies and libraries
import { createSlice } from "@reduxjs/toolkit";

// import components
import { fetchParts } from "../utils/thunks"; 
import { addPartToMeros } from "../utils/thunks";
import { deletePartInMeros } from "../utils/thunks";
import { updatePartInMeros } from "../utils/thunks";

// create a Reducer with createSlice
// Reducers are located inside the Slices. The initial configuration is
// name, initialState, reducer.
export const partsSlice = createSlice({
    name:'parts',
    initialState:{
        action:{},
        fullPage:{
            items:[]
        },
        loading:true,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // ========== fetchParts ==========
        .addCase(fetchParts.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchParts.fulfilled,(state,action)=>{
            state.loading = false
            state.fullPage = action.payload
        })
        .addCase(fetchParts.rejected,(state)=>{
            state.loading = false
        })

        // ========== addPartToMeros ==========
        .addCase(addPartToMeros.pending,(state)=>{
            state.loading = true
        })
        .addCase(addPartToMeros.fulfilled,(state, action)=>{
            state.fullPage = action.payload
            state.loading = false
        })
        .addCase(addPartToMeros.rejected,(state)=>{
            state.loading = false
        })

        // ========== deletePartInMeros ==========
        .addCase(deletePartInMeros.pending,(state)=>{
            state.loading = true
        })
        .addCase(deletePartInMeros.fulfilled,(state, action)=>{
            state.fullPage = action.payload
            state.loading = false
        })
        .addCase(deletePartInMeros.rejected,(state)=>{
            state.loading = false
        })

        // ========== updatePartInMeros ==========
        .addCase(updatePartInMeros.pending,(state)=>{
            state.loading = true
        })
        .addCase(updatePartInMeros.fulfilled,(state, action)=>{
            state.fullPage = action.payload
            state.loading = false
        })
        .addCase(updatePartInMeros.rejected,(state)=>{
            state.loading = false
        })
    }
})

export const { removePartFromParts } = partsSlice.actions;
export const { clearParts } = partsSlice.actions;
export const { addPartToParts } = partsSlice.actions;

// exporting the reducer
export default partsSlice.reducer;