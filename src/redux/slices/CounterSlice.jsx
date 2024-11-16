import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}
export const CounterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increement : (state) =>{
            state.value += 1;
        },
        decreement: (state) => {
            state.value -= 1;
        }
    }
})

export const {increement, decreement} = CounterSlice.actions;
export default CounterSlice.reducer;