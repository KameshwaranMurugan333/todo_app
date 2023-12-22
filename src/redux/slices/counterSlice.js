import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value = state.value + 1;
        },
        decrement: (state) => {
            state.value = state.value - 1;
        },
        multiplyByNum: (state, { payload }) => {
            state.value = state.value * payload;
        }
    }
})

export const { increment, decrement, multiplyByNum } = counterSlice.actions;

