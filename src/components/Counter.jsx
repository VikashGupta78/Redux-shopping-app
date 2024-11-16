import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreement, increement } from '../redux/slices/CounterSlice';

export const Counter = () => {
    
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
        <button onClick={() => dispatch(increement())}>Increement</button>
        <div>{count}</div>
        <button onClick={() => dispatch(decreement())}>Decreement</button>
    </div>
  )
}
