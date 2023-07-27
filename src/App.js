import React, { useReducer, useState } from 'react'

//switch case
const reducer = (state, action) => {

  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 }

    case "DECREMENT":
      return { ...state, count: state.count - 1 }

    case "ADDNUMBER":
      return { ...state, count: state.count + +action.payload }

    case "SUBNUMBER":
      return { ...state, count: state.count - +action.payload }

    case "RESET":
      return { ...state, count: 0 }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  const [num, setNum] = useState(0)

  return (
    <div>
      <h1>{state.count}</h1>

      <div>
        <input type="number" value={num} onChange={(e) => setNum(e.target.value)}></input>
        <button onClick={() => dispatch({ type: "ADDNUMBER", payload: num })}>Add</button>
        <button onClick={() => dispatch({ type: "SUBNUMBER", payload: num })}>substract</button>

      </div>


      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })} >Increment</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })} >Decrement</button>
        <button onClick={() => dispatch({ type: "RESET" })} >RESET</button>



      </div>

    </div>
  )
}

export default App