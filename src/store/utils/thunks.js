// import dependencies and libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

import { axios_services } from "../../services/axiosservices"

// export a Thunk to GET data from the database
export const fetchParts = createAsyncThunk(
    // reducer's name / function's name
    'parts/fetchParts',
    // parameters sent by user and State
    async({page=1, order="asc", limit="5"},{ getState })=>{
        try{
            // Get all data with the following parameters
            const response = await axios_services.get(`/api/getparts?_page=${page}&_limit=${limit}&_order=${order}`);
            // get State information
            const prevState = getState().parts;
            // return all the data from the database, the page number and a boolean for the 
            // end of the database
            return {
                items:[...prevState.fullPage.items,...response.data],
                page: page,
                end: response.data.length === 0 ? true : false
            }
        } catch(error) {
            throw error;
        }
    }
)

// export a Thunk to POST data to the database
export const addPartToMeros = createAsyncThunk(
    // reducer's name / function's name
    'parts/addPartsToMeros',
    // data sent by user and State
    async(dataReceived,{ getState }) => {
        try{
            // check if part found is NOT (it must be an object) an array and it is not empty
            if(!Array.isArray(dataReceived)) {
                // POST new item in database
                const response = await axios_services({
                    method:'POST',
                    url:`/api/addpart`,
                    data:{
                        partNumber: dataReceived.onepart.oneItem.partNumber,
                        description: dataReceived.onepart.oneItem.description,
                        processes: dataReceived.onepart.oneItem.processes
                    }
                });
                // get State information
                const prevState = getState().parts;
                // return the data with new item; and message 'added'
                return{
                    items:[...prevState.fullPage.items,response.data],
                    result: 'added',
                }
            // if not
            } else {
                // return the message 'not-found'
                return{
                    result: 'failed'
                }
            }
        } catch(error) {
            throw error
        }
    }
)

// export a Thunk to update (GET/PUT) data to the database
export const updatePartInMeros = createAsyncThunk(
    // reducer's name / function's name
    'parts/updatePartInMeros',
    // data sent by user and State
    async (dataReceived, {getState}) => {
        try {            
            // check if part found is NOT (it must be an object) an array and it is not empty
            if (!Array.isArray(dataReceived)) {
                // get State information
                const prevState = getState().parts;
                // POST updated data in item found in database
                const response = await axios_services({
                    method: 'POST',
                    url: `/api/updatepart/${dataReceived.oneItem._id}`,
                    data: {
                        partNumber: dataReceived.oneItem.partNumber,
                        description: dataReceived.oneItem.description,
                        processes: dataReceived.oneItem.processes
                    }
                });
                // create an empty array
                const newArray = []
                // iterate over all items in parts
                prevState.fullPage.items.forEach((item, index)=> {
                    // compare if items from State are not the one to be deleted
                    if (item._id !== response.data._id) {
                        // push item to new array
                        newArray.push(item)
                    } else {
                        newArray.push(response.data)
                    }
                })
                // return the new array with all the processes updates 
                // to replace old array; and message 'updated'
                return {
                    items: newArray,
                    result: 'updated'
                }
            // if not
            } else {
                // return the message 'not-found'
                return {
                    result: 'failed'
                }
            }
        } catch (error) {
            throw error;
        }
    }
)

// export a Thunk to delete (GET/DELETE) data to the database
export const deletePartInMeros = createAsyncThunk(
    // reducer's name / function's name
    'parts/deletePartInMeros',
    // data sent by user and State
    async(dataReceived,{ getState }) => {
        try{
            // GET part with partNumber equals to partNumber from data received
            const response = await axios_services.get(`/api/removepart/${dataReceived.oneItem._id}`)
            // check if part found is NOT (it must be an object) an array and it is not empty
            if(!Array.isArray(response.data) || response.data.length){
                // get State information
                const prevState = getState().parts;
                // create an empty array
                const newArray = []
                // iterate over all items in parts
                prevState.fullPage.items.forEach((item, index)=> {
                    // compare if items from State are not the one to be deleted
                    if (item._id !== response.data._id) {
                        // push item to new array
                        newArray.push(item)
                    }
                })
                return{
                    // return the new array (deleted item must not be included) 
                    // to replace old array; and message 'deleted'
                    items: newArray,
                    result: 'deleted'
                }
            // if not
            } else {
                // return the message 'not-found'
                return{
                    result: 'failed'
                }
            }
        } catch(error) {
            throw error;
        }
    }
)

// export a Thunk to validate (GET) data to the database
export const validatePartInMeros = createAsyncThunk(
    // reducer's name / function's name
    'onepart/validatePartInMeros',
    // data sent by user
    async (dataReceived) => {
        try {
            // GET part with partNumber equals to partNumber from data received
            const findPart = await axios_services.get(`/api/getpart/${dataReceived.partNumber}`)
            // check if part found is NOT (it must be an object) an array and it is not empty
            if (Array.isArray(findPart.data) && findPart.data.length) {
                // return the found part and the message 'found'
                return {
                    data: findPart.data,
                    result: 'found'
                }
            // if not
            } else {
                // return the message 'not-found'
                return {
                    result: 'not-found'
                }
            }
        } catch (error) {
            throw error;
        }
    }
)