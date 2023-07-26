import React, { useReducer, useState } from 'react'

const reducer = (state, action) => {

  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 }

    case "Decrement":
      return { ...state, count: state.count - 1 }

    case "AddNumber":
      return { ...state, count: state.count + +action.payload }

    case "SubNumber":
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
        <button onClick={() => dispatch({ type: "AddNumber", payload: num })}>Add</button>
        <button onClick={() => dispatch({ type: "SubNumber", payload: num })}>substract</button>

      </div>


      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })} >Increment</button>
        <button onClick={() => dispatch({ type: "Decrement" })} >Decrement</button>
        <button onClick={() => dispatch({ type: "RESET" })} >RESET</button>



      </div>

    </div>
  )
}

export default App