import { configureStore } from '@reduxjs/toolkit';
import { subjectSlice } from './subjectSlice'; 

const store = configureStore({
    reducer: {
        subjects: subjectSlice.reducer 
    },
});

export default store;