import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './slices/CounterSlice'
import { CartSlice } from './slices/CartSlice'

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    cart: CartSlice.reducer,
  },
})
