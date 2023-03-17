import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice';

export const store = configureStore({
    reducer: {
        home_store: homeSlice
    },
})