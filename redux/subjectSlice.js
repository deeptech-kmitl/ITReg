import { createSlice, current } from "@reduxjs/toolkit";
const initialState = []
export const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        show: (state, action) => {
            console.log('test')
            console.log("In slice:", current(state.list))
        },
        saveAllSubject: (state, action) => {
            return action.payload;
        }
    }
})
export const { saveAllSubject, show } = subjectSlice.actions
export default subjectSlice.reducer