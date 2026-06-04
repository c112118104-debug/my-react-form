import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Redux 計數器測試</h2>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          style={{ fontSize: '20px', padding: '5px 15px' }}
        >
          -
        </button>
        
        <span style={{ fontSize: '24px', margin: '0 20px' }}>{count}</span>
        
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          style={{ fontSize: '20px', padding: '5px 15px' }}
        >
          +
        </button>
      </div>
    </div>
  )
}